<template>

<el-button @click="qqqqqq">aaaaaa{{ test===0?true:false }}</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { defineExpose } from 'vue';
import {test} from './asd.js'

let car = 2;
const qqqqqq = () =>{
  test.value = 2;
  console.log('2222',test.value)
  let asd =[1,2,3,4,5,6]
  console.log('333',asd[test.value-1])
  
}
defineExpose({ car });
</script>