<template>
    <div class="home">
      <div class="canvas-container" ref="canvasDom"></div>
      <div class="choose">
        <div class="choose-title">控制：</div>
        <div class="file-upload" v-show="importflag">
          <label for="import" class="import-label">
            <span class="label-text">导入文件</span>
            <input class="import" type="file" id="import" @change="handleFileChange" accept=".log">
          </label>
        </div>
        <div class="playorstop" v-show="!importflag">播放暂停：<n-button class="pause-n-button" :disabled="shouldPause"
            @click="togglePause">{{ paused ?
              '继续' : '暂停'
            }}</n-button></div>
        <div class="event" v-show="!importflag">事件处理: &nbsp; <n-button class="pause-n-button" :disabled="!shouldPause"
            @click="resumeCarMovement">跳过</n-button></div>
        <div class="replay" v-show="!importflag">重播：<n-button class="pause-n-button" @click="restartCar">重播</n-button></div>
        <div class="cameractrl" v-show="!importflag">镜头控制：<n-button class="pause-n-button" @click="toggleCameraFollow">{{
          cameraFollow ? '取消跟随' :
          '跟随' }}</n-button></div>
        <div class="singlestep" v-show="!importflag">单步运行：<n-button class="pause-n-button"
            :disabled="!paused || currentCoordinateIndex === parsedLogData.length + 1" @click="previousStep">{{ paused ?
              '上一步'
              : '请暂停' }}</n-button>
          <n-button class="pause-n-button" :disabled="!paused || currentCoordinateIndex === parsedLogData.length - 1"
            @click="nextStep">{{ paused ? '下一步' :
              '请暂停' }}</n-button>
        </div>
        <!-- 预留弹窗 -->
        <div v-if="showModalS" class="modal">
          <div class="modal-content">
            <n-button class="pause-n-button" @click="closeModal">关闭弹窗</n-button><br>
            <br>
            <n-button class="round-button" @click="prevItem">＜</n-button>
            <n-button class="round-button" @click="nextItem">＞</n-button><br>
  
            <div class="parsedItemsdata" v-if="parsedLogData[currentCoordinateIndex].parsedItems">
              <h2>{{ parsedLogData[currentCoordinateIndex].parsedItems[currentItemIndex_Y].itemName }}</h2>
              <div v-for="(value, key) in parsedLogData[currentCoordinateIndex].parsedItems[currentItemIndex_Y].itemObject"
                :key="key">
                {{ key }}: {{ value }}
              </div>
            </div>
  
          </div>
        </div>
        <div class="info-text" v-if="infoTextVisible" :style="{ left: infoTextX + 'px', top: infoTextY + 'px' }">
          {{ infoText }}<br>
          车体软件版本：{{ }}<br>
          车号：{{ }}<br>
          模式：{{ agvmode }}<br>
          事件：{{ event_name }}<br>
          原因：{{ event_detail }}<br>
          建议：{{ event_advise }}<br>
        </div>
      </div>
      <div class="reserve" v-show="!importflag"><n-button class="pause-n-button" @click="reservewindow">预留</n-button>
      </div>
      <div class="statistics" v-show="!importflag"><n-button class="pause-n-button"> <router-link 
                          to="/main/review/components/bbb_Aqw">
                          统计
                      </router-link></n-button>
      </div>
      <div class="info" @mouseenter="info_toggleSize" @mouseleave="info_toggleSizelev"
        :class="{ info_expanded: info_isExpanded }"
        :style="{ width: info_wh + 'px', height: info_wh + 'px', top: info_top + 'px', zIndex: info_zIndexValue }">
        <div class="info-title" :style="{ width: info_wh + 'px' }">车体设备：</div>
        <div class="local" :class="{ local_expanded: info_isExpanded }">
          当前设备状态：{{ Net_equ_uEquipmentState }}<br>
          当前设备任务号：{{ Net_equ_uEquipmentTaskID }}<br>
          当前设备任务状态：{{ Net_equ_uEquipmentTaskState }}<br>
          当前设备故障码: &nbsp;{{ Net_equ_uEquipmentTaskError }}<br>
          当前设备动作步骤: {{ Net_equ_strEquipmentTaskMessage }}<br>
          当前动作轴id: {{ }}<br>
          当前动作轴位置: {{ }}<br>
          当前动作轴开关状态: {{ }}<br>
        </div>
      </div>
      <div class="nav_con" @mouseenter="nav_con_toggleSize" @mouseleave="nav_con_toggleSizelev"
        :class="{ nav_con_expanded: nav_con_isExpanded }"
        :style="{ width: nav_con_wh + 'px', height: nav_con_wh + 'px', top: nav_con_top + 'px', zIndex: nav_con_zIndexValue }">
        <div class="nav_con-title" :style="{ width: nav_con_wh + 'px' }">导航：</div>
        <div class="nav_con-info" :class="{ nav_con_info_expanded: nav_con_isExpanded }">
          目标位置:{{ targetCoordinates }} <br>
          当前位置：{{ CCtargetCoordinates }}<br>
          理论位置：{{ nav_pos }}<br>
          左右偏差：{{ nav_LR }}<br>
          角度偏差：{{ (nav_thi * 180 / Math.PI).toFixed(3) }}<br>
        </div>
        <div class="nav_con-big" v-show="nav_con_isExpanded">
          导航软件版本：{{ nav_sversion }}<br>
          导航环境模型版本：{{ nav_mversion }}<br>
          发送速度：{{ }}<br>
          发送舵角：{{ }}<br>
        </div>
  
  
        <div class="bingzhuang" id="main1" v-show="nav_con_isExpanded" style="width: 300px; height: 300px;" ref="main1">
        </div>
      </div>
      <div class="election" @mouseenter="state_toggleSize" @mouseleave="state_toggleSizelev"
        :class="{ state_expanded: state_isExpanded }"
        :style="{ width: state_wh + 'px', height: state_wh + 'px', top: state_top + 'px', zIndex: election_zIndexValue }">
        <div class="election-title" :style="{ width: state_wh + 'px' }">电气模块：</div>
        <div class="election-info" :class="{ election_info_expanded: state_isExpanded }">
  
          保险杠状态：{{ ele_safe_bHardBumper }}<br>
          急停触发：{{ ele_safe_bEmgStop }}<br>
          pls状态：{{ ele_safe_nPlsTrig }}<br>
          二维码信息：{{ }}<br>
          惯导：{{ }}<br>
          磁导航：{{ }}<br>
          电池：{{ }}<br>
        </div>
        <div class="election-info-big" v-show="state_isExpanded">
          <div class="replay1">切换驱动单元：<n-button class="pause-n-button" @click="Cutdrive">{{ ele_dev_name }}</n-button></div>
          轮伺服实际速度：{{ ele_dev_wheel_fServoSpeed }}<br>
          轮伺服状态码：{{ ele_dev_wheel_nServoState }}<br>
          轮伺服错误码：{{ ele_dev_wheel_nServoErrCode }}<br>
          舵伺服实际位置：{{ ele_dev_steer_fServoPosition }}<br>
          舵伺服状态码：{{ ele_dev_steer_nServoState }}<br>
          舵伺服错误码：{{ ele_dev_steer_nServoErrCode }}<br>
          舵限位开关：{{ ele_dev_steer_bPositiveLimitSwt }}<br>
          舵限位开关：{{ ele_dev_steer_bNegativeLimitSwt }}<br>
          舵零位开关：{{ ele_dev_steer_bZeroSwt }}<br>
        </div>
        <div class="chart" id="main2" v-show="state_isExpanded" :style="{ width: 700 + 'px', height: 300 + 'px' }"
          ref="main2">
  
        </div>
      </div>
      <div class="other" @mouseenter="other_toggleSize" @mouseleave="other_toggleSizelev"
        :class="{ other_expanded: other_isExpanded }"
        :style="{ width: other_wh + 'px', height: other_wh + 'px', top: other_top + 'px', zIndex: other_zIndexValue }">
        <div class="other-title" :style="{ width: other_wh + 'px' }">控制台：</div>
        <div class="other-info" :class="{ other_info_expanded: other_isExpanded }">
          开始节点：{{ Net_Info_uFromNode }}<br>
          目标节点：{{ Net_Info_uToNode }}<br>
          当前进度量：{{ Net_Info_sProgress }}<br>
          当前设置速度：{{ Net_Info_CurSpeed }}<br>
          货物状态：{{ Net_Info_usCargoState }}<br>
        </div>
        <div class="other-info-big" v-show="other_isExpanded">
          工作状态：{{ Net_Info_WorkState }}<br>
          1级故障码:{{ Net_Info_EventState }}<br>
          2级故障码:{{ Net_Info_EventDetail }}<br>
          电池状态：{{ Net_Info_usBatterState }}<br>
          任务状态：{{ Net_Info_TaskState }}<br>
          任务号：{{ Net_Info_TaskID }}<br>
          动作key：{{ Net_Info_Key }}<br>
          heading:{{ Net_Info_Head }}<br>
          <!-- 心跳：<div class="other-light" :class="{ 'other-on': heartisOn }"></div> -->
          下发信息类型：{{ }}<br>
        </div>
      </div>
    </div>
  </template>
        
  <script setup>
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import * as echarts from 'echarts';
  import { onMounted, ref } from 'vue';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
  import { useRouter } from 'vue-router';
  import { data } from './sharedata.js'
  import {modbusscreendatajson} from './modbusscreen.js'
  const arouter = useRouter();
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://asdqvqw.github.io/whwtest.github.io/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);
  
  //心跳
  const heartisOn = ref(false);
  onMounted(() => {
    setInterval(() => {
      heartisOn.value = !heartisOn.value;
    }, 500);
  
  });
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
  
  const directionalLight = new THREE.DirectionalLight(0xFF0000, 2);
  directionalLight.position.set(0, 1, 0);
  
  //模块样式
  let jsonData = ref('');
  let other_wh = ref(400);
  let other_top = ref(360);
  let state_wh = ref(400);
  let state_top = ref(360);
  let nav_con_wh = ref(400);
  let nav_con_top = ref(0);
  let info_wh = ref(400);
  let info_top = ref(0);
  let other_zIndexValue = ref(50);
  let election_zIndexValue = ref(50);
  let nav_con_zIndexValue = ref(50);
  let info_zIndexValue = ref(50);
  const other_isExpanded = ref(false);
  const state_isExpanded = ref(false);
  const nav_con_isExpanded = ref(false);
  const info_isExpanded = ref(false);
  
  const other_toggleSize = () => {
    other_isExpanded.value = true;
    other_zIndexValue.value = 100;
    other_wh.value = 700;
    other_top.value = 50;
  };
  const other_toggleSizelev = () => {
    other_isExpanded.value = false;
    other_zIndexValue.value = 50;
    other_wh.value = 400;
    other_top.value = 360;
  };
  const state_toggleSize = () => {
    state_isExpanded.value = true;
    election_zIndexValue.value = 100;
    state_wh.value = 700;
    state_top.value = 50;
  };
  const state_toggleSizelev = () => {
    state_isExpanded.value = false;
    election_zIndexValue.value = 50;
    state_wh.value = 400;
    state_top.value = 360;
  };
  const nav_con_toggleSize = () => {
    nav_con_isExpanded.value = true;
    nav_con_zIndexValue.value = 100;
    nav_con_wh.value = 600;
  
  };
  const nav_con_toggleSizelev = () => {
    nav_con_isExpanded.value = false;
    nav_con_zIndexValue.value = 50;
    nav_con_wh.value = 400;
  };
  const info_toggleSize = () => {
    info_isExpanded.value = true;
    info_zIndexValue.value = 100;
    info_wh.value = 600;
  
  };
  const info_toggleSizelev = () => {
    info_isExpanded.value = false;
    info_zIndexValue.value = 50;
    info_wh.value = 400;
  };
  
  
  
  //初始化变量
  //图表
  const main1 = ref(null);
  const main2 = ref(null);
  //相机跟随
  let cameraFollow = ref(false);
  // 目标点坐标字符串
  let targetCoordinates = ref('');
  // 当前点坐标字符串
  let CCtargetCoordinates = ref('');
  //AGV状态
  let agvmode = ref('');
  let event_name = ref('');
  let event_detail = ref('');
  let event_advise = ref('');
  //理论位置---导航
  let nav_pos = ref('');
  let nav_LR = ref('');
  let nav_thi = ref('');
  let nav_sversion = ref('');
  let nav_mversion = ref('');
  
  //Net数据
  let Net_Info_Head = ref('');
  let Net_Info_CurSpeed = ref('');
  let Net_Info_WorkState = ref('');
  let Net_Info_EventState = ref('');
  let Net_Info_EventDetail = ref('');
  let Net_Info_TaskID = ref('');
  let Net_Info_Key = ref('');
  let Net_Info_TaskState = ref('');
  let Net_Info_sProgress = ref('');
  let Net_Info_uFromNode = ref('');
  let Net_Info_uToNode = ref('');
  let Net_Info_usCargoState = ref('');
  let Net_Info_usBatterState = ref('');
  
  //设备
  let Net_equ_strEquipmentTaskMessage = ref('');
  let Net_equ_uEquipmentState = ref('');
  let Net_equ_uEquipmentTaskError = ref('');
  let Net_equ_uEquipmentTaskID = ref('');
  let Net_equ_uEquipmentTaskState = ref('');
  
  //电器模块
  //安全模块
  let ele_safe_bEmgStop = ref('');
  let ele_safe_bHardBumper = ref('');
  let ele_safe_nPlsTrig = ref('');
  //轮舵
  let ele_dev_name = ref('驱动轴');
  let ele_dev_count = ref('');
  let ele_dev_Dcount = 0;
  let ele_dev_wheel_fServoSpeed = ref('');
  let ele_dev_wheel_nServoErrCode = ref('');
  let ele_dev_wheel_nServoState = ref('');
  
  let ele_dev_steer_fServoPosition = ref('');
  let ele_dev_steer_nServoState = ref('');
  let ele_dev_steer_nServoErrCode = ref('');
  let ele_dev_steer_bPositiveLimitSwt = ref('');
  let ele_dev_steer_bNegativeLimitSwt = ref('');
  let ele_dev_steer_bZeroSwt = ref('');
  
  
  let controls, gridHelper, car;
  let canvasDom = ref(null);
  // 速度
  let carSpeed = 7;
  //导入文档进度
  let importflag = ref(true);
  //暂停
  let paused = ref(false);
  //事件跳过
  let shouldPause = ref(false);
  //infobox
  let infoTextTime = ref('');
  let infoText = ref('');
  let infoTextVisible = ref(false);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  //鼠标相关
  let infoTextX = ref(0);
  let infoTextY = ref(0);
  let currentCoordinateIndex = 0;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 6);
  //预留弹窗
  let currentItemIndex_Y = ref(0);
  let showModalS = ref(false);
  const closeModal = () => {
    showModalS.value = false;
  };
  const reservewindow = () => {
    showModalS.value = true;
  };
  const prevItem = () => {
    if (currentItemIndex_Y.value > 0) {
      currentItemIndex_Y.value--;
    }
  };
  const nextItem = () => {
    if (currentItemIndex_Y.value < parsedLogData[currentCoordinateIndex].parsedItems.length - 1) {
      currentItemIndex_Y.value++;
    }
  };
  
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
  
  const logData = ref(null);
  let parsedLogData = [];
  const parsedLogDatabak = [];
  
  
  const parseLog = (content) => {
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
  
      //item
      const items = logJson.item;
      const parsedItems = [];
      for (const item of items) {
        const itemName = item.name;
        let itemObject = {};
        // 遍历item对象中的键值对
        for (const key in item) {
          if (key !== "name") {
            const value = item[key];
            itemObject[key] = value;
  
          }
        }
        parsedItems.push({ itemName, itemObject });
      }
      //end
  
      const StatisticsData = logJson.statistics;
      const logDateTimea = 0;
      parsedLogData.push({ logDateTime, logDateTimea, logJson, realx, realy, realthita, realz, parsedItems, StatisticsData });
      parsedLogDatabak.push({ logDateTime, logDateTimea, logJson, realx, realy, realthita, realz, parsedItems, StatisticsData });
    }
  
    logData.value = parsedLogData;
    importflag.value = false;
    jsonData.value = parsedLogData[0].logJson.electricalModule.kinematic.drive[0].wheel;
    data.parsedLogData_b = parsedLogData;
    startCar();
  };
  
  //开始运行
  const startCar = () => {
    // 重新初始化画布
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
    const linePoints = parsedLogData.map(coord => new THREE.Vector3(coord.realx, coord.realz, coord.realy));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    let line = new THREE.Line(lineGeometry, lineMaterial);
  
    const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 1 });
    const linePoints1 = parsedLogData.map(coord => new THREE.Vector3(coord.logJson.tcInfo.iDevX / 1000, 0, coord.logJson.tcInfo.iDevY / 1000));
    const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(linePoints1);
    let line1 = new THREE.Line(lineGeometry1, lineMaterial1);
    currentCoordinateIndex = 0;
    // currentProgress = 0;
    scene.add(line);
    scene.add(line1);
    scene.add(car);
  
  
    render();
  };
  //镜头跟随
  const toggleCameraFollow = () => {
    cameraFollow.value = !cameraFollow.value;
  
    if (cameraFollow.value) {
      controls.enabled = false;
    } else {
      controls.enabled = true;
    }
  };
  //事件跳过
  const resumeCarMovement = () => {
    if (shouldPause.value) {
      const event = parsedLogData[currentCoordinateIndex].logJson.event.name;
      while (parsedLogData[currentCoordinateIndex].logJson.event.name === event) {
        if (currentCoordinateIndex === parsedLogData.length - 1) {
          break;
        }
        if (currentCoordinateIndex === 0) {
          break;
        }
        currentCoordinateIndex++;
      }
      // car.material.color.set(0x00ff00);
      scene.remove(directionalLight);
      scene.add(light1);
      scene.add(light2);
      scene.add(light3);
      scene.add(light4);
      scene.add(light5);
      shouldPause.value = false;
    }
  };
  //暂停
  const togglePause = () => {
    paused.value = !paused.value;
  };
  //重播
  
  const restartCar = () => {
    currentCoordinateIndex = 0;
    parsedLogData = [];
    parsedLogData = parsedLogDatabak.concat();
  };
  //infobox
  const updateTargetCoordinates = () => {
    if (currentCoordinateIndex < parsedLogData.length - 1) {
      const targetPoint = parsedLogData[currentCoordinateIndex + 1];
      targetCoordinates.value = `(x=${targetPoint.realx},  y=${-targetPoint.realy}, thita=${targetPoint.realthita})`;
  
    } else {
      targetCoordinates.value = '';
    }
    nav_pos.value = `(x=${parsedLogData[currentCoordinateIndex].logJson.tcInfo.iDevX},y=${parsedLogData[currentCoordinateIndex].logJson.tcInfo.iDevY})`;
    //导航
    nav_LR.value = parsedLogData[currentCoordinateIndex].logJson.navInfo.fXDev.toFixed(4);
    nav_thi.value = parsedLogData[currentCoordinateIndex].logJson.navInfo.fThitaDev.toFixed(4);
    nav_sversion.value = parsedLogData[currentCoordinateIndex].logJson.navInfo.swVersion;
    nav_mversion.value = parsedLogData[currentCoordinateIndex].logJson.navInfo.fmVersion;
    //状态
    if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 0) {
      agvmode.value = '加载中';
    } else if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 1) {
      agvmode.value = '空闲';
    } else if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 2) {
      agvmode.value = '手动';
    } else if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 3) {
      agvmode.value = '自动';
    }
    //事件
    event_name.value = parsedLogData[currentCoordinateIndex].logJson.event.name;
    event_detail.value = parsedLogData[currentCoordinateIndex].logJson.event.detail;
    event_advise.value = parsedLogData[currentCoordinateIndex].logJson.event.advise;
    //控制台
    Net_Info_Head.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.sHeading;
    Net_Info_CurSpeed.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.sCurSpeed;
    Net_Info_WorkState.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.uWorkState;
    if (Net_Info_WorkState.value === 1) {
      Net_Info_WorkState.value = '运行';
    } else if (Net_Info_WorkState.value === 2) {
      Net_Info_WorkState.value = '挂起';
    } else if (Net_Info_WorkState.value === 3) {
      Net_Info_WorkState.value = '静态OP';
    } else if (Net_Info_WorkState.value === 4) {
      Net_Info_WorkState.value = '充电';
    } else if (Net_Info_WorkState.value === 5) {
      Net_Info_WorkState.value = '等待';
    } else if (Net_Info_WorkState.value === 6) {
      Net_Info_WorkState.value = '睡眠';
    } else if (Net_Info_WorkState.value === 0) {
      Net_Info_WorkState.value = '空闲';
    } else if (Net_Info_WorkState.value === 7) {
      Net_Info_WorkState.value = '唤醒';
    }
  
    Net_Info_EventState.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.ucEventState;
    switch (Net_Info_EventState.value) {
      case 0:
        Net_Info_EventState.value = '无故障';
        break;
      // case 0:
      // Net_Info_EventState.value = '导航信号丢失';
      //   break;
      case 1:
        Net_Info_EventState.value = ' 自旋误差超限';
        break;
      case 2:
        Net_Info_EventState.value = '导航误差超限';
        break;
      case 3:
        Net_Info_EventState.value = '位置校验失败';
        break;
      case 4:
        Net_Info_EventState.value = '地标信号异常';
        break;
      case 5:
        Net_Info_EventState.value = '磁导航通讯超时';
        break;
      case 6:
        Net_Info_EventState.value = '惯导信息故障';
        break;
      case 7:
        Net_Info_EventState.value = '定位模块通讯中断';
        break;
      case 30:
        Net_Info_EventState.value = 'CAN通讯超时';
        break;
      case 31:
        Net_Info_EventState.value = 'CanOpen伺服故障';
        break;
      case 32:
        Net_Info_EventState.value = '舵碰限位';
        break;
      case 33:
        Net_Info_EventState.value = '车轮过热';
        break;
      case 34:
        Net_Info_EventState.value = '自制伺服故障';
        break;
      case 35:
        Net_Info_EventState.value = 'Mcu重启';
        break;
      case 36:
        Net_Info_EventState.value = 'IO检测板故障';
        break;
      case 37:
        Net_Info_EventState.value = '机械臂网络连接断开';
        break;
      case 60:
        Net_Info_EventState.value = '车载设备故障';
        break;
      case 61:
        Net_Info_EventState.value = '设备车体互锁';
        break;
      case 90:
        Net_Info_EventState.value = '伺服电源故障';
        break;
      case 91:
        Net_Info_EventState.value = '用户紧急停车';
        break;
      case 92:
        Net_Info_EventState.value = '硬件保险杠碰撞';
        break;
      case 93:
        Net_Info_EventState.value = 'PLS近距离急停';
        break;
      case 94:
        Net_Info_EventState.value = 'PLS中距离停车';
        break;
      case 95:
        Net_Info_EventState.value = 'PLS切区错误';
        break;
      case 96:
        Net_Info_EventState.value = '3D相机状态错误';
        break;
      case 97:
        Net_Info_EventState.value = '软pls状态错误';
        break;
      case 120:
        Net_Info_EventState.value = '控制台挂起';
        break;
      case 121:
        Net_Info_EventState.value = '网络通讯超时';
        break;
      case 122:
        Net_Info_EventState.value = '控制台任务删除';
        break;
      case 123:
        Net_Info_EventState.value = '禁止上线';
        break;
      case 124:
        Net_Info_EventState.value = 'AGV紧急停车';
        break;
      case 125:
        Net_Info_EventState.value = '任务错误';
        break;
      case 150:
        Net_Info_EventState.value = '电池电量低';
        break;
      case 151:
        Net_Info_EventState.value = '电池电量太低';
        break;
      case 152:
        Net_Info_EventState.value = '充电失败';
        break;
      case 153:
        Net_Info_EventState.value = '电池系统故障';
        break;
      case 180:
        Net_Info_EventState.value = '地图信息错误';
        break;
      case 210:
        Net_Info_EventState.value = '用户暂停';
        break;
    }
  
  
  
  
  
  
  
  
  
  
    Net_Info_EventDetail.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.usEventDetail;
    if (Net_Info_EventDetail.value === 0) {
      Net_Info_EventDetail.value = '无故障';
    }
    Net_Info_TaskID.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.usTaskID;
    Net_Info_Key.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.usKey;
    Net_Info_TaskState.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.ucTaskState;
    if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 3) {
      if (Net_Info_TaskState.value === 1) {
        Net_Info_TaskState.value = '开始';
      } else if (Net_Info_TaskState.value === 2) {
        Net_Info_TaskState.value = '运行中';
      } else if (Net_Info_TaskState.value === 3) {
        Net_Info_TaskState.value = '结束';
      }
  
  
    } else {
      Net_Info_TaskState.value = '无任务';
    }
  
  
    Net_Info_usCargoState.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.usCargoState;
    if (Net_Info_usCargoState.value === 0) {
      Net_Info_usCargoState.value = '未载货';
    } else if (Net_Info_usCargoState.value === 1) {
      Net_Info_usCargoState.value = '载货';
    }
    Net_Info_usBatterState.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.usBatterState;
    if (Net_Info_usBatterState.value === 0) {
      Net_Info_usBatterState.value = '无需充电';
    } else if (Net_Info_usBatterState.value === 1) {
      Net_Info_usBatterState.value = '正常电量';
    } else if (Net_Info_usBatterState.value === 2) {
      Net_Info_usBatterState.value = '电量低';
    } else if (Net_Info_usBatterState.value === 3) {
      Net_Info_usBatterState.value = '电量极低';
    }
    Net_Info_uFromNode.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.uFromNode;
    Net_Info_uToNode.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.uToNode;
    Net_Info_sProgress.value = parsedLogData[currentCoordinateIndex].logJson.tcInfo.sProgress;
  
  
  
    Net_equ_uEquipmentState.value = parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.uEquipmentState;
    if (Net_equ_uEquipmentState.value === 0) {
      Net_equ_uEquipmentState.value = '其他';
    } else if (Net_equ_uEquipmentState.value === 1) {
      Net_equ_uEquipmentState.value = '开始';
    } else if (Net_equ_uEquipmentState.value === 2) {
      Net_equ_uEquipmentState.value = '暂停';
    } else if (Net_equ_uEquipmentState.value === 3) {
      Net_equ_uEquipmentState.value = '结束';
    }
    Net_equ_uEquipmentTaskError.value = parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.uEquipmentTaskError;
    if (Net_equ_uEquipmentTaskError.value === 0) {
      Net_equ_uEquipmentTaskError.value = '无故障';
    }
    Net_equ_uEquipmentTaskID.value = parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.uEquipmentTaskID;
  
    if (Net_equ_uEquipmentTaskID.value === 0) {
      Net_equ_uEquipmentTaskState.value = '无任务';
      Net_equ_strEquipmentTaskMessage.value = '无';
    } else {
      //设备
      Net_equ_strEquipmentTaskMessage.value = parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.strEquipmentTaskMessage;
      const keyToValueMap = modbusscreendatajson.AgvEquipmentInfo.reduce((map, item) => {
        map[item.Key] = item.value;
        return map;
      }, {});
      const convertedValue = keyToValueMap[Net_equ_strEquipmentTaskMessage.value] || "";
      Net_equ_strEquipmentTaskMessage.value = convertedValue;
  
  
      Net_equ_uEquipmentTaskState.value = parsedLogData[currentCoordinateIndex].logJson.equipmentInfo.uEquipmentTaskState;
  
      if (Net_equ_uEquipmentTaskState.value === 0) {
        Net_equ_uEquipmentTaskState.value = '运行中';
      } else if (Net_equ_uEquipmentTaskState.value === 1) {
        Net_equ_uEquipmentTaskState.value = '结束';
      } else if (Net_equ_uEquipmentTaskState.value === -1) {
        Net_equ_uEquipmentTaskState.value = '无任务';
      }
    }
  
  
    //安全回路
    ele_safe_bEmgStop.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.safeCheck.bEmgStop;
    ele_safe_bHardBumper.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.safeCheck.bHardBumper;
    ele_safe_nPlsTrig.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.safeCheck.nPlsTrig;
    if (!ele_safe_bEmgStop.value) {
      ele_safe_bEmgStop.value = '未触发';
    } else {
      ele_safe_bEmgStop.value = '触发';
    }
  
    if (!ele_safe_bHardBumper.value) {
      ele_safe_bHardBumper.value = '未触发';
    } else {
      ele_safe_bHardBumper.value = '触发';
    }
  
    if (ele_safe_nPlsTrig.value === 0) {
      ele_safe_nPlsTrig.value = '未触发';
    } else if (ele_safe_nPlsTrig.value === 1) {
      ele_safe_nPlsTrig.value = '近';
    } else if (ele_safe_nPlsTrig.value === 2) {
      ele_safe_nPlsTrig.value = '中';
    } else if (ele_safe_nPlsTrig.value === 3) {
      ele_safe_nPlsTrig.value = '远';
    }
  
    //轮舵
    ele_dev_count.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.nDriveCount;
    if (parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].wheel !== undefined) {
      ele_dev_wheel_fServoSpeed.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].wheel.fServoSpeed.toFixed(5);
      ele_dev_wheel_nServoErrCode.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].wheel.nServoErrCode;
      switch (ele_dev_wheel_nServoErrCode.value) {
        case 0:
          ele_dev_wheel_nServoErrCode.value = '无错误';
          break;
        case 100:
          ele_dev_wheel_nServoErrCode.value = 'Motec 系统故障/Kinco 内部错误报警';
          break;
        case 101:
          ele_dev_wheel_nServoErrCode.value = ' Motec 驱动器启动故障/Kinco 编码器ABZ连接报警';
          break;
        case 102:
          ele_dev_wheel_nServoErrCode.value = 'Motec 参数错误/Kinco 编码器UVW连接报警';
          break;
        case 103:
          ele_dev_wheel_nServoErrCode.value = ' Motec 欠压报警/Kinco  编码器计数报警';
          break;
        case 104:
          ele_dev_wheel_nServoErrCode.value = 'Motec 过压报警/Kinco 温度报警';
          break;
        case 105:
          ele_dev_wheel_nServoErrCode.value = ' Motec I2T报警/Kinco 高压报警';
          break;
        case 106:
          ele_dev_wheel_nServoErrCode.value = ' Motec 超过峰值电流/Kinco 低压报警';
          break;
        case 107:
          ele_dev_wheel_nServoErrCode.value = ' Motec 位置误差超限/Kinco 过流报警';
          break;
        case 108:
          ele_dev_wheel_nServoErrCode.value = 'Motec 编码器故障/Kinco 吸收电阻报警';
          break;
        case 109:
          ele_dev_wheel_nServoErrCode.value = 'Motec 速度误差超限/Kinco 位置误差过大报警';
          break;
        case 110:
          ele_dev_wheel_nServoErrCode.value = 'Kinco 逻辑低压报警';
          break;
        case 111:
          ele_dev_wheel_nServoErrCode.value = ' Kinco 电机或驱动器iit报警';
          break;
        case 112:
          ele_dev_wheel_nServoErrCode.value = ' Kinco 脉冲频率过高报警';
          break;
        case 113:
          ele_dev_wheel_nServoErrCode.value = 'Kinco STO错误';
          break;
        case 114:
          ele_dev_wheel_nServoErrCode.value = 'Kinco 电机励磁报警';
          break;
        case 115:
          ele_dev_wheel_nServoErrCode.value = 'Motec 电机没有使能/Kinco 存储器报警';
          break;
      }
  
  
      ele_dev_wheel_nServoState.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].wheel.nServoState;
    }
    if (parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer !== undefined) {
      console.log(parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer);
      ele_dev_steer_fServoPosition.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.fServoPosition.toFixed(5);
      ele_dev_steer_nServoState.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.nServoState;
      ele_dev_steer_nServoErrCode.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.nServoErrCode;
      ele_dev_steer_bPositiveLimitSwt.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.bPositiveLimitSwt;
      ele_dev_steer_bNegativeLimitSwt.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.bNegativeLimitSwt;
      ele_dev_steer_bZeroSwt.value = parsedLogData[currentCoordinateIndex].logJson.electricalModule.kinematic.drive[ele_dev_Dcount].steer.bZeroSwt;
    }
  
  };
  const CCupdateTargetCoordinates = () => {
    if (currentCoordinateIndex < parsedLogData.length - 1) {
      const targetPoint = parsedLogData[currentCoordinateIndex];
      infoTextTime.value = `(${targetPoint.logDateTime})`;
      CCtargetCoordinates.value = `(${targetPoint.realx}, ${-targetPoint.realy}, ${targetPoint.realthita})`;
    } else {
      CCtargetCoordinates.value = '';
      infoTextTime.value = '';
    }
  };
  //切换轴
  const Cutdrive = () => {
    if (ele_dev_Dcount < ele_dev_count.value - 1) {
      ele_dev_Dcount++;
    } else {
      ele_dev_Dcount = 0;
    }
    console.log(ele_dev_Dcount);
    ele_dev_name.value = '驱动轴' + ele_dev_Dcount.toString();
    updateTargetCoordinates();
    CCupdateTargetCoordinates();
  };
  //单步运行
  const previousStep = () => {
    if (car && paused.value && currentCoordinateIndex > 0) {
      currentCoordinateIndex--;
      const previousCoord = parsedLogData[currentCoordinateIndex];
      car.position.set(previousCoord.realx, 0, previousCoord.realy);
  
      const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData[currentCoordinateIndex - 1].realthita), 0, 'XYZ');
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
      car.setRotationFromQuaternion(targetQuaternion);
      updateTargetCoordinates();
      CCupdateTargetCoordinates();
    }
  };
  
  const nextStep = () => {
    if (car && paused.value && currentCoordinateIndex < parsedLogData.length - 1) {
      currentCoordinateIndex++;
      const nextCoord = parsedLogData[currentCoordinateIndex];
      car.position.set(nextCoord.realx, 0, nextCoord.realy);
  
      const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData[currentCoordinateIndex + 1].realthita), 0, 'XYZ');
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
    const intersects = raycaster.intersectObjects([car]);
  
    if (intersects.length > 0) {
      infoText.value = 'AGV状态:';
      infoTextX.value = event.clientX + 10;
      infoTextY.value = event.clientY + 10;
      infoTextVisible.value = true;
  
    } else {
      infoTextVisible.value = false;
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
    if (car && !showModalS.value && !paused.value && !shouldPause.value && parsedLogData[currentCoordinateIndex] && parsedLogData[currentCoordinateIndex + 1]) {
      currentCoordinateIndex++;
      const nextCoord = parsedLogData[currentCoordinateIndex];
      car.position.set(nextCoord.realx, 0, nextCoord.realy);
  
      const targetEuler = new THREE.Euler(0, THREE.MathUtils.degToRad(parsedLogData[currentCoordinateIndex + 1].realthita), 0, 'XYZ');
  
  
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);
      car.setRotationFromQuaternion(targetQuaternion);
      updateTargetCoordinates();
      CCupdateTargetCoordinates();
      if (parsedLogData[currentCoordinateIndex].logJson.nAgvState === 3) {
        if (parsedLogData[currentCoordinateIndex].logJson.event.name !== "") {
          scene.remove(light1);
          scene.remove(light2);
          scene.remove(light3);
          scene.remove(light4);
          scene.remove(light5);
          scene.add(directionalLight);
          // car.material.color.set(0xff0000);
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
  //饼状图
  const data_bing = [
    { value: Math.round(Math.random() * 1000), name: '占用一' },
    { value: Math.round(Math.random() * 1000), name: '占用二' },
    { value: Math.round(Math.random() * 1000), name: '占用三' },
    { value: Math.round(Math.random() * 1000), name: '占用四' },
    { value: Math.round(Math.random() * 1000), name: '占用五' },
  ];
  
  const options_bing = {
    title: {
      text: '占用',
      textStyle: {
        color: 'black',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: data_bing.map((item) => item.name),
    },
    series: [
      {
        name: '测试数据',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: data_bing,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  //统计图
  const time = (() => {
    let now = new Date();
    let res = [];
    let len = 5;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
      now = new Date(+now - 500);
    }
    return res;
  })();
  
  const dataOne = (() => {
    let res = [];
    let len = 5;
    while (len--) {
      res.push(Math.round(Math.random() * 1000));
    }
    return res;
  })();
  
  const dataTwo = (() => {
    let res = [];
    let len = 5;
    while (len--) {
      res.push(Math.round(Math.random() * 1000));
    }
    return res;
  })();
  
  let options = {
    title: {
      text: '车速',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        magicType: { type: ['bar', 'line', 'stack'] },
        restore: {},
        saveAsImage: {},
      },
      bottom: 10,
    },
  
    xAxis: {
      type: 'category',
      data: time,
      boundaryGap: true,
    },
    yAxis: {
      type: 'value',
  
    },
    series: [
      {
        data: dataOne,
        type: 'line',
        name: '实际',
        color: 'green',
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
        },
      },
      {
        data: dataTwo,
        name: '理论',
        type: 'line',
        color: 'yellow',
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
        },
      },
    ],
  };
  gltfLoader.load(
    'https://asdqvqw.github.io/whwtest.github.io/kivastation.gltf',
    (gltf) => {
      let huojiacar = gltf.scene;
      // 设置模型的位置、缩放等属性
      huojiacar.position.set(9.25, 0, 1.7);
      huojiacar.scale.set(1.5, 0.8, 0.8);
  
      // huojiacar.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
      scene.add(huojiacar);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  
  gltfLoader.load(
    'https://asdqvqw.github.io/whwtest.github.io/kivastation.gltf',
    (gltf) => {
      let huojiacar2 = gltf.scene;
      // 设置模型的位置、缩放等属性
      huojiacar2.position.set(9.1, 0, -3.5);
      huojiacar2.scale.set(1.5, 0.8, 0.8);
  
      huojiacar2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
      scene.add(huojiacar2);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  gltfLoader.load(
    'https://asdqvqw.github.io/whwtest.github.io/ghcar2.gltf',
    (gltf) => {
      car = gltf.scene;
      // 设置模型的位置、缩放等属性
      car.position.set(0, 0, 0);
      car.scale.set(1, 0.5, 0.5);
  
      car.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
      scene.add(car);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  onMounted(() => {
    const myChart = echarts.init(main1.value);
  
    setInterval(() => {
      data_bing.forEach((item) => {
        item.value = Math.round(Math.random() * 1000);
      });
  
      myChart.setOption({
        series: [
          {
            data: data_bing,
          },
        ],
      });
  
    }, 1000);
  
    myChart.setOption(options_bing);
  });
  
  onMounted(() => {
    const myChart = echarts.init(main2.value);
  
    setInterval(() => {
      let data1 = (ele_dev_wheel_fServoSpeed.value * 1000).toFixed(2);
      let nowTime = new Date().toLocaleTimeString().replace(/^\D*/, '');
      time.shift();
      time.push(nowTime);
      dataOne.shift();
      dataOne.push(data1);
      dataTwo.shift();
      dataTwo.push(Net_Info_CurSpeed);
  
      myChart.setOption({
        xAxis: [
          {
            data: time,
          },
        ],
        series: [
          {
            data: dataOne,
          },
          {
            data: dataTwo,
          },
        ],
      });
  
  
  
    }, 400);
  
    myChart.setOption(options);
  });
  onMounted(() => {
    // 鼠标移入移出
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
  
    canvasDom.value.appendChild(renderer.domElement);
    //网格
    gridHelper = new THREE.GridHelper(size, size);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    //坐标轴及方向
    const axesHelper = new THREE.AxesHelper(size / 2);
    scene.add(axesHelper);
    const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), size / 2, 0xff0000);
    const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), size / 2, 0x00ff00);
    const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), size / 2, 0x800080);
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
    
  <style scoped>
  .file-upload {
    display: inline-block;
    position: relative;
  }
  
  .import {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  
  .import-label {
    display: inline-block;
    padding: 10px 20px;
    background-color: #15e6e6;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .label-text {
    display: inline-block;
  }
  
  .import-label:hover {
    background-color: #0a61dc;
  }
  
  .playorstop {
    top: 20px;
    position: absolute;
    left: 10px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
  }
  
  .event {
    top: 20px;
    position: absolute;
    left: 240px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
  }
  
  .replay {
    top: 20px;
    position: absolute;
    left: 470px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
  }
  
  .reserve {
    top: 150px;
    position: absolute;
    left: 410px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
  }
  
  .statistics {
    top: 150px;
    position: absolute;
    left: 480px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
  }
  
  .cameractrl {
    top: 80px;
    position: absolute;
    left: 10px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(246, 246, 246);
    text-shadow: 2px 2px 4px rgba(247, 245, 245, 0.5);
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
  
  .home {
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .info-text {
    font-size: 10px;
    position: fixed;
    padding: 7px;
    color: yellow;
    background-color: rgb(87, 84, 84);
    border-radius: 10px;
    overflow: hidden;
    border: none;
    text-shadow: 0 0 3px blue;
  }
  
  .canvas-container {
    width: 100%;
    height: 100%;
  }
  
  .choose {
    width: 680px;
    height: 150px;
    color: aliceblue;
    position: absolute;
    top: 600px;
    left: 400px;
    font-size: 18px;
    font-weight: 600;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
  }
  
  .choose-title {
    top: -35px;
    position: absolute;
    font-size: 20px;
    width: 660px;
    color: rgb(7, 19, 33);
    background-color: rgb(140, 205, 229);
    padding: 10px;
    height: 20px;
    line-height: 20px;
  
    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
  }
  
  .local {
    width: 300px;
    line-height: 40px;
    margin-left: 0px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(239, 238, 238);
    text-shadow: 2px 2px 4px rgba(237, 233, 233, 0.5);
  }
  
  .local_expanded {
    width: 300px;
    line-height: 40px;
    margin-left: 0px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(8, 8, 8);
    text-shadow: 2px 2px 4px rgba(1, 1, 1, 0.5);
  }
  
  .chart {
    bottom: 0;
    position: absolute;
  }
  
  .nav_con {
    color: aliceblue;
    position: absolute;
    right: 0px;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
    transition: opacity 1.5s, background-color 1.5s;
  }
  
  .nav_con-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    color: rgb(7, 19, 33);
    background-color: rgb(144, 201, 221);
    padding: 10px;
    height: 20px;
    line-height: 20px;
  
    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
  }
  
  .nav_con-info {
    width: 300px;
    line-height: 40px;
    margin-left: 0px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(239, 238, 238);
    text-shadow: 2px 2px 4px rgba(237, 233, 233, 0.5);
  }
  
  .nav_con_info_expanded {
    width: 300px;
    line-height: 40px;
    margin-left: -200px;
    margin-top: -230px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .nav_con-big {
    line-height: 40px;
    margin-left: 220px;
    margin-top: -180px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(2, 0, 1);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .bingzhuang {
    margin-top: 320px;
  }
  
  .info {
    width: 360px;
    height: 360px;
    color: aliceblue;
    position: absolute;
    top: 00px;
    left: 0px;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
    transition: opacity 1.5s, background-color 1.5s;
  }
  
  .info-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    width: 340px;
    color: rgb(7, 19, 33);
    background-color: rgb(144, 201, 221);
    padding: 10px;
    height: 20px;
    line-height: 20px;
  
    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
  }
  
  .election {
    color: aliceblue;
    position: absolute;
    left: 0px;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
    transition: opacity 1.5s, background-color 1.5s;
  }
  
  .election-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    color: rgb(7, 19, 33);
    background-color: rgb(144, 201, 221);
    padding: 10px;
    height: 20px;
    line-height: 20px;
  
    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
  }
  
  .election-info {
    line-height: 40px;
    margin-left: -150px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(245, 243, 243);
    text-shadow: 2px 2px 4px rgba(246, 245, 245, 0.5);
  }
  
  .election_info_expanded {
    line-height: 40px;
    margin-left: -450px;
    margin-top: -250px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .election-info-big {
    width: 300px;
    line-height: 45px;
    margin-left: 300px;
    margin-top: -80px;
    position: fixed;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .other {
    color: aliceblue;
    position: absolute;
    right: 0px;
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 5px solid transparent;
    /* 设置边框样式为透明 */
    background-image: linear-gradient(to bottom, rgba(2, 251, 10, 0.046), rgba(24, 17, 233, 0));
    /* 应用渐变背景图像 */
    background-clip: padding-box;
    /* 限制背景图像的显示范围为内边距区域 */
    transition: opacity 1.5s, background-color 1.5s;
  }
  
  .info_expanded {
    opacity: 1;
    /* 取消透明度 */
    background-color: #066987cc;
    /* 修改框的颜色为红色 */
  }
  
  .nav_con_expanded {
    opacity: 1;
    /* 取消透明度 */
    background-color: #066987cc;
    /* 修改框的颜色为红色 */
  }
  
  .state_expanded {
    opacity: 1;
    /* 取消透明度 */
    background-color: #066987cc;
    /* 修改框的颜色为红色 */
  }
  
  .other_expanded {
    opacity: 1;
    /* 取消透明度 */
    background-color: #066987cc;
    /* 修改框的颜色为红色 */
  }
  
  .other-title {
    top: 0px;
    position: absolute;
    font-size: 20px;
    color: rgb(7, 19, 33);
    background-color: rgb(144, 201, 221);
    padding: 10px;
    height: 20px;
    line-height: 20px;
  
    text-align: center;
    /* 文字居中 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, rgba(33, 33, 34, 0.004), rgb(120, 180, 210));
    /* 使用渐变背景 */
  }
  
  .other-info {
    line-height: 50px;
    margin-left: -200px;
    position: absolute;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(251, 251, 251);
    text-shadow: 2px 2px 4px rgba(252, 251, 251, 0.5);
  }
  
  .other_info_expanded {
    line-height: 50px;
    margin-left: -300px;
    margin-top: -350px;
    position: absolute;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .other-info-big {
    line-height: 50px;
    margin-top: -100px;
    margin-left: 200px;
    font-family: 'SimSun', 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  }
  
  .other-light {
    margin-top: -33px;
    margin-left: 80px;
    width: 20px;
    height: 20px;
    background-color: rgb(34, 246, 6);
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
  
  .other-on {
    background-color: rgb(255, 0, 0);
  }
  
  .pause-n-button {
    display: inline-block;
    margin-top: 5px;
    margin-left: 15px;
    padding: 10px 20px;
    background-color: #7fd8f100;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease-in-out;
    font-size: 16px;
    border: 1px solid #65ac67;
    /* 深绿色边框 */
    color: #e8e2e2;
  }
  
  .pause-n-button:hover {
    background-color: #648e59ab;
  }
  
  .pause-n-button:disabled {
    background-color: #b0a7a766;
    cursor: not-allowed;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(204, 175, 220, 0.193);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #563131;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    height: 500px;
  
  }
  
  .thermometer {
    position: relative;
    margin-left: 50px;
    margin-top: 20px;
    width: 50px;
    height: 200px;
    background-color: #c5c5d5;
  }
  
  .scale-mark {
    margin-top: 180px;
    margin-left: 50px;
    top: 0;
    color: #777;
    font-size: 12px;
  }
  
  .scale-mark1 {
  
    margin-left: 50px;
    top: 0;
    color: #777;
    font-size: 12px;
  }
  
  .mercury {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    background-color: rgb(31, 137, 81);
    transition: height 0.5s;
  }
  
  .temperature {
    display: block;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .round-button {
    margin-left: 15px;
    font-size: 30px;
    color: #ffffff;
  }
  
  .round-button:hover {
    background-color: #648e59ab;
  }
  
  .parsedItemsdata {
    margin-left: 100px;
  }
  </style>