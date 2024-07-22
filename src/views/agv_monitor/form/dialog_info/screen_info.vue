
<script setup>

import { ref, computed, nextTick } from 'vue'
import { raycaster, parsedLogData } from '../commondata.js'
import { defineExpose } from 'vue';

const dialogVisible = ref(false);



const handleMouseClick = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        console.log('modelname:', intersects[0].object.name)
        if (intersects[0].object.name === 'screen'
            || intersects[0].object.name === 'screen1' || intersects[0].object.name === 'screen2'
            || intersects[0].object.name === 'screen3' || intersects[0].object.name === 'screen4') {

            dialogVisible.value = true;

        } else {
            dialogVisible.value = false;

        }
    }



}

defineExpose({ handleMouseClick });

const pingmu = computed(() => {

return [
    {
        key: '屏幕型号', value: '迪文屏幕',
        key2: '通讯类型', value2: '串口通讯',
        key3: '手控设备信息', value3: '无'
    }
]
});
</script>


<template>

    <el-dialog v-model="dialogVisible" title="屏幕" custom-class="ele-dialog" :modal="false">
        <br>
        <el-table :data="pingmu" border style="width: 90%; margin-left: 5%;">
            <el-table-column prop="key" label="设备信息"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
            <el-table-column prop="key3"></el-table-column>
            <el-table-column prop="value3"></el-table-column>
        </el-table>

    </el-dialog>


</template>
