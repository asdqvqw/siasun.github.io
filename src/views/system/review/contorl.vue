<template>
    <div  v-show="!importflag"><button  :disabled="shouldPause" @click="togglePause"
        :class="{'playbuttonstyle': paused, 'stopbuttonstyle': !paused}" :title="paused ? '播放' : (shouldPause ? '请处理事件' : '暂停')">
            </button>
        </div>

    <div  v-show="!importflag"><button :disabled="!shouldPause" @click="resumeCarMovement"
            class="eventbuttonstyle" :title="shouldPause ? '事件跳过' : '无事件'"></button></div>


    <div  v-show="!importflag"><button :disabled="shouldPause" @click="restartCar" class="replaybuttonstyle" title='重播'></button>
    </div>

    <div  v-show="!importflag"><button @click="toggleCameraFollow" :class="{'genbuttonstyle':cameraFollow
    ,'bugenbuttonstyle':!cameraFollow}" title='镜头跟随'></button></div>



</template>

<script setup>
import { ref } from 'vue'
import * as THREE from "three";
import { importflag } from './sharedata.js'
import {
    paused, shouldPause, currentCoordinateIndex, parsedLogData, parsedLogDatabak,
    cameraFollow, color
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

.genbuttonstyle {
    background-image: url('./img/gensuizhong.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    right: 32.5%;
}
.bugenbuttonstyle {
    background-image: url('./img/gen.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    right: 32.5%;
}

.replaybuttonstyle {
    background-image: url('./img/chongbo.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    left: 32.5%;
}

.replaybuttonstyle:disabled {
    background-image: url('./img/chongbo.png');
    background-position: center;
    background-color: #f5eded96;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    left: 32.5%;
}
.eventbuttonstyle {
    background-image: url('./img/tiaoguo.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    right: 38%;
}

.eventbuttonstyle:disabled {
    background-image: url('./img/tiaoguo.png');
    background-position: center;
    background-color: #f5eded96;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    width: 50px; /* 根据你的需求设置按钮的宽度 */
    height:50px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
    /* top: 20px; */
    position: absolute;
    top: 52%;
    right: 36.5%;
}

.playbuttonstyle {
    background-image: url('./img/bofang.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    /* position: absolute; */
    margin-top:50%;
    width: 80px; /* 根据你的需求设置按钮的宽度 */
    height:80px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
}
.stopbuttonstyle {
    background-image: url('./img/zanting.png');
    background-position: center;
    background-color: #12b2de3e;
    color: aliceblue;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    margin-top:50%;
    width: 80px; /* 根据你的需求设置按钮的宽度 */
    height: 80px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
}
.stopbuttonstyle:disabled {
    background-image: url('./img/zanting.png');
    background-position: center;
    background-color: #f5eded96;
    opacity: 0.7;
    /* 设置透明度的值，可以根据需求调整 */
    background-size: 100%;
    margin-top:50%;
    width: 75px; /* 根据你的需求设置按钮的宽度 */
    height: 75px; /* 根据你的需求设置按钮的高度 */
    border-radius: 50%;
}

</style>