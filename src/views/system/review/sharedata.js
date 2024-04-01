
import { ref } from 'vue'
import { modbusscreendatajson } from './modbusscreen.js'
import * as THREE from "three";


export const data = {
  parsedLogData_b: []
};
//报警灯
export let color = ref(1);
//相机跟随
export let cameraFollow = ref(false);
//事件跳过
export let shouldPause = ref(false);
//暂停
export let paused = ref(false);


//导入文档进度
export let importflag = ref(true);
export let parsedLogData = ref([]);
export const parsedLogDatabak = [];
export let ele_dev_wheel_fServoSpeed = ref('');
export const state_isExpanded = ref(false);
// 目标点坐标字符串
export let targetCoordinates = ref('');
// 当前点坐标字符串
export let CCtargetCoordinates = ref('');
//理论位置---导航
export let nav_pos = ref('');
export let nav_LR = ref('');
export let nav_thi = ref('');
export let nav_sversion = ref('');
export let nav_mversion = ref('');


export let infoTextTime = ref('');
export let Net_Info_uFromNode = ref('');
export let Net_Info_uToNode = ref('');
export let Net_Info_sProgress = ref('');
export let Net_Info_CurSpeed = ref('');
export let Net_Info_usCargoState = ref('');
export let Net_Info_WorkState = ref('');
export let Net_Info_EventState = ref('');
export let Net_Info_EventDetail = ref('');
export let Net_Info_usBatterState = ref('');
export let Net_Info_TaskState = ref('');
export let Net_Info_TaskID = ref('');
export let Net_Info_Key = ref('');
export let Net_Info_Head = ref('');


//infobox
export let infoTextVisible = ref(false);
//鼠标相关
export let infoTextX = ref(0);
export let infoTextY = ref(0);

//AGV状态
export let agvmode = ref('');
export let event_name = ref('');
export let event_detail = ref('');
export let event_advise = ref('');

//设备
export let Net_equ_strEquipmentTaskMessage = ref('');
export let Net_equ_uEquipmentState = ref('');
export let Net_equ_uEquipmentTaskError = ref('');
export let Net_equ_uEquipmentTaskID = ref('');
export let Net_equ_uEquipmentTaskState = ref('');


export const raycaster = new THREE.Raycaster();





//电器模块
//安全模块
export let ele_safe_bEmgStop = ref('');
export let ele_safe_bHardBumper = ref('');
export let ele_safe_nPlsTrig = ref('');
//轮舵
export let ele_dev_name = ref('驱动轴');


export let ele_dev_wheel_nServoErrCode = ref('');
export let ele_dev_wheel_nServoState = ref('');

export let ele_dev_steer_fServoPosition = ref('');
export let ele_dev_steer_nServoState = ref('');
export let ele_dev_steer_nServoErrCode = ref('');
export let ele_dev_steer_bPositiveLimitSwt = ref('');
export let ele_dev_steer_bNegativeLimitSwt = ref('');
export let ele_dev_steer_bZeroSwt = ref('');
export let ele_dev_count = ref('');
export let ele_dev_Dcount = ref(0);
export let currentCoordinateIndex = ref(0);


