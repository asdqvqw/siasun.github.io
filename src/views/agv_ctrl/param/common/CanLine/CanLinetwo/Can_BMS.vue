<template>
    <div>
      <el-table :data="CANBMS2" style="width: 100%">
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
              <el-option label="60" value="60"></el-option>
              <el-option label="61" value="61"></el-option>
              <el-option label="62" value="62"></el-option>
              <el-option label="63" value="63"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="subSystem" label="子系统数">
          <template #default="scope">
            <el-input v-model="scope.row.subSystem" type="number"></el-input>
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
import { ref ,computed} from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { CANBMS2 } from '@/views/agv_ctrl/param/common/commondata.js'


const addNewRow = () => {
    CANBMS2.value.push({
    ID: '',
    canID: '',
    subSystem: '',
  });
};

const deleteRow = (index) => {
    CANBMS2.value.splice(index, 1);
};


jsondata.value.can2 = {
  ...jsondata.value.can2,
  can_BMS: computed(() => {
    return CANBMS2.value.map((row) => [
    isNaN(parseInt(row.ID))?0:parseInt(row.ID),
    isNaN(parseInt(row.canID))?0:parseInt(row.canID),
    isNaN(parseInt(row.subSystem))?0:parseInt(row.subSystem),
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