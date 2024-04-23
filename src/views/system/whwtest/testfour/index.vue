<template>

  <div class="home">

    <div class="canvas-container" ref="canvasDom"></div>



    <div class="choose">
      <div class="choose-title">控制：</div>

      <div class="file-upload" v-show="importflag">
        <input ref="importInput" type="file" accept=".log" style="display: none" @change="handleFileChange" />
        <el-button @click="$refs.importInput.click()" class="buttonstyle">
          导入
        </el-button>

      </div>

      <div class="logprocess" v-show="!importflag">
        回放进度:{{
        shouldPause ?
          '请处理事件'
          : (parsedLogData[currentCoordinateIndex] === undefined ? '' : parsedLogData[currentCoordinateIndex].logDateTime)
      }}
        <input :disabled="shouldPause" type="range" style="width: 100%;" v-model="currentCoordinateIndex" min="0"
          :max=logsize step="1" @change="LogProcess">
      </div>

      <contorl></contorl>

      <div v-show="!importflag">

        <button :disabled="!paused || currentCoordinateIndex === parsedLogData.length + 1" @click="previousStep"
          class="next2playbuttonstyle" :title="paused ? '上一步' : '请暂停'"></button>
        <button :disabled="!paused || currentCoordinateIndex === parsedLogData.length - 1" @click="nextStep"
          class="nextplaybuttonstyle" :title="paused ? '下一步' : '请暂停'">
        </button>
      </div>

      <infobox></infobox>
    </div>



    <agvdevice></agvdevice>

    <ELECTOR></ELECTOR>
    <div v-if="shouldPause">
      <event></event>
    </div>
    <!-- <statistics></statistics> -->

    <agvnav></agvnav>

    <screen ref="screenRef" />
    <wheelinfo ref="wheelRef" />
    <contral></contral>
  </div>

</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import contorl from './contorl.vue'
import contral from './Contral_Net.vue'
import infobox from './Info_box.vue'
import agvdevice from './AGV_device.vue'
import agvnav from './AGV_Nav.vue'
import ELECTOR from './AGV_ELE.vue'
import event from './event.vue'
import statistics from './statistics.vue'
import screen from './dialog_info/screen_info.vue'
import wheelinfo from './dialog_info/wheel_info.vue'
import { raycaster } from './sharedata.js';
const Gundongtiao = ref(0);
const screenRef = ref(null);
const wheelRef = ref(null);

import {
  infoTextVisible, infoTextX, infoTextY
} from './sharedata.js'
import {
  updateTargetCoordinates, CCupdateTargetCoordinates, currentCoordinateIndex, parsedLogData, importflag,
  parsedLogDatabak, color
} from './sharedata.js'

import { paused, shouldPause, cameraFollow } from './sharedata.js'
import { data } from './sharedata.js'

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://asdqvqw.github.io/whwtest.github.io/draco/');
gltfLoader.setDRACOLoader(dracoLoader);
const logsize = ref(0);

//光源
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 0, 10);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 0, -10);

const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(10, 0, 0);

const light4 = new THREE.DirectionalLight(0xffffff, 1);
light4.position.set(-10, 0, 0);

const light5 = new THREE.DirectionalLight(0xffffff, 1);
light5.position.set(0, 10, 0);


let controls, gridHelper, car;
let canvasDom = ref(null);
// 速度
let carSpeed = 7;



const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

//弹窗结束
//导入LOG
const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = String(e.target.result);
    parseLog(content);
  };
  reader.readAsText(file);
};





