<template>
    <div class="playorstop" v-show="!importflag" >播放暂停：<el-button :disabled="shouldPause" @click="togglePause"
        class="buttonstyle">{{ paused
        ?
        '继续' : '暂停'
            }}</el-button></div>

    <div class="event" v-show="!importflag">事件处理: <el-button :disabled="!shouldPause"  @click="resumeCarMovement" class="buttonstyle"
             >{{
        shouldPause ?
          '跳过'
          : '无事件' }}</el-button></div>




    <div class="replay" v-show="!importflag">重播：<el-button @click="restartCar" class="buttonstyle">重播</el-button>
    </div>

    <div class="cameractrl" v-show="!importflag">镜头控制：<el-button @click="toggleCameraFollow" class="buttonstyle">{{
        cameraFollow ? '取消跟随' :
            '跟随' }}</el-button></div>



</template>

<script setup>
import { ref } from 'vue'
import * as THREE from "three";
import { importflag } from './sharedata.js'
import {
    paused, shouldPause, currentCoordinateIndex, parsedLogData, parsedLogDatabak,
    cameraFollow,color
} from './sharedata.js'





//镜头跟随
const toggleCameraFollow = () => {
    cameraFollow.value = !cameraFollow.value;

    if (cameraFollow.value) {
        controls.enabled = false;
    } else {
        controls.enabled = true;
    }
};



//重播
const restartCar = () => {
    currentCoordinateIndex.value = 0;
    parsedLogData.value = [];
    parsedLogData.value = parsedLogDatabak.concat();
};


//暂停
const togglePause = () => {
    paused.value = !paused.value;

    //   if (paused.value) {
    //     pauseAnimation();
    //   } else {
    //     animateWheel();
    //   }


};

//事件跳过
const resumeCarMovement = () => {
    if (shouldPause.value) {

        const event = parsedLogData.value[currentCoordinateIndex.value].logJson.event.name;
        while (parsedLogData.value[currentCoordinateIndex.value].logJson.event.name === event) {
            if (currentCoordinateIndex.value === parsedLogData.value.length - 1) {
                break;
            }
            if (currentCoordinateIndex.value === 0) {
                break;
            }
            currentCoordinateIndex.value++;
        }

        color.value = 1;
        shouldPause.value = false;
    }
};


</script>

<style>
.replay {
    top: 20px;
    position: absolute;
    left: 470px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
}




.playorstop {
    top: 20px;
    position: absolute;
    left: 10px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
}



.event {
    top: 20px;
    position: absolute;
    left: 240px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
}


.cameractrl {
    top: 80px;
    position: absolute;
    left: 10px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
}

.buttonstyle {
  background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7; /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  background-position: top left;

}

.buttonstyle:disabled {
    background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7; /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  background-position: top left;
}
</style>