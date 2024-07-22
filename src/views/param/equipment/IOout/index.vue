<template>
    <el-table :data="IOoutputdata" style="width: 100%" class="IOoutputdata">

        <el-table-column prop="key" label="⚠️ 输出点IO">
            <template #default="scope">
                <el-button type="text" @click="reedit(scope.$index)">{{ IOoutputdata[scope.$index].key
                    }}</el-button>
            </template>
        </el-table-column>

        <el-table-column prop="name">
            <template #header>
                <el-button type="primary" @click="addNewRow">添加新数据</el-button>
            </template>
        </el-table-column>


        <el-table-column prop="config" label="输出点">
            <template #default="scope">
                <h4>
                    {{ scope.row.config }}
                </h4>

            </template>
        </el-table-column>

        <el-table-column label="操作">

            <template #default="scope">
                <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-dialog title="添加数据" v-model="dialogVisible" :visible="dialogVisible" width="900px" :close-on-click-modal="false"
        class="edit-data-dialog" style="height: 55%;">
        <br>
        <el-form ref="form" :model="newoutRow" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="newoutRow.key" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="key">
                <el-input v-model="newoutRow.name" placeholder="英文KEY"></el-input>
            </el-form-item>
            <el-form-item label="IO">
                <IO></IO>
            </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" style="margin-left: 75%;">取 消</el-button>
            <el-button type="primary" @click="handleAddRow">确定</el-button>

        </div>

    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata, IOoutputdata } from '../common.js'
import IO from './IO.vue'
import { flag2, newoutRow } from '../flag.js';
const dialogVisible = ref(false);
const addNewRow = () => {
    newoutRow.value.name = '';
    newoutRow.value.key = '';
    newoutRow.value.config.value = [1, 1, 1, 1, 1, 1];
    newoutRow.value.editingIndex = -1;
    console.log('addnewoutRow', newoutRow.value.config.value)
    dialogVisible.value = true;
    flag2.value = !flag2.value;
};

const reedit = (index) => {

    newoutRow.value.name = IOoutputdata.value[index].name;
    newoutRow.value.key = IOoutputdata.value[index].key;
    newoutRow.value.config.value = IOoutputdata.value[index].config;
    newoutRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', newoutRow.value.config.value)
    dialogVisible.value = true;
    flag2.value = !flag2.value;
};

const handleAddRow = () => {
    if (newoutRow.value.name) {
        if (newoutRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            IOoutputdata.value[newoutRow.value.editingIndex].name = newoutRow.value.name;
            IOoutputdata.value[newoutRow.value.editingIndex].key = newoutRow.value.key;
            if (newoutRow.value.config != undefined) {
                IOoutputdata.value[newoutRow.value.editingIndex].config = newoutRow.value.config;
            }
            jsondata.value.IO.output = IOoutputdata;
            console.log('handleAddRow', newoutRow.value.config);
            console.log('handleAddRow', IOoutputdata.value[newoutRow.value.editingIndex].config);
        } else {
            // 新增模式下添加数据
            const newoutRowData = { ...newoutRow.value };
            IOoutputdata.value.push(JSON.parse(JSON.stringify(newoutRowData)));
            jsondata.value.IO.output = IOoutputdata;
            console.log('handleAddRow', newoutRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    IOoutputdata.value.splice(index, 1);
};

</script>


<style scoped>
.expand-content {
    height: 1000px;
}
</style>
<style>
.IOoutputdata .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>