<template>

    <div class="chart" id="main2" v-show="state_isExpanded" :style="{ width: 700 + 'px', height: 300 + 'px' }"
        ref="main2">

    </div>

</template>


<script setup>
import {ref ,onMounted} from 'vue'
import { state_isExpanded , ele_dev_wheel_fServoSpeed ,Net_Info_CurSpeed} from './sharedata.js'
import * as echarts from 'echarts';


const main2 = ref(null);


//统计图
const time = (() => {
  let now = new Date();
  let res = [];
  let len = 5;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 500);
  }
  return res;
})();

const dataOne = (() => {
  let res = [];
  let len = 5;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();

const dataTwo = (() => {
  let res = [];
  let len = 5;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();

let options = {
  title: {
    text: '车速',
    textStyle: {
      color: 'white',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56',
      },
    },
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['bar', 'line', 'stack'] },
      restore: {},
      saveAsImage: {},
    },
    bottom: 10,
  },

  xAxis: {
    type: 'category',
    data: time,
    boundaryGap: true,
  },
  yAxis: {
    type: 'value',

  },
  series: [
    {
      data: dataOne,
      type: 'line',
      name: '实际',
      color: 'green',
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
    {
      data: dataTwo,
      name: '理论',
      type: 'line',
      color: 'yellow',
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
};


onMounted(() => {
  const myChart = echarts.init(main2.value);

  setInterval(() => {
    let data1 = (ele_dev_wheel_fServoSpeed.value * 1000).toFixed(2);
    let nowTime = new Date().toLocaleTimeString().replace(/^\D*/, '');
    time.shift();
    time.push(nowTime);
    dataOne.shift();
    dataOne.push(data1);
    dataTwo.shift();
    dataTwo.push(Net_Info_CurSpeed);

    myChart.setOption({
      xAxis: [
        {
          data: time,
        },
      ],
      series: [
        {
          data: dataOne,
        },
        {
          data: dataTwo,
        },
      ],
    });



  }, 400);

  myChart.setOption(options);
});



</script>

<style></style>