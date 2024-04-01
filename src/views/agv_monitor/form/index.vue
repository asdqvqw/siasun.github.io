<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box">
      <el-button @click="aaaaa">aaaa</el-button>
      <el-button @click="bbbbb">bbbb</el-button>
      <el-button @click="ccccc">cccc</el-button>
      aaa
    </div>
  </div>
</template>



<script setup>

import { ref, onMounted } from 'vue'
import axios from "axios";

const aaaaa = () => {
  let userList = {test:1};
  axios({
    method: 'post',
    url: '/api/ctrl/manual',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    ElMessage.success('请求成功')

  }).catch(error => {
    ElMessage.error('请求失败')
  }).finally(() => {

  })
}
const ccccc = () => {
  let userList = {test:1};
  axios({
    method: 'post',
    url: '/api/ctrl/function',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    ElMessage.success('请求成功')

  }).catch(error => {
    ElMessage.error('请求失败')
  }).finally(() => {

  })
}
const bbbbb = () => {
  let url = '/api/data/function'
  const responseData = ref(null); // 创建响应式变量

  let userList = { test: 1 };
  axios({
    method: 'post',
    url: '/api/data/function',
    data: JSON.stringify(userList),
  })
    .then((res) => {
      ElMessage.success('请求成功');
      responseData.value = res.data; // 将响应数据赋值给变量
      console.log('222222',responseData.value)
    })
    .catch((error) => {
      ElMessage.error('请求失败');
    })
    .finally(() => {
      // 可以在此处执行其他操作
    });
}
onMounted(() => {

  bbbbb();

})


</script>