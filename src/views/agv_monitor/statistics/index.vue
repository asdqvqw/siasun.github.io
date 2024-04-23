<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box">

            <h3 style="margin-top: 1%; margin-left: 1%;">统计分析</h3>
            <div class="hengxian"></div>
            <div>
                <el-button @click="prevItem" type="primary" style="width: 30%; margin-left: 5%;">＜</el-button>
                &nbsp;{{ '表名：' + jsondatatitle + '🎈' }}
                <el-button @click="nextItem" type="primary" style="width: 30%; margin-left: 1%; ">＞</el-button>

                <el-button @click="gooncheck" type="success" style="width: 15%;">{{ flag2 ? '继续' : '暂停' }}</el-button>


            </div>
            <br>
            <div style="margin-left: 5%;">
                范围：&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomStart" @input="updateDataZoom" :min="0"
                    style="width: 30%; "></el-input>
                    &nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;<el-input type="number" v-model="dataZoomEnd" @input="updateDataZoom" :max="100"
                    style="width: 30%;"></el-input>

                <br>
            </div>
            <div id="chart-container"></div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { timer_statistics } from '@/timer.js'
let jsondatatitle = ref('');
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
                magicType: { type: ['bar', 'line', 'stack','tiled'] },
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
        url: '/api/data/cout',
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
</style>