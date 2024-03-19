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
        <el-button @click="toggleTable" type="primary" plain
        :disabled="toggleNav||toggleElect||toggleCtrl||showCtrl||showAGV">
          <span v-if="!showTable">功能定制</span>
          <span v-else>功能定制</span>
          <span :class="{ 'rotate-arrow': showTable }">></span>
        </el-button>
        
        <el-button @click="toggleNAV" type="primary" plain
        :disabled="showTable||toggleElect||toggleCtrl||showCtrl||showAGV">
          <span v-if="!toggleNav">导航</span>
          <span v-else>导航</span>
          <span :class="{ 'rotate-arrow': toggleNav }">></span>
        </el-button>

        <el-button @click="toggleELECT" type="primary" plain
        :disabled="showTable||toggleNav||toggleCtrl||showCtrl||showAGV">
          <span v-if="!toggleElect">电气模块</span>
          <span v-else>电气模块</span>
          <span :class="{ 'rotate-arrow': toggleElect }">></span>
        </el-button>

        <el-button @click="toggleCTRL" type="primary" plain
        :disabled="showTable||toggleNav||toggleElect||showCtrl||showAGV">
          <span v-if="!toggleCtrl">控制台</span>
          <span v-else>控制台</span>
          <span :class="{ 'rotate-arrow': toggleCtrl }">></span>
        </el-button>

        <el-button @click="togglejacket" type="primary" plain
        :disabled="showTable||toggleNav||toggleElect||toggleCtrl||showAGV">
          <span v-if="!showCtrl">机械</span>
          <span v-else>机械</span>
          <span :class="{ 'rotate-arrow': showCtrl }">></span>
        </el-button>

        <el-button @click="toggleAGV" type="primary" plain
        :disabled="showTable||toggleNav||toggleElect||toggleCtrl||showCtrl">
          <span v-if="!showAGV">AGV车体</span>
          <span v-else>AGV车体</span>
          <span :class="{ 'rotate-arrow': showAGV }">></span>
        </el-button>
      </div>

      <customization />

      <hr v-if="toggleNav" class="divider">
      <div v-if="toggleNav">
        <div class="left">

        </div>
      </div>

      <electrical />

      <ControlPanel />

      <machinery />

      <AGV />

    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { jsondata } from './common/commondata.js';
import { tableData } from './common/commondata.js';
import { tableDataCrtl } from './common/commondata.js';
import { toggleCtrl } from './common/commondata.js';
import { showTable } from './common/commondata.js';
import { showCtrl } from './common/commondata.js';
import { showAGV } from './common/commondata.js';
import { toggleElect } from './common/commondata.js';
import ControlPanel from './child/Console/Console.vue';
import customization from './child/Function/function.vue';
import electrical from './child/electrical/electrical.vue';
import machinery from './child/machinery/machinery.vue';
import AGV from './child/AGV/AGV.vue';

const dialogVisible = ref(false);
const toggleNav = ref(false);





const handleExpand11 = () => {
  dialogVisible.value = true;
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

const togglejacket = () => {
  showCtrl.value = !showCtrl.value;
};
const toggleAGV = () => {
  showAGV.value = !showAGV.value;
};

const toggleCTRL = () => {
  toggleCtrl.value = !toggleCtrl.value;
};

const handleExport = () => {
  const jsonDataToExport = JSON.stringify({ jsondata: jsondata.value, tableData: tableData.value, tableDataCrtl: tableDataCrtl.value });
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
  
  
  