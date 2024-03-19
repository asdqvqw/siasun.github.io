<template>
  <hr v-if="toggleCtrl" class="divider">
  <div v-if="toggleCtrl">
    <el-table :data="tableDataCrtl" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="eg" label="说明"></el-table-column>
      <el-table-column prop="status" label="地址">
        <template #default="scope">
          <el-input v-model="scope.row.status" placeholder="请选择" style="width:100%;"
            @change="handleCtrlStatusChange(scope.$index, scope.row)">

          </el-input>

        </template>
      </el-table-column>
      <el-table-column label="操作" >
          <template #default="scope">
            <el-button type="danger"  @click="deleteRow(scope.row)" :disabled="scope.$index < 3">删除</el-button>
          </template>
        </el-table-column>
    </el-table><br>
    <el-button type="primary" @click="addNewRow">添加新数据</el-button>

    <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px" :close-on-click-modal="false"
      class="edit-data-dialog">
      <el-form ref="form" :model="newRow" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="newRow.eg" placeholder="请输入说明"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="newRow.status" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { jsondata } from '../../common/commondata.js'
import { tableDataCrtl } from '../../common/commondata.js'
import { toggleCtrl } from '../../common/commondata.js'
const title ='添加数据';
let newRow = ref({
  name: '',
  eg: '',
  status: ''
});
const dialogVisible = ref(false);
const handleCtrlStatusChange = (index, row) => {

  if (index === 0) {
    jsondata.value.network.IP = row.status;
  } else if (index === 1) {
    jsondata.value.network.BACKUP = row.status;
  } else if (index === 2) {
    jsondata.value.network.DCamera = row.status;
  } else {
    const newKey = 'NetIp' + index.toString();
    const newValue = row.status;
    jsondata.value.network[newKey] = newValue;
  }

};
const addNewRow = () => {
  dialogVisible.value = true;
};

const handleAddRow = () => {
    if (newRow.value.name && newRow.value.eg && newRow.value.status) {
        const newRowData = { ...newRow.value };
        tableDataCrtl.value.push(newRowData);
        if (tableDataCrtl.value.length > 3) {
            const newKey = 'NetIp' + (tableDataCrtl.value.length - 1).toString();
            jsondata.value.network[newKey] = newRowData.status;
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (row) => {
  const index = tableDataCrtl.value.indexOf(row);
  if (index !== -1) {
    tableDataCrtl.value.splice(index, 1);
    if (index >= 3) {
      deleteJsonData(row);
    }
  }
};



const deleteJsonData = (row) => {
  Object.values(jsondata.value.network).forEach((value, index) => {
    if (value === row.status) {
      delete jsondata.value.network[Object.keys(jsondata.value.network)[index]];
    }
  });
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