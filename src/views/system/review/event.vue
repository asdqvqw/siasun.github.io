<template>

    <el-button class="EVENTButton" @click="clickbutton" v-show="!importflag">事件信息</el-button>

    <el-dialog v-model="dialogVisible" title="事件信息" custom-class="custom-dialog" :modal="false" draggable
        :close-on-click-modal="false" modal-class="kk-dialog-class">
        发送时间：{{ parsedLogData[currentCoordinateIndex].logDateTime }}<br>
        事件：{{ parsedLogData[currentCoordinateIndex].logJson.event.name }}<br>
        原因：{{ parsedLogData[currentCoordinateIndex].logJson.event.detail }}<br>
        AGV建议:{{ parsedLogData[currentCoordinateIndex].logJson.event.advise }}<br>
    </el-dialog>


</template>



<script setup>
import { ref } from 'vue'

import {
    event_name, event_detail, event_advise, parsedLogData, currentCoordinateIndex
} from './sharedata.js'

const asd = ref(0);
const dialogVisible = ref(false);
const clickbutton = () => {
    dialogVisible.value = true;
};



</script>

<style>
.EVENTButton {
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
    top: 120px;
    /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}
</style>