<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box">



                <div class="left">
                    <div>

                        <el-table :data="tableDataCrtlnet" style="width: 100%">
                            <el-table-column prop="name" label="项目"></el-table-column>
                            <el-table-column prop="key" label="发生的问题">

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
                            :close-on-click-modal="false" class="edit-data-dialog">
                            <el-form ref="form" :model="newRow" label-width="120px">
                                <el-form-item label="项目">
                                    <el-input v-model="newRow.name" placeholder="项目"></el-input>
                                </el-form-item>
                                <el-form-item label="发生的问题">
                                    <el-input v-model="newRow.key" placeholder="问题"></el-input>
                                </el-form-item>

                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="handleAddRow">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>

                    {{ jsondata }}
                </div>


            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

 import  jsondata  from 'https://asdqvqw.github.io/whwtest.github.io/errorbak.js'



const tableDataCrtlnet = ref([
    { name: "控制台IP", key: "IP" },
    { name: "备用IP", key: "BACKUPIP" },
]);

const title = '添加数据';
let newRow = ref({
    name: '',
    key: '',
});
const dialogVisible = ref(false);

const addNewRow = () => {
    dialogVisible.value = true;
};

const handleAddRow = () => {
    if (newRow.value.name && newRow.value.key) {
        const newRowData = { ...newRow.value };
        jsondata.data.push(newRowData);
        tableDataCrtlnet.value.push(newRowData);
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (row) => {
    console.log('11', jsondata)
    // 找到jsondata中对应key的数据的索引并删除
    const index = jsondata.data.findIndex(item => item.key === row.key);
    if (index !== -1) {
        jsondata.data.splice(index, 1);
    }
    // 删除tableDataCrtl中对应行
    const tableIndex = tableDataCrtlnet.value.indexOf(row);
    if (tableIndex !== -1) {
        tableDataCrtlnet.value.splice(tableIndex, 1);
    }
};


</script>



<style lang="scss" scoped>
.main-view {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 600px;

    >.page-query-box {
        margin: 0 0 10px 0 !important;
        padding: 10px 10px 0px 10px;

        :deep(.el-form-item) {
            margin-bottom: 10px !important;
        }

        :deep(.el-form-item--default) {
            width: 100%;
            margin-right: 0;
        }
    }

    >.content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px 10px;
        box-sizing: border-box;
        background: #fff;

        overflow: auto !important;

        >.top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 0 10px 0;
        }

        >.table-container {
            flex: 1 1 auto;
            height: 0;
            overflow: auto;
        }
    }

    .pagination-container {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 10px 0 0 0;
    }
}


.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>