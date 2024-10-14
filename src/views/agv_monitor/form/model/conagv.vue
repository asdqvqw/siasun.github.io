<template>
  <div :class="isSmall ? 'agv2' : 'agv'">

    <div :class="isSmall ? 'table2' : 'table'">
      <el-button @click="toggleSize" class="button" type="text">{{ isSmall ? '＋' : '一' }}</el-button>
      <div v-if="isSmall">
        AGV
      </div>
      <div v-if="!isSmall">

        <div class="dianchi">
          <betters></betters>

        </div>


        <el-table :data="tableData" border class="datatablecon">
          <el-table-column prop="key" label="AGV"></el-table-column>
          <el-table-column prop="value"></el-table-column>
          <el-table-column prop="key2" label="版本号"></el-table-column>
          <el-table-column prop="value2">
            <template #header>
              {{ parsedLogData.nAgvVersion }}
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 90%;  margin-top: 3%; margin-left: 5%;
                  display: flex; justify-content: space-between; align-items: center; ">
        <el-button class="fuwei" type="primary" @click="setzero">复位</el-button>
        <el-button class="shoudongkongzhi" type="primary" @click="shoudongctrol">手动控制</el-button>

        <el-radio-group class="sandang" v-model="switchPosition">
          <el-radio-button @change="roboSwitch" label="left">手动</el-radio-button>

          <el-radio-button @change="roboSwitch" label="mid">空闲</el-radio-button>

          <el-radio-button @change="roboSwitch" label="right">自动</el-radio-button>
        </el-radio-group>
      </div>
        <div style="width: 90%;  margin-top: 3%; margin-left: 5%;
                  display: flex; justify-content: space-between; align-items: center; ">
          <navcontrol></navcontrol>
          <elecontrol></elecontrol>
          <devcontrol></devcontrol>
          <tccontrol></tccontrol>
        </div>
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
import axios from "axios";
import navcontrol from './nav.vue'
import elecontrol from './ele.vue'
import devcontrol from './dev.vue'
import tccontrol from './tc.vue'

const switchPosition = ref('left')
//复位
const setzero = () => {
  var userList = {
    type: 'reset',
    data: true
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manualdata',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    ElMessage.success('复位')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 模式选择
const roboSwitch = (value) => {
  let swNum = 1
  switch (value.target.value) {
    case 'left':
      swNum = 1
      break
    case 'mid':
      swNum = 2
      break
    case 'right':
      swNum = 3
      break
  }
  var userList = { triswt: swNum }

  console.log(JSON.stringify(userList));
  console.log(typeof JSON.stringify(userList))

  axios({
    method: 'post',
    url: '/api/ctrl/triswt',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')

  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

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
      key: '车号', value: parsedLogData.value.nAgvNum,
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
  background-image: linear-gradient(to bottom right, #141515, #eef1ef);
  color: black;
  position: absolute;
  top: 20%;
  right: 5%;
  height: 65vh;
  width: 25%;
}

.agv2 {
  background-color: rgb(234, 229, 229);
  color: black;
  position: absolute;
  top: 20%;
  right: 5%;
  height: 4vh;
  width: 25%;
}

.table {
  position: absolute;
  top: 0%;
  width: 100%;
  background-image: linear-gradient(to top right, #141515, #eef1ef);
  height: 18vh;
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
  width: 5vw;
  height: 4vh;
  position: relative;
  background-color: #424141d8;
  color: rgb(241, 234, 234);
  font-size: 1vw;
}

.shoudongkongzhi {
  width: 5vw;
  height: 4vh;
  position: relative;
  background-color: #424141d8;
  color: rgb(241, 234, 234);
  font-size: 1vw;
}

.sandang {
  width: auto;
  height: 4vh;
  position: relative;
  /* background-color: #8892925e;
  color: rgb(113, 111, 111); */
  font-size: 1vw;
}

.datatablecon {
  width: 22vw;
  height: 27vh;
  margin-left: 5%;
  margin-top: -2%;
  position: relative;
  font-size: 0.8vw;
}

.dianchi {
  margin-left: 10%;
  margin-top: 18%;
  position: relative;
  
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

<style>
.datatablecon .el-table__body tr:nth-child(2n) {
  background-color: #768aaa67;
  /* 隔行背景色 */
}
</style>