const parseLog = (content) => {
  ElMessage.success('开始导入数据...');
  const logEntries = content.split("[INFO | ");
  for (let i = 1; i < logEntries.length; i++) {
    const logEntry = logEntries[i];
    const logDateTimeEndIndex = logEntry.indexOf("]");
    const logDateTime = logEntry.substring(0, logDateTimeEndIndex).trim();
    const logJson1 = logEntry.substring(logDateTimeEndIndex + 3).trim();
    const logJson = JSON.parse(logJson1);
    const realx = logJson.navInfo.fRealX.toFixed(3);
    const realy = logJson.navInfo.fRealY.toFixed(3);
    const realz = 0;
    const realthita = (logJson.navInfo.fRealThita * 180 / Math.PI).toFixed(3);
    const trunpan = logJson.equipmentInfo.rack.turn_axis.fAxisPosition / 1000;
    const lifter = logJson.equipmentInfo.rack.lifter_axis.fAxisPosition;
    const agvType = logJson.uAgvType;
    // //item
    // const items = logJson.item;
    // const parsedItems = [];
    // for (const item of items) {
    //   const itemName = item.name;
    //   let itemObject = {};
    //   // 遍历item对象中的键值对
    //   for (const key in item) {
    //     if (key !== "name") {
    //       const value = item[key];
    //       itemObject[key] = value;

    //     }
    //   }
    //   parsedItems.push({ itemName, itemObject });
    // }
    // //end
    // const StatisticsData = logJson.statistics;
    // , parsedItems, StatisticsData

    parsedLogData.value.push({ logDateTime, logJson, realx, realy, realthita, realz, trunpan, lifter, agvType });
    parsedLogDatabak.push({ logDateTime, logJson, realx, realy, realthita, realz, trunpan, lifter, agvType });
  }

  ElMessage.success('开始导入模型...');
  data.parsedLogData_b = parsedLogData.value;
  logsize.value = parsedLogData.value.length - 1;

  if (parsedLogData.value[0].agvType === 0) {
    gltfLoader.load(
      './main/test.glb',
      (gltf) => {
        car = gltf.scene;
        // 设置模型的位置、缩放等属性
        car.position.set(0, 0, 0);
        car.scale.set(1, 0.6, 0.7);

        car.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
        scene.add(car);
        animateWheel();
        animateWheel2();
        animatelight();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
    ElMessage.success('导入完成');
  } else {
    ElMessage.error('没有匹配模型');
  }

  importflag.value = false;
  startCar();
};

//开始运行
const startCar = () => {


  // 重新初始化画布
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
  const linePoints = parsedLogData.value.map(coord => new THREE.Vector3(coord.realx, coord.realz, -coord.realy));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  let line = new THREE.Line(lineGeometry, lineMaterial);

  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 1 });
  const linePoints1 = parsedLogData.value.map(coord => new THREE.Vector3(coord.logJson.tcInfo.iDevX / 1000, 0, -coord.logJson.tcInfo.iDevY / 1000));
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(linePoints1);
  let line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  currentCoordinateIndex.value = 0;

  scene.add(line);
  scene.add(line1);

  render();
};



//回放进度
const LogProcess = () => {
  if (car && currentCoordinateIndex.value > 0) {
    currentCoordinateIndex.value--;
    const previousCoord = parsedLogData.value[currentCoordinateIndex.value];
    car.position.set(previousCoord.realx, 0, -previousCoord.realy);

    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData.value[currentCoordinateIndex.value - 1].realthita), 0, 'XYZ');
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);
    updateTargetCoordinates();
    CCupdateTargetCoordinates();
  }
};
//单步运行
const previousStep = () => {
  if (car && paused.value && currentCoordinateIndex.value > 0) {
    currentCoordinateIndex.value--;
    const previousCoord = parsedLogData.value[currentCoordinateIndex.value];
    car.position.set(previousCoord.realx, 0, -previousCoord.realy);

    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData.value[currentCoordinateIndex.value - 1].realthita), 0, 'XYZ');
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);
    updateTargetCoordinates();
    CCupdateTargetCoordinates();
  }
};

