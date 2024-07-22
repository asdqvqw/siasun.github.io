<template>

  <el-button class="EXButtonDEV" @click="clickbutton" v-show="!importflag">车体设备</el-button>
  <el-dialog v-model="dialogVisible" title="车体设备" custom-class="custom-dialog" :modal="false" draggable
    :close-on-click-modal="false" modal-class="kk-dialog-class">
    <div v-if="parsedLogData[0].agvType === 0">
      转盘纵向开关：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.turn_axis.bZero ? '🔴' : '🟢' }}<br>
      转盘横向开关：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.turn_axis.bLevel ? '🔴' : '🟢' }}<br>
      转盘位置:{{ parsedLogData[currentCoordinateIndex].trunpan.toFixed(3) }}<br>
      <br>
      举升高位开关：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.lifter_axis.bTop ? '🔴' : '🟢' }}<br>
      举升零位开关：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.lifter_axis.bBottom ? '🔴' : '🟢' }}<br>
      举升位置：{{ parsedLogData[currentCoordinateIndex].lifter.toFixed(3) }}<br>
    </div>
    <div v-if="parsedLogData[0].agvType === 1
    && parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push !== undefined">

      前举升上限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.turn_axis.bLevel ? '🔴' : '🟢' }}<br>
      前举升下限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.turn_axis.fAxisSpeed ? '🔴' : '🟢' }}<br>
      前举升零位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.turn_axis.bZero ? '🔴' : '🟢' }}<br>
      前举升位置:{{ parsedLogData[currentCoordinateIndex].trunpan.toFixed(3) }}<br>
      <br>
      后举升上限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.lifter_axis.bTop ? '🔴' : '🟢' }}<br>
      后举升下限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.lifter_axis.bBottom ? '🔴' : '🟢' }}<br>
      后举升零位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.lifter_axis.fAxisSpeed ? '🔴' : '🟢' }}<br>
      后举升位置：{{ parsedLogData[currentCoordinateIndex].lifter.toFixed(3) }}<br>
      <br>
      前推拉上限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.FPullerSwtPos ? '🔴' : '🟢' }}<br>
      前推拉下限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.FPullerSwtNag ? '🔴' : '🟢' }}<br>
      前推拉零位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.FPullerSwtZero ? '🔴' : '🟢' }}<br>
      前推拉位置：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.FPullerSwtposition.toFixed(3) }}<br>
      <br>
      后推拉上限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.RPullerSwtPos ? '🔴' : '🟢' }}<br>
      后推拉下限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.RPullerSwtNag ? '🔴' : '🟢' }}<br>
      后推拉零位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.RPullerSwtZero ? '🔴' : '🟢' }}<br>
      后推拉位置：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.push.RPullerSwtposition.toFixed(3) }}<br>
      <br>
      整体上限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.all.CarrierSwtPos ? '🔴' : '🟢' }}<br>
      整体下限位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.all.CarrierSwtNag ? '🔴' : '🟢' }}<br>
      整体零位：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.all.CarrierSwtZero ? '🔴' : '🟢' }}<br>
      整体位置：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.all.CarrierSwtposition.toFixed(3) }}<br>
      <br>
      前满卷货物检测：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.FLifterSwtCargoFull ? '🔴' : '🟢' }}<br>
      前空卷货物检测：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.FLifterSwtCargoEmpty ? '🔴' : '🟢' }}<br>
      后满卷货物检测：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.RLifterSwtCargoFull ? '🔴' : '🟢' }}<br>
      后空卷货物检测：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.RLifterSwtCargoEmpty ? '🔴' : '🟢' }}<br>
      <br>
      前满卷偏载：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.FLifterSwtPianzaiFull ? '🔴' : '🟢' }}<br>
      前空卷偏载：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.FLifterSwtPianzaiEmpty ? '🔴' : '🟢' }}<br>
      后满卷偏载：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.RLifterSwtPianzaiFull ? '🔴' : '🟢' }}<br>
      后空卷偏载：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.RLifterSwtPianzaiEmpty ? '🔴' : '🟢' }}<br>
      同步开关：{{ parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.rack.LifterCentrePosition ? '🔴' : '🟢' }}<br>

    </div>
    <br>
    当前设备状态：{{ Net_equ_uEquipmentState }}<br>
    当前设备任务号：{{ Net_equ_uEquipmentTaskID }}<br>
    当前设备任务状态：{{ Net_equ_uEquipmentTaskState }}<br>
    当前设备故障码: &nbsp;{{ Net_equ_uEquipmentTaskError }}<br>
    当前设备动作步骤: {{ Net_equ_strEquipmentTaskMessage }}<br>
    当前动作轴id: {{ }}<br>
    当前动作轴位置: {{ }}<br>
    当前动作轴开关状态: {{ }}<br>
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import {
  Net_equ_uEquipmentTaskState, Net_equ_uEquipmentTaskID, Net_equ_uEquipmentTaskError,
  Net_equ_uEquipmentState, Net_equ_strEquipmentTaskMessage, parsedLogData, currentCoordinateIndex,
  importflag
} from './sharedata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};


</script>

<style>
.EXButtonDEV {
  background-image: url('./img/button.gif');
  background-size: 100%;
  background-position: center;
  background-color: #30499344;
  width: 200px;
  height: 40px;
  color: rgb(246, 241, 241);
  border: none;
  font-weight: bold;
  position: absolute;
  right: 0px;
  top: 240px;
  /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}
</style>
