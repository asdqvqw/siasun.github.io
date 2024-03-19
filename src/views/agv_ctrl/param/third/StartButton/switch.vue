<template>
    <div>
        <el-table :data="tableDataCrtlswitch" style="width: 100%">
            <el-table-column prop="name" label="按钮名称">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlswitch[scope.$index].name
                    }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>

        <el-button type="primary" @click="addNewRow">添加开关</el-button>


        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="900px"
            :close-on-click-modal="false" class="edit-data-dialog">

            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="按钮名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="IO">
                    <IO ></IO>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleAddRow">确定</el-button>

            </div>

        </el-dialog>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import IO from './IO.vue'
import { flag,newRow } from '../flag.js';
import { tableDataCrtlswitch } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'

const title = '开关';



const dialogVisible = ref(false);

const addNewRow = () => {
    newRow.value.name = '';
    newRow.value.value.value = [1,1,1,1,1,1];
    newRow.value.editingIndex = -1;
    console.log('addNewRow',newRow.value.value.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const reedit = (index) => {
    
    newRow.value.name = tableDataCrtlswitch.value[index].name;
    newRow.value.value.value = tableDataCrtlswitch.value[index].value;
    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit',newRow.value.value.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlswitch.value[newRow.value.editingIndex].name = newRow.value.name;
            if(newRow.value.value != undefined)
            {
                tableDataCrtlswitch.value[newRow.value.editingIndex].value = newRow.value.value;
            }
            jsondata.value.switch.StartButton = tableDataCrtlswitch;
            console.log('handleAddRow',newRow.value.value);
            console.log('handleAddRow',tableDataCrtlswitch.value[newRow.value.editingIndex].value);
        } else {
            // 新增模式下添加数据
            const newRowData = { ...newRow.value };
            tableDataCrtlswitch.value.push(JSON.parse(JSON.stringify(newRowData)));
            jsondata.value.switch.StartButton = tableDataCrtlswitch;
            console.log('handleAddRow',newRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};
// const changedata = () => {

//     tableDataCrtlswitch.value[newRow.value.editingIndex].name = newRow.value.name;
//     tableDataCrtlswitch.value[newRow.value.editingIndex].value = newRow.value.value.value;
//     console.log(tableDataCrtlswitch.value[newRow.value.editingIndex].value);
//     console.log(newRow.value.value.value);

// };


const deleteRow = (index) => {
    tableDataCrtlswitch.value.splice(index, 1);
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