<template>

    <el-form ref="form" label-width="180px">
        
        <el-form-item label="CAN:">
            <el-button type="primary" @click="handlecheckCAN1">
                查看CAN1
            </el-button>
            <el-dialog v-model="checkcanone" title="CAN1设备" :visible="checkcanone" width="800px"
                @close="checkcanone = false">
                <DefinScrollbar height="100%" :showUpBt="true">
                    <canone></canone>
                </DefinScrollbar>
            </el-dialog> &nbsp;
            <el-button type="primary" @click="handlecheckCAN2">
                查看CAN2
            </el-button>
            <el-dialog v-model="checkcantwo" title="CAN2设备" :visible="checkcantwo" width="800px"
                @close="checkcantwo = false">
                <DefinScrollbar height="100%" :showUpBt="true">
                    <cantwo></cantwo>
                </DefinScrollbar>
            </el-dialog> &nbsp;
            <el-button type="primary" @click="handlecheckCAN3">
                查看CAN3
            </el-button>
            <el-dialog v-model="checkcanthree" title="CAN3设备" :visible="checkcanthree" width="800px"
                @close="checkcanthree = false">
                <DefinScrollbar height="100%" :showUpBt="true">
                    <canthree></canthree>
                </DefinScrollbar>
            </el-dialog> &nbsp;
        </el-form-item>

        <el-form-item label="网络：">
            <el-table :data="jsondata.network" style="width: 90%" class="custom-table">
                <el-table-column prop="name" label=""></el-table-column>
                <el-table-column prop="value" label="地址"></el-table-column>

            </el-table>
        </el-form-item>

        <el-form-item label="已开启功能：">
            <el-table :data="jsondata.function.filter(item => item.value === true)" style="width: 90%"
                class="custom-table">
                <el-table-column prop="name" label=""></el-table-column>
                <el-table-column prop="des" label=""></el-table-column>
            </el-table>
        </el-form-item>


 
    </el-form>


</template>

<script setup>
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { ref } from 'vue'
import canone from './checkcan/canone.vue'
import cantwo from './checkcan/cantwo.vue'
import canthree from './checkcan/canthree.vue'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const checkcanone = ref(false)
const checkcantwo = ref(false)
const checkcanthree = ref(false)

const handlecheckCAN1 = () => {
    checkcanone.value = true;
}
const handlecheckCAN2 = () => {
    checkcantwo.value = true;
}
const handlecheckCAN3 = () => {
    checkcanthree.value = true;
}
</script>


<style>
.custom-table {
    border: 2px solid #3e6bd4;
    /* 添加表格边框 */

}

.custom-table .el-table__header-wrapper {
    background-color: #2bcba6;
    /* 表头背景色 */
}

.custom-table .el-table__header th {
    color: #462c1a;
    /* 表头文字颜色 */
    font-weight: bold;
    padding: 12px 16px;
}

.custom-table .el-table__body td {
    padding: 10px 16px;
    /* 单元格内边距 */
}

.custom-table .el-table__body tr:nth-child(2n) {
    background-color: #baccebbb;
    /* 隔行背景色 */
}
</style>