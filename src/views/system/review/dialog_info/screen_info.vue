<template>
    <el-dialog v-model="dialogVisible2" title="屏幕2" custom-class="custom-dialog2" @opened="openDialog"  :modal="false"
    >
        <Echart></Echart>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="屏幕" custom-class="custom-dialog3"  :modal="false"
    >
        屏幕型号:{{  }}<br>
        通讯类型:{{  }}<br>
        手控设备信息:{{  }}<br>
    </el-dialog>


</template>

<script setup>
import Echart from '../charts/Ele_chart.vue'
import { ref ,onMounted ,nextTick } from 'vue'
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









