<template>

  <el-button @click="prevItem">＜</el-button>
  {{ jsondatatitle }}
  <el-button @click="nextItem">＞</el-button>&nbsp;&nbsp;&nbsp;
  范围:<el-input type="number" v-model="dataZoomStart" @input="updateDataZoom" :min="0" style="width: 30%; "></el-input>
  一<el-input type="number" v-model="dataZoomEnd" @input="updateDataZoom" :max="100" style="width: 30%;"></el-input>
  <br>

  <div id="chart-container"></div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { data } from '../sharedata';
let jsondatatitle = ref('');
let intex = 0;
let chartInstance = null;
const startPosition = ref('');
const endPosition = ref('');
let jsondata = [];
const dataZoomStart = ref(0);
const dataZoomEnd = ref(100);
const prevItem = () => {
  if (intex > 0) {
    intex--;
    updateChart();
  }
};
const nextItem = () => {
  if (intex < jsondata[0].StatisticsData.length - 1) {
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

  if(jsondata[0].StatisticsData[intex] === undefined)
  {return;}
  //整个json
  jsondatatitle.value = jsondata[0].StatisticsData[intex].name;
  // 检查用户是否输入了起始和结束日期时间
  const hasValidDateRange = startDateTime && endDateTime && !isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime());


  let filteredData;

  filteredData = jsondata;

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
  console.log('3333333333333', yData)

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
      feature: {
        saveAsImage: {
          name: 'chartInstance',
          title: '保存图表',
          pixelRatio: 2,
        },
      },
    },
  });
};



onMounted(() => {
  jsondata = data.parsedLogData_b;
  updateChart();
});
</script>

<style>
#chart-container {
  width: 1200px;
  height: 400px;
  position: absolute;
  margin-left: -3%;
}
</style>
