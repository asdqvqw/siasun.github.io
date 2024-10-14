<template>
    <div>
        <el-button class="controlnav" type="info" @click="clickbutton">
                控制台</el-button>

        <el-dialog v-model="dialogVisible" title="控制台" :modal="false" draggable :close-on-click-modal="false"
            modal-class="kkk-dialog-class" custom-class="ele-dialog">
            <DefinScrollbar :showUpBt="true">
            <br>
            <el-table :data="tableData" border
                style="width: 90%; margin-left: 5%;  background-color: rgba(255, 255, 255, 0.5);" class="datatabletc">
                <el-table-column prop="key" label="控制台信息"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
            </el-table>

        </DefinScrollbar>
           
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import {
    parsedLogData
} from '../commondata.js'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const dialogVisible = ref(false);
const clickbutton = () => {
    dialogVisible.value = true;
};


const Net_Info_uFromNode = ref(0);
const Net_Info_uToNode = ref(0);

const Net_Info_sProgress = ref(0);
const Net_Info_CurSpeed = ref(0);
const Net_Info_usCargoState = ref(0);
const Net_Info_WorkState = ref(0);
const Net_Info_EventState = ref(0);
const Net_Info_EventDetail = ref(0);
const Net_Info_usBatterState = ref(0);
const Net_Info_TaskState = ref(0);
const Net_Info_TaskID = ref(0);
const Net_Info_Key = ref(0);
const Net_Info_Head = ref(0);
const Net_Info_TaskCode = ref(0);
const tableData = computed(() => {
    //控制台
    Net_Info_Head.value = parsedLogData.value.tcInfo.sHeading;
    Net_Info_CurSpeed.value = parsedLogData.value.tcInfo.sCurSpeed;
    Net_Info_WorkState.value = parsedLogData.value.tcInfo.uWorkState;
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

    Net_Info_EventState.value = parsedLogData.value.tcInfo.ucEventState;
    switch (Net_Info_EventState.value) {
        case 0:
            Net_Info_EventState.value = '无故障';
            break;
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



    Net_Info_EventDetail.value = parsedLogData.value.tcInfo.usEventDetail;
    if (Net_Info_EventDetail.value === 0) {
        Net_Info_EventDetail.value = '无故障';
    }
    Net_Info_TaskID.value = parsedLogData.value.tcInfo.usTaskID;
    Net_Info_Key.value = parsedLogData.value.tcInfo.usKey;
    Net_Info_TaskState.value = parsedLogData.value.tcInfo.ucTaskState;
    if (parsedLogData.value.nAgvState === 3) {
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


    Net_Info_usCargoState.value = parsedLogData.value.tcInfo.usCargoState;
    if (Net_Info_usCargoState.value === 0) {
        Net_Info_usCargoState.value = '未载货';
    } else if (Net_Info_usCargoState.value === 1) {
        Net_Info_usCargoState.value = '载货';
    }



    Net_Info_usBatterState.value = parsedLogData.value.tcInfo.usBatterState;
    if (Net_Info_usBatterState.value === 0) {
        Net_Info_usBatterState.value = '无需充电';
    } else if (Net_Info_usBatterState.value === 1) {
        Net_Info_usBatterState.value = '正常电量';
    } else if (Net_Info_usBatterState.value === 2) {
        Net_Info_usBatterState.value = '电量低';
    } else if (Net_Info_usBatterState.value === 3) {
        Net_Info_usBatterState.value = '电量极低';
    }
    Net_Info_uFromNode.value = parsedLogData.value.tcInfo.uFromNode;
    Net_Info_uToNode.value = parsedLogData.value.tcInfo.uToNode;
    Net_Info_sProgress.value = parsedLogData.value.tcInfo.sProgress;

    Net_Info_TaskCode.value = parsedLogData.value.tcInfo.uTaskcode;
    return [
        { key: '开始节点', value: Net_Info_uFromNode.value, key2: '目标节点', value2: Net_Info_uToNode.value },
        {
            key: '当前进度量', value: Net_Info_sProgress.value,
            key2: '控制台设置速度', value2: Net_Info_CurSpeed.value
        },
        { key: '货物状态', value: Net_Info_usCargoState.value, key2: '工作状态', value2: Net_Info_WorkState.value },
        { key: '1级故障码', value: Net_Info_EventState.value, key2: '2级故障码', value2: Net_Info_EventDetail.value },
        { key: '电池状态', value: Net_Info_usBatterState.value, key2: '', value2: '' },
        { key: '任务状态', value: Net_Info_TaskState.value, key2: '任务号', value2: Net_Info_TaskID.value },
        { key: '动作key', value: Net_Info_Key.value, key2: 'heading', value2: Net_Info_Head.value },
        { key: '动作码', value: Net_Info_TaskCode.value, key2: '', value2: '' },
    ]
});

</script>


<style scoped>
.controlnav {
    /* background-color: rgba(255, 255, 255, 0.475);
    color: black;
    position: absolute;
    bottom: 3%;
    right: 23%;
    width: 8%; */
    width: 5vw;
    height: 4vh;
 
  position: relative;
  background-color: #424141d8;
  color: rgb(241, 234, 234);
  font-size: 1vw;
}
</style>


<style lang="scss" scoped>
::v-deep .el-table {
    background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table_expanded-cell {
    background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table th {
    background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table tr {
    background: rgba(255, 255, 255, 0.326)
}

::v-deep .el-table td {
    background: rgba(255, 255, 255, 0.326)
}
</style>


<style scoped>

.datatabletc {
  font-size: 12px;
}



</style>
<style>
.datatabletc .el-table__body tr:nth-child(2n) {
    background-color: #768aaa67;
    /* 隔行背景色 */
}
</style>