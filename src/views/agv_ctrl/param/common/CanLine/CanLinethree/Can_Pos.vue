<template>
    <div>
      <el-table :data="CANPOS3" style="width: 100%">
        <el-table-column prop="ID" label="单元编号">
          <template #default="scope">
            <el-select v-model="scope.row.ID" placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="canID" label="CAN通讯ID号">
          <template #default="scope">
            <el-select v-model="scope.row.canID" placeholder="请选择">
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger"  @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-button type="primary" @click="addNewRow">添加新数据</el-button>
    </div>
  </template>
  
<script setup>
import { ref ,computed,watch} from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { CANPOS3 } from '@/views/agv_ctrl/param/common/commondata.js'


const addNewRow = () => {
  CANPOS3.value.push({
    ID: '',
    canID: '',
  });
};

const deleteRow = (index) => {
  CANPOS3.value.splice(index, 1);
};


jsondata.value.can3 = {
  ...jsondata.value.can3,
  can_pos: computed(() => {
    return CANPOS3.value.map((row) => [
      isNaN(parseInt(row.ID)) ? 0 : parseInt(row.ID),
      isNaN(parseInt(row.canID)) ? 0 : parseInt(row.canID),
    ]);
  })
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