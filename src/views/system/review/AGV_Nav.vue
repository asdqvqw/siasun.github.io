<template>


    <div class="nav_con" @mouseenter="nav_con_toggleSize" @mouseleave="nav_con_toggleSizelev"
        :class="{ nav_con_expanded: nav_con_isExpanded }"
        :style="{ width: nav_con_wh + 'px', height: nav_con_wh + 'px', top: nav_con_top + 'px', zIndex: nav_con_zIndexValue }">
        <div class="nav_con-title" :style="{ width: nav_con_wh + 'px' }">导航：</div>
        <div class="nav_con-info" :class="{ nav_con_info_expanded: nav_con_isExpanded }">
            目标位置:{{ targetCoordinates }} <br>
            当前位置：{{ CCtargetCoordinates }}<br>
            理论位置：{{ nav_pos }}<br>
            左右偏差：{{ nav_LR }}<br>
            角度偏差：{{ (nav_thi * 180 / Math.PI).toFixed(3) }}<br>
        </div>
        <div class="nav_con-big" v-show="nav_con_isExpanded">
            导航软件版本：{{ nav_sversion }}<br>
            导航环境模型版本：{{ nav_mversion }}<br>
            发送速度：{{ }}<br>
            发送舵角：{{ }}<br>
        </div>


        <div class="bingzhuang" id="main1" v-show="nav_con_isExpanded" style="width: 300px; height: 300px;" ref="main1">
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import * as echarts from 'echarts';
import {
    targetCoordinates, CCtargetCoordinates, nav_pos,
    nav_LR, nav_thi, nav_sversion, nav_mversion
} from './sharedata.js'

//图表
const main1 = ref(null);


const nav_con_isExpanded = ref(false);
let nav_con_wh = ref(400);
let nav_con_top = ref(0);
let nav_con_zIndexValue = ref(50);

const nav_con_toggleSize = () => {
    nav_con_isExpanded.value = true;
    nav_con_zIndexValue.value = 100;
    nav_con_wh.value = 600;

};
const nav_con_toggleSizelev = () => {
    nav_con_isExpanded.value = false;
    nav_con_zIndexValue.value = 50;
    nav_con_wh.value = 400;
};

//饼状图
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


onMounted(() => {
  const myChart = echarts.init(main1.value);

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
});



</script>

<style>

.bingzhuang {
  margin-top: 320px;
}


.nav_con_expanded {
    opacity: 1;
    /* 取消透明度 */
    background-color: #066987cc;
    /* 修改框的颜色为红色 */
}

.nav_con-big {
    line-height: 40px;
    margin-left: 220px;
    margin-top: -180px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(2, 0, 1);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}


.nav_con {
    color: aliceblue;
    position: absolute;
    right: 0px;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
    transition: opacity 1.5s, background-color 1.5s;
}

.nav_con-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    color: rgb(7, 19, 33);
    background-color: rgb(144, 201, 221);
    padding: 10px;
    height: 20px;
    line-height: 20px;

    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
}

.nav_con-info {
    width: 300px;
    line-height: 40px;
    margin-left: 0px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(239, 238, 238);
    text-shadow: 2px 2px 4px rgba(237, 233, 233, 0.5);
}

.nav_con_info_expanded {
    width: 300px;
    line-height: 40px;
    margin-left: -200px;
    margin-top: -230px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>