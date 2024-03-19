<template>
    <div>
        <el-table :data="tableDataCrtlRelay" style="width: 100%">
            <el-table-column prop="name" label="">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlRelay[scope.$index].name
                        }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="">

                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>

        <el-button type="primary" @click="addNewRow">添加</el-button>


        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="1000px"
            :close-on-click-modal="false" class="edit-data-dialog">

            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>

                
<!-- {{ tableDataCrtlRelay }} -->

            </el-form>


            &nbsp;
            <el-button @click="handlestop1input" type="primary">输入点</el-button>
            <el-dialog :title="titleinput" v-model="stop1input" :visible="stop1input" width="600px"
                :close-on-click-modal="false" class="edit-data-dialog">
                <div>
                    <IO2 :diver="newRow.input"></IO2>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="stop1input = false">取 消</el-button>
                    <el-button @click="handlestop1inputQ">确定</el-button>
                </div>
            </el-dialog>&nbsp;

            <el-button @click="handlestop1output" type="primary">输出点</el-button>
            <el-dialog :title="titleoutput" v-model="stop1output" :visible="stop1output" width="600px"
                :close-on-click-modal="false" class="edit-data-dialog">
                <div>
                    <IO2 :diver="newRow.output"></IO2>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="stop1output = false">取 消</el-button>
                    <el-button @click="handlestop1outputQ">确定</el-button>
                </div>
            </el-dialog>&nbsp;



            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleAddRow">确定</el-button>

            </div>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import IO2 from './IOinoutPut.vue'

import { flag2, newRow } from './relaydata.js';
import { tableDataCrtlRelay } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
const stop1input = ref(false);
const stop1output = ref(false);

const titleinput = '输入点';
const titleoutput = '输出点';
const title = '继电器';



const dialogVisible = ref(false);

const handlestop1output = () => {
    flag2.value = !flag2.value;
    stop1output.value = true;
};

const handlestop1outputQ = () => {
    stop1output.value = false;
};


const handlestop1input = () => {
    flag2.value = !flag2.value;
    stop1input.value = true;
};

const handlestop1inputQ = () => {
    stop1input.value = false;
};

const addNewRow = () => {
    newRow.value.name = 'No name';
    newRow.value.input = [];
    newRow.value.output = [];

    newRow.value.editingIndex = -1;
    dialogVisible.value = true;

};

const reedit = (index) => {

    newRow.value.name = tableDataCrtlRelay.value[index].name;

    if (tableDataCrtlRelay.value[index].input !== undefined) {
        newRow.value.input = tableDataCrtlRelay.value[index].input;
    }
    if (tableDataCrtlRelay.value[index].output !== undefined) {
        newRow.value.output = tableDataCrtlRelay.value[index].output;
    }

    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', index)
    console.log('reedit', tableDataCrtlRelay.value[index].input)
    console.log('reedit', newRow.value.input)
 
    dialogVisible.value = true;

};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlRelay.value[newRow.value.editingIndex].name = newRow.value.name;

            console.log('1111', newRow.value.input.value)
            if (newRow.value.input.value !== undefined) {
                tableDataCrtlRelay.value[newRow.value.editingIndex].input = newRow.value.input.value;
            }
            if (newRow.value.output.value !== undefined) {
                tableDataCrtlRelay.value[newRow.value.editingIndex].output = newRow.value.output.value;
            }

            jsondata.value.Relay = tableDataCrtlRelay;
            console.log('handleAddRow', newRow.value.input.value);
        } else {
            // 新增模式下添加数据
            if (newRow.value.output.value !== undefined) {
                newRow.value.output = newRow.value.output.value;
            }
            if (newRow.value.input.value !== undefined) {
                newRow.value.input = newRow.value.input.value;
            }

            const newRowData = { ...newRow.value };

            tableDataCrtlRelay.value.push(JSON.parse(JSON.stringify(newRowData)));
            jsondata.value.Relay = tableDataCrtlRelay;
            console.log('handleAddRow', newRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    tableDataCrtlRelay.value.splice(index, 1);
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
