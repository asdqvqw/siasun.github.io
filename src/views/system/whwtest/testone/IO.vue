<template>
  <el-button @click="qqqqq"></el-button>
  {{ wheel }}
</template>

<script setup>

import { ref, defineProps  } from 'vue'
const props = defineProps({
    wheel: {
        type: Array,
        required: true
    }
});

const qqqqq = () =>{
  
}
</script>