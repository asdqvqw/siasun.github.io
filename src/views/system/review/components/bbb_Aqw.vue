<template>
  <n-button class="round-button" @click="prevItem">＜</n-button>
  {{ jsondatatitle }}
  <n-button class="round-button" @click="nextItem">＞</n-button><br>
  <!-- <input id="start" type="datetime-local" v-model="startPosition" style="width: 200px;" /> —
  <input id="end" type="datetime-local" v-model="endPosition" style="width: 200px;" />
  <n-button class="pause-n-button" @click="updateChart">更新图表</n-button><br> -->
  <el-input type="number" v-model="dataZoomStart" @input="updateDataZoom" :min="0" style="width: 50%;"></el-input>
  <el-input type="number" v-model="dataZoomEnd" @input="updateDataZoom" :max="100" style="width: 50%;"></el-input>
  <div id="chart-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { data } from '../sharedata';
let jsondatatitle = ref('');
let intex = 0;
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
  const chartContainer = document.getElementById('chart-container');
  const chart = echarts.init(chartContainer);


  const startDateTime = new Date(startPosition.value);
  const endDateTime = new Date(endPosition.value);

  //整个json
  jsondatatitle.value = jsondata[0].StatisticsData[intex].name;
  // 检查用户是否输入了起始和结束日期时间
  const hasValidDateRange = startDateTime && endDateTime && !isNaN(startDateTime.getTime()) && !isNaN(endDateTime.getTime());


  let filteredData;
  if (hasValidDateRange) {

    //const startYear = startDateTime.getFullYear().toString();
    const startMonth = (startDateTime.getMonth() + 1).toString().padStart(2, '0');
    const startDay = startDateTime.getDate().toString().padStart(2, '0');
    const startHour = startDateTime.getHours().toString().padStart(2, '0');
    const startMinute = startDateTime.getMinutes().toString().padStart(2, '0');

    const startTimeString =/* startYear +*/ startMonth + startDay + startHour + startMinute + '00000';
    console.log("Start Time String:", startTimeString);

    //const endYear = endDateTime.getFullYear().toString();
    const endMonth = (endDateTime.getMonth() + 1).toString().padStart(2, '0');
    const endDay = endDateTime.getDate().toString().padStart(2, '0');
    const endHour = endDateTime.getHours().toString().padStart(2, '0');
    const endMinute = endDateTime.getMinutes().toString().padStart(2, '0');

    const endTimeString =/* endYear + */ endMonth + endDay + endHour + endMinute + '99999';
    console.log("End Time String:", endTimeString);


    jsondata.forEach(item => {
      item.logDateTimea = item.logDateTime.substring(5).replace(/\D/g, '');
    });
    console.log(jsondata[1].logDateTime, jsondata[1].logDateTimea);



    //开始结束
    let startIndex = parseInt(startTimeString);
    let endIndex = parseInt(endTimeString);

    filteredData = jsondata.filter(item => {
      const logDateTime = item.logDateTimea;
      return logDateTime >= startIndex && logDateTime <= endIndex;
    });
  } else {

    filteredData = jsondata;
  }
  const xData = filteredData.map(item => item.logDateTime);
  const yData = filteredData.map(item => item.StatisticsData[intex].value);

  const option = {
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: yData,
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const { name, value } = params[0];
        return `时间: ${name}<br/>取值: ${value}<br/>`;
      },
    },
    dataZoom: [
      {
        show: false,
        type: 'slider', // 滑动条型数据区域缩放
      },
    ],
  };

  chart.on('dataZoom', ({ start, end }) => {
    const startIndex = Math.round(start * (xData.length - 1));
    const endIndex = Math.round(end * (xData.length - 1));
    const zoomedXData = xData.slice(startIndex, endIndex + 1);
    const zoomedYData = yData.slice(startIndex, endIndex + 1);
    // 根据缩放后的数据更新图表
    chart.setOption({
      xAxis: { data: zoomedXData },
      series: [{ data: zoomedYData }],
    });
  });


  chart.setOption(option);
  chart.setOption({
    toolbox: {
      feature: {
        saveAsImage: {
          name: 'chart',
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
  width: 100%;
  height: 80%;
}

.round-button {
  margin-left: 15px;
  font-size: 30px;
  color: #ffffff;
}

.round-button:hover {
  background-color: #648e59ab;
}

.pause-n-button {
  display: inline-block;
  margin-top: 5px;
  margin-left: 15px;
  padding: 10px 20px;
  background-color: #7fd8f100;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  font-size: 16px;
  border: 1px solid #65ac67;
  /* 深绿色边框 */
  color: #e8e2e2;
}

.pause-n-button:hover {
  background-color: #648e59ab;
}
</style>
