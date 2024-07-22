<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box"
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

            <h2 style="margin-top: 1%; margin-left: 1%;">统计</h2>
            <div class="hengxian"></div>
            <div class="box">
                <el-button @click="prevItem" type="info" style="width: 10%; margin-left: 1%;" :icon="ArrowLeft"></el-button>
                &nbsp;{{ '🎈' + jsondatatitle }}
                <el-button @click="nextItem" type="info" style="width: 10%; margin-left: 1%; " :icon="ArrowRight"></el-button>


                &nbsp;&nbsp;&nbsp;

                范围：&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomStart" @input="updateDataZoom"
                    :min="0" style="width: 10%; "></el-input>
                &nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomEnd"
                    @input="updateDataZoom" :max="100" style="width: 10%;"></el-input>



                &nbsp;&nbsp;&nbsp;
                <el-button @click="gooncheck" type="info" style="width: 15%;" :icon="Setting">{{ flag2 ? '继续' : '暂停' }}</el-button>


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
import { timer_statistics } from '@/timer.js'
let jsondatatitle = ref('');

import {
    ArrowRight,
    ArrowLeft,
    Setting
} from '@element-plus/icons-vue'

let intex = 0;
let chartInstance = null;
const startPosition = ref('');
const endPosition = ref('');
let jsondata = ref([]);
const dataZoomStart = ref(0);
const dataZoomEnd = ref(100);
const prevItem = () => {
    if (intex > 0) {
        intex--;
        updateChart();
    }
};
const nextItem = () => {
    if (intex < jsondata.value[0].StatisticsData.length - 1) {
        intex++;
        updateChart();
    }
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



const updateChart = () => {
    if (chartInstance) {
        chartInstance.dispose();
    }

    const chartContainer = document.getElementById('chart-container');
    chartInstance = echarts.init(chartContainer);


    const startDateTime = new Date(startPosition.value);
    const endDateTime = new Date(endPosition.value);

    //整个json
    jsondatatitle.value = jsondata.value[0].StatisticsData[intex].name;
    // 检查用户是否输入了起始和结束日期时间
    const hasValidDateRange = startDateTime && endDateTime && !isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime());


    let filteredData;

    filteredData = jsondata.value;

    const xData = filteredData.map(item => item.logDateTime);
    const yData = [];
    for (let i = 0; i < filteredData.length; i++) {
        const lines = filteredData[i].StatisticsData[intex].value.map(line => line.value);
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
        series: yData.map((line, index) => ({
            type: 'line',
            name: filteredData[0].StatisticsData[intex].value[index].name,
            data: line,
        })),
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
                magicType: { type: ['bar', 'line', 'stack', 'tiled'] },
            },
        },
    });
};
const flag2 = ref(false);
const gooncheck = () => {
    flag2.value = !flag2.value;
}


const update = () => {
    let filteredData;

    filteredData = jsondata.value;
    const xData = filteredData.map(item => item.logDateTime);
    const yData = [];
    for (let i = 0; i < filteredData.length; i++) {
        const lines = filteredData[i].StatisticsData[intex].value.map(line => line.value);
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
        series: yData.map((line, index) => ({
            type: 'line',
            name: filteredData[0].StatisticsData[intex].value[index].name,
            data: line,
        })),
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
        legend: {
            show: true
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
        url: '/api/data/statistics',
        data: JSON.stringify(userList)
    })
        .then((res) => {
            responseData.value = res.data;
            const now = new Date();
            jsondata.value.push({ logDateTime: now.toLocaleString(), StatisticsData: responseData.value });
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

    timer_statistics.value = setTimeout(fetchVelocity1, 500);
}

onMounted(() => {
    fetchVelocity1()
})


</script>

<style scoped>
#chart-container {
    width: 100%;
    height: 67%;
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