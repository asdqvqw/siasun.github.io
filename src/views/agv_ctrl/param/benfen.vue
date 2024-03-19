<template>
    <div>
        <el-table :data="tableDataCrtlBumper" style="width: 100%">
            <el-table-column prop="name" label="">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlBumper[scope.$index].name
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


        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog">
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
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
const newRow = ref({
    name: '',

});

// import { tableDataCrtlBumper } from '@/views/agv_ctrl/param/common/commondata.js'
// import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'

const tableDataCrtlBumper = ref([
  {
  name: 'No name',
}

]);
const title = 'PLS';



const dialogVisible = ref(false);

const addNewRow = () => {
    newRow.value.name = 'No name';
    newRow.value.editingIndex = -1;
    dialogVisible.value = true;
};

const reedit = (index) => {

    newRow.value.name = tableDataCrtlBumper.value[index].name;

    newRow.value.editingIndex = index; // 设置编辑索引
    dialogVisible.value = true;
    
};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlBumper.value[newRow.value.editingIndex].name = newRow.value.name;


        } else {
            // 新增模式下添加数据
            const newRowData = { ...newRow.value };
            tableDataCrtlBumper.value.push(JSON.parse(JSON.stringify(newRowData)));

        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    tableDataCrtlBumper.value.splice(index, 1);
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
