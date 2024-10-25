<template>
    <div>
        <el-button class="controldev" type="info" @click="clickbutton">
                车体设备</el-button>

        <el-dialog v-model="dialogVisible" title="车体设备" :modal="false" draggable :close-on-click-modal="false"
            modal-class="kkk-dialog-class" custom-class="ele-dialog">
            <DefinScrollbar :showUpBt="true">
                <br>
                <div v-if="carType === 0">
                    <el-table :data="tableData" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                        <el-table-column prop="key" label="转盘"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                        <el-table-column prop="key2"></el-table-column>
                        <el-table-column prop="value2"></el-table-column>
                    </el-table>
                    <br>
                    <el-table :data="jusheng" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                        <el-table-column prop="key" label="举升"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                        <el-table-column prop="key2"></el-table-column>
                        <el-table-column prop="value2"></el-table-column>
                    </el-table>
                    <br>
                </div>
                <div v-if="carType === 1 &&
            parsedLogData.equipmentInfo.rack.push !== undefined">
                    <el-table :data="VtableData" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                        <el-table-column prop="key" label="举升"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                        <el-table-column prop="key2"></el-table-column>
                        <el-table-column prop="value2"></el-table-column>
                    </el-table>
                    <br>
                    <el-table :data="VpushtableData" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                        <el-table-column prop="key" label="推拉"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                        <el-table-column prop="key2"></el-table-column>
                        <el-table-column prop="value2"></el-table-column>
                    </el-table>
                    <br>
                    <el-table :data="ValltableData" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                        <el-table-column prop="key" label="其他"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                        <el-table-column prop="key2"></el-table-column>
                        <el-table-column prop="value2"></el-table-column>
                    </el-table>
                    <br>

                </div>



                <el-table :data="shebeixinxi" border style="width: 90%; margin-left: 5%;" class="datatabledev">
                    <el-table-column prop="key" label="设备信息"></el-table-column>
                    <el-table-column prop="value"></el-table-column>
                    <el-table-column prop="key2"></el-table-column>
                    <el-table-column prop="value2"></el-table-column>
                </el-table>

            </DefinScrollbar>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import { modbusscreendatajson } from './modbusscreen.js'
import {
    parsedLogData, carType, raycaster
} from '../commondata.js'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const dialogVisible = ref(false);
const clickbutton = () => {
    dialogVisible.value = true;
};
const handleMouseClickdev = (car) => {
    const intersects = raycaster.intersectObjects([car]);
    if (intersects.length > 0) {
        console.log('modelname33333:', intersects[0].object.name)
        if (intersects[0].object.name === 'Material_9举升3-41-14') {

            dialogVisible.value = true;

        } else {
            dialogVisible.value = false;

        }
    }



}
defineExpose({ handleMouseClickdev });
const tableData = computed(() => [
    {
        key: '转盘纵向开关', value: parsedLogData.value.equipmentInfo.rack.turn_axis.bZero ? '🔴' : '🟢',
        key2: '转盘横向开关', value2: parsedLogData.value.equipmentInfo.rack.turn_axis.bLevel ? '🔴' : '🟢'
    },
    {
        key: '转盘位置', value: (parsedLogData.value.equipmentInfo.rack.turn_axis.fAxisPosition).toFixed(3),
        key2: '', value2: ''
    }
]);


