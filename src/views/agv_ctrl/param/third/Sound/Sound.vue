<template>
    <div>
        <el-table :data="tableDataCrtlSound" style="width: 100%" class="tableDataCrtlSound">
            <el-table-column prop="name" label="⚠️ 扬声器">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlSound[scope.$index].name
                        }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="">

                <template #header>
                    <el-button type="primary" @click="addNewRow">添加</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">

                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>




        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="1000px"
            :close-on-click-modal="false" class="edit-data-dialog">
            <br>
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="IO">
                    <IO></IO>
                </el-form-item>

                <el-form-item label="开启时间">
                    <el-input v-model.number="newRow.ontime" placeholder="开启时间(ms)" type="number"
                        style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item label="关闭时间">
                    <el-input v-model.number="newRow.offtime" placeholder="关闭时间(ms)" type="number"
                        style="width: 50%"></el-input>
                </el-form-item>


                <!-- {{ tableDataCrtlSound }} -->

            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" style="margin-left: 75%;">取 消</el-button>
                <el-button type="primary" @click="handleAddRow">确定</el-button>
                
            </div>
            <br>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import IO from './IO.vue'

import { flag, newRow } from './sounddata.js';
import { tableDataCrtlSound } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'


const title = '声音';



const dialogVisible = ref(false);


const addNewRow = () => {
    newRow.value.name = 'No name';
    newRow.value.value.value = [1, 1, 1, 1, 1];
    newRow.value.editingIndex = -1;
    newRow.value.ontime = 0;
    newRow.value.offtime = 0;


    dialogVisible.value = true;
    flag.value = !flag.value;
};

const reedit = (index) => {

    newRow.value.name = tableDataCrtlSound.value[index].name;
    newRow.value.ontime = tableDataCrtlSound.value[index].ontime;
    newRow.value.offtime = tableDataCrtlSound.value[index].offtime;


    newRow.value.value.value = tableDataCrtlSound.value[index].value;

    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', index)
    console.log('reedit', tableDataCrtlSound.value[index].value)
    console.log('reedit', newRow.value.value.value)
    flag.value = !flag.value;
    dialogVisible.value = true;

};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlSound.value[newRow.value.editingIndex].name = newRow.value.name;
            tableDataCrtlSound.value[newRow.value.editingIndex].ontime = newRow.value.ontime;
            tableDataCrtlSound.value[newRow.value.editingIndex].offtime = newRow.value.offtime;


            if (newRow.value.value != undefined) {
                tableDataCrtlSound.value[newRow.value.editingIndex].value = newRow.value.value;
            }

            jsondata.value.Sound = tableDataCrtlSound;

        } else {
            // 新增模式下添加数据
            const newRowData = { ...newRow.value };

            tableDataCrtlSound.value.push(JSON.parse(JSON.stringify(newRowData)));
            jsondata.value.Sound = tableDataCrtlSound;
            console.log('handleAddRow', newRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    tableDataCrtlSound.value.splice(index, 1);
};
</script>


<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>


<style>
.tableDataCrtlSound .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>