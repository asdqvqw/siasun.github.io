<template>

  <el-button class="EXButton" @click="clickbutton" v-show="!importflag">控制台</el-button>

  <el-dialog v-model="dialogVisible" title="控制台" custom-class="custom-dialog" :modal="false" draggable 
  :close-on-click-modal="false" modal-class="kk-dialog-class">

    开始节点：{{ Net_Info_uFromNode }}<br>
    目标节点：{{ Net_Info_uToNode }}<br>
    <br>
    当前进度量：{{ Net_Info_sProgress }}<br>
    控制台设置速度：{{ Net_Info_CurSpeed }}<br>
    <br>
    货物状态：{{ Net_Info_usCargoState }}<br>
    工作状态：{{ Net_Info_WorkState }}<br>
    <br>
    1级故障码:{{ Net_Info_EventState }}<br>
    2级故障码:{{ Net_Info_EventDetail }}<br>
    <br>
    电池状态：{{ Net_Info_usBatterState }}<br>
    任务状态：{{ Net_Info_TaskState }}<br>
    任务号：{{ Net_Info_TaskID }}<br>
    动作key：{{ Net_Info_Key }}<br>
    heading:{{ Net_Info_Head }}<br>
    动作码:{{ Net_Info_uTaskcode }}<br>
    
  </el-dialog>


</template>



<script setup>
import { ref } from 'vue'

import {
  Net_Info_uFromNode, Net_Info_uToNode, Net_Info_sProgress, Net_Info_CurSpeed, Net_Info_usCargoState, Net_Info_WorkState,
  Net_Info_EventState, Net_Info_EventDetail, Net_Info_usBatterState, Net_Info_TaskState, Net_Info_TaskID, Net_Info_Key,
  Net_Info_Head,importflag,Net_Info_uTaskcode
} from './sharedata.js'


const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};

</script>

<style>
.EXButton {
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
  top: 360px;
  /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}


</style>