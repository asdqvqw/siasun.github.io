<template>
    <div>
        <el-table :data="tableDataCrtlswitchEmg" style="width: 100%" class="tableDataCrtlswitchEmg">
            <el-table-column prop="name" label="🔖 急停开关">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlswitchEmg[scope.$index].name
                        }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="">
                <template  #header>
                    <el-button type="primary" @click="addnewRowEmg">添加</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作">

                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       




        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="900px"
            :close-on-click-modal="false" class="edit-data-dialog" style="height: 55%;">
            <br>
            <el-form ref="form" :model="newRowEmg" label-width="80px">
                <el-form-item label="按钮名称">
                    <el-input v-model="newRowEmg.name" placeholder="请输入名称"></el-input>
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import IO from './IO.vue'
import { flagEmg, newRowEmg } from '../flag.js';
import { tableDataCrtlswitchEmg } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'

const title = '开关';



const dialogVisible = ref(false);

const addnewRowEmg = () => {
    newRowEmg.value.name = '';
    newRowEmg.value.value.value = [1, 1, 1, 1, 1, 1];
    newRowEmg.value.editingIndex = -1;
    console.log('addnewRowEmg', newRowEmg.value.value.value)
    dialogVisible.value = true;
    flagEmg.value = !flagEmg.value;
};

const reedit = (index) => {

    newRowEmg.value.name = tableDataCrtlswitchEmg.value[index].name;
    newRowEmg.value.value.value = tableDataCrtlswitchEmg.value[index].value;
    newRowEmg.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', newRowEmg.value.value.value)
    dialogVisible.value = true;
    flagEmg.value = !flagEmg.value;
};

const handleAddRow = () => {
    if (newRowEmg.value.name) {
        if (newRowEmg.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].name = newRowEmg.value.name;
            if (newRowEmg.value.value != undefined) {
                tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].value = newRowEmg.value.value;
            }
            jsondata.value.switch.EmgButton = tableDataCrtlswitchEmg;
            console.log('handleAddRow', newRowEmg.value.value);
            console.log('handleAddRow', tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].value);
        } else {
            // 新增模式下添加数据
            const newRowEmgData = { ...newRowEmg.value };
            tableDataCrtlswitchEmg.value.push(JSON.parse(JSON.stringify(newRowEmgData)));
            jsondata.value.switch.EmgButton = tableDataCrtlswitchEmg;
            console.log('handleAddRow', newRowEmgData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};
// const changedata = () => {

//     tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].name = newRowEmg.value.name;
//     tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].value = newRowEmg.value.value.value;
//     console.log(tableDataCrtlswitchEmg.value[newRowEmg.value.editingIndex].value);
//     console.log(newRowEmg.value.value.value);

// };


const deleteRow = (index) => {
    tableDataCrtlswitchEmg.value.splice(index, 1);
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
.tableDataCrtlswitchEmg .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>