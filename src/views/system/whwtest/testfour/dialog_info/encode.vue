<template>
    <el-dialog v-model="dialogVisible" title="二维码" custom-class="custom-dialog3">
        驱动内坐标X:{{  }}<br>
        驱动内坐标Y:{{  }}<br>
        电机减速比:{{  }}<br>
        车轮直径:{{  }}<br>
        码盘线束:{{  }}<br>
        最大转速:{{  }}<br>
    </el-dialog>


</template>

<script setup>
import { ref } from 'vue'
import { raycaster,currentCoordinateIndex,parsedLogData } from '../sharedata.js'
import { defineExpose } from 'vue';

const dialogVisible = ref(false);



const handleMouseClickencode = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        if (intersects[0].object.name === 'rightwheel'
            || intersects[0].object.name === 'rightwheel1' || intersects[0].object.name === 'rightwheel2'
            ) {

            dialogVisible.value = true;
        } else {
            dialogVisible.value = false;

        }

    }



}

defineExpose({ handleMouseClickencode });
</script>