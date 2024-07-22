<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box"
      style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
      <div>
        <h2 style="margin-top: 1%; margin-left: 1%;">⚠️注意：</h2>
        <div class="hengxian"></div>


        <div class="box">

          <h3>⚠️开始测试会停止车体程序！⚠️退出测试后，车体程序会重新启动！</h3>
          <div class="hengxian"></div>
          <br><br>
          <el-button type="success" style="margin-top: 2%;  width: 90%;" @click="Checkiobegin">🎈开始测试</el-button>
          <br><br><br><br>

        </div>


        <el-dialog v-model="checkiobegin"  style="width: 30%;  left :30%; height: 50%;
         background-image: url('/mrc05.png');
         background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;" 
        :show-close=false :close-on-click-modal="false" >

        </el-dialog>



        <el-dialog v-model="checkiobegin" title="输出点"  style="width: 45%; right: 8%;"
         :modal="false" :show-close=false :close-on-click-modal="false">
          <br>
          <el-form-item>
            <el-button type="success" style="margin-top: 2%;  width: 70%; margin-left: 15%;"
              @click="openallIO">🎈打开全部输出</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="success" style="margin-top: 0%;  width: 70%; margin-left: 15%;"
              @click="closeallIO">🎈关闭全部输出</el-button>
          </el-form-item>

          <el-form-item>
            <div style="width: 70%; margin-left: 15%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
              <div >
                打开时间(ms)：<el-input v-model.number="relaytime" type="number" style="width: 30%; margin-left: 1%;"></el-input></div>
              <div style="width: 50%;"><el-button type="success" @click="pollIO" style="width: 100%;">🎈
                  轮询触发</el-button></div>
            </div>
          </el-form-item>
          <br>
          <el-form-item style="margin-left:17%;">
            ⛔输出点:&nbsp;
            <el-select v-model="selectedIO" placeholder="选择输出点">
              <el-option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</el-option>
            </el-select>&nbsp;&nbsp;&nbsp;
            <el-button type="info" style="margin-top: 0%; " @click="openIO" :disabled="pollflag">打开</el-button>
            <el-button type="info" style="margin-top: 0%; " @click="closeIO">关闭</el-button>
          </el-form-item>
          <br>
          <br>
          <el-button @click="Checkioend" type="primary" style=" width: 70%; margin-left: 15%;">退 出</el-button>
          <br>
          <br>
        </el-dialog>










      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checkiobegin = ref(false);
import axios from "axios";
const hours = Array.from({ length: 24 }, (_, index) => index); // 生成0到23的数组
const selectedIO = ref(0);
const pollflag = ref(false);
const relaytime = ref(3000)
const pollIO = () => {
  selectedIO.value = 0
  const interval = setInterval(() => {
    if (selectedIO.value < hours.length) {
      pollflag.value = true;

      openIOpoll(hours[selectedIO.value]);

      selectedIO.value++;


    } else {
      clearInterval(interval);
      selectedIO.value = 23;
      pollflag.value = false;
    }
  }, relaytime.value);
}

const openIOpoll = (value) => {
  const userList = {
    data: {
      file: 'open',
      value
    }
  }
  console.log('log', userList)
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',
    data: JSON.stringify(userList)
  })
    .then(() => {
      setTimeout(() => {
        closeIOpoll(value)
      }, 3000)
    })
    .catch(error => {
      console.error('error:', error)
    })
}

const closeIOpoll = (value) => {
  const userList = {
    data: {
      file: 'close',
      value
    }
  }
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',
    data: JSON.stringify(userList)
  })
    .catch(error => {
      console.error('error:', error)
    })
}





const openIO = () => {

  var userList = {
    data: {
      file: 'open',
      value: selectedIO.value
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })

}

const closeIO = () => {

  var userList = {
    data: {
      file: 'close',
      value: selectedIO.value
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })

}

const openallIO = () => {

  var userList = {
    data: {
      file: 'checkio',
      value: 1
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })

}
const closeallIO = () => {

  var userList = {
    data: {
      file: 'checkio',
      value: 2
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })

}

const Checkiobegin = () => {

  var userList = {
    type: 'checkiobegin',
    data: true
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manualdata',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = true;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
  checkiobegin.value = true;
}
const Checkioend = () => {
  // checkiobegin.value = false;
  var userList = {
    data: {
      file: 'Begin',
      value: 2
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/checkio',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    checkiobegin.value = false;
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
  checkiobegin.value = false;
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