<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box"
                style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
                <DefinScrollbar height="100%" :showUpBt="true">
                    <div class="left">


                        <el-button type="info" @click="handlecheck">
                            查看设备
                        </el-button>
                        <el-dialog v-model="checkdevice" title="设备总览" :visible="checkdevice" width="900px"
                            @close="checkdevice = false">
                            <DefinScrollbar height="100%" :showUpBt="true">
                            <checkbox></checkbox>
                        </DefinScrollbar>
                        </el-dialog>

                        &nbsp;
                        <el-button type="info" @click="handleExpand11">
                            查看
                        </el-button>
                        <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible"
                            @close="dialogVisible = false" modal-class="kk-dialog-class" custom-class="custom-dialog">
                            <DefinScrollbar height="100%" :showUpBt="true">
                            <pre>{{ formattedJsondata }}</pre>
                        </DefinScrollbar>
                        </el-dialog>
                        &nbsp;
                        <el-button type="primary" @click="syncAgvParm">
                            从AGV同步参数
                        </el-button>


                        <el-button type="primary" @click="nextstep">下一步</el-button>
                        &nbsp;
                        <input ref="importInput" type="file" accept=".json" style="display: none"
                            @change="handleImport" />
                        <el-button @click="$refs.importInput.click()" type="success">
                            本地导入
                        </el-button>
                    </div>
                    <hr class="hengxian">

                    <div class="left">
                        <h2>⚠️ 通讯：</h2>
                        配置串口，网口，CAN线相关参数
                        <hr class="hengxian2">

                        <!-- <h3>⚠️ 串口</h3>
                        
                        启用的串口号： -->

                        <el-table :data="tableData" border class="datatableCOM">
                            <el-table-column prop="key" label="⚠️ 串口"></el-table-column>

                            <el-table-column label="勾选启用的串口号：">
                                <template v-slot="scope">
                                    <el-checkbox v-model="scope.row.isChecked"
                                        @change="handlecom(scope.row)"></el-checkbox>
                                </template>
                            </el-table-column>
                        </el-table>


                        <hr class="hengxian3">
                        <!-- <h3>⚠️ 网口</h3>
                        配置车体相关所有ip地址: -->
                        <!-- <el-button @click="toggleNetTable" type="text" plain :disabled="false">
                            <span v-if="!ShowNetSelect">展开</span>
                            <span v-else>展开</span>
                            <span :class="{ 'rotate-arrow': ShowNetSelect }">➡️</span>
                        </el-button><br> -->
                        <div v-if="ShowNetSelect">
                            <Consloe />
                        </div>

                        <hr class="hengxian3">
                        <!-- <h3>⚠️ CAN线</h3>
                        配置CAN总线挂载的设备:
                        <el-button @click="toggleCanTable" type="text" plain :disabled="false">
                            <span v-if="!ShowCanSelect">展开</span>
                            <span v-else>展开</span>
                            <span :class="{ 'rotate-arrow': ShowCanSelect }">➡️</span>
                        </el-button><br> -->
                        <div v-if="ShowCanSelect">
                            <CanLine />
                        </div>
                    </div>


                    <hr class="hengxian2">

                </DefinScrollbar>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Consloe from './common/Consloe.vue';
import CanLine from './common/CanLine.vue';
import checkbox from '@/views/agv_ctrl/param/check.vue';
import { jsondata } from './common/commondata.js';
import { tableDataCrtl, tableDataCrtlnet } from './common/commondata.js';
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
import { delayisChecked, delayinput1, delayinput2 } from './common/commondata.js';
import { OTHERPARM, functioncDate,UserPermissionsparam } from './common/commondata.js';
import { tableDataCrtlswitch, tableDataCrtlswitchEmg } from './common/commondata.js';
import { tableDataCrtlBumper, tableDataCrtlPLS, tableDataCrtlSound, MANUALDATA } from './common/commondata.js';
import { tableDataCrtlBetter, tableDataCrtlRelay } from './common/commondata.js';
import DefinScrollbar from "@/components/DefinScrollbar.vue";

const ShowNetSelect = ref(true);
const ShowCanSelect = ref(true);
const dialogVisible = ref(false);
const checkdevice = ref(false);
const isChecked = ref(false);
const isChecked1 = ref(false);
const isChecked2 = ref(false);
const isChecked3 = ref(false);