const ValltableData = computed(() => [
    {
        key: '整体上限位', value: parsedLogData.value.equipmentInfo.rack.all.CarrierSwtPos ? '🔴' : '🟢',
        key2: '整体下限位', value2: parsedLogData.value.equipmentInfo.rack.all.CarrierSwtNag ? '🔴' : '🟢'
    },
    {
        key: '整体零位', value: parsedLogData.value.equipmentInfo.rack.all.CarrierSwtZero ? '🔴' : '🟢',
        key2: '整体位置', value2: parsedLogData.value.equipmentInfo.rack.all.CarrierSwtposition.toFixed(3)
    },
    {
        key: '前满卷货物检测', value: parsedLogData.value.equipmentInfo.rack.FLifterSwtCargoFull ? '🔴' : '🟢',
        key2: '前空卷货物检测', value2: parsedLogData.value.equipmentInfo.rack.FLifterSwtCargoEmpty ? '🔴' : '🟢'
    },
    {
        key: '后满卷货物检测', value: parsedLogData.value.equipmentInfo.rack.RLifterSwtCargoFull ? '🔴' : '🟢',
        key2: '后空卷货物检测', value2: parsedLogData.value.equipmentInfo.rack.RLifterSwtCargoEmpty ? '🔴' : '🟢'
    },
    {
        key: '前满卷偏载', value: parsedLogData.value.equipmentInfo.rack.FLifterSwtPianzaiFull ? '🔴' : '🟢',
        key2: '前空卷偏载', value2: parsedLogData.value.equipmentInfo.rack.FLifterSwtPianzaiEmpty ? '🔴' : '🟢'
    },
    {
        key: '后满卷偏载', value: parsedLogData.value.equipmentInfo.rack.RLifterSwtPianzaiFull ? '🔴' : '🟢',
        key2: '后空卷偏载', value2: parsedLogData.value.equipmentInfo.rack.RLifterSwtPianzaiEmpty ? '🔴' : '🟢'
    },
    {
        key: '同步开关', value: parsedLogData.value.equipmentInfo.rack.LifterCentrePosition ? '🔴' : '🟢',
        key2: '', value2: ''
    }
]);

const VpushtableData = computed(() => [
    {
        key: '前推拉上限位', value: parsedLogData.value.equipmentInfo.rack.push.FPullerSwtPos ? '🔴' : '🟢',
        key2: '前推拉下限位', value2: parsedLogData.value.equipmentInfo.rack.push.FPullerSwtNag ? '🔴' : '🟢'
    },
    {
        key: '前推拉零位', value: parsedLogData.value.equipmentInfo.rack.push.FPullerSwtZero ? '🔴' : '🟢',
        key2: '前推拉位置', value2: parsedLogData.value.equipmentInfo.rack.push.FPullerSwtposition.toFixed(3)
    },
    {
        key: '后推拉上限位', value: parsedLogData.value.equipmentInfo.rack.push.RPullerSwtPos ? '🔴' : '🟢',
        key2: '后推拉下限位', value2: parsedLogData.value.equipmentInfo.rack.push.RPullerSwtNag ? '🔴' : '🟢'
    },
    {
        key: '后推拉零位', value: parsedLogData.value.equipmentInfo.rack.push.RPullerSwtZero ? '🔴' : '🟢',
        key2: '后推拉位置', value2: parsedLogData.value.equipmentInfo.rack.push.RPullerSwtposition.toFixed(3)
    }
]);
const VtableData = computed(() => [
    {
        key: '前举升上限位', value: parsedLogData.value.equipmentInfo.rack.turn_axis.bLevel ? '🔴' : '🟢',
        key2: '前举升下限位', value2: parsedLogData.value.equipmentInfo.rack.turn_axis.fAxisSpeed ? '🔴' : '🟢'
    },
    {
        key: '前举升零位', value: parsedLogData.value.equipmentInfo.rack.turn_axis.bZero ? '🔴' : '🟢',
        key2: '前举升位置', value2: (parsedLogData.value.equipmentInfo.rack.turn_axis.fAxisPosition).toFixed(3)
    },
    {
        key: '后举升上限位', value: parsedLogData.value.equipmentInfo.rack.lifter_axis.bTop ? '🔴' : '🟢',
        key2: '后举升下限位', value2: parsedLogData.value.equipmentInfo.rack.lifter_axis.bBottom ? '🔴' : '🟢'
    },
    {
        key: '后举升零位', value: parsedLogData.value.equipmentInfo.rack.lifter_axis.fAxisSpeed ? '🔴' : '🟢',
        key2: '后举升位置', value2: (parsedLogData.value.equipmentInfo.rack.lifter_axis.fAxisPosition).toFixed(3)
    }
]);
const jusheng = computed(() => [
    {
        key: '举升高位开关', value: parsedLogData.value.equipmentInfo.rack.lifter_axis.bTop ? '🔴' : '🟢',
        key2: '举升零位开关', value2: parsedLogData.value.equipmentInfo.rack.lifter_axis.bBottom ? '🔴' : '🟢'
    },
    {
        key: '举升位置', value: (parsedLogData.value.equipmentInfo.rack.lifter_axis.fAxisPosition).toFixed(3),
        key2: '', value2: ''
    }
]);

