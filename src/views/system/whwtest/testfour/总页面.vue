<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box">

      <div class="left">
        <el-button @click="handleExpand11" type="info" plain>
          查看
        </el-button>
        <el-button @click="handleExport" type="success" plain>
            导出
          </el-button>
          <input ref="importInput" type="file" accept=".json" style="display: none" @change="handleImport" />
          <el-button @click="$refs.importInput.click()" type="primary" plain>
            导入
          </el-button>
        <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
          <p>{{ jsondata }}</p>
        </el-dialog>
      </div>
      <hr class="divider">

      <div class="left">
        <el-button @click="toggleTable" type="primary" plain>
          <span v-if="!showTable">功能定制</span>
          <span v-else>功能定制</span>
          <span :class="{ 'rotate-arrow': showTable }">></span>
        </el-button>

        <el-button @click="toggleNAV" type="primary" plain>
          <span v-if="!toggleNav">导航</span>
          <span v-else>导航</span>
          <span :class="{ 'rotate-arrow': toggleNav }">></span>
        </el-button>

        <el-button @click="toggleELECT" type="primary" plain>
          <span v-if="!toggleElect">电气模块</span>
          <span v-else>电气模块</span>
          <span :class="{ 'rotate-arrow': toggleElect }">></span>
        </el-button>

        <el-button @click="toggleCTRL" type="primary" plain>
          <span v-if="!toggleCtrl">控制台</span>
          <span v-else>控制台</span>
          <span :class="{ 'rotate-arrow': toggleCtrl }">></span>
        </el-button>

        <el-button @click="togglejacket" type="primary" plain>
          <span v-if="!showCtrl">机械</span>
          <span v-else>机械</span>
          <span :class="{ 'rotate-arrow': showCtrl }">></span>
        </el-button>

        <el-button @click="toggleAGV" type="primary" plain>
          <span v-if="!showAGV">AGV车体</span>
          <span v-else>AGV车体</span>
          <span :class="{ 'rotate-arrow': showAGV }">></span>
        </el-button>
      </div>

      <hr v-if="showTable" class="divider">

      <div v-if="showTable">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="eg" label="说明"></el-table-column>
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

      <hr v-if="toggleNav" class="divider">
      <div v-if="toggleNav">
        <div class="left">




        </div>
      </div>

      <hr v-if="toggleElect" class="divider">
      <div v-if="toggleElect">

      </div>

      <hr v-if="toggleCtrl" class="divider">
      <div v-if="toggleCtrl">
        <el-table :data="tableDataCrtl" style="width: 100%">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="eg" label="说明"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-input v-model="scope.row.status" placeholder="请选择" style="width:100%;"
                @change="handleCtrlStatusChange(scope.row)">

              </el-input>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <hr v-if="showCtrl" class="divider">
      <div v-if="showCtrl">

      </div>

      <hr v-if="showAGV" class="divider">
      <div v-if="showAGV">

      </div>

    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
const showTable = ref(false);
const toggleNav = ref(false);
const toggleElect = ref(false);
const toggleCtrl = ref(false);
const showCtrl = ref(false);
const showAGV = ref(false);
const jsondata = ref({
  WatchDog: true,
  TSave: false,
  TongXun: true,
  network: {
    IP: '',
    BACKUP: '',
    DCamera: '',
  },
});
const tableData = ref([
  { name: '看门狗功能', eg: '安全保护功能', status: '启用' },
  { name: '铁电存储功能', eg: '车体状态记录功能', status: '禁用' },
  { name: '通讯协议相关', eg: '启用通讯校验和功能', status: '启用' },
]);
const tableDataCrtl = ref([
  { name: '控制台IP', eg: 'IP', status: '' },
  { name: '备用IP', eg: '备用', status: '' },
  { name: '3D相机', eg: 'IP地址', status: '' },
]);
const handleExpand11 = () => {
  dialogVisible.value = true;
};

const handleStatusChange = (row) => {
  console.log(`状态改变：${row.name} - ${row.status}`);
  if (row.name === '看门狗功能') {
    jsondata.value.WatchDog = row.status === '启用';
  } else if (row.name === '铁电存储功能') {
    jsondata.value.TSave = row.status === '启用';
  } else if (row.name === '通讯协议相关') {
    jsondata.value.TongXun = row.status === '启用';
  }
};
const handleCtrlStatusChange = (row) => {

  if (row.name === '控制台IP') {
    jsondata.value.network.IP = row.status;
  } else if (row.name === '备用IP') {
    jsondata.value.network.BACKUP = row.status;
  } else if (row.name === '3D相机') {
    jsondata.value.network.DCamera = row.status;
  }
};

const toggleTable = () => {
  showTable.value = !showTable.value;
};
const toggleNAV = () => {
  toggleNav.value = !toggleNav.value;
};
const toggleELECT = () => {
  toggleElect.value = !toggleElect.value;
};
const toggleCTRL = () => {
  toggleCtrl.value = !toggleCtrl.value;
};
const togglejacket = () => {
  showCtrl.value = !showCtrl.value;
};
const toggleAGV = () => {
  showAGV.value = !showAGV.value;
};

const handleExport = () => {
  const jsonDataToExport = JSON.stringify({ jsondata: jsondata.value, tableData: tableData.value ,tableDataCrtl:tableDataCrtl.value});
  const blob = new Blob([jsonDataToExport], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.json';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const handleImport = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const importedData = JSON.parse(e.target.result);
    jsondata.value = importedData.jsondata;
    tableData.value = importedData.tableData;
    tableDataCrtl.value = importedData.tableDataCrtl;
  };
  reader.readAsText(file);
  ElMessage.success('导入成功');
};


</script>
  
<style scoped>
.rotate-arrow {
  transition: transform 0.3s ease-in-out;
  transform: rotate(90deg);
}

.divider {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}
</style>
  
  
  
  
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
  
  
  