const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});
const handlecom = (row) => {
    // 更新 tableData 数组中的 isChecked 属性
    tableData.value.forEach(item => {
        if (item.key === row.key) {
            item.isChecked = row.isChecked
        }
    })

    jsondata.value.SerialPortMan.port_1 = tableData.value[0].isChecked;
    jsondata.value.SerialPortMan.port_2 = tableData.value[1].isChecked;
    jsondata.value.SerialPortMan.port_3 = tableData.value[2].isChecked;
    jsondata.value.SerialPortMan.port_4 = tableData.value[3].isChecked;


}

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


import axios from 'axios'

const tableData = computed(() => {
    return [
        {
            key: 'COM1', isChecked: jsondata.value.SerialPortMan.port_1
        },
        {
            key: 'COM2', isChecked: jsondata.value.SerialPortMan.port_2
        },
        {
            key: 'COM3', isChecked: jsondata.value.SerialPortMan.port_3
        },
        {
            key: 'COM4', isChecked: jsondata.value.SerialPortMan.port_4
        }
    ]
});



const responseData = ref(null) // 创建响应式变量
const syncAgvParm = () => {
    let userList = {
        data: 'SystemParm.json',
        group: 'siasun',
        account: 'test',
        password: '123456'
    }

    axios({
        method: 'post',
        url: '/api/data/jsoneditor',
        data: JSON.stringify(userList)
    })
        .then((res) => {
            ElMessage.success('请求成功')
            responseData.value = res.data
            // console.log('responseData',responseData.value)
            jsondata.value = responseData.value;
            syncdata();
        })
        .catch((error) => {
            ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })
}

const syncdata = () => {
    // tableDataCrtlnet.value = jsondata.value.network;
    tableDataCrtlnet.value[0].value = jsondata.value.NetMan.tc;
    tableDataCrtlnet.value[1].value = jsondata.value.NetMan.screen;
    functioncDate.value = jsondata.value.function;
    UserPermissionsparam.value[0].value =  jsondata.value.Password;
    //com
    tableData.value[0].isChecked = jsondata.value.SerialPortMan.port_1;
    tableData.value[1].isChecked = jsondata.value.SerialPortMan.port_2;
    tableData.value[2].isChecked = jsondata.value.SerialPortMan.port_3;
    tableData.value[3].isChecked = jsondata.value.SerialPortMan.port_4;

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
                servo_type: item[2].toString(),
            };
            CANOPEN.value.push(newRow);
        }
    }

    if (jsondata.value.can2.can_open !== undefined) {
        for (const item of jsondata.value.can2.can_open) {
            const newRow = {
                ID: item[0].toString(),
                canID: item[1].toString(),
                servo_type: item[2].toString(),
            };
            CANOPEN2.value.push(newRow);
        }
    }

    if (jsondata.value.can3.can_open !== undefined) {
        for (const item of jsondata.value.can3.can_open) {
            const newRow = {
                ID: item[0].toString(),
                canID: item[1].toString(),
                servo_type: item[2].toString(),
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

    //Kinematic
    if (jsondata.value.Kinematic.type !== undefined) {
        selected.value = jsondata.value.Kinematic.type.toString();
    }

    if (jsondata.value.Kinematic.delay !== undefined) {
        delayisChecked.value = jsondata.value.Kinematic.delay.need_delay_time;
        delayinput1.value = jsondata.value.Kinematic.delay.servoenable_delay_time;
        delayinput2.value = jsondata.value.Kinematic.delay.servospeed_delay_time;
    }


    if (jsondata.value.Kinematic.drive !== undefined) {
        tableDataCrtl.value = jsondata.value.Kinematic.drive;
    }
    //OTHER
    // OTHERPARM.value.forEach((item) => {
    //     if (jsondata.value.other[item.key] !== undefined) {
    //         item.value = jsondata.value.other[item.key];
    //     }
    // });
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

    if (jsondata.value.Relay !== undefined) {
        tableDataCrtlRelay.value = jsondata.value.Relay;
    }


    if (jsondata.value.Better !== undefined) {
        tableDataCrtlBetter.value = jsondata.value.Better;
    }

    if (jsondata.value.Sound !== undefined) {
        tableDataCrtlSound.value = jsondata.value.Sound;
    }

    if (jsondata.value.Manual !== undefined) {
        MANUALDATA.value = jsondata.value.Manual;
    }


    if (jsondata.value.PLS !== undefined) {
        tableDataCrtlPLS.value = jsondata.value.PLS;
    }
}



const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        jsondata.value = importedData;
        syncdata();

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
    height: 85vh;

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

<style>
.kk-dialog-class {
    pointer-events: none;
}

.el-dialog {
    pointer-events: auto;
}

.el-dialog__body {
    overflow: auto;
    height: 400px;
}
</style>

<style>
.datatableCOM .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>