const Net_equ_uEquipmentState = ref(0);
const Net_equ_uEquipmentTaskID = ref(0);
const Net_equ_uEquipmentTaskState = ref(0);
const Net_equ_uEquipmentTaskError = ref(0);
const Net_equ_strEquipmentTaskMessage = ref(0);

const shebeixinxi = computed(() => {

    Net_equ_uEquipmentState.value = parsedLogData.value.equipmentInfo.uEquipmentState;
    if (Net_equ_uEquipmentState.value === 0) {
        Net_equ_uEquipmentState.value = '其他';
    } else if (Net_equ_uEquipmentState.value === 1) {
        Net_equ_uEquipmentState.value = '开始';
    } else if (Net_equ_uEquipmentState.value === 2) {
        Net_equ_uEquipmentState.value = '暂停';
    } else if (Net_equ_uEquipmentState.value === 3) {
        Net_equ_uEquipmentState.value = '结束';
    }
    Net_equ_uEquipmentTaskError.value = parsedLogData.value.equipmentInfo.uEquipmentTaskError;
    if (Net_equ_uEquipmentTaskError.value === 0) {
        Net_equ_uEquipmentTaskError.value = '无故障';
    }
    Net_equ_uEquipmentTaskID.value = parsedLogData.value.equipmentInfo.uEquipmentTaskID;

    if (Net_equ_uEquipmentTaskID.value === 0) {
        Net_equ_uEquipmentTaskState.value = '无任务';
        Net_equ_strEquipmentTaskMessage.value = '无';
    } else {
        //设备
        Net_equ_strEquipmentTaskMessage.value = parsedLogData.value.equipmentInfo.strEquipmentTaskMessage;
        const keyToValueMap = modbusscreendatajson.AgvEquipmentInfo.reduce((map, item) => {
            map[item.Key] = item.value;
            return map;
        }, {});
        const convertedValue = keyToValueMap[Net_equ_strEquipmentTaskMessage.value] || "";
        Net_equ_strEquipmentTaskMessage.value = convertedValue;


        Net_equ_uEquipmentTaskState.value = parsedLogData.value.equipmentInfo.uEquipmentTaskState;

        if (Net_equ_uEquipmentTaskState.value === 0) {
            Net_equ_uEquipmentTaskState.value = '运行中';
        } else if (Net_equ_uEquipmentTaskState.value === 1) {
            Net_equ_uEquipmentTaskState.value = '结束';
        } else if (Net_equ_uEquipmentTaskState.value === -1) {
            Net_equ_uEquipmentTaskState.value = '无任务';
        }
    }

    return [
        {
            key: '设备状态', value: Net_equ_uEquipmentState.value,
            key2: '设备任务号', value2: Net_equ_uEquipmentTaskID.value
        },
        {
            key: '设备任务状态', value: Net_equ_uEquipmentTaskState.value,
            key2: '设备故障码', value2: Net_equ_uEquipmentTaskError.value
        },
        {
            key: '设备动作步骤', value: Net_equ_strEquipmentTaskMessage.value,
            key2: '动作轴id', value2: ''
        },
        {
            key: '动作轴位置', value: '',
            key2: '动作轴开关状态', value2: ''
        }
    ]
});
</script>


<style scoped>
.controldev {

    width: 5vw;
    height: 4vh;
 
  position: relative;
  background-color: #424141d8;
  color: rgb(241, 234, 234);
  font-size: 0.9vw;
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

.datatabledev {
  font-size: 12px;
}


</style>
<style>

.datatabledev .el-table__body tr:nth-child(2n) {
    background-color: #768aaa67;

}
</style>