<template>
    <div v-if="fender">
        <el-button @click="HardwareBumperh" type="success" plain 
        :disabled=" SoftBumper ">
          <span v-if="!HardwareBumper">硬件缓冲保险杠</span>
          <span v-else>硬件缓冲保险杠</span>
          <span :class="{ 'rotate-arrow': HardwareBumper }">></span>
        </el-button>

        <el-button @click="SoftBumperh" type="success" plain 
        :disabled="HardwareBumper ">
          <span v-if="!SoftBumper">可切区PLS</span>
          <span v-else>可切区PLS</span>
          <span :class="{ 'rotate-arrow': SoftBumper }">></span>
        </el-button>

    </div>

    <hr v-if="HardwareBumper || SoftBumper" class="divider">


</template>

<script setup>
import { fender } from '../electrical.js'
import { HardwareBumper } from './fender.js'
import { SoftBumper } from './fender.js'



const HardwareBumperh = () => {
    HardwareBumper.value = !HardwareBumper.value;
};

const SoftBumperh = () => {
    SoftBumper.value = !SoftBumper.value;
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