//infobox
export const updateTargetCoordinates = () => {
  if (currentCoordinateIndex.value < parsedLogData.value.length - 1) {
    const targetPoint = parsedLogData.value[currentCoordinateIndex.value + 1];
    targetCoordinates.value = `(x=${targetPoint.realx},  y=${-targetPoint.realy}, thita=${targetPoint.realthita})`;

  } else {
    targetCoordinates.value = '';
  }
  nav_pos.value = `(x=${parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.iDevX},y=${parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.iDevY})`;
  //导航
  nav_LR.value = parsedLogData.value[currentCoordinateIndex.value].logJson.navInfo.fXDev.toFixed(4);
  nav_thi.value = parsedLogData.value[currentCoordinateIndex.value].logJson.navInfo.fThitaDev.toFixed(4);
  nav_sversion.value = parsedLogData.value[currentCoordinateIndex.value].logJson.navInfo.swVersion;
  nav_mversion.value = parsedLogData.value[currentCoordinateIndex.value].logJson.navInfo.fmVersion;
  //状态
  if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 0) {
    agvmode.value = '加载中';
  } else if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 1) {
    agvmode.value = '空闲';
  } else if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 2) {
    agvmode.value = '手动';
  } else if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 3) {
    agvmode.value = '自动';
  }
  //事件
  event_name.value = parsedLogData.value[currentCoordinateIndex.value].logJson.event.name;
  event_detail.value = parsedLogData.value[currentCoordinateIndex.value].logJson.event.detail;
  event_advise.value = parsedLogData.value[currentCoordinateIndex.value].logJson.event.advise;
  //控制台
  Net_Info_Head.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.sHeading;
  Net_Info_CurSpeed.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.sCurSpeed;
  Net_Info_WorkState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.uWorkState;
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

  Net_Info_EventState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.ucEventState;
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



  Net_Info_EventDetail.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.usEventDetail;
  if (Net_Info_EventDetail.value === 0) {
    Net_Info_EventDetail.value = '无故障';
  }
  Net_Info_TaskID.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.usTaskID;
  Net_Info_Key.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.usKey;
  Net_Info_TaskState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.ucTaskState;
  if (parsedLogData.value[currentCoordinateIndex.value].logJson.nAgvState === 3) {
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


  Net_Info_usCargoState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.usCargoState;
  if (Net_Info_usCargoState.value === 0) {
    Net_Info_usCargoState.value = '未载货';
  } else if (Net_Info_usCargoState.value === 1) {
    Net_Info_usCargoState.value = '载货';
  }
  Net_Info_usBatterState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.usBatterState;
  if (Net_Info_usBatterState.value === 0) {
    Net_Info_usBatterState.value = '无需充电';
  } else if (Net_Info_usBatterState.value === 1) {
    Net_Info_usBatterState.value = '正常电量';
  } else if (Net_Info_usBatterState.value === 2) {
    Net_Info_usBatterState.value = '电量低';
  } else if (Net_Info_usBatterState.value === 3) {
    Net_Info_usBatterState.value = '电量极低';
  }
  Net_Info_uFromNode.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.uFromNode;
  Net_Info_uToNode.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.uToNode;
  Net_Info_sProgress.value = parsedLogData.value[currentCoordinateIndex.value].logJson.tcInfo.sProgress;



  Net_equ_uEquipmentState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.uEquipmentState;
  if (Net_equ_uEquipmentState.value === 0) {
    Net_equ_uEquipmentState.value = '其他';
  } else if (Net_equ_uEquipmentState.value === 1) {
    Net_equ_uEquipmentState.value = '开始';
  } else if (Net_equ_uEquipmentState.value === 2) {
    Net_equ_uEquipmentState.value = '暂停';
  } else if (Net_equ_uEquipmentState.value === 3) {
    Net_equ_uEquipmentState.value = '结束';
  }
  Net_equ_uEquipmentTaskError.value = parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.uEquipmentTaskError;
  if (Net_equ_uEquipmentTaskError.value === 0) {
    Net_equ_uEquipmentTaskError.value = '无故障';
  }
  Net_equ_uEquipmentTaskID.value = parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.uEquipmentTaskID;

  if (Net_equ_uEquipmentTaskID.value === 0) {
    Net_equ_uEquipmentTaskState.value = '无任务';
    Net_equ_strEquipmentTaskMessage.value = '无';
  } else {
    //设备
    Net_equ_strEquipmentTaskMessage.value = parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.strEquipmentTaskMessage;
    const keyToValueMap = modbusscreendatajson.AgvEquipmentInfo.reduce((map, item) => {
      map[item.Key] = item.value;
      return map;
    }, {});
    const convertedValue = keyToValueMap[Net_equ_strEquipmentTaskMessage.value] || "";
    Net_equ_strEquipmentTaskMessage.value = convertedValue;


    Net_equ_uEquipmentTaskState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.equipmentInfo.uEquipmentTaskState;

    if (Net_equ_uEquipmentTaskState.value === 0) {
      Net_equ_uEquipmentTaskState.value = '运行中';
    } else if (Net_equ_uEquipmentTaskState.value === 1) {
      Net_equ_uEquipmentTaskState.value = '结束';
    } else if (Net_equ_uEquipmentTaskState.value === -1) {
      Net_equ_uEquipmentTaskState.value = '无任务';
    }
  }


  //安全回路
  ele_safe_bEmgStop.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.safeCheck.bEmgStop;
  ele_safe_bHardBumper.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.safeCheck.bHardBumper;
  ele_safe_nPlsTrig.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.safeCheck.nPlsTrig;
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
  ele_dev_count.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.nDriveCount;
  if (parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel !== undefined) {
    ele_dev_wheel_fServoSpeed.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.fServoSpeed.toFixed(5);
    ele_dev_wheel_nServoErrCode.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.nServoErrCode;
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


    ele_dev_wheel_nServoState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.nServoState;
  }
  if (parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer !== undefined) {
    console.log(parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer);
    ele_dev_steer_fServoPosition.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.fServoPosition.toFixed(5);
    ele_dev_steer_nServoState.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.nServoState;
    ele_dev_steer_nServoErrCode.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.nServoErrCode;
    ele_dev_steer_bPositiveLimitSwt.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bPositiveLimitSwt;
    ele_dev_steer_bNegativeLimitSwt.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bNegativeLimitSwt;
    ele_dev_steer_bZeroSwt.value = parsedLogData.value[currentCoordinateIndex.value].logJson.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bZeroSwt;
  }

};
export const CCupdateTargetCoordinates = () => {
  if (currentCoordinateIndex.value < parsedLogData.value.length - 1) {
    const targetPoint = parsedLogData.value[currentCoordinateIndex.value];
    CCtargetCoordinates.value = `(${targetPoint.realx}, ${-targetPoint.realy}, ${targetPoint.realthita})`;
  } else {
    CCtargetCoordinates.value = '';
  }
};