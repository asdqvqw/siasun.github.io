<template>
    <el-dialog v-model="dialogVisible2" title="屏幕2" custom-class="custom-dialog2" @opened="openDialog">
        <Echart></Echart>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="屏幕" custom-class="custom-dialog3">
        屏幕型号:{{  }}<br>
        通讯类型:{{  }}<br>
        手控设备信息:{{  }}<br>
    </el-dialog>


</template>

<script setup>
import Echart from '../charts/Ele_chart.vue'
import { ref } from 'vue'
import { raycaster,currentCoordinateIndex,parsedLogData } from '../sharedata.js'
import { defineExpose } from 'vue';

const dialogVisible = ref(false);
const dialogVisible2 = ref(false);


const handleMouseClick = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        console.log('modelname:', intersects[0].object.name)
        if (intersects[0].object.name === 'screen'
            || intersects[0].object.name === 'screen1' || intersects[0].object.name === 'screen2'
            || intersects[0].object.name === 'screen3' || intersects[0].object.name === 'screen4') {
            dialogVisible2.value = true;
            dialogVisible.value = true;
        } else {
            dialogVisible.value = false;
            dialogVisible2.value = false;
        }
    }



}

defineExpose({ handleMouseClick });
</script>






<style>
 .custom-dialog {
     background-image: url('./img/1-1-bg.png');
     background-color: #001034cb;
     /* 修改弹窗背景色 */
     animation: dialogSlideIn 0.3s ease-out forwards;
     width: 40%;
     height: 42.5%;
     right: 0%;
     bottom: -10%;
     background-size: 100%;
     background-position: top left;
     overflow: auto;
     transform-origin: top left;
 }

 @keyframes dialogSlideIn {
     from {
         opacity: 0;
         transform: translateX(100%);
     }

     to {
         opacity: 1;
         transform: translateX(0);
     }
 }

 .custom-dialog .el-dialog__body {
     color: #f0e7e7;
 }

 .custom-dialog .el-dialog__header {
     background-image: url('./img/header-bg.png');
     background-size: 100%;
     background-color: #eaeaea00;
     background-position: center;
     height: 10%;
 }

 .custom-dialog .el-dialog__header .el-dialog__title {
     color: #ddb4b4;
     text-align: center;
     margin: 0 auto;
 }
</style>








<style>
.custom-dialog2 {
    background-image: url('./img/1-1-bg.png');
    background-color: #001034cb;
    /* 修改弹窗背景色 */
    animation: dialogSlideIn 1s ease-out forwards;
    width: 50%;
    height: 52.5%;
    right: 10%;
    bottom: -10%;
    background-size: 100%;
    background-position: top left;
    overflow: auto;
    transform-origin: top left;
    transform: scale(0) translateX(100%);
}


@keyframes dialogSlideIn {
    from {
        opacity: 0;
        transform: scale(0);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-dialog2 .el-dialog__body {
    color: #f0e7e7;

}

.custom-dialog2 .el-dialog__header {
    background-image: url('./img/header-bg.png');
    background-size: 100%;
    background-color: #eaeaea00;
    background-position: center;
    height: 10%;
}

.custom-dialog2 .el-dialog__header .el-dialog__title {
    color: #ddb4b4;
    text-align: center;
    margin: 0 auto;
}
</style>

<style>
.custom-dialog3 {
    background-image: url('./img/1-1-bg.png');
    background-color: #001034cb;
    /* 修改弹窗背景色 */
    animation: dialogPopUp 0.3s ease-out forwards;
    width: 40%;
    height: 42.5%;
    position: fixed;
    right: 10%;
    bottom: 10%;
    background-size: 100%;
    background-position: top left;
    overflow: auto;
    transform-origin: bottom right;
    opacity: 0;
    transform: scale(0) translateX(100%);
}

@keyframes dialogPopUp {
    from {
        opacity: 0;
        transform: scale(0);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-dialog3 .el-dialog__body {
    color: #f0e7e7;
}

.custom-dialog3 .el-dialog__header {
    background-image: url('./img/header-bg.png');
    background-size: 100%;
    background-color: #eaeaea00;
    background-position: center;
    height: 10%;
}

.custom-dialog3 .el-dialog__header .el-dialog__title {
    color: #ddb4b4;
    text-align: center;
    margin: 0 auto;
}
</style>


