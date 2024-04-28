<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box"
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

            <h2 style="margin-top: 1%; margin-left: 1%;">分析</h2>
            <div class="hengxian"></div>

            <div class="box">

                范围：&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomStart" @input="updateDataZoom"
                    :min="0" style="width: 10%; "></el-input>
                &nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomEnd"
                    @input="updateDataZoom" :max="100" style="width: 10%;"></el-input>



                &nbsp;&nbsp;&nbsp;
                <el-button @click="gooncheck" type="info" style="width: 15%;" :icon="Setting">{{ flag2 ? '继续' : '暂停'
                    }}</el-button>

                <el-button type="info" @click="handleExpand11" style="width: 15%;" :icon="Search">
                    筛选
                </el-button>

                <el-dialog v-model="dialogVisible" title="筛选" :visible="dialogVisible" @close="dialogVisible = false">
                    <div class="box2">

                        <el-input v-model="keyword" placeholder="请输入关键字" clearable></el-input>

                        <br><br><br>

                        <div class="box">
                            <el-checkbox v-for="(series, index) in seriesList" :key="index" v-model="series.checked"
                                v-show="series.name.includes(keyword)">
                                {{ series.name }}
                            </el-checkbox>
                        </div>
                    </div>
                </el-dialog>


            </div>
            <br>

            <div class="box2">
                <div id="chart-container"></div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { timer_statistics2 } from '@/timer.js'

import {
    Search,
    Setting
} from '@element-plus/icons-vue'

let keyword = ref('');
let chartInstance = null;
const dataZoomStart = ref(0);
const dataZoomEnd = ref(100);
let jsondata = ref([]);
let seriesList = ref([]);
const dialogVisible = ref(false);
const handleExpand11 = () => {
    dialogVisible.value = true;
};


const updateDataZoom = () => {
    const chart = echarts.getInstanceByDom(document.getElementById('chart-container'));

    // 验证输入值的范围
    const start = Math.max(0, Math.min(dataZoomStart.value, 100));
    const end = Math.max(0, Math.min(dataZoomEnd.value, 100));

    const option = {
        dataZoom: [
            {
                show: false,
                type: 'slider',
                start,
                end,
            },
        ],
    };

    chart.setOption(option);
};


const flag2 = ref(false);
const gooncheck = () => {
    flag2.value = !flag2.value;
}



const updateChart = () => {
    if (chartInstance) {
        chartInstance.dispose();
    }

    const chartContainer = document.getElementById('chart-container');
    chartInstance = echarts.init(chartContainer);

    let filteredData;

    filteredData = jsondata.value;

    const xData = filteredData.map(item => item.logDateTime);
    const yData = [];
    for (let i = 0; i < filteredData.length; i++) {
        const lines = filteredData[i].StatisticsData.map(line => line.value);
        for (let j = 0; j < lines.length; j++) {
            if (!yData[j]) {
                yData[j] = [];
            }
            yData[j].push(lines[j]);
        }
    }

    const option = {
        xAxis: {
            type: 'category',
            data: xData,
        },
        yAxis: {
            type: 'value',
        },
        series: seriesList.value
            .filter(series => series.checked) // 过滤出选中的数据系列
            .map(line => {
                const index = seriesList.value.findIndex(series => series.name === line.name); // 查找 line.name 在 seriesList 中的索引
                return {
                    type: 'line',
                    name: line.name,
                    data: yData[index],
                };
            }),

        legend: { show: false },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                let tooltipContent = `时间: ${params[0].name}<br/>`;
                for (let i = 0; i < params.length; i++) {
                    const { seriesName, value } = params[i];
                    tooltipContent += `${seriesName}: ${value}<br/>`;
                }
                return tooltipContent;
            },
        },
        dataZoom: [
            {
                show: false,
                type: 'slider', // 滑动条型数据区域缩放
            },
        ],
    };

    chartInstance.on('dataZoom', ({ start, end }) => {
        const startIndex = Math.round(start * (xData.length - 1));
        const endIndex = Math.round(end * (xData.length - 1));
        const zoomedXData = xData.slice(startIndex, endIndex + 1);
        const zoomedYData = yData.map(line => line.slice(startIndex, endIndex + 1));
        // 根据缩放后的数据更新图表
        chartInstance.setOption({
            xAxis: { data: zoomedXData },
            series: yData.map((line, index) => ({ data: zoomedYData[index] })),
        });
    });


    chartInstance.setOption(option);
    chartInstance.setOption({
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    name: 'chartInstance',
                    title: '保存图表',
                    pixelRatio: 2,
                },
                // magicType: { type: ['bar', 'line', 'stack', 'tiled'] },
            },
        },
    });
};


