<template>

    <hr v-if="showAGV" class="divider">
      <div v-if="showAGV">

        <el-button @click="CANbuttonh" type="info" plain 
        :disabled=" switchbutton || fender|| ServoRelay ||Batter ||Sound">
          <span v-if="!CANbutton">手控盒</span>
          <span v-else>手控盒</span>
          <span :class="{ 'rotate-arrow': CANbutton }">></span>
        </el-button>

        <el-button @click="switchbuttonh" type="info" plain
        :disabled="CANbutton  || fender|| ServoRelay ||Batter ||Sound">
          <span v-if="!switchbutton">屏幕</span>
          <span v-else>屏幕</span>
          <span :class="{ 'rotate-arrow': switchbutton }">></span>
        </el-button>

        <el-button @click="fenderh" type="success" plain
        :disabled="CANbutton || switchbutton || ServoRelay ||Batter ||Sound">
          <span v-if="!fender">控制周期</span>
          <span v-else>控制周期</span>
          <span :class="{ 'rotate-arrow': fender }">></span>
        </el-button>

        <el-button @click="ServoRelayh" type="warning" plain
        :disabled="CANbutton || switchbutton || fender ||Batter ||Sound">
          <span v-if="!ServoRelay">线程超时保护</span>
          <span v-else>线程超时保护</span>
          <span :class="{ 'rotate-arrow': ServoRelay }">></span>
        </el-button>


        <hr v-if="CANbutton || switchbutton || fender|| ServoRelay " class="divider">

        <Canbuttone />



      </div>
</template>

<script setup>
import { ref } from 'vue'
import { showAGV } from '../../common/commondata.js'

import { CANbutton } from './AGV.js'
import { switchbutton } from './AGV.js'
import { fender } from './AGV.js'
import { ServoRelay } from './AGV.js'


// import Canbuttone from './CANbutton/CANbutton.vue'

    
const CANbuttonh = () => {
    CANbutton.value = !CANbutton.value;
};

const switchbuttonh = () => {
    switchbutton.value = !switchbutton.value;
};

const fenderh = () => {
    fender.value = !fender.value;
};

const ServoRelayh = () => {
    ServoRelay.value = !ServoRelay.value;
};


</script>

<style scoped>

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