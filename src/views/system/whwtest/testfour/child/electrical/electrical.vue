<template>

    <hr v-if="toggleElect" class="divider">
      <div v-if="toggleElect">

        <el-button @click="CANbuttonh" type="info" plain 
        :disabled=" switchbutton || fender|| ServoRelay ||Batter ||Sound">
          <span v-if="!CANbutton">CAN设备</span>
          <span v-else>CAN设备</span>
          <span :class="{ 'rotate-arrow': CANbutton }">></span>
        </el-button>

        <el-button @click="switchbuttonh" type="info" plain
        :disabled="CANbutton  || fender|| ServoRelay ||Batter ||Sound">
          <span v-if="!switchbutton">开关</span>
          <span v-else>开关</span>
          <span :class="{ 'rotate-arrow': switchbutton }">></span>
        </el-button>

        <el-button @click="fenderh" type="success" plain
        :disabled="CANbutton || switchbutton || ServoRelay ||Batter ||Sound">
          <span v-if="!fender">防碰设备</span>
          <span v-else>防碰设备</span>
          <span :class="{ 'rotate-arrow': fender }">></span>
        </el-button>

        <el-button @click="ServoRelayh" type="warning" plain
        :disabled="CANbutton || switchbutton || fender ||Batter ||Sound">
          <span v-if="!ServoRelay">伺服继电器</span>
          <span v-else>伺服继电器</span>
          <span :class="{ 'rotate-arrow': ServoRelay }">></span>
        </el-button>

        <el-button @click="Batterh" type="danger" plain
        :disabled="CANbutton || switchbutton || fender|| ServoRelay  ||Sound">
          <span v-if="!Batter">电池管理</span>
          <span v-else>电池管理</span>
          <span :class="{ 'rotate-arrow': Batter }">></span>
        </el-button>

        <el-button @click="Soundh" type="primary" plain
        :disabled="CANbutton || switchbutton || fender|| ServoRelay ||Batter">
          <span v-if="!Sound">扬声器</span>
          <span v-else>扬声器</span>
          <span :class="{ 'rotate-arrow': Sound }">></span>
        </el-button>

        <hr v-if="CANbutton || switchbutton || fender|| ServoRelay ||Batter ||Sound" class="divider">

        <Canbuttone />

        <switchbuttone />

        <fendere />

        <ServoRelaye />

        <Battere />

        <Sounde />


      </div>
</template>

<script setup>
import { ref } from 'vue'
import { toggleElect } from '../../common/commondata.js'

import { CANbutton } from './electrical.js'
import { switchbutton } from './electrical.js'
import { fender } from './electrical.js'
import { ServoRelay } from './electrical.js'
import { Batter } from './electrical.js'
import { Sound } from './electrical.js'

import Canbuttone from './CANbutton/CANbutton.vue'
import switchbuttone from './switch/switch.vue'
import fendere from './fender/fender.vue'
import ServoRelaye from './ServoRelay/ServoRelay.vue'
import Battere from './Batter/Batter.vue'
import Sounde from './Sound/Sound.vue'
    
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

const Batterh = () => {
    Batter.value = !Batter.value;
};

const Soundh = () => {
    Sound.value = !Sound.value;
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