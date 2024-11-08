<template>
    <h5>· 手动模式下速度等级对应的速度</h5><br>
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
    <br>
    <h5>· 手动模式下转弯半径</h5><br>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">
      <el-card
        v-for="(level, index) in speedLevels2"
        :key="index"
        class="speed-card"
        :body-style="{ padding: '20px' }"
      >
      
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 10px;">🔶 半径等级 {{ index + 1 }}:</span>
          <el-input
            v-model.number="level.value"
            type="number"
            step="0.1"
            min="0.0"
            max="5.0"
            placeholder="请输入速度"
            @input="updateSpeedLevels2"
            style="width: 100px;"
          ></el-input>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { jsondata } from '../common/commondata.js'
import { manualvelParam,manualradiusParam } from '../common/commondata.js'

  
  // 将 speed_level 转换为对象数组以便在 el-card 中使用
  const speedLevels = computed(() => {
    return manualvelParam.value.speed_level.map((value) => ({ value }));
  });
  
  // 更新 speed_level 数组
  function updateSpeedLevels() {
    jsondata.value.MotionParam.manaul_param.speed_level = speedLevels.value.map(row => row.value);
    manualvelParam.value.speed_level = speedLevels.value.map(row => row.value);
  }
    // 将 speed_level 转换为对象数组以便在 el-card 中使用
    const speedLevels2 = computed(() => {
    return manualradiusParam.value.speed_level.map((value) => ({ value }));
  });
  
  // 更新 speed_level 数组
  function updateSpeedLevels2() {
    jsondata.value.MotionParam.manaul_param.turn_radius = speedLevels2.value.map(row => row.value);
    manualradiusParam.value.speed_level = speedLevels2.value.map(row => row.value);
  }
  

  </script>
  
  <style>
  .speed-card {
    width: 200px; /* 卡片宽度 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  }
  </style>