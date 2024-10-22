<template>
    <div>

        <el-table :data="tableDataCrtlnet" style="width: 100%" class="datatableCON">
            <el-table-column prop="name" label="⚠️ 网口"></el-table-column>
            <el-table-column prop="key" label="英文名">

            </el-table-column>

            <el-table-column prop="value" label="地址">
                <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="请选择" style="width:100%;"
                        @change="handleCtrlvalueChange(scope.$index, scope.row)">

                    </el-input>

                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <!-- <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <br>
        <!-- <el-button type="primary" @click="addNewRow">添加新数据</el-button> -->

        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog" draggable style="height: 35%;">
            <br>
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="newRow.key" placeholder="key值"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="newRow.value" placeholder="请输入地址"></el-input>
                </el-form-item>
                <!-- <el-form-item >

                    <el-button @click="dialogVisible = false" >取 消</el-button>
                    <el-button type="primary" @click="handleAddRow">确 定</el-button>
                </el-form-item> -->


            </el-form>
            <div slot="footer" style="right: 50px;">
                <el-button @click="dialogVisible = false" style="margin-left: 75%;">取 消</el-button>
                <el-button type="primary" @click="handleAddRow">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata } from './commondata.js'
import { tableDataCrtlnet } from './commondata.js'

const title = '添加数据';
let newRow = ref({
    name: '',
    key: '',
    value: ''
});
const dialogVisible = ref(false);
const handleCtrlvalueChange = (index, row) => {
    // const rowData = jsondata.value.network.find(item => item.key === row.key);
    // if (rowData) {
    //     rowData.value = row.value;
    // }
    // jsondata.value.NetMan.tv = row.value;
    if(row.key === 'tc')
    {
        jsondata.value.NetMan.tc = row.value;
        console.log('1111:',jsondata.value.NetMan.tc)
    }else if(row.key === 'screen')
    {
        jsondata.value.NetMan.screen = row.value;
    }
    
    console.log('2222:',index)
};

const addNewRow = () => {
    dialogVisible.value = true;
};

const handleAddRow = () => {
    if (newRow.value.name && newRow.value.key && newRow.value.value) {
        const newRowData = { ...newRow.value };
        jsondata.value.network.push(newRowData);
        tableDataCrtlnet.value.push(newRowData);
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (row) => {
    // 找到jsondata中对应key的数据的索引并删除
    const index = jsondata.value.network.findIndex(item => item.key === row.key);
    if (index !== -1) {
        jsondata.value.network.splice(index, 1);
    }
    // 删除tableDataCrtl中对应行
    const tableIndex = tableDataCrtlnet.value.indexOf(row);
    if (tableIndex !== -1) {
        tableDataCrtlnet.value.splice(tableIndex, 1);
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
.datatableCON .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>