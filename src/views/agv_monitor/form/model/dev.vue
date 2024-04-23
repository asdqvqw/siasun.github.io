<template>
    <div>
        <el-button class="controldev" type="info" @click="clickbutton"><span style="font-size: 18px;">
                车体设备</span></el-button>

        <el-dialog v-model="dialogVisible" title="车体设备" :modal="false" draggable :close-on-click-modal="false"
            modal-class="kkk-dialog-class" custom-class="ele-dialog">
            <br>
            <el-table :data="tableData" border style="width: 90%; margin-left: 5%;">
                <el-table-column prop="key" label="转盘"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
            </el-table>
            <br>
            <el-table :data="jusheng" border style="width: 90%; margin-left: 5%;">
                <el-table-column prop="key" label="举升"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
            </el-table>
            <br>
            <el-table :data="shebeixinxi" border style="width: 90%; margin-left: 5%;">
                <el-table-column prop="key" label="设备信息"></el-table-column>
                <el-table-column prop="value"></el-table-column>
                <el-table-column prop="key2"></el-table-column>
                <el-table-column prop="value2"></el-table-column>
            </el-table>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { modbusscreendatajson } from './modbusscreen.js'
import {
    parsedLogData
} from '../commondata.js'

const dialogVisible = ref(false);
const clickbutton = () => {
    dialogVisible.value = true;
};

const tableData = computed(() => [
    {
        key: '转盘纵向开关', value: parsedLogData.value.equipmentInfo.rack.turn_axis.bZero ? '🔴' : '🟢',
        key2: '转盘横向开关', value2: parsedLogData.value.equipmentInfo.rack.turn_axis.bLevel ? '🔴' : '🟢'
    },
    {
        key: '转盘位置', value: (parsedLogData.value.equipmentInfo.rack.turn_axis.fAxisPosition / 1000).toFixed(3),
        key2: '', value2: ''
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
            key: '当前设备状态', value: Net_equ_uEquipmentState.value,
            key2: '当前设备任务号', value2: Net_equ_uEquipmentTaskID.value
        },
        {
            key: '当前设备任务状态', value: Net_equ_uEquipmentTaskState.value,
            key2: '当前设备故障码', value2: Net_equ_uEquipmentTaskError.value
        },
        {
            key: '当前设备动作步骤', value: Net_equ_strEquipmentTaskMessage.value,
            key2: '当前动作轴id', value2: ''
        },
        {
            key: '当前动作轴位置', value: '',
            key2: '当前动作轴开关状态', value2: ''
        }
    ]
});
</script>


<style scoped>
.controldev {
    background-color: rgba(255, 255, 255, 0.475);
    color: black;
    position: absolute;
    bottom: 3%;
    right: 37%;
    width: 8%;
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