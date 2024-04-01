<template>


  <el-button class="EXButtonELE" @click="clickbutton" v-show="!importflag">电器模块</el-button>
  <el-dialog v-model="dialogVisible" title="电器模块" custom-class="custom-dialog">
    保险杠状态：{{ ele_safe_bHardBumper }}<br>
    急停触发：{{ ele_safe_bEmgStop }}<br>
    pls状态：{{ ele_safe_nPlsTrig }}<br><br>
    二维码:<br>
    x:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.camera.fx.toFixed(4) }}<br>
    y:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.camera.fy.toFixed(4) }}<br>
    角度:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.camera.fthita.toFixed(4) }}<br>

    <br>
    电量百分比：{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.battmetr.fCapPercent.toFixed(2) }}<br>
    电池状态：{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.battmetr.sState }}<br>
    <br>
    磁导航偏差1:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.magnetic.fDev[0] }}<br>
    磁导航偏差2:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.magnetic.fDev[1] }}<br>
    磁导航状态:{{ parsedLogData[currentCoordinateIndex].logJson.electricalModule.sensor.magnetic.sGrade }}<br>
    <br>
    惯导：{{ }}<br>
    切换驱动单元：<el-button class="buttonstyle" @click="Cutdrive">{{ ele_dev_name
      }}</el-button><br>

    轮伺服实际速度：{{ ele_dev_wheel_fServoSpeed }}<br>
    轮伺服状态码：{{ ele_dev_wheel_nServoState }}<br>
    轮伺服错误码：{{ ele_dev_wheel_nServoErrCode }}<br>
    舵伺服实际位置：{{ ele_dev_steer_fServoPosition }}<br>
    舵伺服状态码：{{ ele_dev_steer_nServoState }}<br>
    舵伺服错误码：{{ ele_dev_steer_nServoErrCode }}<br>
    舵限位开关：{{ ele_dev_steer_bPositiveLimitSwt }}<br>
    舵限位开关：{{ ele_dev_steer_bNegativeLimitSwt }}<br>
    舵零位开关：{{ ele_dev_steer_bZeroSwt }}<br>

    <Echart></Echart>
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import Echart from './charts/Ele_chart.vue'
import {
  ele_dev_wheel_fServoSpeed, ele_safe_bEmgStop, ele_safe_bHardBumper, ele_safe_nPlsTrig, ele_dev_name, ele_dev_wheel_nServoErrCode, ele_dev_wheel_nServoState, ele_dev_steer_fServoPosition,
  ele_dev_steer_nServoState, ele_dev_steer_nServoErrCode, ele_dev_steer_bPositiveLimitSwt, ele_dev_steer_bNegativeLimitSwt, ele_dev_steer_bZeroSwt
  , ele_dev_count, ele_dev_Dcount, parsedLogData, currentCoordinateIndex,importflag
} from './sharedata.js'

import {
  updateTargetCoordinates, CCupdateTargetCoordinates
} from './sharedata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};
//切换轴
const Cutdrive = () => {
  if (ele_dev_Dcount.value < ele_dev_count.value - 1) {
    ele_dev_Dcount.value++;
  } else {
    ele_dev_Dcount.value = 0;
  }
  console.log(ele_dev_Dcount.value);
  ele_dev_name.value = '驱动轴' + ele_dev_Dcount.value.toString();
  updateTargetCoordinates();
  CCupdateTargetCoordinates();
};
</script>


<style lang="scss" scoped>
.EXButtonELE {
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
  top: 180px;
  /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}


.buttonstyle {
  background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  background-position: top left;


}
</style>