const nextStep = () => {
  if (car && paused.value && currentCoordinateIndex.value < parsedLogData.value.length - 1) {
    currentCoordinateIndex.value++;
    const nextCoord = parsedLogData.value[currentCoordinateIndex.value];
    car.position.set(nextCoord.realx, 0, -nextCoord.realy);

    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData.value[currentCoordinateIndex.value + 1].realthita), 0, 'XYZ');
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);
    updateTargetCoordinates();
    CCupdateTargetCoordinates();
  }
};
// 鼠标移动事件处理
const handleMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  if (car !== undefined) {
    const intersects = raycaster.intersectObjects([car]);

    if (intersects.length > 0) {

      infoTextX.value = event.clientX + 10;
      infoTextY.value = event.clientY + 10;
      infoTextVisible.value = true;

    } else {
      infoTextVisible.value = false;
    }
  }

};
const handleMouseOut = () => {
  infoTextVisible.value = false;
};
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
//网格大小
const size = 500;

//AGV移动逻辑
const moveCar = () => {
  if (car && !paused.value && !shouldPause.value && parsedLogData.value[currentCoordinateIndex.value] && parsedLogData.value[currentCoordinateIndex.value + 1]) {
    currentCoordinateIndex.value++;
    const nextCoord = parsedLogData.value[currentCoordinateIndex.value];
    car.position.set(nextCoord.realx, 0, -nextCoord.realy);

    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData.value[currentCoordinateIndex.value].realthita), 0, 'XYZ');
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);

    updateTargetCoordinates();
    CCupdateTargetCoordinates();
    if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 3) {
      if (parsedLogData.value[currentCoordinateIndex.value].logJson.event.name !== "") {
        color.value = 2;
        shouldPause.value = true;
      }
    }


  }

};
let renderCounter = 0;
const render = () => {
  renderCounter++;
  if (renderCounter >= carSpeed) {
    moveCar();
    renderCounter = 0;
  }
  //镜头跟随
  if (cameraFollow.value && car) {
    camera.position.copy(car.position);
    camera.position.y += 6;
    camera.lookAt(car.position);
  }
  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};


//举升转盘
const animateWheel = () => {
  car.traverse((child) => {
    if (child.name === 'upDown') {
      child.rotation.y = parsedLogData.value[currentCoordinateIndex.value].trunpan.toFixed(2);
      child.position.y = parsedLogData.value[currentCoordinateIndex.value].lifter + 1000;
    }
    if (child.name === 'leftwheel') {

      child.rotation.z += parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[0].wheel.fServoSpeed.toFixed(5) * 0.5;


    }
    if (child.name === 'rightwheel') {

      child.rotation.z += parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[1].wheel.fServoSpeed.toFixed(5) * 0.5;


    }
    if (child.name === 'rightwheel') {

      child.rotation.z += parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[1].wheel.fServoSpeed.toFixed(5) * 0.5;
    }

    if (child.name === 'turnnei') {
      if (parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.rack.turn_axis.bLevel) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'turnwai') {
      if (parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.rack.turn_axis.bZero) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'liftertop') {
      if (parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.rack.lifter_axis.bTop) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'lifterbuttom') {
      if (parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.rack.lifter_axis.bBottom) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }
  });
  //setTimeout(animateWheel, 200);
  requestAnimationFrame(animateWheel);
};

const animateWheel2 = () => {
  car.traverse((child) => {
    if (child.name === 'screen2') {
      // 随机生成闪烁颜色
      const randomColor = Math.random() * 0xffffff;
      child.material.color.setHex(randomColor);
    }
  });

  setTimeout(animateWheel2, 200);
};
let lightflag = 1;
const animatelight = () => {
  const colorOptions = {
    1: {
      on: 0x00ff00, // 绿色
      off: 0xffffff // 原始颜色
    },
    2: {
      on: 0xff0000, // 红色
      off: 0xffffff // 原始颜色
    }
  };

  const colorData = colorOptions[color.value];
  const onColor = colorData.on;
  const offColor = colorData.off;

  const setColor = (child, color) => {
    child.traverse((subChild) => {
      if (subChild instanceof THREE.Mesh) {
        const originalColor = subChild.material.color.clone();
        subChild.material.color.set(color);
      }
    });
  };

  car.traverse((child) => {
    if (child.name === 'light') {
      if (lightflag === 1) {
        setColor(child, onColor);
      } else {
        setColor(child, offColor);
      }
    }
  });

  lightflag = 1 - lightflag; // 切换灯光状态

  setTimeout(animatelight, 500);
};

