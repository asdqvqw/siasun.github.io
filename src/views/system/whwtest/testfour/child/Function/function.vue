<template>
    <hr v-if="showTable" class="divider">

    <div v-if="showTable">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="eg" label="说明"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-select v-model="scope.row.status" @change="handleStatusChange(scope.row)">
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="禁用" value="禁用"></el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { jsondata } from '../../common/commondata.js'
import { tableData } from '../../common/commondata.js'
import { showTable } from '../../common/commondata.js'

const handleStatusChange = (row) => {
  console.log(`状态改变：${row.name} - ${row.status}`);
  if (row.name === '看门狗功能') {
    jsondata.value.WatchDog = row.status === '启用';
  } else if (row.name === '铁电存储功能') {
    jsondata.value.TSave = row.status === '启用';
  } else if (row.name === '通讯协议相关') {
    jsondata.value.TongXun = row.status === '启用';
  }
};


</script>

<style scoped>
.divider {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}
</style>