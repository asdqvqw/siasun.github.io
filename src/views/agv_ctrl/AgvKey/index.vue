<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box" style="background-image: linear-gradient(to bottom right, #f0f8ff99, #f5ffe0cc);">
      <div>
        <h2 style="margin-top: 2%; margin-left: 2%; font-size: 24px; font-weight: bold;">AGV解锁</h2>
        <div class="hengxian"></div>
        <div class="box">
          <el-form ref="form" :model="jsondata" label-width="100px" :rules="rules" style="width: 80%; margin: 10% auto;">
            <el-form-item label="输入密码" prop="password">
              <el-input v-model.number="jsondata.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" oninput="this.value=this.value.replace(/[^0-9]/g,'')"></el-input>
              <el-button @click="togglePasswordVisibility" style="margin-left: 10px;" type="text">{{ showPassword ? '😐😐😐' : '😑😑😑' }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="validate" style="width: 100%; margin-top: 5%;" :type="passwordflag ? 'success' : 'primary'" :icon="Unlock">解锁</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Unlock
} from '@element-plus/icons-vue'
const jsondata = ref({
  password: '',
});

const form = ref({
  password: ""
});

const rules = ref({
  password: [{ required: true, message: '输入密码' }],
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}
const responseData = ref(null)
import axios from "axios";
const validate = () => {
  // form组件中校验是通过
  form.value.validate((valid) => {
    if (valid) {
      var userList = {
        group: 'siasun',
        account: 'test',
        password: '123456',
        type: 'AgvKey',
        data: jsondata.value.password
      }
      console.log(JSON.stringify(userList));
      axios({
        method: 'post',
        url: '/api/data/agvkey',//这里是请求地址
        data: JSON.stringify(userList),
      }).then((res) => {
        responseData.value = res.data;
        console.log('11111',res.data)
        console.log('22222',responseData.value)
        if(responseData.value)
        {
          ElMessage.success('解锁成功')
        }else{
          ElMessage.error('密码错误')
        }
      }).catch(error => {
        ElMessage.error('请求失败')
      }).finally(() => {
      })

    } else {
      alert("校验不通过");
    }
  });
};





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
  height: 60%;
  margin: 0 auto;
  background-image: linear-gradient(to bottom right, #f0f8ff95, #f5ffe0cc);
}
</style>