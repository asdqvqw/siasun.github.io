<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box"
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">


            <div>
                <el-checkbox v-for="(series, index) in seriesList" :key="index" v-model="series.checked"
                    @change="toggleSeries(index)">
                    {{ series.name }}
                </el-checkbox>
            </div>

            <br>
            <div id="chart-container"></div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { timer_statistics } from '@/timer.js'


let chartInstance = null;

let jsondata = ref([]);
let seriesList = ref([]);


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
        series: seriesList.value.filter(series => series.checked).map((line, index) => ({ // 过滤出选中的数据系列
            type: 'line',
            name: line.name,
            data: yData[index],
        })),

        legend: {show:false},
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
        series: seriesList.value.filter(series => series.checked).map((line, index) => ({ // 过滤出选中的数据系列
            type: 'line',
            name: line.name,
            data: yData[index],
        })),
        legend: {
            show:false
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
        url: '/api/data/coutt',
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
                    checked: true, // 默认为选中状态
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
                update();
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
    width: 1200px;
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