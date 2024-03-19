<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box">

                <div class="left">

                    <!-- <el-button plain type="primary" @click="handleExport">
                        导出
                    </el-button>
                    &nbsp;&nbsp; -->
                    <input ref="importInput" type="file" accept=".json" style="display: none" @change="handleImport" />
                    <el-button @click="$refs.importInput.click()" type="success" >
                        导入
                    </el-button>
                    <el-button type="info" @click="handleExpand11" >
                        查看
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
                        <p>{{ jsondata }}</p>
                    </el-dialog>
                    <el-button type="info" @click="handlecheck" >
                        查看设备
                    </el-button>
                    <el-dialog v-model="checkdevice" title="设备总览" :visible="checkdevice" 
                    width="900px" @close="checkdevice = false">
                        <checkbox></checkbox>
                    </el-dialog>
                </div>
                <hr class="hengxian">

                <div class="left">
                    <h2>⚠️ 通讯：</h2>
                    配置串口，网口，CAN线相关参数
                    <hr class="hengxian2">

                    <h3>⚠️ 串口</h3>
                    勾选启用的串口号：
                    <el-checkbox v-model="isChecked" @change="handlecom">COM1</el-checkbox>
                    <el-checkbox v-model="isChecked1" @change="handlecom">COM2</el-checkbox>
                    <el-checkbox v-model="isChecked2" @change="handlecom">COM3</el-checkbox>
                    <el-checkbox v-model="isChecked3" @change="handlecom">COM4</el-checkbox>

                    <hr class="hengxian3">
                    <h3>⚠️ 网口</h3>
                    配置车体相关所有ip地址:
                    <el-button @click="toggleNetTable" type="text" plain :disabled="false">
                        <span v-if="!ShowNetSelect">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': ShowNetSelect }">➡️</span>
                    </el-button><br>
                    <div v-if="ShowNetSelect">
                        <Consloe />
                    </div>

                    <hr class="hengxian3">
                    <h3>⚠️ CAN线</h3>
                    配置CAN总线挂载的设备:
                    <el-button @click="toggleCanTable" type="text" plain :disabled="false">
                        <span v-if="!ShowCanSelect">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': ShowCanSelect }">➡️</span>
                    </el-button><br>
                    <div v-if="ShowCanSelect">
                        <CanLine />
                    </div>
                </div>


                <hr class="hengxian2">
                <el-button type="primary" @click="nextstep">下一步</el-button>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Consloe from './common/Consloe.vue';
import CanLine from './common/CanLine.vue';
import checkbox from '@/views/system/whwtest/testone/check.vue';
import { jsondata } from './common/commondata.js';
import { tableDataCrtl,tableDataCrtlnet } from './common/commondata.js';
import { CANPOS, CANPOS2, CANPOS3 } from './common/commondata.js';
import { CANOPEN, CANOPEN2, CANOPEN3 } from './common/commondata.js';
import { CANGUIDE, CANGUIDE2, CANGUIDE3 } from './common/commondata.js';
import { CANBMS, CANBMS2, CANBMS3 } from './common/commondata.js';
import { CANIO, CANIO2, CANIO3 } from './common/commondata.js';
import { CANMANUAL, CANMANUAL2, CANMANUAL3 } from './common/commondata.js';
import { CANRFID, CANRFID2, CANRFID3 } from './common/commondata.js';
import { AUTOPARM, AUTOPARMLEV } from './common/commondata.js';
import { MANUALPARMA, MANUALRAPARM } from './common/commondata.js';
import { selected } from './common/commondata.js';
import { RealyTimeisChecked, RealyTimeinput1, RealyTimeinput2 } from './common/commondata.js';
import { OTHERPARM,functioncDate } from './common/commondata.js';
import { tableDataCrtlswitch,tableDataCrtlswitchEmg } from './common/commondata.js';
import { tableDataCrtlBumper } from './common/commondata.js';



const ShowNetSelect = ref(false);
const ShowCanSelect = ref(false);
const dialogVisible = ref(false);
const checkdevice = ref(false);
const isChecked = ref(false);
const isChecked1 = ref(false);
const isChecked2 = ref(false);
const isChecked3 = ref(false);


