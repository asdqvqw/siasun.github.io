<template>


    <div class="info" @mouseenter="info_toggleSize" @mouseleave="info_toggleSizelev"
        :class="{ info_expanded: info_isExpanded }"
        :style="{ width: info_wh + 'px', height: info_wh + 'px', top: info_top + 'px', zIndex: info_zIndexValue }">
        <div class="info-title" :style="{ width: info_wh + 'px' }">车体设备：</div>
        <div class="local" :class="{ local_expanded: info_isExpanded }">
            当前设备状态：{{ Net_equ_uEquipmentState }}<br>
            当前设备任务号：{{ Net_equ_uEquipmentTaskID }}<br>
            当前设备任务状态：{{ Net_equ_uEquipmentTaskState }}<br>
            当前设备故障码: &nbsp;{{ Net_equ_uEquipmentTaskError }}<br>
            当前设备动作步骤: {{ Net_equ_strEquipmentTaskMessage }}<br>
            当前动作轴id: {{ }}<br>
            当前动作轴位置: {{ }}<br>
            当前动作轴开关状态: {{ }}<br>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {Net_equ_uEquipmentTaskState,Net_equ_uEquipmentTaskID,Net_equ_uEquipmentTaskError,
  Net_equ_uEquipmentState,Net_equ_strEquipmentTaskMessage} from './sharedata.js'

const info_isExpanded = ref(false);

let info_wh = ref(400);
let info_top = ref(0);
let info_zIndexValue = ref(50);

const info_toggleSize = () => {
  info_isExpanded.value = true;
  info_zIndexValue.value = 100;
  info_wh.value = 600;

};
const info_toggleSizelev = () => {
  info_isExpanded.value = false;
  info_zIndexValue.value = 50;
  info_wh.value = 400;
};



</script>

<style>


.local {
  width: 300px;
  line-height: 40px;
  margin-left: 0px;
  position: fixed;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(239, 238, 238);
  text-shadow: 2px 2px 4px rgba(237, 233, 233, 0.5);
}

.local_expanded {
  width: 300px;
  line-height: 40px;
  margin-left: 0px;
  position: fixed;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(8, 8, 8);
  text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.5);
}


.info {
    width: 360px;
    height: 360px;
    color: aliceblue;
    position: absolute;
    top: 00px;
    left: 0px;
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

.info-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    width: 340px;
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

.info_expanded {
  opacity: 1;
  /* 取消透明度 */
  background-color: #066987cc;
  /* 修改框的颜色为红色 */
}
</style>