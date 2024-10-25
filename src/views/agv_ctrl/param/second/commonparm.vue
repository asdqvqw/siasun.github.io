<template>
    <h5>· 自动模式下速度等级对应的速度</h5><br>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <el-card
        v-for="(level, index) in speedLevels"
        :key="index"
        class="speed-card"
        :body-style="{ padding: '20px' }"
      >
      
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 10px;">🔶 速度等级 {{ index + 1 }}:</span>
          <el-input
            v-model.number="level.value"
            type="number"
            step="0.1"
            min="0.0"
            max="1.0"
            placeholder="请输入速度"
            @input="updateSpeedLevels"
            style="width: 100px;"
          ></el-input>
        </div>
      </el-card>
    </div>

  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { autoParam } from '@/views/agv_ctrl/param/common/commondata.js'

  
  // 将 speed_level 转换为对象数组以便在 el-card 中使用
  const speedLevels = computed(() => {
    return autoParam.value.speed_level.map((value) => ({ value }));
  });
  
  // 更新 speed_level 数组
  function updateSpeedLevels() {
    jsondata.value.MotionParam.auto_param.speed_level = speedLevels.value.map(row => row.value);
    autoParam.value.speed_level = speedLevels.value.map(row => row.value);
  }
  
  // 保存配置（模拟）
  function saveChanges() {
    console.log('保存的配置:', autoParam.value);
  }
  </script>
  
  <style>
  .speed-card {
    width: 200px; /* 卡片宽度 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  }
  </style>