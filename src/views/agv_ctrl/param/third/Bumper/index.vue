<template>
 <el-button type="primary" @click="addCard" style="margin-left: 1vw;" >添加卡片</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                <el-card v-for="(item, index) in jsondata.Bumper" :key="index" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <div class="input-group">
                        <label>名称:</label>
                        <el-input v-model="item.name" placeholder="输入名称" style="width: 150px; margin-right: 10px;"></el-input>
                        <el-button type="danger" @click="removeCard(index)">删除</el-button>
                    </div>
                    <div class="button-values">
                        <div class="input-group">
                            <label>IO:</label>
                            <el-select v-model="item.io_input[0]" placeholder="选择类型"
                                @change="handleTypeChange(index)" style="margin-right: 10px; width: 100px;">
                                <el-option v-for="option in buttonOptions" :key="option.value" :label="option.label"
                                    :value="option.value" />
                            </el-select>
                        </div>
                        <div class="input-group" v-if="showRouteInput(index)">
                            <label>can路数:</label>
                            <el-select v-model="item.io_input[1]" placeholder="选择类型"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="option in canOptions" :key="option.value" :label="option.label"
                                    :value="option.value" />
                            </el-select>
                        </div>
                        <div class="input-group" v-if="showModuleInput(index)">
                            <label v-if="isLocalIO(index)">本地IO地址:</label>
                            <label v-else>模块编号:</label>
                            <el-input v-if="isLocalIO(index)" v-model.number="item.io_input[2]"
                                placeholder="模块编号" type="number" style="margin-right: 10px; width: 100px;"></el-input>
                            <el-select v-else v-model="item.io_input[2]" placeholder="选择模块编号"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i )" :key="num"
                                    :label="num" :value="num" />
                            </el-select>
                        </div>
                        <div class="input-group">
                            <label v-if="isLocalIO(index)">输出点对应位:</label>
                            <label v-else-if="isGPIO(index)">输入点对应位:<br>自动转化</label>
                            <label v-else>模块内输出点编号:</label>
                            <el-select v-if="isLocalIO(index)" v-model="item.io_input[3]" placeholder="选择输出点"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 10 }, (_, i) => i )" :key="num"
                                    :label="'bit' + num" :value="num" />
                            </el-select>
                            <el-input v-else-if="isGPIO(index)" style="margin-right: 10px; width: 100px;"
                                v-model.number="item.io_input[3]" @change="formatbit5(index)"> </el-input>
  
                            <el-select v-else v-model="item.io_input[3]" placeholder="选择输出点"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)" :key="num"
                                    :label="num" :value="num" />
                            </el-select>
                        </div>
                        <div class="input-group">
                            <label>电平:</label>
                            <el-select v-model="item.io_input[4]" placeholder="高低电平"
                                style="margin-right: 10px; width: 100px;">
                                <el-option label="高" :value="1"></el-option>
                                <el-option label="低" :value="0"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-card>
            </div>
           

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { jsondata, adjustbit5 } from '@/views/agv_ctrl/param/common/commondata.js'
  
  // 按钮选项
  const buttonOptions = [
    { label: 'CAN-POS', value: 1 },
    { label: 'CAN-OPEN', value: 2 },
    { label: '本地IO', value: 3 },
    { label: 'CAN-IO', value: 4 },
    { label: 'GPIO', value: 5 }
  ];
  const canOptions = [
    { label: 'CAN1', value: 1 },
    { label: 'CAN2', value: 2 },
    { label: 'CAN3', value: 3 },
    { label: 'CAN4', value: 4 },
    { label: 'CAN5', value: 5 },
  ];
  
  // 添加卡片
  const addCard = () => {
    jsondata.value.Bumper.push({
        name: '请输入名称', // 用户输入名称，初始为空
        io_input: [2, 2, 2, 2, 0] // 默认值
    });
  };
  
  // 删除卡片
  const removeCard = (index) => {
    jsondata.value.Bumper.splice(index, 1);
  };
  
  // 处理类型变化
  const handleTypeChange = (index) => {
    if (![1, 2, 4].includes(jsondata.value.Bumper[index].io_input[0])) {
        jsondata.value.Bumper[index].io_input[1] = 2; // 重置路数
    }
    if (![3].includes(jsondata.value.Bumper[index].io_input[0])) {
        jsondata.value.Bumper[index].io_input[2] = 2;
        jsondata.value.Bumper[index].io_input[3] = 2;
    }
  };
  
  // 判断是否显示路数输入框
  const showRouteInput = (index) => {
    return [1, 2, 4].includes(jsondata.value.Bumper[index].io_input[0]);
  };
  
  // 判断是否显示模块编号输入框
  const showModuleInput = (index) => {
    return !isGPIO(index);
  };
  
  // 检查是否为GPIO
  const isGPIO = (index) => {
    return jsondata.value.Bumper[index].io_input[0] === 5; // GPIO 的值
  };
  
  // 检查是否为本地IO
  const isLocalIO = (index) => {
    return jsondata.value.Bumper[index].io_input[0] === 3; // 本地IO 的值
  };
  
  // 格式化 bit5
  const formatbit5 = (index) => {
    const decimal = parseInt(jsondata.value.Bumper[index].io_input[3], 16);
    jsondata.value.Bumper[index].io_input[3] = isNaN(decimal) ? 2 : parseInt(jsondata.value.Bumper[index].io_input[3], 16);
  };
  </script>
  
  <style lang="scss" scoped>
  .button-card {
    width: 22vw;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
  }
  
  .button-values {
    display: flex;
    flex-direction: column;
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