onMounted(() => {
  // 鼠标移入移出
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseOut);
  window.addEventListener('click', () => {
    screenRef.value.handleMouseClick(car);
  });
  window.addEventListener('click', () => {
    wheelRef.value.handleMouseClickwheel(car);
  });


  canvasDom.value.appendChild(renderer.domElement);
  //网格
  gridHelper = new THREE.GridHelper(size, size);
  gridHelper.material.opacity = 0.3;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
  //坐标轴及方向

  const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), size / 2, 0xff0000);
  const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), size / 2, 0x00ff00);
  const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), size / 2, 0x0000ff);
  scene.add(arrowX, arrowY, arrowZ);


  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  //光源
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);
  scene.add(light4);
  scene.add(light5);

  render();
});


</script>

<style lang="scss" scoped>
.buttonstyle {
  background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  background-position: top left;

}

.singlestep {
  top: 80px;
  position: absolute;
  left: 240px;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(246, 246, 246);
  text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
}

.logprocess {
  width: 80%;
  background-image: url('./img/1-1-bg.png');
  background-size: 100%;
  background-position: center;
  background-color: #30499300;
  position: absolute;
  right: 2%;
  bottom: 60%;
  font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
  font-size: 18px;
  color: rgb(246, 246, 246);
  border-radius: 10px;
  border: 5px solid transparent;
}



.home {
  position: fixed;
  top: 0;
  left: 0;
}


.canvas-container {
  width: 100%;
  height: 100%;
}

.choose {
  width: 100%;
  height: 20%;
  background-image: url('./img/1-1-bg.png');
  background-size: 100%;
  background-position: center;
  background-color: #30499344;
  position: absolute;
  top: 80%;
  font-size: 18px;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 5px solid transparent;

}

.choose-title {
  width: 100%;
  top: -30%;
  position: absolute;
  font-size: 20px;
  border-radius: 10px;
  border: 5px solid transparent;
  color: rgb(220, 225, 231);
  // background-color: rgb(140, 205, 229);
  padding: 10px;
  height: 11px;
  line-height: 11px;
  background-position: top left;
  text-align: center;
  background-image: url('./img/headerbg.png');
  background-size: 100%;

  background-color: #30499344;
  // /* 文字居中 */
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  // background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
  /* 使用渐变背景 */
}

.nextplaybuttonstyle {
  background-image: url('./img/xiayibu.png');
  background-position: center;
  background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  width: 70px;
  /* 根据你的需求设置按钮的宽度 */
  height: 70px;
  /* 根据你的需求设置按钮的高度 */
  border-radius: 50%;
  /* top: 20px; */
  position: absolute;
  top: 40%;
  right: 42%;
}

.nextplaybuttonstyle:disabled {
  background-image: url('./img/xiayibu.png');
  background-position: center;
  background-color: #f5eded96;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  width: 70px;
  /* 根据你的需求设置按钮的宽度 */
  height: 70px;
  /* 根据你的需求设置按钮的高度 */
  border-radius: 50%;
  /* top: 20px; */
  position: absolute;
  top: 40%;
  right: 42%;
}

.next2playbuttonstyle {
  background-image: url('./img/shangyibu.png');
  background-position: center;
  background-color: #12b2de3e;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  width: 70px;
  /* 根据你的需求设置按钮的宽度 */
  height: 70px;
  /* 根据你的需求设置按钮的高度 */
  border-radius: 50%;
  /* top: 20px; */
  position: absolute;
  top: 40%;
  left: 42%;
}

