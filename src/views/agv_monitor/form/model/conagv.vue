<template>
  <div :class="isSmall ? 'agv2' : 'agv'">

    <div :class="isSmall ? 'table2' : 'table'">
      <el-button @click="toggleSize" class="button" type="text">{{ isSmall ? '＋' : '一' }}</el-button>
      <div v-if="isSmall">
        AGV
      </div>
      <div class="better" v-if="!isSmall">
        <div class="dianchi">
          <betters ></betters>

        </div>


        <el-table :data="tableData" border class="datatable">
          <el-table-column prop="key" label="AGV"></el-table-column>
          <el-table-column prop="value"></el-table-column>
          <el-table-column prop="key2"></el-table-column>
          <el-table-column prop="value2"></el-table-column>
        </el-table>

        <el-button class="fuwei" type="info">复位</el-button>
        <el-button class="quxiaorenwu" type="info">取消任务</el-button>
        <el-button class="jusheng" type="info">举升</el-button>
        <el-button class="fangxia" type="info">放下</el-button>
        <el-button class="quchongdian" type="info">去充电</el-button>
        <el-button class="shoudongkongzhi" type="info" @click="shoudongctrol">手动控制</el-button>

      </div>

      <el-dialog v-model="dialogVisible" title="手动控制" :modal="false" draggable :close-on-click-modal="false"
        modal-class="kkk-dialog-class" custom-class="ele-dialog">

        <br>
        <manual></manual>

      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  parsedLogData, color
} from '../commondata.js'
import manual from './manualbox.vue'
import betters from './BatteryDisplay.vue'


//手动控制
const dialogVisible = ref(false);
const shoudongctrol = () => {
  dialogVisible.value = true;
}



const isSmall = ref(false)

const toggleSize = () => {
  isSmall.value = !isSmall.value
}
const agvmode = ref(0)
const tableData = computed(() => {

  //状态
  if (parsedLogData.value.nAgvState === 0) {
    agvmode.value = '加载中';
  } else if (parsedLogData.value.nAgvState === 1) {
    agvmode.value = '空闲';
  } else if (parsedLogData.value.nAgvState === 2) {
    agvmode.value = '手动';
  } else if (parsedLogData.value.nAgvState === 3) {
    agvmode.value = '自动';
  }

  if (parsedLogData.value.event.name === '') {
    color.value = 1;
  } else {
    color.value = 2;
  }


  return [
    {
      key: '车号', value: 3,
      key2: '模式', value2: agvmode.value
    },
    {
      key: '开始路段', value: parsedLogData.value.tcInfo.uFromNode,
      key2: '结束路段', value2: parsedLogData.value.tcInfo.uToNode
    },
    {
      key: '理论位置', value: `(${parsedLogData.value.tcInfo.iDevX},${parsedLogData.value.tcInfo.iDevY})`,
      key2: '当前位置', value2: `(${parsedLogData.value.navInfo.fRealX.toFixed(3)},${-parsedLogData.value.navInfo.fRealY.toFixed(3)})`
    },
    {
      key: '事件', value: parsedLogData.value.event.name,
      key2: '原因', value2: parsedLogData.value.event.detail
    },
    {
      key: '建议', value: parsedLogData.value.event.advise,
      key2: '', value2: ''
    },
  ]
});


</script>

<style scoped>
.agv {
  background-color: rgba(234, 229, 229, 0.47);
  color: black;
  position: absolute;
  top: 20%;
  right: 5%;
  height: 60%;
  width: 25%;
}

.agv2 {
  background-color: rgba(234, 229, 229, 0.47);
  color: black;
  position: absolute;
  top: 20%;
  right: 5%;
  height: 4%;
  width: 25%;
}

.table {
  position: absolute;
  top: 0%;
  width: 100%;
  background-image: linear-gradient(to bottom right, #3a3d3d, #c6e0d017);
  height: 30%;
}

.table2 {
  position: absolute;
  top: 0%;
  width: 100%;
  background-image: linear-gradient(to bottom right, #3a3d3d, #c6e0d017);
  height: 100%;
}

.button {
  right: 0%;
  position: absolute;
  color: black;
  font-size: 20px;
}

.fuwei {
  width: 17%;
  margin-left: 8%;
  margin-top: 90%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}

.quxiaorenwu {
  width: 17%;
  left: 25%;
  margin-top: 90%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}

.jusheng {
  width: 17%;
  left: 45%;
  margin-top: 90%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}

.fangxia {
  width: 17%;
  left: 65%;
  margin-top: 90%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}

.quchongdian {
  width: 17%;
  left: 5%;
  margin-top: 100%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}

.datatable {
  width: 90%;
  height: 130%;
  margin-left: 5%;
  margin-top: 40%;
  position: absolute;
  font-size: 12px;
}

.dianchi {
  margin-left: 10%;
  margin-top: 15%;
  position: absolute;
  font-size: 22px;
}

.shoudongkongzhi {
  width: 17%;
  left: 25%;
  margin-top: 100%;
  position: absolute;
  background-color: #8892925e;
  color: rgb(7, 7, 7);
  font-size: 12px;
}
</style>


<style lang="scss" scoped>
::v-deep .el-table {
  background: rgba(255, 255, 255, 0.34)
}

::v-deep .el-table_expanded-cell {
  background: rgba(255, 255, 255, 0.34)
}

::v-deep .el-table th {
  background: rgba(255, 255, 255, 0.34)
}

::v-deep .el-table tr {
  background: rgba(255, 255, 255, 0.34)
}

::v-deep .el-table td {
  background: rgba(255, 255, 255, 0.34)
}
</style>