const update = () => {
    let filteredData;

    filteredData = jsondata.value;
    const xData = filteredData.map(item => item.logDateTime);
    const yData = [];
    for (let i = 0; i < filteredData.length; i++) {
        const lines = filteredData[i].StatisticsData.map(line => line.value);
        for (let j = 0; j < lines.length; j++) {
            if (!yData[j]) {
                yData[j] = [];
            }
            yData[j].push(lines[j]);
        }
    }
    const option = {
        xAxis: {
            type: 'category',
            data: xData,
        },
        yAxis: {
            type: 'value',
        },
        series: seriesList.value
            .filter(series => series.checked) // 过滤出选中的数据系列
            .map(line => {
                const index = seriesList.value.findIndex(series => series.name === line.name); // 查找 line.name 在 seriesList 中的索引
                return {
                    type: 'line',
                    name: line.name,
                    data: yData[index],
                    smooth: true, //是否平滑

                };
            }),
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                let tooltipContent = `时间: ${params[0].name}<br/>`;
                for (let i = 0; i < params.length; i++) {
                    const { seriesName, value } = params[i];
                    tooltipContent += `${seriesName}: ${value}<br/>`;
                }
                return tooltipContent;
            },
        },
        dataZoom: [
            {
                show: false,
                type: 'slider', // 滑动条型数据区域缩放
            },
        ],
    };

    chartInstance.setOption(option);

}


import axios from 'axios'
let flag = 0;
const responseData = ref(null)
const fetchVelocity1 = () => {
    let userList = {
        group: 'siasun',
        account: 'test',
        password: '123456'
    }
    axios({
        method: 'post',
        url: '/api/data/analysis',
        data: JSON.stringify(userList)
    })
        .then((res) => {
            responseData.value = res.data;
            const now = new Date();
            const newData = { logDateTime: now.toLocaleString(), StatisticsData: responseData };


            if (jsondata.value.length === 0) {
                jsondata.value.push(newData);
                seriesList.value = responseData.value.map(data => ({
                    name: data.name,
                    checked: false, // 默认为选中状态
                }));
            } else {
                // 否则，根据之前的 checkbox 状态更新数据
                const prevSeriesList = seriesList.value;
                jsondata.value.push(newData);
                seriesList.value = responseData.value.map((data, index) => ({
                    name: data.name,
                    checked: index < prevSeriesList.length ? prevSeriesList[index].checked : true, // 保持之前 checkbox 的状态
                }));
            }


            if (flag === 0) {
                updateChart();
                flag = 1;
            } else {
                if (!flag2.value) {
                    update();
                }
            }


        })
        .catch((error) => {

        })
        .finally(() => {

        })

    timer_statistics2.value = setTimeout(fetchVelocity1, 500);
}

onMounted(() => {
    fetchVelocity1()
})


</script>

<style scoped>
#chart-container {
    width: 1230px;
    height: 400px;
    position: absolute;
    margin-left: -3%;
}

.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}

.box {
    border: 5px double #8d8a8a;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
    text-align: center;
    width: 90%;
    border-radius: 10px;
    margin-left: 2%;
    background-image: linear-gradient(to bottom right, #3a3d3d95, #c6e0d017);
}

.box2 {
    border: 5px double #8d8a8a;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    height: 65%;
    background-image: linear-gradient(to bottom right, #bec2c295, #c6e0d017);
}
</style>
