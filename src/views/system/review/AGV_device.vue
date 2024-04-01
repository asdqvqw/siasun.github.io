<template>

  <el-button class="EXButtonDEV" @click="clickbutton">车体设备</el-button>
  <el-dialog v-model="dialogVisible" title="车体设备" custom-class="custom-dialog" >
    当前设备状态：{{ Net_equ_uEquipmentState }}<br>
    当前设备任务号：{{ Net_equ_uEquipmentTaskID }}<br>
    当前设备任务状态：{{ Net_equ_uEquipmentTaskState }}<br>
    当前设备故障码: &nbsp;{{ Net_equ_uEquipmentTaskError }}<br>
    当前设备动作步骤: {{ Net_equ_strEquipmentTaskMessage }}<br>
    当前动作轴id: {{ }}<br>
    当前动作轴位置: {{ }}<br>
    当前动作轴开关状态: {{ }}<br>
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import {
  Net_equ_uEquipmentTaskState, Net_equ_uEquipmentTaskID, Net_equ_uEquipmentTaskError,
  Net_equ_uEquipmentState, Net_equ_strEquipmentTaskMessage
} from './sharedata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};


</script>

<style>
.EXButtonDEV {
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
  top: 240px;
  /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}


</style>