<template>
    <el-table :data="IOinputdata" style="width: 100%" class="IOinputdata">

        <el-table-column prop="key" label="⚠️ 输入点IO">
            <template #default="scope">
                <el-button type="text" @click="reedit(scope.$index)">{{ IOinputdata[scope.$index].key
                    }}</el-button>
            </template>
        </el-table-column>

        <el-table-column prop="name">
            <template #header>
                <el-button type="primary" @click="addNewRow">添加新数据</el-button>
            </template>
        </el-table-column>


        <el-table-column prop="config" label="输入点">
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
        <el-form ref="form" :model="newRow" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="newRow.key" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="key">
                <el-input v-model="newRow.name" placeholder="英文KEY"></el-input>
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
import { jsondata, IOinputdata } from '../common.js'
import IO from './IO.vue'
import { flag, newRow } from '../flag.js';
const dialogVisible = ref(false);
const addNewRow = () => {
    newRow.value.name = '';
    newRow.value.key = '';
    newRow.value.config.value = [1, 1, 1, 1, 1, 1];
    newRow.value.editingIndex = -1;
    console.log('addNewRow', newRow.value.config.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const reedit = (index) => {

    newRow.value.name = IOinputdata.value[index].name;
    newRow.value.key = IOinputdata.value[index].key;
    newRow.value.config.value = IOinputdata.value[index].config;
    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', newRow.value.config.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            IOinputdata.value[newRow.value.editingIndex].name = newRow.value.name;
            IOinputdata.value[newRow.value.editingIndex].key = newRow.value.key;
            if (newRow.value.config != undefined) {
                IOinputdata.value[newRow.value.editingIndex].config = newRow.value.config;
            }
            jsondata.value.IO.input = IOinputdata;
            console.log('handleAddRow', newRow.value.config);
            console.log('handleAddRow', IOinputdata.value[newRow.value.editingIndex].config);
        } else {
            // 新增模式下添加数据
            const newRowData = { ...newRow.value };
            IOinputdata.value.push(JSON.parse(JSON.stringify(newRowData)));
            jsondata.value.IO.input = IOinputdata;
            console.log('handleAddRow', newRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    IOinputdata.value.splice(index, 1);
};

</script>


<style scoped>
.expand-content {
    height: 1000px;
}
</style>
<style>
.IOinputdata .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>