const handlecom = () => {
    jsondata.value.com.comone = isChecked;
    jsondata.value.com.comtwo = isChecked1;
    jsondata.value.com.comthree = isChecked2;
    jsondata.value.com.comfour = isChecked3;
};
const handlecheck = () => {
    checkdevice.value = true;
};
const toggleNetTable = () => {
    ShowNetSelect.value = !ShowNetSelect.value;
};
const toggleCanTable = () => {
    ShowCanSelect.value = !ShowCanSelect.value;
};

const handleExpand11 = () => {
    dialogVisible.value = true;
};
const nextstep = () => {
    router.push('/main/second');
};


const handleExport = () => {
    const jsonDataToExport = JSON.stringify(jsondata.value);
    const blob = new Blob([jsonDataToExport], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parm.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};


const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        jsondata.value = importedData;
        tableDataCrtlnet.value = importedData.network;
        functioncDate.value = importedData.function;
        //com
        isChecked.value = jsondata.value.com.comone;
        isChecked1.value = jsondata.value.com.comtwo;
        isChecked2.value = jsondata.value.com.comthree;
        isChecked3.value = jsondata.value.com.comfour;

        // canpos
        if (jsondata.value.can1.can_pos !== undefined) {
            for (const item of jsondata.value.can1.can_pos) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANPOS.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_pos !== undefined) {
            for (const item of jsondata.value.can2.can_pos) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANPOS2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_pos !== undefined) {
            for (const item of jsondata.value.can3.can_pos) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANPOS3.value.push(newRow);
            }
        }
        //open
        if (jsondata.value.can1.can_open !== undefined) {
            for (const item of jsondata.value.can1.can_open) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    servoType: item[2].toString(),
                };
                CANOPEN.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_open !== undefined) {
            for (const item of jsondata.value.can2.can_open) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    servoType: item[2].toString(),
                };
                CANOPEN2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_open !== undefined) {
            for (const item of jsondata.value.can3.can_open) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    servoType: item[2].toString(),
                };
                CANOPEN3.value.push(newRow);
            }
        }
        //guide
        if (jsondata.value.can1.can_guide !== undefined) {
            for (const item of jsondata.value.can1.can_guide) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANGUIDE.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_guide !== undefined) {
            for (const item of jsondata.value.can2.can_guide) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANGUIDE2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_guide !== undefined) {
            for (const item of jsondata.value.can3.can_guide) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANGUIDE3.value.push(newRow);
            }
        }

        //BMS
        if (jsondata.value.can1.can_BMS !== undefined) {
            for (const item of jsondata.value.can1.can_BMS) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    subSystem: item[2].toString(),

                };
                CANBMS.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_BMS !== undefined) {
            for (const item of jsondata.value.can2.can_BMS) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    subSystem: item[2].toString(),

                };
                CANBMS2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_BMS !== undefined) {
            for (const item of jsondata.value.can3.can_BMS) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                    subSystem: item[2].toString(),

                };
                CANBMS3.value.push(newRow);
            }
        }
        //io
        if (jsondata.value.can1.can_io !== undefined) {
            for (const item of jsondata.value.can1.can_io) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANIO.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_io !== undefined) {
            for (const item of jsondata.value.can2.can_io) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANIO2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_io !== undefined) {
            for (const item of jsondata.value.can3.can_io) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANIO3.value.push(newRow);
            }
        }

        //MANU
        if (jsondata.value.can1.can_manual !== undefined) {
            for (const item of jsondata.value.can1.can_manual) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANMANUAL.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_manual !== undefined) {
            for (const item of jsondata.value.can2.can_manual) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANMANUAL2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_manual !== undefined) {
            for (const item of jsondata.value.can3.can_manual) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),
                };
                CANMANUAL3.value.push(newRow);
            }
        }

        //RFID
        if (jsondata.value.can1.can_rfid !== undefined) {
            for (const item of jsondata.value.can1.can_rfid) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANRFID.value.push(newRow);
            }
        }

        if (jsondata.value.can2.can_rfid !== undefined) {
            for (const item of jsondata.value.can2.can_rfid) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANRFID2.value.push(newRow);
            }
        }

        if (jsondata.value.can3.can_rfid !== undefined) {
            for (const item of jsondata.value.can3.can_rfid) {
                const newRow = {
                    ID: item[0].toString(),
                    canID: item[1].toString(),

                };
                CANRFID3.value.push(newRow);
            }
        }

        //opparam
        AUTOPARM.value.forEach((item) => {
            if (jsondata.value.OperatingParam.autoparam[item.key] !== undefined) {
                item.value = jsondata.value.OperatingParam.autoparam[item.key];
            }
        });
        if (jsondata.value.OperatingParam.autoparam.SpeedLev !== undefined) {
            AUTOPARMLEV.value[0].value = jsondata.value.OperatingParam.autoparam.SpeedLev;
        }

        if (jsondata.value.OperatingParam.manualparm.setSpeed !== undefined) {
            MANUALPARMA.value = jsondata.value.OperatingParam.manualparm.setSpeed.map((item, index) => ({
                manSpeLev: index,
                adAutoSpe: item[0].toString(),
                value: item[1] === 1 ? true : false,
            }))
        }
        if (jsondata.value.OperatingParam.manualparm.setRadius !== undefined) {
            MANUALRAPARM.value = jsondata.value.OperatingParam.manualparm.setRadius.map((item, index) => ({
                manRadLev: index,
                manRadNum: item[0].toString(),
                value: item[1] === 1 ? true : false,
            }))
        }

        //AGVmodel
        if (jsondata.value.AGVmodel.type !== undefined) {
            selected.value = jsondata.value.AGVmodel.type.toString();
        }

        if (jsondata.value.AGVmodel.RealyTime[0] === undefined) {
            RealyTimeisChecked.value = false;
        } else {
            RealyTimeinput1.value = jsondata.value.AGVmodel.RealyTime[0];
            RealyTimeinput2.value = jsondata.value.AGVmodel.RealyTime[1];
        }


        if (jsondata.value.AGVmodel.OrdinaryDW !== undefined) {
            tableDataCrtl.value = jsondata.value.AGVmodel.OrdinaryDW;
        }
        //OTHER
        OTHERPARM.value.forEach((item) => {
            if (jsondata.value.other[item.key] !== undefined) {
                item.value = jsondata.value.other[item.key];
            }
        });
        //ele
        if (jsondata.value.switch.StartButton !== undefined) {
            tableDataCrtlswitch.value = jsondata.value.switch.StartButton;
        }

        if (jsondata.value.switch.EmgButton !== undefined) {
            tableDataCrtlswitchEmg.value = jsondata.value.switch.EmgButton;
        }

        if (jsondata.value.HardBumper !== undefined) {
            tableDataCrtlBumper.value = jsondata.value.HardBumper;
        }
        
    };
    reader.readAsText(file);

    ElMessage.success('导入成功');
};


</script>
<style scoped>
.rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
}


.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}

.hengxian3 {
    border: none;
    border-top: 2px dashed #ccc;
    margin: 20px 0;
}

.hengxian2 {
    height: 2px;
    /* 线条高度 */
    background: linear-gradient(to right, #e8e7e7 50%, transparent 50%);
    /* 创建自定义线条 */
    background-size: 10px 5px;
    /* 控制线条的间距和宽度 */
    margin: 20px 0;
}

.kongge {
    margin-top: 20px;
}
</style>


<style lang="scss" scoped>
.main-view {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 600px;

    >.page-query-box {
        margin: 0 0 10px 0 !important;
        padding: 10px 10px 0px 10px;

        :deep(.el-form-item) {
            margin-bottom: 10px !important;
        }

        :deep(.el-form-item--default) {
            width: 100%;
            margin-right: 0;
        }
    }

    >.content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px 10px;
        box-sizing: border-box;
        background: #fff;

        overflow: auto !important;

        >.top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 0 10px 0;
        }

        >.table-container {
            flex: 1 1 auto;
            height: 0;
            overflow: auto;
        }
    }

    .pagination-container {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 10px 0 0 0;
    }
}


.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>