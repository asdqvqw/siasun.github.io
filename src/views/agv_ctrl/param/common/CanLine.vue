<template>
    <div>
        <el-checkbox-group v-model="checkList" @change="statusChange">
            <el-checkbox label="1">CAN1</el-checkbox>
            <el-checkbox label="2">CAN2</el-checkbox>
            <el-checkbox label="3">CAN3</el-checkbox>
        </el-checkbox-group>

        <div v-if="cannumber1">
            <CanLineone />
        </div>
        <div v-if="cannumber2">
            <CanLinetwo />
        </div>
        <div v-if="cannumber3">
            <CanLinethree />
        </div>
        
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import CanLineone from './CanLine/CanLineone/CanLineone.vue';
import CanLinetwo from './CanLine/CanLinetwo/CanLinetwo.vue';
import CanLinethree from './CanLine/CanLinethree/CanLinethree.vue';


const checkList = ref([]);
const cannumber1 = ref(null);
const cannumber2 = ref(null);
const cannumber3 = ref(null);
const statusChange = () => {
    if (checkList.value.length > 1) {
        checkList.value.splice(0, 1);
    }
    if (checkList.value[0] === '1') {
        cannumber1.value = true;
        cannumber2.value = false;
        cannumber3.value = false;
    } else if (checkList.value[0] === '2') {
        cannumber2.value = true;
        cannumber3.value = false;
        cannumber1.value = false;
    } else if (checkList.value[0] === '3') {
        cannumber3.value = true;
        cannumber1.value = false;
        cannumber2.value = false;
    } else {
        cannumber1.value = false;
        cannumber2.value = false;
        cannumber3.value = false;
    }
};
</script>
