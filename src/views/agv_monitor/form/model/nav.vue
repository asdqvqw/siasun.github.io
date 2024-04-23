<template>
  <div>
    <el-button class="controlnav" type="info" @click="clickbutton"><span style="font-size: 18px;"> 导航</span></el-button>

    <el-dialog v-model="dialogVisible" title="导航信息" :modal="false" draggable :close-on-click-modal="false"
      modal-class="kkk-dialog-class" custom-class="ele-dialog">

      <el-table :data="tableData" border style="width: 90%; margin-left: 5%;">
        <el-table-column prop="key"></el-table-column>
        <el-table-column prop="value"></el-table-column>
        <el-table-column prop="key2"></el-table-column>
        <el-table-column prop="value2"></el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import {
  parsedLogData
} from '../commondata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};

const tableData = computed(() => [
  { key: '导航软件版本', value: parsedLogData.value.navInfo.fmVersion, key2: '导航环境模型版本', value2: parsedLogData.value.navInfo.swVersion },
  {
    key: '理论位置', value: `(${parsedLogData.value.tcInfo.iDevX},${parsedLogData.value.tcInfo.iDevY})`,
    key2: '当前位置', value2: `(${parsedLogData.value.navInfo.fRealX.toFixed(3)},${-parsedLogData.value.navInfo.fRealY.toFixed(3)},${(parsedLogData.value.navInfo.fRealThita * 180 / Math.PI).toFixed(3)})`
  },
  { key: '角度偏差', value: parsedLogData.value.navInfo.fXDev.toFixed(4), key2: '左右偏差', value2: parsedLogData.value.navInfo.fThitaDev.toFixed(4) },
  { key: '发送舵角', value: '', key2: '发送速度', value2: '' },
]);

</script>

<style scoped>
.controlnav {
  background-color: rgba(255, 255, 255, 0.475);
  color: black;
  position: absolute;
    bottom: 3%;
    right: 51%;
    width: 8%;
}
</style>


<style lang="scss" scoped>
::v-deep .el-table{
    background:rgba(255,255,255,0.326)
}
::v-deep .el-table_expanded-cell{
    background:rgba(255,255,255,0.326)
}
::v-deep .el-table th{
    background:rgba(255, 255, 255, 0.326)
}
::v-deep .el-table tr{
    background:rgba(255,255,255,0.326)
}
::v-deep .el-table td{
    background:rgba(255,255,255,0.326)
}
</style>