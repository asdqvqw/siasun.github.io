
import { ref } from 'vue'

export const data = {
  parsedLogData_b: []
};


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

