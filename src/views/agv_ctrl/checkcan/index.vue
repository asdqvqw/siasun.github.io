<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box"
      style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
      <DefinScrollbar :showUpBt="true">
        <h2 style="margin-top: 1%; margin-left: 1%;">⚠️CAN信号：</h2>
        <div class="hengxian"></div>


        <el-form label-width="120">
          <h3>&nbsp;&nbsp;发送数据:</h3>
          <br>
          <el-form-item label="CAN线:">
            <el-select v-model="sendcanid" placeholder="请选择" style="width: 95%;">
              <el-option label="can0" :value=0></el-option>
              <el-option label="can1" :value=1></el-option>
              <el-option label="can2" :value=2></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="帧ID:">

            <el-input v-model="sendzhenid" type="text" maxlength="3" placeholder="16进制帧ID,例如:18a" style="width: 35%;"
              @input="validateHex" />
            <span style="color: red;">&nbsp;*</span>

            <el-form-item label="数据长度:" style="margin-left: 5%;">
              <el-select v-model="selectedNumber" placeholder="请选择数量" @change="updateInputs" style="width: 80%;">
                <el-option v-for="number in numbers" :key="number" :label="number" :value="number"></el-option>
              </el-select>

            </el-form-item>

          </el-form-item>


          <el-form-item label="(字节):">
            <div v-for="(input, index) in inputsaaa" :key="index" class="input-container">
              <el-input v-model="inputsaaa[index]" placeholder="数据" maxlength="2" @input="validateHexa(index)" />
              <span style="color: red;">&nbsp;*</span>
            </div>


            <el-button type="primary" style="margin-top: 2%;  width: 90%;" @click="sendcanmsg" :disabled="!isFormValid"
              :icon="Paperclip">发送</el-button>

          </el-form-item>


        </el-form>
        <br>
        <el-form label-width="120">
          <h3>&nbsp;&nbsp;数据查看:</h3>
          <br>
          <el-form-item label="CAN线:">
            <el-select v-model="canid" placeholder="请选择" style="width: 95%;" :disabled="checkiobegin">
              <el-option label="can0" :value=0></el-option>
              <el-option label="can1" :value=1></el-option>
              <el-option label="can2" :value=2></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="帧ID:(0x)">

            <div v-for="(input, index) in inputs" :key="index" style="width: 95%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">

              <el-input v-model="input.value" type="text" maxlength="3" placeholder="请输入需要查看的16进制帧ID,例如:18a"
                style="width: 90%; " :disabled="checkiobegin" @input="validateHexInput(input)" />
              <span style="color: red;">&nbsp;*</span>
              <el-button type="danger" style="margin-left: 1%;" @click="removeInput(index)" :icon="Delete"
                :disabled="checkiobegin">删除</el-button>
            </div>


            <el-button type="primary" style="margin-top: 2%;  width: 90%" @click="addInput" :icon="DocumentAdd"
              :disabled="checkiobegin">增加条件</el-button>
            <br>
            <el-button type="primary" style="margin-top: 2%;  width: 90%;" @click="Checkiobegin"
              :disabled="hasEmptyInput || checkiobegin" :icon="CaretRight">录制数据</el-button>
            <br>
            <el-button @click="Checkioend" type="primary" style="margin-top: 2%;  width: 90%;" :icon="Download"
              :disabled="!checkiobegin">结束导出</el-button>
          </el-form-item>



        </el-form>




        <!-- <div class="box2">
            <div style="width: 95%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
              <h3>数据：</h3>
              <el-button @click="Checkioend" type="primary" style=" width: 20%; ">结
                束</el-button>
            </div>

            <DefinScrollbar height="400px" :showUpBt="true">
              <div style="margin-left: 2%;" v-for="line in canDataArray" :key="line">{{ line }}</div>
            </DefinScrollbar>

          </div> -->





      </DefinScrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Paperclip,
  Download,
  CaretRight,
  DocumentAdd,
  Delete
} from '@element-plus/icons-vue'


const selectedNumber = ref(1)
const numbers = Array.from({ length: 8 }, (_, i) => i + 1)
const inputsaaa = ref([""])

