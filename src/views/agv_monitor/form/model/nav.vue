<template>
  <div>
    <el-button class="controlnav" type="info" @click="clickbutton">导航</el-button>

    <el-dialog v-model="dialogVisible" title="导航" :modal="false" draggable :close-on-click-modal="false"
      modal-class="kkk-dialog-class" custom-class="ele-dialog">
      <DefinScrollbar :showUpBt="true">
      <br>
      <el-table :data="tableData" border style="width: 90%; margin-left: 5%;" class="datatablenav">
        <el-table-column prop="key" label="导航信息"></el-table-column>
        <el-table-column prop="value"></el-table-column>
        <el-table-column prop="key2"></el-table-column>
        <el-table-column prop="value2"></el-table-column>
      </el-table>


      <br>
      <h3 style="margin-left: 3%;">点云:</h3>
      <br>
      <el-form ref="form" :model="NavData" label-width="120px" :rules="rules" style="width: 90%; margin-left: 3%;">
        <div style="display: flex;">
          <div style="flex: 1; margin-right: 1%;">
            <el-form-item label="X轴相对偏移" prop="Xpianyi">
              <el-input v-model.number="NavData.Xpianyi" placeholder="X轴相对偏移" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Y轴相对偏移" prop="Ypianyi">
              <el-input v-model.number="NavData.Ypianyi" placeholder="Y轴相对偏移" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Z轴相对偏移" prop="Zpianyi">
              <el-input v-model.number="NavData.Zpianyi" placeholder="Z轴相对偏移" type="number"></el-input>
            </el-form-item>
          </div>
          <div style="flex: 1;">
            <el-form-item label="X轴欧拉角度" prop="EX">
              <el-input v-model.number="NavData.EX" placeholder="X轴欧拉角度" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Y轴欧拉角度" prop="EY">
              <el-input v-model.number="NavData.EY" placeholder="Y轴欧拉角度" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Z轴欧拉角度" prop="EZ">
              <el-input v-model.number="NavData.EZ" placeholder="Z轴欧拉角度" type="number"></el-input>
            </el-form-item>
          </div>

        </div>

      </el-form>

      <el-button style="margin-left: 3%;" @click="importFiles">导入点云地图</el-button>
      <el-button style="margin-left: 3%;" @click="clearmap">清除点云地图</el-button>
      <el-checkbox style="margin-left: 3%;" :disabled="pointss === null" v-model="flag"
        @change="changedianyun">隐藏/显示点云</el-checkbox>
      
    </DefinScrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
import {
  parsedLogData, fileInput, NavData, pointss, flagclear, raycaster
} from '../commondata.js'
const flag = ref(true);



const clearmap = () => {
  flagclear.value = !flagclear.value;
  pointss.value = null;
}
const changedianyun = () => {
  if (pointss.value !== null) {
    pointss.value.visible = flag.value; // 显示点云
  }
}
const rules = ref({
  Xpianyi: [{ required: true, message: '输入X轴相对偏移' }],
  Ypianyi: [{ required: true, message: '输入Y轴相对偏移' }],
  Zpianyi: [{ required: true, message: '输入Z轴相对偏移' }],
  EX: [{ required: true, message: '输入X轴欧拉角度' }],
  EY: [{ required: true, message: '输入Y轴欧拉角度' }],
  EZ: [{ required: true, message: '输入Z轴欧拉角度' }],
});
const form = ref({
  Xpianyi: "",
  Ypianyi: "",
  Zpianyi: "",
  EX: "",
  EY: "",
  EZ: "",
});

const importFiles = () => {
  form.value.validate((valid) => {
    if (valid) {
      fileInput.value.value = null; // 重置文件输入框的值
      fileInput.value.click(); // 触发文件选择操作
    } else {
      ElMessage.error('补全点云偏移旋转数据');
    }

  });
};



const dialogVisible = ref(false);
const clickbutton = () => {
  dialogVisible.value = true;
};

const tableData = computed(() => [
  { key: '软件版本', value: parsedLogData.value.navInfo.fmVersion, key2: '环境模型版本', value2: parsedLogData.value.navInfo.swVersion },
  {
    key: '理论位置', value: `(${parsedLogData.value.tcInfo.iDevX},${parsedLogData.value.tcInfo.iDevY})`,
    key2: '当前位置', value2: `(${parsedLogData.value.navInfo.fRealX.toFixed(3)},${-parsedLogData.value.navInfo.fRealY.toFixed(3)},${(parsedLogData.value.navInfo.fRealThita * 180 / Math.PI).toFixed(3)})`
  },
  { key: '角度偏差', value: parsedLogData.value.navInfo.fXDev.toFixed(4), key2: '左右偏差', value2: parsedLogData.value.navInfo.fThitaDev.toFixed(4) },
  { key: '发送舵角', value: '', key2: '发送速度', value2: '' },
]);

const handleMouseClicknav = (car) => {
  const intersects = raycaster.intersectObjects([car]);
  if (intersects.length > 0) {
    console.log('modelname:', intersects[0].object.name)
    if (intersects[0].object.name === 'laser7'
      || intersects[0].object.name === 'laser1' || intersects[0].object.name === 'laser6'
      || intersects[0].object.name === 'laser5') {

      dialogVisible.value = true;

    } else {
      dialogVisible.value = false;

    }
  }



}
defineExpose({ handleMouseClicknav });
</script>

<style scoped>
.controlnav {
  /* background-color: rgba(255, 255, 255, 0.475);
  color: black;
  position: absolute;
  bottom: 3%;
  right: 51%;
  width: 8%; */
  width: 5vw;
  height: 4vh;
 
  position: relative;
  background-color: #424141d8;
  color: rgb(241, 234, 234);
  font-size: 1vw;
}
</style>


<style lang="scss" scoped>
::v-deep .el-table {
  background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table_expanded-cell {
  background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table th {
  background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table tr {
  background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table td {
  background: rgba(255, 255, 255, 0.326)
}
</style>

<style scoped>

.datatablenav {
  font-size: 12px;
}



</style>
<style>
.datatablenav .el-table__body tr:nth-child(2n) {
    background-color: #768aaa67;
    /* 隔行背景色 */
}
</style>