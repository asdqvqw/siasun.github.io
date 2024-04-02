<template>
    <div>
      <el-table :data="CANOPEN2" style="width: 100%">
        <el-table-column prop="ID" label="单元编号">
          <template #default="scope">
            <el-select v-model="scope.row.ID" placeholder="请选择">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="canID" label="CAN通讯ID号">
          <template #default="scope">
            <el-select v-model="scope.row.canID" placeholder="请选择">
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
              <el-option label="13" value="13"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="servo_type" label="伺服类型">
          <template #default="scope">
            <el-select v-model="scope.row.servo_type" placeholder="请选择">
              <el-option label="Elmo伺服" value="0"></el-option>
              <el-option label="步科伺服" value="1"></el-option>
              <el-option label="Motec伺服" value="2"></el-option>
              <el-option label="AMC伺服" value="3"></el-option>
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
import { ref ,computed} from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { CANOPEN2 } from '@/views/agv_ctrl/param/common/commondata.js'


const addNewRow = () => {
  CANOPEN2.value.push({
    ID: '',
    canID: '',
    servo_type: '',

  });
};

const deleteRow = (index) => {
  CANOPEN2.value.splice(index, 1);
};


jsondata.value.can2 = {
  ...jsondata.value.can2,
  can_open: computed(() => {
    return CANOPEN2.value.map((row) => [
      isNaN(parseInt(row.ID)) ? 0 : parseInt(row.ID),
      isNaN(parseInt(row.canID)) ? 0 : parseInt(row.canID),
      isNaN(parseInt(row.servo_type))?0:parseInt(row.servo_type),

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