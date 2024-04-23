<template>

    <el-dialog v-model="dialogVisible" title="右轮" custom-class="ele-dialog" :modal="false">
        <br>
        <el-table :data="chelun" border style="width: 90%; margin-left: 5%;">
            <el-table-column prop="key" label="设备信息"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
        </el-table>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="左轮" custom-class="ele-dialog" :modal="false">
        <br>
        <el-table :data="chelun" border style="width: 90%; margin-left: 5%;">
            <el-table-column prop="key" label="设备信息"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { raycaster, parsedLogData } from '../commondata.js'
import { defineExpose } from 'vue';

const dialogVisible = ref(false);
const dialogVisible2 = ref(false);


const handleMouseClickwheel = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        if (intersects[0].object.name === 'rightwheel'
            || intersects[0].object.name === 'rightwheel1' || intersects[0].object.name === 'rightwheel2'
        ) {

            dialogVisible.value = true;
        } else {
            dialogVisible.value = false;

        }

        if (intersects[0].object.name === 'leftwheel'
            || intersects[0].object.name === 'leftwheel1' || intersects[0].object.name === 'leftwheel2'
        ) {

            dialogVisible2.value = true;
        } else {
            dialogVisible2.value = false;

        }


    }



}

defineExpose({ handleMouseClickwheel });

const chelun = computed(() => {

    return [
        {
            key: '驱动内坐标X', value: 0,
            key2: '驱动内坐标Y', value2: 0
        },
        {
            key: '电机减速比', value: 0,
            key2: '车轮直径', value2: 0
        },
        {
            key: '码盘线束', value: 0,
            key2: '最大转速', value2: 0
        }
    ]
});

</script>
