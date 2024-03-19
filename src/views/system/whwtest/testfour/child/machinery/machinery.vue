<template>

    <hr v-if="showCtrl" class="divider">
      <div v-if="showCtrl">

        <el-button @click="Operatingh" type="info" plain 
        :disabled=" VehicleModel">
          <span v-if="!Operating">运行参数</span>
          <span v-else>运行参数</span>
          <span :class="{ 'rotate-arrow': Operating }">></span>
        </el-button>

        <el-button @click="VehicleModelh" type="info" plain
        :disabled="Operating ">
          <span v-if="!VehicleModel">车体模型</span>
          <span v-else>车体模型</span>
          <span :class="{ 'rotate-arrow': VehicleModel }">></span>
        </el-button>

        <hr v-if="Operating || VehicleModel" class="divider">

        <Operatinge />
        <VehicleModele />
      </div>
</template>

<script setup>
import { ref } from 'vue'
import { showCtrl } from '../../common/commondata.js'

import { Operating } from './machinery.js'
import { VehicleModel } from './machinery.js'


import Operatinge from './Operating/Operating.vue'
import VehicleModele from './VehicleModel/VehicleModel.vue'

    
const Operatingh = () => {
    Operating.value = !Operating.value;
};

const VehicleModelh = () => {
    VehicleModel.value = !VehicleModel.value;
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