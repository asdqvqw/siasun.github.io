<template>
    <div class="other" @mouseenter="other_toggleSize" @mouseleave="other_toggleSizelev"
      :class="{ other_expanded: other_isExpanded }"
      :style="{ width: other_wh + 'px', height: other_wh + 'px', top: other_top + 'px', zIndex: other_zIndexValue }">
      <div class="other-title" :style="{ width: other_wh + 'px' }">控制台：</div>
      <div class="other-info" :class="{ other_info_expanded: other_isExpanded }">
        开始节点：{{ Net_Info_uFromNode }}<br>
        目标节点：{{ Net_Info_uToNode }}<br>
        当前进度量：{{ Net_Info_sProgress }}<br>
        当前设置速度：{{ Net_Info_CurSpeed }}<br>
        货物状态：{{ Net_Info_usCargoState }}<br>
      </div>
      <div class="other-info-big" v-show="other_isExpanded">
        工作状态：{{ Net_Info_WorkState }}<br>
        1级故障码:{{ Net_Info_EventState }}<br>
        2级故障码:{{ Net_Info_EventDetail }}<br>
        电池状态：{{ Net_Info_usBatterState }}<br>
        任务状态：{{ Net_Info_TaskState }}<br>
        任务号：{{ Net_Info_TaskID }}<br>
        动作key：{{ Net_Info_Key }}<br>
        heading:{{ Net_Info_Head }}<br>

        下发信息类型：{{ }}<br>
      </div>
    </div>

</template>



<script setup>
import {ref} from 'vue' 
const other_isExpanded = ref(false);
import {Net_Info_uFromNode,Net_Info_uToNode,Net_Info_sProgress,Net_Info_CurSpeed,Net_Info_usCargoState,Net_Info_WorkState,
Net_Info_EventState,Net_Info_EventDetail,Net_Info_usBatterState,Net_Info_TaskState,Net_Info_TaskID,Net_Info_Key,
Net_Info_Head} from './sharedata.js'
let other_wh = ref(400);
let other_top = ref(360);
let other_zIndexValue = ref(50);



const other_toggleSize = () => {
  other_isExpanded.value = true;
  other_zIndexValue.value = 100;
  other_wh.value = 700;
  other_top.value = 50;
};
const other_toggleSizelev = () => {
  other_isExpanded.value = false;
  other_zIndexValue.value = 50;
  other_wh.value = 400;
  other_top.value = 360;
};





</script>

<style>
.other {
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


.other_expanded {
  opacity: 1;
  /* 取消透明度 */
  background-color: #066987cc;
  /* 修改框的颜色为红色 */
}

.other-info {
  line-height: 50px;
  margin-left: -200px;
  position: absolute;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(251, 251, 251);
  text-shadow: 2px 2px 4px rgba(252, 251, 251, 0.5);
}

.other_info_expanded {
  line-height: 50px;
  margin-left: -300px;
  margin-top: -350px;
  position: absolute;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.other-info-big {
  line-height: 50px;
  margin-top: -100px;
  margin-left: 200px;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

}

.other-title {
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


</style>