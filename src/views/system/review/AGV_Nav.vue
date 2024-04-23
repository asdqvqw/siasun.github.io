<template>
  <el-button class="EXButtonNAV" @click="clickbutton" v-show="!importflag">导航</el-button>
  <el-dialog v-model="dialogVisible" title="导航" custom-class="custom-dialog" @opened="openDialog" :modal="false"
    draggable :close-on-click-modal="false" modal-class="kk-dialog-class">
    导航软件版本：{{ nav_sversion }}<br>
    导航环境模型版本：{{ nav_mversion }}<br>
    <br>
    目标位置:{{ targetCoordinates }} <br>
    当前位置：{{ CCtargetCoordinates }}<br>
    理论位置：{{ nav_pos }}<br>
    <br>
    左右偏差：{{ nav_LR }}<br>
    角度偏差：{{ (nav_thi * 180 / Math.PI).toFixed(3) }}<br>
    <br>
    发送速度：{{ }}<br>
    发送舵角：{{ }}<br>
    <br>



    <div class="bingzhuang" id="main1" style="width: 300px; height: 300px;"></div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import {
  targetCoordinates, CCtargetCoordinates, nav_pos,
  nav_LR, nav_thi, nav_sversion, nav_mversion, importflag
} from './sharedata.js';

const dialogVisible = ref(false);

const clickbutton = () => {
  dialogVisible.value = true;
};

const openDialog = () => {
  const main1 = document.getElementById('main1');
  const myChart = echarts.init(main1);

  const data_bing = [
    { value: Math.round(Math.random() * 1000), name: '占用一' },
    { value: Math.round(Math.random() * 1000), name: '占用二' },
    { value: Math.round(Math.random() * 1000), name: '占用三' },
    { value: Math.round(Math.random() * 1000), name: '占用四' },
    { value: Math.round(Math.random() * 1000), name: '占用五' },
  ];

  const options_bing = {
    title: {
      text: '占用',
      textStyle: {
        color: 'black',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: data_bing.map((item) => item.name),
    },
    series: [
      {
        name: '测试数据',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: data_bing,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  setInterval(() => {
    data_bing.forEach((item) => {
      item.value = Math.round(Math.random() * 1000);
    });

    myChart.setOption({
      series: [
        {
          data: data_bing,
        },
      ],
    });
  }, 1000);

  myChart.setOption(options_bing);
};
</script>


<style>
.EXButtonNAV {
  background-image: url('./img/button.gif');
  background-size: 100%;
  background-position: center;
  background-color: #30499344;
  width: 200px;
  height: 40px;
  color: rgb(246, 241, 241);
  border: none;
  font-weight: bold;
  position: absolute;
  right: 0px;
  top: 300px;
  /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}

.bingzhuang {
  position: absolute;
  right: 50px;
  top: 50px;
}
</style>