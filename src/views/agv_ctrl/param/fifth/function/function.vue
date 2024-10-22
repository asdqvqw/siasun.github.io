<template>
    <div>

        <el-table :data="functioncDate" style="width: 100%" class="functioncDate">
            <el-table-column prop="ch_key" label="⚠️ 功能定制"></el-table-column>
            <el-table-column prop="des" label="说明"></el-table-column>
            <el-table-column prop="en_key" label="英文名">

            </el-table-column>

            <!-- <el-table-column prop="value" label="是否启用">
                <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="请选择" style="width:100%;"
                        @change="handleCtrlvalueChange(scope.$index, scope.row)">

                    </el-input>

                </template>
            </el-table-column> -->
            <el-table-column prop="value" label="是否启用">
                <template #default="scope">
                    <el-switch v-model="scope.row.value" :active-value=true :inactive-value=false
                        @change="handleCtrlvalueChange(scope.$index, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-button type="primary" @click="addNewRow">添加新数据</el-button>

        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog" style="height: 40%;">
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.ch_key" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="newRow.des" placeholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="newRow.en_key" placeholder="en_key值"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="newRow.value" :active-value=true :inactive-value=false></el-switch>
                </el-form-item>
                <!-- <el-table-column prop="value" label="是否启用">
                    <template #default="scope">
                        <el-radio-group v-model="scope.row.value">
                            <el-radio label="true">是</el-radio>
                            <el-radio label="false">否</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddRow">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { functioncDate } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
const title = '添加数据';
let newRow = ref({
    ch_key: '',
    des: '',
    en_key: '',
    value: false
});
const dialogVisible = ref(false);
const handleCtrlvalueChange = (index, row) => {
    const rowData = jsondata.value.function.find(item => item.en_key === row.en_key);
    if (rowData) {
        rowData.value = row.value;
    }
};

const addNewRow = () => {
    dialogVisible.value = true;
};

const handleAddRow = () => {
    if (newRow.value.ch_key && newRow.value.des && newRow.value.en_key ) {
        const newRowData = { ...newRow.value };
        jsondata.value.function.push(newRowData);
        functioncDate.value.push(newRowData);
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (row) => {
    // 找到jsondata中对应en_key的数据的索引并删除
    const index = jsondata.value.function.findIndex(item => item.en_key === row.en_key);
    if (index !== -1) {
        jsondata.value.function.splice(index, 1);
    }
    // 删除tableDataCrtl中对应行
    const tableIndex = functioncDate.value.indexOf(row);
    if (tableIndex !== -1) {
        functioncDate.value.splice(tableIndex, 1);
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
  
  
  
<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>

<style>
.functioncDate .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>