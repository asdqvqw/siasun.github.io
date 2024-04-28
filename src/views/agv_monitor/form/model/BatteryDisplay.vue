<template>

  <div style="margin-left: 35%; margin-top: 7%;">
  <div class="container" >
    <div id="battery" >
      <div id="charge" ></div>
      <div id="charge-level" ></div>
    </div>
    <div id="charging-time" ></div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { parsedLogData } from '../commondata.js'
import { timer_bettery } from '@/timer.js'

const fakeMsg = ref({})

const fetchFakeMsg = () => {

  fakeMsg.value = parsedLogData.value;

  drawPainting(fakeMsg.value)
  timer_bettery.value = setTimeout(() => {
    fetchFakeMsg();
  }, 20000);
}
onMounted(fetchFakeMsg)

const drawPainting = (fakeMsg) => {
  console.log('fakeMsg', fakeMsg)

  const chargeLevel = ref('')

  const charge = ref('')

  const chargingTime = ref(null)

  charge.value = document.getElementById('charge')

  chargeLevel.value = document.getElementById('charge-level')

  chargingTime.value = document.getElementById('charging-time')

  function updateAllBatteryInfo() {
    updateChargingInfo()

    //定义一个函数，用于更新电池级别信息。
    updateLevelInfo()
  }
  updateAllBatteryInfo()

  //充电时走的逻辑
  function updateChargingInfo() {
    if (fakeMsg.electricalModule.sensor.battmetr.bCharge) {
      if (charge.value && charge.value.classList) {
        charge.value.classList.add('active')
      }
      if (charge.value !== '') {
        charge.value.innerText = ''
      }
    } else {
      charge.value.classList.remove('active')
    }
  }

  // Updating battery level
  function updateLevelInfo() {
    let batteryLevel = `${(fakeMsg.electricalModule.sensor.battmetr.fCapPercent).toFixed(2)}%`

    if (charge.value && charge.value.style) {
      charge.value.style.width = batteryLevel //直接控制宽度
    }
    if (chargeLevel.value) {
      chargeLevel.value.textContent = batteryLevel //batteryLevel的值直接设置为电量
      console.log('charge.value.style.width', charge.value.style.width)
    }
  }
}



</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto Mono', monospace;
}

.container {
  position:relative;
  transform: translate(-50%, -50%);
  /* top: 30%;
  left: 50%; */
}

#battery {
  box-sizing: content-box;
  height: 3.9em;
  width: 8.75em;
  border: 0.3em solid #82c59c9f;
  margin: auto;
  border-radius: 0.3em;
  position: relative;
  display: grid;
  place-items: center;
}

#battery:before {
  position: absolute;
  content: '';
  height: 2.5em;
  width: 0.55em;
  background-color: #72af84ac;
  margin: auto;
  top: 0;
  bottom: 0;
  right: -0.8em;
  border-radius: 0 0.3em 0.3em 0;
}

#charge {
  position: absolute;
  height: 3.25em;
  width: 8.125em;
  background-color: #5db975aa;
  top: 0.3em;
  left: 0.3em;
}

#charge-level {
  position: absolute;
  font-size: 1.5em;
  font-weight: 200;
}

#charging-time {
  text-align: center;
  font-size: 0.85em;
  margin-top: 0.7em;
}

/* 拥有 active 类时，将应用一个名为 charge-animation 的动画效果，持续 3 秒钟，无限循环播放，以恒定速度播放 */
.active {
  animation: charge-animation 3s infinite linear;
}

@keyframes charge-animation {
  0% {
    width: 0;
  }

  100% {
    width: 8em;
  }
}
</style>
