<template>
  <div class="home">

    <div class="canvas-container" ref="canvasDom"></div>
    <div class="choose">
      <div class="choose-title">控制：</div>
    <el-button @click="followWheel">aaaaaa</el-button>
    </div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
const parsedLogData = ref([{ x: 1, y: 2, realthita: 0.1, angel: 0.1, speed: 2, top: 1 }, { x: 3, y: 5, realthita: 1.5, angel: -2.1, speed: -2, top: 5 }, { x: 2, y: 6, realthita: 3.5, angel: +1.1, speed: 2, top: 2 }
  , { x: 2, y: 1, realthita: 1.68, angel: 0, speed: 0, top: 0 }]);
const currentCoordinateIndex = ref(0)

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://asdqvqw.github.io/whwtest.github.io/draco/');
gltfLoader.setDRACOLoader(dracoLoader);


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
let renderCounter = 0;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//网格大小
const size = 500;
const render = () => {
  renderCounter++;
  if (renderCounter >= carSpeed) {
    moveCar();
    renderCounter = 0;
  }

  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};

let controls, gridHelper, car;
let canvasDom = ref(null);
// 速度
let carSpeed = 10;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

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
    startCar();
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);


const animateWheel = () => {
  car.traverse((child) => {
    if (child.name === 'leftwheel') {

      child.rotation.z += parsedLogData.value[currentCoordinateIndex.value].speed * 0.05;


    }
    if (child.name === 'rightwheel') {

      child.rotation.z += parsedLogData.value[currentCoordinateIndex.value].speed * 0.05;


    }
  });
  requestAnimationFrame(animateWheel);
};
const followWheel = () => {
  const targetScreen = car.getObjectByName('Material_2电器-接近开关M8');
  if (targetScreen) {
    console.log('11111',targetScreen.position.y)

      const offset = new THREE.Vector3(0, 100, -300); // 设置相对于屏幕的偏移量
    const targetPosition = targetScreen.localToWorld(offset);
    camera.position.copy(targetPosition);
    camera.lookAt(car.position);


  }
  requestAnimationFrame(render);
};

const animateWheel2 = () => {
  car.traverse((child) => {
    if (child.name === 'upDown') {

      child.position.y = parsedLogData.value[currentCoordinateIndex.value].top * 50 + 1000;


    }

  });
};
//开始运行
const startCar = () => {
  // 重新初始化画布
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 1 });
  const linePoints1 = parsedLogData.value.map(coord => new THREE.Vector3(coord.x, 0, -coord.y));
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(linePoints1);
  let line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  currentCoordinateIndex.value = 0;
  scene.add(line1);
  render();
};




//AGV移动逻辑
const moveCar = () => {
  if (car && parsedLogData.value[currentCoordinateIndex.value] && parsedLogData.value[currentCoordinateIndex.value + 1]) {
    currentCoordinateIndex.value++;
    const nextCoord = parsedLogData.value[currentCoordinateIndex.value];
    car.position.set(nextCoord.x, 0, -nextCoord.y);
    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData.value[currentCoordinateIndex.value].realthita), 0, 'XYZ');
    animateWheel2();
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);
  }

};



onMounted(() => {

  canvasDom.value.appendChild(renderer.domElement);
  //网格
  gridHelper = new THREE.GridHelper(size, size);
  gridHelper.material.opacity = 0.3;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

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
  width: 20%;
  background-image: url('./img/1-1-bg.png');
  background-size: 100%;
  background-position: center;
  background-color: #30499344;
  position: absolute;
  right: 0%;
  bottom: 30%;
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
  width: 50%;
  height: 20%;
  background-image: url('./img/1-1-bg.png');
  background-size: 100%;
  background-position: center;
  background-color: #30499344;
  position: absolute;
  top: 80%;
  left: 50%;
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
  width: 97%;
  top: -30%;
  position: absolute;
  font-size: 20px;
  border-radius: 10px;
  border: 5px solid transparent;
  color: rgb(7, 19, 33);
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
</style>
