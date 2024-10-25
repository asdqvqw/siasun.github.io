<template>
    <div class="flex-container">
      <el-card class="battery-card" v-for="(percent, status) in jsondata.Battery" :key="status">
        <h3>{{ formatStatus(status) }}</h3>
        <div class="battery-info">
          <el-input
            v-model.number="jsondata.Battery[status]"
            :min="0"
            :max="100"
            type="number"
            style="width: 100%;"
          />
          <p>{{ jsondata.Battery[status] }}%</p>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
   import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
  

  
  // 格式化电量状态名称
  const formatStatus = (status) => {
    switch (status) {
      case 'normal_percent':
        return '正常电量';
      case 'low_percent':
        return '低电量';
      case 'lower_percent':
        return '较低电量';
      default:
        return status;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .flex-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap; /* 不换行 */
  }
  
  .battery-card {
    width: 30%; /* 每个卡片占宽度的30% */
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
  }
  
  .battery-info p {
    margin: 5px 0;
    font-size: 20px;
    font-weight: bold;
  }
  </style>