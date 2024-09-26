<script setup>
import { onMounted, ref, watch } from 'vue';
import {play} from '../condata.js'

// 切换小车可见性
const toggleCarVisibility = () => {
    play.value = !play.value;
};
const isOpen = ref(false)
</script>


<template>
    <div class="drawer" :class="{ open: isOpen }">
    <el-button @click="toggleCarVisibility">播放</el-button>
    </div>
    <el-button class="toggle-button" :class="{ open: isOpen }"  @click="isOpen = !isOpen">{{ isOpen ? '×' : '通讯' }}</el-button>
</template>



<style scoped>
.drawer {
  position: absolute;
  bottom: 0;
  right: -30%;
  width: 30%;
  height: 100%;
  background-color: #5f5d5d;
  color: white;
  transition: right 0.3s ease;
  z-index: 50;
}

.drawer.open {
  right: 0;
}

.toggle-button {
  position: absolute;
  top: 20%;
  right: -0.5%;
  z-index: 40;
  background-color: #5f5d5d;
  color:rgb(255, 255, 255);
  font-size: 16px;
  transition: right 0.3s ease;
}
.toggle-button.open {
  font-size: 16px;
  right: 29%;
}
</style>

