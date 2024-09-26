<template>
  <div id="container" ref="container"></div>
</template>
 
<script setup>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { useRafFn } from '@vueuse/core';
 
const container = ref(null);
let camera, scene, renderer, controls, staticLabel;
 
const words = [
  'Uniapp', 'PWA','JAVA','Egg.js','React', 'Angular', 'Vue.js', 'Node.js',  'ReactNative', 'Flutter', '微前端', 'PMP', 'Three.js', 'PHP', 'Nuxt.js', 'Taro', 'Uniapp', 'PWA','JAVA','Egg.js',// Example words
 
];
 
onMounted(() => {
  init();
  createOrbitControls();
  createWords();
  createStaticLabel();  
  useRafFn(render);
});
 
function init() {
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 1, 5000);
  camera.position.set(0, 0, 1000);
 
  scene = new THREE.Scene();
 
  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);
 
  window.addEventListener('resize', onWindowResize, false);
}
 
function createOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;
}
 
function createWords() {
  const radius = 400;
  words.forEach((word, idx) => {
    const phi = Math.acos(-1 + (2 * idx) / words.length);
    const theta = Math.sqrt(words.length * Math.PI) * phi;
 
    const element = document.createElement('div');
    element.className = 'element';
    element.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    element.textContent = word;
 
    const object = new CSS3DObject(element);
    object.position.x = radius * Math.cos(theta) * Math.sin(phi);
    object.position.y = radius * Math.sin(theta) * Math.sin(phi);
    object.position.z = radius * Math.cos(phi);
    object.lookAt(camera.position);
 
    scene.add(object);
  });
}
 
function createStaticLabel() {
  const element = document.createElement('div');
  element.className = 'static';
  element.textContent = '技术能力';
  staticLabel = new CSS3DObject(element);
  staticLabel.position.set(0, 0, 0);
  scene.add(staticLabel);
}
 
function render() {
  controls.update();
  scene.children.forEach(child => {
    if (child instanceof CSS3DObject) {
      child.lookAt(camera.position);
    }
  });
  staticLabel.lookAt(camera.position);  
 
  renderer.render(scene, camera);
}
 
function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
 
onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize, false);
});
</script>
 
<style>
#container {
  position: absolute;
  top: 0;
  left: 0;
  background:#110031 ;
}
.element {
  text-align: center;
  font-family: '微软雅黑', Arial, sans-serif;
  font-size: 40px;
  line-height: 1.1;
  user-select: none;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
line-height:150px;  
  border-radius: 50%;
  background: rgba(17, 5, 30,0.8);
  border:1px dashed rgb(67, 181, 247);
}
.static {
  font-size: 70px; 
  color: #fff;  
}
 
</style>