const updateInputs = (value) => {
  // 调整 inputs 数组的长度
  inputsaaa.value = Array.from({ length: value }, (_, i) => inputsaaa.value[i] || '')
}
const isFormValid = computed(() => {
  return sendzhenid.value.trim() !== '' && inputsaaa.value.every(input => input.trim() !== '')
})
const checkiobegin = ref(false);
import axios from "axios";
const response = ref('');
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const canDataArray = ref([])
const canid = ref(0);
const sendcanid = ref(0);
const sendzhenid = ref('');

////////////////////////
const inputs = ref([{ value: '' }])
const inputskey = ref([{ value: '' }])
const addInput = () => {
  inputs.value.push({ value: '' })
}

const removeInput = (index) => {
  inputs.value.splice(index, 1)
}

const hasEmptyInput = computed(() => {
  return inputs.value.some(input => input.value === '')
})


const validateHex = () => {
  sendzhenid.value = sendzhenid.value.replace(/[^0-9A-Fa-f]/g, '')
}

const validateHexa = (index) => {
  inputsaaa.value[index] = inputsaaa.value[index].replace(/[^0-9A-Fa-f]/g, '')
}
const validateHexInput = (input) => {
  console.log(input)
  // 使用正则表达式验证是否为十六进制数
  const hexRegex = /^[0-9A-Fa-f]*$/
  input.value = input.value.replace(/[^0-9A-Fa-f]/g, '')
}



///////////////////////

const Checkiobegin = () => {

  var userList = {
    type: 'checkcan',
    data: {
      can: canid.value,
      msg: inputs.value.map(input => input.value),
      flag: 1
    }
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


  // syncAgvParm();
  checkiobegin.value = true;
}




const sendcanmsg = () => {

  var userList = {
    type: 'sendcanmsg',
    data: {
      can: sendcanid.value,
      msg: inputsaaa.value,
      id: sendzhenid.value
    }
  }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manualdata',
    data: JSON.stringify(userList),
  }).then((res) => {

  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })


}





const Checkioend = () => {
  // clearTimeout(timer_ioin.value);
  canDataArray.value = [];
  checkiobegin.value = false;
  var userList = {
    type: 'checkcanend',
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


  //下载
  let userList1 = {
    file: 'outputcan.txt'
  }

  axios({
    method: 'get',
    url: '/api/download',
    params: userList1,
    responseType: 'blob' // 设置响应类型为 blob
  })
    .then((res) => {
      // ElMessage.success('请求成功')
      const blob = new Blob([res.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'outputcan.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    })
    .catch((error) => {
      // console.log('error',error)
      //ElMessage.error('请求失败')
    })
    .finally(() => {
      // 可以在此处执行其他操作
    })

}

const timer_ioin = ref(null);
const syncAgvParm = () => {
  let userList = {
    data: 'outputcan.txt',
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
      console.log('response:', response.value)
      canDataArray.value = [];
      //
      let currentLine = ''
      for (let i = 0; i < response.value.length; i++) {
        if (response.value[i] === 'c' && response.value[i + 1] === 'a' && response.value[i + 2] === 'n') {
          if (currentLine !== '') {
            canDataArray.value.push(currentLine)
            currentLine = ''
          }
        }
        currentLine += response.value[i]
      }
      if (currentLine !== '') {
        canDataArray.value.push(currentLine)
      }

      console.log('canDataArray:', canDataArray.value)
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
.box {

  padding: 20px;
  text-align: center;

  width: 50%;
  margin-left: 5%;
  height: 500px;
  margin-top: -1%;
  border: 5px double #8d8a8a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);

  background-image: linear-gradient(to bottom right, #3a3d3d95, #c6e0d017);
}

.box2 {

  padding: 20px;
  text-align: center;

  width: 30%;
  margin-left: 5%;
  height: 500px;
  margin-top: -1%;
  border: 5px double #8d8a8a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);

  background-image: linear-gradient(to bottom right, #3a3d3d95, #c6e0d017);
}

.hengxian {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}
</style>

<style scoped>
.input-container {
  width: 12%;
  display: flex;
  margin-left: 0.3%;
}

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

.datatable {
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;

}
</style>

<style>
.datatable .el-table__body tr:nth-child(2n) {
  background-color: #768aaa67;
  /* 隔行背景色 */
}
</style>