.next2playbuttonstyle:disabled {
  background-image: url('./img/shangyibu.png');
  background-position: center;
  background-color: #f5eded96;
  color: aliceblue;
  opacity: 0.7;
  /* 设置透明度的值，可以根据需求调整 */
  background-size: 100%;
  width: 70px;
  /* 根据你的需求设置按钮的宽度 */
  height: 70px;
  /* 根据你的需求设置按钮的高度 */
  border-radius: 50%;
  /* top: 20px; */
  position: absolute;
  top: 40%;
  left: 42%;
}
</style>



<style>
 .custom-dialog {
     background-image: url('./img/1-1-bg.png');
     background-color: #001034cb;
     /* 修改弹窗背景色 */
     /* animation: dialogSlideIn 0.3s ease-out forwards; */
     width: 40%;
     height: 42.5%;
     right: 0%;
     bottom: -10%;
     background-size: 100%;
     background-position: top left;
     overflow: auto;
     transform-origin: top left;
 }

 /* @keyframes dialogSlideIn {
     from {
         opacity: 0;
         transform: translateX(100%);
     }

     to {
         opacity: 1;
         transform: translateX(0);
     }
 } */

 .custom-dialog .el-dialog__body {
     color: #f0e7e7;
 }

 .custom-dialog .el-dialog__header {
     background-image: url('./img/headerbg.png');
     background-size: 100%;
     background-color: #eaeaea00;
     background-position: center;
     height: 10%;
 }

 .custom-dialog .el-dialog__header .el-dialog__title {
     color: #ddb4b4;
     text-align: center;
     margin: 0 auto;
 }
</style>








<style>
.custom-dialog2 {
    background-image: url('./img/1-1-bg.png');
    background-color: #001034cb;
    /* 修改弹窗背景色 */
    animation: dialogSlideIn 1s ease-out forwards;
    width: 30%;
    height:32.5%;
    right: 10%;
    bottom: -10%;
    background-size: 100%;
    background-position: top left;
    overflow: auto;
    transform-origin: top left;
    transform: scale(0) translateX(100%);
}


@keyframes dialogSlideIn {
    from {
        opacity: 0;
        transform: scale(0);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-dialog2 .el-dialog__body {
    color: #f0e7e7;

}

.custom-dialog2 .el-dialog__header {
    background-image: url('./img/headerbg.png');
    background-size: 100%;
    background-color: #eaeaea00;
    background-position: center;
    height: 10%;
}

.custom-dialog2 .el-dialog__header .el-dialog__title {
    color: #ddb4b4;
    text-align: center;
    margin: 0 auto;
}
</style>

<style>
.custom-dialog3 {
    background-image: url('./img/1-1-bg.png');
    background-color: #001034cb;
    /* 修改弹窗背景色 */
    animation: dialogPopUp 0.3s ease-out forwards;
    width: 40%;
    height: 42.5%;
    position: fixed;
    right: 10%;
    bottom: 10%;
    background-size: 100%;
    background-position: top left;
    overflow: auto;
    transform-origin: bottom right;
    opacity: 0;
    transform: scale(0) translateX(100%);
}

@keyframes dialogPopUp {
    from {
        opacity: 0;
        transform: scale(0);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-dialog3 .el-dialog__body {
    color: #f0e7e7;
}

.custom-dialog3 .el-dialog__header {
    background-image: url('./img/headerbg.png');
    background-size: 100%;
    background-color: #eaeaea00;
    background-position: center;
    height: 10%;
}

.custom-dialog3 .el-dialog__header .el-dialog__title {
    color: #ddb4b4;
    text-align: center;
    margin: 0 auto;
}


</style>


<style>
.kk-dialog-class {
  pointer-events: none;
}
 
.el-dialog {
  pointer-events: auto;
}
</style>