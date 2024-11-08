<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref, watch } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import tongxun from './tongxun/index.vue'
import { pagenum, jsondata, raycaster } from './param/common/commondata.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
const gltfLoader = new GLTFLoader();
import wheelinfo from './tongxun/index.vue'
let controls, gridHelper, car, huanjing;
let canvasDom = ref(null);
const blinkInterval = 500; // 闪烁间隔

gltfLoader.load(
  './main/v.glb',
  (gltf) => {
    car = gltf.scene;
    scene.add(car);
    car.position.set(0, 0, 0);
    // scene.fog = new THREE.Fog(0xffffff, -3, 10); // 雾的颜色和范围

    updateVisibility();
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


renderer.setClearColor(0x000003);
//网格大小
const size = 500;
// 更新相机位置
let angle = 0;
const radius = 2;
const render = () => {

  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};


const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-2, 1, 2);
const wheelRef = ref(null);
// 存储每个部件的闪烁状态和定时器
const blinkingStates = {

};
const originalColors = new Map();
const originalColorsnav = new Map();

const moveCamera = (targetPosition, duration) => {

  const startCameraPosition = camera.position.clone();
  const startTime = performance.now();

  const animate = () => {
    const elapsedTime = performance.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    camera.position.lerpVectors(startCameraPosition, targetPosition, progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};


function processComponents(components, pageNumCondition, cameraPosition, isBlinking) {
  if (components.length <= 0) {
    return;
  }
  components.forEach(component => {
    // 检查子对象并保存原始颜色
    if (component.children.length > 0) {
      component.children.forEach(child => {
        if (child.material) {
          if (!originalColors.has(child)) {
            originalColors.set(child, child.material.color.clone());
          }
        }
      });
    }
  });
  if (pagenum.value === pageNumCondition) {
    moveCamera(cameraPosition, 1000);
    components.forEach(component => {
      if (component.children.length > 0) {
        component.children.forEach(child => {
          if (child.material) {
            console.log('Material found in child:', child.material);
            if (isBlinking) {
              // 设置为红色闪烁
              child.material.color.set(0xff0000); // 红色
            } else {
              // 恢复为原始颜色
              const originalColor = originalColors.get(child);
              if (originalColor) {
                child.material.color.copy(originalColor);
              } else {
                console.warn('Original color not found for child:', child);
              }
            }
          } else {
            console.warn('Child does not have material:', child);
          }
        });
      }

      // 处理组件的材料颜色，先检查 material 是否存在
      if (component.material) {
        if (isBlinking) {
          component.material.color.setHex(0xff0000);
        } else {
          component.material.color.setHex(0x808080);
        }
      } else {
        console.warn('Component does not have material:', component);
      }
      startBlinking(component);
    });
  }
  else {
    components.forEach(component => {
      stopBlinking(component.name);

      if (component.children.length > 0) {
        component.children.forEach(child => {
          if (child.material) {
            // 停止闪烁时恢复为正常颜色
            child.material.color.copy(originalColors.get(child));
          }
        });
      }
      if (component.material) {
        component.material.color.setHex(0x808080);
      }
    });
  }
}



// 根据 pagenum 更新可见性
const updateVisibility = () => {
  if (!car) return; // 确保 car 已加载

  // 手控设备
  const manuals = [
    car.getObjectByName('Material_16车体4-41-98'),
    car.getObjectByName('Material_3车体4-41-99'),
  ];
  console.log('manuals:',manuals)
  processComponents(manuals, 7, new THREE.Vector3(-1, 0.8, 0), false);

  // 电池
  const batteries = [
    car.getObjectByName('Material_1车体4-41-8'),
  ];
  processComponents(batteries, 6, new THREE.Vector3(0.1, -0.3, -1.2), false);
  //整车
  const allpart = [
    car // 直接使用整个车对象
  ];
  processComponents(allpart, 4, new THREE.Vector3(-2, 1, 2), false);

  //can
  const hasDatacan = jsondata.value.CanMan.canport.length > 0;
  const cans = [
    car.getObjectByName('COMPOUND001_30'),
    car.getObjectByName('COMPOUND001_27'),
    car.getObjectByName('COMPOUND001_26'),
    car.getObjectByName('COMPOUND_10'),
    car.getObjectByName('COMPOUND_9'),
    car.getObjectByName('COMPOUND_8'),
    car.getObjectByName('COMPOUND_7'),
    car.getObjectByName('COMPOUND_6'),
    car.getObjectByName('COMPOUND_5'),
    car.getObjectByName('COMPOUND001_135'),
    car.getObjectByName('COMPOUND002_14'),
    car.getObjectByName('COMPOUND003_7'),
    car.getObjectByName('COMPOUND003_12'),
    car.getObjectByName('COMPOUND002_9'),
    car.getObjectByName('COMPOUND005_11'),
  ];
  processComponents(cans, 1, new THREE.Vector3(0.1, -0.3, 1.2), !hasDatacan);

  //轮
  const hasDatawheel = jsondata.value.Kinematic.drive.length > 0;
  const wheels = [
    car.getObjectByName('leftwheel'),
    car.getObjectByName('rightwheel'),
  ];
  processComponents(wheels, 2, new THREE.Vector3(1, 0.2, 1), !hasDatawheel);

  //面板
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
  processComponents(panel, 3, new THREE.Vector3(-1, 0.8, 0), false);


  //导航
  const navs = [
    car.getObjectByName('Material_28车体4-41-135'),
  ];
  const hasDatanavs = jsondata.value.NavSys.length > 0;
  processComponents(navs, 8, new THREE.Vector3(-1, 0.3, 0), !hasDatanavs);

  //防碰
  const PLS = [
    car.getObjectByName('sickQ4'),
    car.getObjectByName('sickQ2'),
    car.getObjectByName('laser7'),
  ];
  const hasDataPLS = jsondata.value.SafetyLoop.Pls.length > 0; // 检查是否有数据
  processComponents(PLS, 5, new THREE.Vector3(1.2, 0.5, 0.2), !hasDataPLS);
  const Bumpers = [
    car.getObjectByName('Material_24车体4-41-123'),
    car.getObjectByName('Material_24车体4-41-122'),
  ];
  const hasDatabum = jsondata.value.SafetyLoop.Bumper.length > 0;
  processComponents(Bumpers, 5, new THREE.Vector3(1.2, 0.5, 0.2), !hasDatabum);
  const emg = [
    car.getObjectByName('Material_23车体4-41-119'),
    car.getObjectByName('Material_23车体4-41-117'),
  ];
  const hasDataemg = jsondata.value.SafetyLoop.Emg.length > 0;
  processComponents(emg, 5, new THREE.Vector3(1.2, 0.5, 0.2), !hasDataemg);


};

// 启动闪烁
const startBlinking = (partToHide) => {
  const partName = partToHide.name;
  if (!blinkingStates[partName]) {
    blinkingStates[partName] = { blinking: false, timeout: null };
  }

  if (blinkingStates[partName].blinking) return; // 如果已经在闪烁，直接返回

  blinkingStates[partName].blinking = true; // 标记为正在闪烁
  const toggleVisibility = () => {
    partToHide.visible = !partToHide.visible;
    blinkingStates[partName].timeout = setTimeout(toggleVisibility, blinkInterval);
  };

  toggleVisibility(); // 启动闪烁
};

// 停止闪烁
const stopBlinking = (partName) => {
  if (blinkingStates[partName] && blinkingStates[partName].blinking) {
    clearTimeout(blinkingStates[partName].timeout); // 清除定时器
    blinkingStates[partName].blinking = false; // 标记为停止闪烁
    const partToHide = car.getObjectByName(partName);
    if (partToHide) {
      partToHide.visible = true; // 确保部件是可见的
    }
  }
};


// 监听 pagenum 的变化
watch(pagenum, (newValue) => {
  updateVisibility(); // 在 pagenum 变化时更新可见性
});
watch(jsondata.value, () => {
  updateVisibility();
});
const handleMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  if (car !== undefined) {
    const intersects = raycaster.intersectObjects([car]);

    if (intersects.length > 0) {

      // infoTextX.value = event.clientX + 10;
      // infoTextY.value = event.clientY + 10;
      // infoTextVisible.value = true;

    } else {
      // infoTextVisible.value = false;
    }
  }

};
const handleMouseOut = () => {
  // infoTextVisible.value = false;
};

onMounted(() => {
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseOut);
  window.addEventListener('click', () => {
    wheelRef.value.handleMouseClickwheel(car);
  });
  canvasDom.value.appendChild(renderer.domElement);
  //网格
  gridHelper = new THREE.GridHelper(size, size);
  gridHelper.material.opacity = 0.8;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);


  controls = new OrbitControls(camera, renderer.domElement);
  // 禁用右键拖动
  controls.enablePan = false; // 禁用平移
  controls.mouseButtons.RIGHT = null; // 禁用右键

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
      <wheelinfo ref="wheelRef" />
    </div>
  </div>
</template>



<style scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
}


.canvas-container {
  width: 100%;
  height: 100%;
}
</style>
