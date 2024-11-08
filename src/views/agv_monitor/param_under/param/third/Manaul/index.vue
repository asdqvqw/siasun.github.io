<template>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <el-card :body-style="{ padding: '20px' }" class="button-card">
        <h4>手控盒类型</h4>
        <el-select v-model="jsondata.ManCtrlDevice.type" placeholder="" style="margin-right: 10px; width: 10vw;">
          <el-option label="com手控盒" :value="1"></el-option>
          <el-option label="can手控盒" :value="2"></el-option>
        </el-select>
      </el-card>
  
  
      <el-card  :body-style="{ padding: '20px' }" class="button-card">
        <h4>无线</h4>
        <br>
        ip:
        <el-input v-model="jsondata.ManCtrlDevice.remoteDevice.ip" placeholder="" type="string"
          style=" width: 15vw;">
  
        </el-input><br>
        端口:
        <el-input v-model.number="jsondata.ManCtrlDevice.remoteDevice.port" placeholder="" type="number"
          style="width: 15vw;">
  
        </el-input>
      </el-card>
  
  
  
      <el-card v-if="jsondata.ManCtrlDevice.type === 1" :body-style="{ padding: '20px' }" class="button-card">
        <h4>串口</h4>
        <el-input v-model.number="jsondata.ManCtrlDevice.com.com_id" placeholder="" type="number"
          style="margin-right: 10px; width: 100px;">
  
        </el-input>
      </el-card>
      <el-card v-if="jsondata.ManCtrlDevice.type === 2" :body-style="{ padding: '20px' }" class="button-card">
        <h4>网口</h4>
        <el-input v-model.number="jsondata.ManCtrlDevice.can.can_id" placeholder="" type="number"
          style="margin-right: 10px; width: 100px;">
  
        </el-input>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { jsondata } from '../../common/commondata.js';
  
  </script>
  
  <style scoped>
  .button-card {
    width: 22vw;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .input-group label {
    margin-right: 10px;
  }
  </style>