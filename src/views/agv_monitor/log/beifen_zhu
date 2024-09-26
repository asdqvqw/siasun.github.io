<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref, watch } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import tongxun from './tongxun/index.vue'
import {play} from  './condata.js';
const gltfLoader = new GLTFLoader();

let controls, gridHelper, car, fanMesh, fanGeometry;
let canvasDom = ref(null);
gltfLoader.load(
  './main/test.glb',
  (gltf) => {
    car = gltf.scene;
    scene.add(car);
    car.position.set(0, 0, 2.5);
    const partToHide = car.getObjectByName('rightwheel'); // 替换 'partName' 为实际部件名称
    if (partToHide) {
      partToHide.visible = false;
      const partToHide1 = car.getObjectByName('rightwheel1');
      const partToHide2 = car.getObjectByName('rightwheel2');
      partToHide1.visible = false; 
      partToHide2.visible = false; 
    }
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);
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

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.setClearColor(0x000000);
//网格大小
const size = 500;
// 更新相机位置
let angle = 0;
const radius = 2;
const render = () => {

  if (play.value) {
    angle += 0.01;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle)+2;
    camera.position.y = 1; // 设置相机高度
    camera.lookAt(car.position);
  }

  
  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};



const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 1, 3);




onMounted(() => {
  canvasDom.value.appendChild(renderer.domElement);
  //网格
  gridHelper = new THREE.GridHelper(size, size);
  gridHelper.material.opacity = 0.8;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);


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




<template>
  <div class="home">
    <div class="canvas-container" ref="canvasDom">
      <tongxun></tongxun>
    </div>
  </div>
</template>



<style scoped>

</style>

