<script setup>
import { onMounted, ref, watch } from 'vue';
import under_param from '../param/mainn.vue'
const isOpen = ref(false)
import { pagenum, raycaster } from '../param/common/commondata.js'
import { defineExpose } from 'vue';
const openparam = () => {


  isOpen.value = !isOpen.value;
  console.log('11111', isOpen.value)
  if (isOpen.value) {
    pagenum.value = 1;
  } else {
    pagenum.value = 0;
  }
}


const handleMouseClickwheel = (car) => {
  {
    const panel = [
      car.getObjectByName('screen2'),
      car.getObjectByName('Material_14车体4-41-106'),
      car.getObjectByName('Material_17车体4-41-109'),
      car.getObjectByName('Material_14车体4-41-97'),
      car.getObjectByName('Material_18车体4-41-110'),
      car.getObjectByName('Material_7车体4-41-103'),
      car.getObjectByName('Material_14车体4-41-92'),
      car.getObjectByName('Material_17车体4-41-103'),
    ];
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
      console.log('modelname1111:', intersects[0].object.name)
      panel.forEach(wheel => {
        // 检查子对象
        if (wheel.name === intersects[0].object.name) {
          isOpen.value = true;
          pagenum.value = 3;
        }

      });
    }
  }

}

defineExpose({ handleMouseClickwheel });
</script>



<template>
  <div class="drawer" :class="{ open: isOpen }">
    <under_param />
  </div>
  <el-button class="toggle-button" :class="{ open: isOpen }" @click="openparam">{{ isOpen ? '×' : '参数' }}</el-button>
</template>



<style scoped>
.drawer {
  position: absolute;
  top: 9vh;
  right: -35%;
  width: 35%;
  height: 88%;
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
  color: rgb(255, 255, 255);
  font-size: 16px;
  transition: right 0.3s ease;
}

.toggle-button.open {
  font-size: 16px;
  right: 34%;
}
</style>
