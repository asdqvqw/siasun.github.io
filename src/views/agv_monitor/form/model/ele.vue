<template>
    <div>
        <el-button class="controlele" type="info" @click="clickbutton">电气</el-button>

        <el-dialog v-model="dialogVisible" title="电气" :modal="false" draggable :close-on-click-modal="false"
            modal-class="kkk-dialog-class" custom-class="ele-dialog">
            <br>
            <el-table :data="tableData" border style="width: 90%; margin-left: 5%; " class="datatableele">
                <el-table-column prop="key" label="防碰"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
                <el-table-column prop="key3"></el-table-column>
                <el-table-column prop="value3"></el-table-column>
            </el-table>
            <br>
            <el-table :data="erweima" border style="width: 90%; margin-left: 5%;" class="datatableele">
                <el-table-column prop="key" label="二维码"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
                <el-table-column prop="key3"></el-table-column>
                <el-table-column prop="value3"></el-table-column>
            </el-table>
            <br>
            <!-- <el-table :data="cidaohang" border style="width: 90%; margin-left: 5%;" class="datatableele">
                <el-table-column prop="key" label="磁导航"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
                <el-table-column prop="key3"></el-table-column>
                <el-table-column prop="value3"></el-table-column>
            </el-table>
            <br> -->
            <el-table :data="sifu" border style="width: 90%; margin-left: 5%;" class="datatableele">
                <el-table-column prop="key" label="伺服"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2" label="切换轴"></el-table-column>
                <el-table-column prop="key3">
                    <template #header>
                        <el-button @click="Cutdrive" style="width: 90%; font-size: 10px;">{{ ele_dev_name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="value3"></el-table-column>
            </el-table>
            <br>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'

import {
    parsedLogData, raycaster
} from '../commondata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
    dialogVisible.value = true;
};


const handleMouseClickele = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        console.log('modelname33333:', intersects[0].object.name)
        if (intersects[0].object.name === 'Material_27车体4-41-170'
            || intersects[0].object.name === 'Material_27车体4-41-140'
            || intersects[0].object.name === 'Material_27车体4-41-167'
        ) {

            dialogVisible.value = true;

        } else {
            dialogVisible.value = false;

        }
    }



}
defineExpose({ handleMouseClickele });

const tableData = computed(() => {

    let plsStatus = '';
    const nPlsTrig = parsedLogData.value.electricalModule.safeCheck.nPlsTrig;

    if (nPlsTrig === 0) {
        plsStatus = '未触发';
    } else if (nPlsTrig === 1) {
        plsStatus = '近';
    } else if (nPlsTrig === 2) {
        plsStatus = '中';
    } else if (nPlsTrig === 3) {
        plsStatus = '远';
    }

    return [
        {
            key: '保险杠', value: parsedLogData.value.electricalModule.safeCheck.bHardBumper ? '🔴' : '🟢',
            key2: '急停', value2: parsedLogData.value.electricalModule.safeCheck.bEmgStop ? '🔴' : '🟢',
            key3: 'pls状态', value3: plsStatus
        }
    ]
});
const erweima = computed(() => [
    {
        key: 'X', value: parsedLogData.value.electricalModule.sensor.camera.fx.toFixed(4), key2: 'Y', value2: parsedLogData.value.electricalModule.sensor.camera.fy.toFixed(4),
        key3: '角度', value3: parsedLogData.value.electricalModule.sensor.camera.fthita.toFixed(4)
    }
]);
const cidaohang = computed(() => [
    { key: '磁导航偏差1', value: parsedLogData.value.electricalModule.sensor.magnetic.fDev[0], key2: '磁导航偏差2', value2: parsedLogData.value.electricalModule.sensor.magnetic.fDev[1], key3: '磁导航状态', value3: parsedLogData.value.electricalModule.sensor.magnetic.sGrade }
]);

const ele_dev_count = ref(0);
const ele_dev_wheel_fServoSpeed = ref(null);
const ele_dev_wheel_nServoErrCode = ref(null);
const ele_dev_wheel_nServoState = ref(null);
const ele_dev_Dcount = ref(0);
const ele_dev_name = ref('驱动轴0');
const ele_dev_steer_fServoPosition = ref(0);
const ele_dev_steer_nServoState = ref(0);
const ele_dev_steer_nServoErrCode = ref(0);
const ele_dev_steer_bPositiveLimitSwt = ref(0);
const ele_dev_steer_bNegativeLimitSwt = ref(0);
const ele_dev_steer_bZeroSwt = ref(0);
const Cutdrive = () => {
    if (ele_dev_Dcount.value < ele_dev_count.value - 1) {
        ele_dev_Dcount.value++;
    } else {
        ele_dev_Dcount.value = 0;
    }
    console.log(ele_dev_Dcount.value);
    ele_dev_name.value = '驱动轴' + ele_dev_Dcount.value.toString();
};


const sifu = computed(() => {
    //轮舵
    ele_dev_count.value = parsedLogData.value.electricalModule.kinematic.nDriveCount;
    if (parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel !== undefined) {
        ele_dev_wheel_fServoSpeed.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.fServoSpeed.toFixed(5);
        ele_dev_wheel_nServoErrCode.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.nServoErrCode;
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
        ele_dev_wheel_nServoState.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].wheel.nServoState;
    }



    if (parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer !== undefined) {
        ele_dev_steer_fServoPosition.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.fServoPosition.toFixed(5);
        ele_dev_steer_nServoState.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.nServoState;
        ele_dev_steer_nServoErrCode.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.nServoErrCode;
        ele_dev_steer_bPositiveLimitSwt.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bPositiveLimitSwt;
        ele_dev_steer_bNegativeLimitSwt.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bNegativeLimitSwt;
        ele_dev_steer_bZeroSwt.value = parsedLogData.value.electricalModule.kinematic.drive[ele_dev_Dcount.value].steer.bZeroSwt;
    } else {
        ele_dev_steer_fServoPosition.value = '🚫无';
        ele_dev_steer_nServoState.value = '🚫无';
        ele_dev_steer_nServoErrCode.value = '🚫无';
        ele_dev_steer_bPositiveLimitSwt.value = '🚫无';
        ele_dev_steer_bNegativeLimitSwt.value = '🚫无';
        ele_dev_steer_bZeroSwt.value = '🚫无';

    }


    return [
        {
            key: '实际速度', value: ele_dev_wheel_fServoSpeed.value,
            key2: '状态码', value2: ele_dev_wheel_nServoState.value,
            key3: '错误码', value3: ele_dev_wheel_nServoErrCode.value
        },
        // {
        //     key: '舵实际位置', value: ele_dev_steer_fServoPosition.value,
        //     key2: '舵伺服状态码', value2: ele_dev_steer_nServoState.value,
        //     key3: '舵伺服错误码', value3: ele_dev_steer_nServoErrCode.value
        // },
        // {
        //     key: '舵限位开关1', value: ele_dev_steer_bPositiveLimitSwt.value,
        //     key2: '舵限位开关2', value2: ele_dev_steer_bNegativeLimitSwt.value,
        //     key3: '舵零位开关', value3: ele_dev_steer_bZeroSwt.value
        // }
    ]
});


</script>

<style scoped>
.controlele {
    /* background-color: rgba(255, 255, 255, 0.475);
    color: black;
    position: absolute;
    bottom: 3%;
    right: 65%;
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

.datatableele {
  font-size: 12px;
}


</style>
<style>

.datatableele .el-table__body tr:nth-child(2n) {
    background-color: #768aaa67;

}
</style>