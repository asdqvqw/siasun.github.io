<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box"
      style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
      <div>
        <h2 style="margin-top: 1%; margin-left: 1%;">⚠️输入点：</h2>
        <div class="hengxian"></div>


        <div class="box">

          <h3>测试输入点完毕一定要退出⚠️
            否则车体程序无法软启动！！</h3>

          <div class="hengxian"></div>
          <br><br>
          <el-button type="success" style="margin-top: 2%;  width: 90%;" @click="Checkiobegin">🎈查看</el-button>
          <br><br><br><br>

        </div>

        <el-dialog v-model="checkiobegin" title="输入点" width="900px" height="500px" :show-close=false
          :close-on-click-modal="false">
          <h3>'🔴' 为有输入, '🟢'为无输入</h3>
          <el-table :data="tableData" border class="datatableinpoint">
            <el-table-column prop="key" label="输入点"></el-table-column>
            <el-table-column prop="value"></el-table-column>
            <el-table-column prop="key2"></el-table-column>
            <el-table-column prop="value2"></el-table-column>
            <el-table-column prop="key3"></el-table-column>
            <el-table-column prop="value3"></el-table-column>
          </el-table>
          <br>
          <div style="width: 100%; margin-left: -10%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
            <br>
            <el-button type="primary" style=" width: 70%; margin-left: 15%;">记录下载</el-button>

            <el-button @click="Checkioend" type="primary" style=" width: 70%; margin-left: 15%;">退 出</el-button>
          </div>
          <br>
        </el-dialog>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const checkiobegin = ref(false);
const dataArray = ref([]);
import axios from "axios";

const tableData = computed(() => {

  return [
    {
      key: '输入点0', value: dataArray.value[23] == 1 ? '🔴' : '🟢',
      key2: '输入点1', value2: dataArray.value[22] == 1 ? '🔴' : '🟢',
      key3: '输入点2', value3: dataArray.value[21] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点3', value: dataArray.value[20] == 1 ? '🔴' : '🟢',
      key2: '输入点4', value2: dataArray.value[19] == 1 ? '🔴' : '🟢',
      key3: '输入点5', value3: dataArray.value[18] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点6', value: dataArray.value[17] == 1 ? '🔴' : '🟢',
      key2: '输入点7', value2: dataArray.value[16] == 1 ? '🔴' : '🟢',
      key3: '输入点8', value3: dataArray.value[15] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点9', value: dataArray.value[14] == 1 ? '🔴' : '🟢',
      key2: '输入点10', value2: dataArray.value[13] == 1 ? '🔴' : '🟢',
      key3: '输入点11', value3: dataArray.value[12] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点12', value: dataArray.value[11] == 1 ? '🔴' : '🟢',
      key2: '输入点13', value2: dataArray.value[10] == 1 ? '🔴' : '🟢',
      key3: '输入点14', value3: dataArray.value[9] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点15', value: dataArray.value[8] == 1 ? '🔴' : '🟢',
      key2: '输入点16', value2: dataArray.value[7] == 1 ? '🔴' : '🟢',
      key3: '输入点17', value3: dataArray.value[6] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点18', value: dataArray.value[5] == 1 ? '🔴' : '🟢',
      key2: '输入点19', value2: dataArray.value[4] == 1 ? '🔴' : '🟢',
      key3: '输入点20', value3: dataArray.value[3] == 1 ? '🔴' : '🟢'
    },
    {
      key: '输入点21', value: dataArray.value[2] == 1 ? '🔴' : '🟢',
      key2: '输入点22', value2: dataArray.value[1] == 1 ? '🔴' : '🟢',
      key3: '输入点23', value3: dataArray.value[0] == 1 ? '🔴' : '🟢'
    },
  ]
});


const Checkiobegin = () => {

  var userList = {
    type: 'checkin',
    data: true
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manualdata',
    data: JSON.stringify(userList),
  }).then((res) => {

    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
  syncAgvParm();
  checkiobegin.value = true;
}

const Checkioend = () => {
  var userList = {
    type: 'checkinend',
    data: true
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manualdata',
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = false;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
  clearTimeout(timer_ioin.value);
  checkiobegin.value = false;
}

const timer_ioin = ref(null);
const response = ref('null');
const syncAgvParm = () => {
  let userList = {
    data: 'outputio.txt',
    group: 'siasun',
    account: 'test',
    password: '123456'
  }

  axios({
    method: 'post',
    url: '/api/data/jsoneditor',
    data: JSON.stringify(userList)
  })
    .then((res) => {

      response.value = res.data

      const rawData = res.data.replace(/\s/g, '');

      dataArray.value = rawData.split('').map(item => (item === '.' ? 0 : 1))

      // 确保数组长度为 24 个元素
      while (dataArray.value.length < 24) {
        dataArray.value.unshift(0)
      }
    })
    .catch((error) => {
      // ElMessage.error('请求失败')
    })
    .finally(() => {
      // 可以在此处执行其他操作
    })

  timer_ioin.value = setTimeout(syncAgvParm, 1000);
}



</script>


<style scoped>
.hengxian {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}

.box {
  border: 5px double #8d8a8a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-image: linear-gradient(to bottom right, #f0f8ff95, #f5ffe0cc);
}
</style>

<style scoped>
.input-points {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.input-point {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #ccc;
  margin: 4px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
}

.input-point.active {
  background-color: #0077b6;
  color: #fff;
}

.datatableinpoint {
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;

}
</style>

<style>
.datatableinpoint .el-table__body tr:nth-child(2n) {
  background-color: #768aaa67;
  /* 隔行背景色 */
}
</style>