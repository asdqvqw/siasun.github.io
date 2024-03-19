<template>
    <div v-if="CANbutton">
        <el-button @click="CANoneh" type="success" plain 
        :disabled=" CANtwo || CANthree">
          <span v-if="!CANone">CAN1</span>
          <span v-else>CAN1</span>
          <span :class="{ 'rotate-arrow': CANone }">></span>
        </el-button>

        <el-button @click="CANtwoh" type="success" plain 
        :disabled="CANone  || CANthree">
          <span v-if="!CANtwo">CAN2</span>
          <span v-else>CAN2</span>
          <span :class="{ 'rotate-arrow': CANtwo }">></span>
        </el-button>

        <el-button @click="CANthreeh" type="success" plain 
        :disabled="CANone || CANtwo ">
          <span v-if="!CANthree">CAN3</span>
          <span v-else>CAN3</span>
          <span :class="{ 'rotate-arrow': CANthree }">></span>
        </el-button>
    </div>

    <hr v-if="CANone || CANtwo || CANthree" class="divider">

    <CANonee />
    <CANtwoe />
    <CANthreee />
</template>

<script setup>
import { CANbutton } from '../electrical.js'
import { CANone } from './CANbutton.js'
import { CANtwo } from './CANbutton.js'
import { CANthree } from './CANbutton.js'

import CANonee from './CANone/CANone.vue'
import CANtwoe from './CANtwo/CANtwo.vue'
import CANthreee from './CANthree/CANthree.vue'

const CANoneh = () => {
    CANone.value = !CANone.value;
};

const CANtwoh = () => {
    CANtwo.value = !CANtwo.value;
};

const CANthreeh = () => {
    CANthree.value = !CANthree.value;
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