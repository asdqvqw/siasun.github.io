<template>

    <div class="info-text" v-if="infoTextVisible" :style="{ left: infoTextX + 'px', top: infoTextY + 'px' }">
        {{ infoText }}<br>
        车体软件版本：{{ }}<br>
        车号：{{ }}<br>
        模式：{{ agvmode }}<br>
        事件：{{ event_name }}<br>
        原因：{{ event_detail }}<br>
        建议：{{ event_advise }}<br>
    </div>
</template>

<script setup>
import {
    infoTextVisible, infoTextX, infoTextY, agvmode,
    event_name, event_detail, event_advise
} from './sharedata.js'
let infoText = 'AGV状态'
</script>

<style>
.info-text {
    font-size: 10px;
    position: fixed;
    padding: 7px;
    color: yellow;
    background-color: rgb(87, 84, 84);
    border-radius: 10px;
    overflow: hidden;
    border: none;
    text-shadow: 0 0 3px blue;
}
</style>