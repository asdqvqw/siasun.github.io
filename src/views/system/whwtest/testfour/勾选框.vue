<template>
    <div class="page-container main-view">
  
      <div class="table-box content-container page-content-box">
        <div class="top-container">
          <div class="left">
            <el-button @click="handleExpand11" type="info" plain>
              查看
            </el-button>
            <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
              
              <p>{{ message }}</p>
            </el-dialog>
          </div>
        </div>
  
        <!-- <div>
          <el-checkbox v-model="isChecked" @change="handleChange">选项</el-checkbox>
          <p>选择状态: {{ isChecked ? '已选中' : '未选中' }}</p>
        </div> -->
  
        <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-select v-model="scope.row.status" @change="handleStatusChange(scope.row)">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
        <EditDataDialog ref="EditDataDialogRef"></EditDataDialog>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isChecked = ref(false);
  
  const handleChange = (checked) => {
    console.log('选择状态:', checked ? '已选中' : '未选中');
  };
  
  const dialogVisible = ref(false);
  const message = ref('');
  
  
  const handleExpand11 = () => {
  
    message.value = 'transformedData';
    dialogVisible.value = true;
  
  }
  
  const tableData = ref([
    { name: '项目A', status: '启用' },
    { name: '项目B', status: '禁用' },
    { name: '项目C', status: '启用' }
  ]);
  
  const handleStatusChange = (row) => {
    console.log(`状态改变：${row.name} - ${row.status}`);
  };
  </script>
  
  
  <style lang="scss" scoped>
  .main-view {
    display: flex;
    flex-direction: column;
  
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
  </style>
  
  
  