<template>
  <div class="home">
    <div class="canvas-container" ref="canvasDom"></div>
    <navcontrol></navcontrol>
    <elecontrol></elecontrol>
    <devcontrol></devcontrol>
    <tccontrol></tccontrol>
    <controlagv></controlagv>
    <screen ref="screenRef" />
    <wheelinfo ref="wheelRef" />
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { timer_agv } from '@/timer.js'
import { parsedLogData, color, raycaster } from './commondata.js'
import navcontrol from './model/nav.vue'
import elecontrol from './model/ele.vue'
import controlagv from './model/conagv.vue'
import devcontrol from './model/dev.vue'
import tccontrol from './model/tc.vue'
const coordinateHistory = ref([]);
const gltfLoader = new GLTFLoader();
import screen from './dialog_info/screen_info.vue'
import wheelinfo from './dialog_info/wheel_info.vue'
const screenRef = ref(null);
const wheelRef = ref(null);


import axios from 'axios'
import { ElMessage } from "element-plus";
const firstload = ref(false);
const responseData = ref(null) // 创建响应式变量
const fetchVelocity1 = () => {
  let userList = {
    group: 'siasun',
    account: 'test',
    password: '123456'
  }

  axios({
    method: 'post',
    url: '/api/data/easylog',
    data: JSON.stringify(userList)
  })
    .then((res) => {
      responseData.value = res.data // 将响应数据赋值给变量
      if (responseData.value.status !== 204) {
        parsedLogData.value = responseData.value;
        coordinateHistory.value.push(parsedLogData.value);
        drawlin();
        if (!firstload.value) {
          firstload.value = true;
          switch (parsedLogData.value.uAgvType) {
            case 0:
              gltfLoader.load(
                './main/test.glb',
                (gltf) => {
                  car = gltf.scene;
                  // 设置模型的位置、缩放等属性
                  // car.position.set(0, 0, 0);
                  car.scale.set(1, 0.6, 0.7);
                  car.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
                  scene.add(car);
                  animateWheel2();
                  animatelight();
                  animateWheel();

                },
                (xhr) => {
                  console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                  console.error('Error loading model:', error);
                }
              );
              break;


            default:
              gltfLoader.load(
                './main/test.glb',
                (gltf) => {
                  car = gltf.scene;
                  // 设置模型的位置、缩放等属性
                  // car.position.set(0, 0, 0);
                  car.scale.set(1, 0.6, 0.7);

                  car.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
                  scene.add(car);
                  animateWheel2();
                  animatelight();
                  animateWheel();

                },
                (xhr) => {
                  console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                  console.error('Error loading model:', error);
                }
              );
              ElMessage.error('无匹配模型，加载默认货架车');
              break;


          }
        }
      }

    })
    .catch((error) => {

    })
    .finally(() => {

    })

  timer_agv.value = setTimeout(fetchVelocity1, 500)
}

onMounted(() => {
  fetchVelocity1()
})



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


renderer.setClearColor(0xffffff);
//网格大小
const size = 500;
const render = () => {
  moveCar();
  renderer.render(scene, camera);
  controls && controls.update();
  requestAnimationFrame(render);
};

let controls, gridHelper, car;
let canvasDom = ref(null);

const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);



let previousLine = null; // 用于存储上一个线条
//开始运行
const drawlin = () => {
  // 移除上一个线条
  if (previousLine) {
    scene.remove(previousLine);
  }

  // 重新初始化画布
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0x0000FF, linewidth: 1 });
  const linePoints1 = coordinateHistory.value.map(coord => new THREE.Vector3(coord.navInfo.fRealX.toFixed(3), 0, -coord.navInfo.fRealY.toFixed(3)));
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(linePoints1);
  let line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  scene.add(line1);
  previousLine = line1;



  // render();
};




//AGV移动逻辑
const moveCar = () => {

  if (car && parsedLogData.value !== undefined && !parsedLogData.value.status) {
    const nextCoord = parsedLogData.value;
    car.position.set(nextCoord.navInfo.fRealX.toFixed(3), 0, -nextCoord.navInfo.fRealY.toFixed(3));
    const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad((nextCoord.navInfo.fRealThita * 180 / Math.PI).toFixed(3)), 0, 'XYZ');
    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
    car.setRotationFromQuaternion(targetQuaternion);
  }

};


//动画
const animateWheel2 = () => {
  car.traverse((child) => {
    if (child.name === 'screen2') {
      // 随机生成闪烁颜色
      const randomColor = Math.random() * 0xffffff;
      child.material.color.setHex(randomColor);
    }
  });

  setTimeout(animateWheel2, 500);
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

  setTimeout(animatelight, 1000);
};

//举升转盘
const animateWheel = () => {
  car.traverse((child) => {
    if (child.name === 'upDown') {
      child.rotation.y = (parsedLogData.value.equipmentInfo.rack.turn_axis.fAxisPosition / 1000).toFixed(2);
      child.position.y = parsedLogData.value.equipmentInfo.rack.lifter_axis.fAxisPosition + 1000;
    }
    if (child.name === 'leftwheel') {

      child.rotation.z += parsedLogData.value.electricalModule.kinematic.drive[0].wheel.fServoSpeed.toFixed(5) * 0.5;


    }

    if (child.name === 'rightwheel') {

      child.rotation.z += parsedLogData.value.electricalModule.kinematic.drive[1].wheel.fServoSpeed.toFixed(5) * 0.5;
    }

    if (child.name === 'turnnei') {
      if (parsedLogData.value.equipmentInfo.rack.turn_axis.bLevel) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'turnwai') {
      if (parsedLogData.value.equipmentInfo.rack.turn_axis.bZero) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'liftertop') {
      if (parsedLogData.value.equipmentInfo.rack.lifter_axis.bTop) {
        const materialred = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        child.material = materialred;
      } else {
        const materialgreen = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        child.material = materialgreen;
      }

    }

    if (child.name === 'lifterbuttom') {
      if (parsedLogData.value.equipmentInfo.rack.lifter_axis.bBottom) {
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


// 鼠标移动事件处理
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

<style>
.kkk-dialog-class {
  pointer-events: none;
}

.el-dialog {
  pointer-events: auto;
}

.el-dialog__body {
  overflow: auto;
  height: 400px;
  /* 根据需要设置高度 */
}

.ele-dialog {
  height: 60%;
  background-color: #f1f1f15d;

}



.ele-dialog .el-dialog__header {
  background-color: rgba(255, 255, 255, 0.315);

}
</style>
