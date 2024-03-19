<template>

    <el-form ref="form" label-width="180px">
        <br>
        <el-form-item label="canpos:">
            <el-table :data="jsondata.can3.can_pos" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_pos编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item label="canopen:">
            <el-table :data="jsondata.can3.can_open" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_open编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
                <el-table-column prop="2" label="伺服类型">
                    <template #default="scope">
                        <span v-if="scope.row[2] === 0">Elmo伺服</span>
                        <span v-else-if="scope.row[2] === 1">步科伺服</span>
                        <span v-else-if="scope.row[2] === 2">Motec伺服</span>
                        <span v-else-if="scope.row[2] === 3">AMC伺服</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        
        <el-form-item label="惯导:">
            <el-table :data="jsondata.can3.can_guide" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_guide编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="锂电池:">
            <el-table :data="jsondata.can3.can_BMS" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_BMS编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="IO:">
            <el-table :data="jsondata.can3.can_io" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_io编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="手控盒:">
            <el-table :data="jsondata.can3.can_manual" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_manual编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="RFID:">
            <el-table :data="jsondata.can3.can_rfid" style="width: 90%" class="custom-table">
                <el-table-column prop="0" label="can_rfid编号"></el-table-column>
                <el-table-column prop="1" label="can通讯ID号"></el-table-column>
            </el-table>
        </el-form-item>
        <br>
    </el-form>


</template>

<script setup>
import { jsondata } from '@/views/system/whwtest/testone/common/commondata.js'
import { ref } from 'vue'

</script>


<style>
.custom-table {
    margin-top: 3px;
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