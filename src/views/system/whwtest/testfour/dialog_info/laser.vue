<template>
    <el-dialog v-model="dialogVisible" title="激光头" custom-class="custom-dialog3">
        。。。
    </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import { raycaster,currentCoordinateIndex,parsedLogData } from '../sharedata.js'
import { defineExpose } from 'vue';

const dialogVisible = ref(false);


const handleMouseClicklaser = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        if (intersects[0].object.name === 'laser'
            || intersects[0].object.name === 'laser1' || intersects[0].object.name === 'laser2'
            || intersects[0].object.name === 'laser3' || intersects[0].object.name === 'laser4'
            || intersects[0].object.name === 'laser5' || intersects[0].object.name === 'laser6') {

            dialogVisible.value = true;
        } else {
            dialogVisible.value = false;

        }



    }



}

defineExpose({ handleMouseClicklaser });
</script>