<template>
    <div v-if="switchbutton">
        <el-button @click="BeginButtonh" type="success" plain 
        :disabled=" EmgButton ">
          <span v-if="!BeginButton">启动按钮</span>
          <span v-else>启动按钮</span>
          <span :class="{ 'rotate-arrow': BeginButton }">></span>
        </el-button>

        <el-button @click="EmgButtonh" type="success" plain 
        :disabled="BeginButton ">
          <span v-if="!EmgButton">急停按钮</span>
          <span v-else>急停按钮</span>
          <span :class="{ 'rotate-arrow': EmgButton }">></span>
        </el-button>

    </div>

    <hr v-if="BeginButton || EmgButton" class="divider">


</template>

<script setup>
import { switchbutton } from '../electrical.js'
import { BeginButton } from './switch.js'
import { EmgButton } from './switch.js'



const BeginButtonh = () => {
    BeginButton.value = !BeginButton.value;
};

const EmgButtonh = () => {
    EmgButton.value = !EmgButton.value;
};


</script>

<style>
.divider {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
  }
  
  
  .rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
  }
  </style>