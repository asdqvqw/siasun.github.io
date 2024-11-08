<template>
    <div>
        <div class="page-container main-view">

       
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
                        <!-- <h2>⚠️ 通讯：</h2>
                        配置串口，网口，CAN线相关参数 -->
                        <hr class="hengxian2">
                        <h3>⚠️ 通讯</h3>
                        <el-tabs>
                            <el-tab-pane label="网口设置">
                                <Consloe />
                            </el-tab-pane>
                            <el-tab-pane label="串口设置">
                                <h5>选择启用串口</h5><br>
                                <div style="display: flex; flex-wrap: wrap; gap: 20px;">

                                    <el-card v-for="(port, index) in tableData" :key="port.key" class="port-card"
                                        :body-style="{ padding: '20px' }">
                                        <div style="display: flex; align-items: center;">
                                            <span style="margin-right: 10px;">⚠️ {{ port.key }}:</span>
                                            <el-checkbox v-model="port.isChecked"
                                                @change="handlecom(port)"></el-checkbox>
                                        </div>
                                    </el-card>
                                </div>
                            </el-tab-pane>

                        </el-tabs>

                        <hr class="hengxian3">
                        <div v-if="ShowCanSelect">
                            <CanLine />
                        </div>
                    </div>


                    <hr class="hengxian2">

                </DefinScrollbar>
         

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Consloe from './common/Consloe.vue';
import CanLine from './common/CanLine.vue';
import checkbox from './check.vue';
import { jsondata, pagenum } from './common/commondata.js';
import { tableDataCrtl, tableDataCrtlnet } from './common/commondata.js';
import { CANPOS, CANPOS2, CANPOS3 } from './common/commondata.js';
import { CANOPEN, CANOPEN2, CANOPEN3 } from './common/commondata.js';
import { CANGUIDE, CANGUIDE2, CANGUIDE3 } from './common/commondata.js';
import { CANBMS, CANBMS2, CANBMS3 } from './common/commondata.js';
import { CANIO, CANIO2, CANIO3 } from './common/commondata.js';
import { CANMANUAL, CANMANUAL2, CANMANUAL3 } from './common/commondata.js';
import { CANRFID, CANRFID2, CANRFID3 } from './common/commondata.js';
import { AUTOPARM, AUTOPARMLEV, autoParam } from './common/commondata.js';
import { manualvelParam, manualradiusParam } from './common/commondata.js';
import { selected } from './common/commondata.js';
import { delayisChecked, delayinput1, delayinput2 } from './common/commondata.js';
import { OTHERPARM, functioncDate, UserPermissionsparam,versionparam } from './common/commondata.js';
import { tableDataCrtlswitch, tableDataCrtlswitchEmg } from './common/commondata.js';
import { tableDataCrtlBumper, tableDataCrtlPLS, tableDataCrtlSound, MANUALDATA } from './common/commondata.js';
import { tableDataCrtlBetter, tableDataCrtlRelay } from './common/commondata.js';
import DefinScrollbar from "@/components/DefinScrollbar.vue";

const ShowNetSelect = ref(true);
const ShowCanSelect = ref(true);
const dialogVisible = ref(false);
const checkdevice = ref(false);


const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});
const handlecom = (row) => {
    jsondata.value.SerialPortMan[`port_${row.key.charAt(3)}`] = row.isChecked;
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
    pagenum.value = 2;
};


import axios from 'axios'

const tableData = computed(() => {
    const serialPortMan = jsondata.value.SerialPortMan;

    return [
        {
            key: 'COM1', isChecked: serialPortMan && serialPortMan.port_1 !== undefined ? serialPortMan.port_1 : false
        },
        {
            key: 'COM2', isChecked: serialPortMan && serialPortMan.port_2 !== undefined ? serialPortMan.port_2 : false
        },
        {
            key: 'COM3', isChecked: serialPortMan && serialPortMan.port_3 !== undefined ? serialPortMan.port_3 : false
        },
        {
            key: 'COM4', isChecked: serialPortMan && serialPortMan.port_4 !== undefined ? serialPortMan.port_4 : false
        }
    ];
});

const responseData = ref(null) // 创建响应式变量
const syncAgvParm = () => {
    let userList = {
        data: 'agvparam.json',
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
    //net
    tableDataCrtlnet.value.forEach((item) => {
        if (jsondata.value.NetMan[item.key] !== undefined) {
            item.value = jsondata.value.NetMan[item.key];
        }
    });

    functioncDate.value = jsondata.value.FuncSet.keys;
    versionparam.value[0].value = jsondata.value.version;
    UserPermissionsparam.value[0].value = jsondata.value.Password;
    //com
    if (jsondata.value.SerialPortMan !== undefined) {
        tableData.value[0].isChecked = jsondata.value.SerialPortMan.port_1;
        tableData.value[1].isChecked = jsondata.value.SerialPortMan.port_2;
        tableData.value[2].isChecked = jsondata.value.SerialPortMan.port_3;
        tableData.value[3].isChecked = jsondata.value.SerialPortMan.port_4;
    }
    //opparam
    AUTOPARM.value.forEach((item) => {
        if (jsondata.value.MotionParam.common_param[item.key] !== undefined) {
            item.value = jsondata.value.MotionParam.common_param[item.key];
        }
    });
 
    autoParam.value.speed_level = jsondata.value.MotionParam.auto_param.speed_level;
    manualvelParam.value.speed_level = jsondata.value.MotionParam.manaul_param.speed_level;
    manualradiusParam.value.speed_level = jsondata.value.MotionParam.manaul_param.turn_radius;

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
.port-card {
    width: 200px;
    /* 卡片宽度 */
    border-radius: 8px;
    /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 阴影 */
}

.rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
}


.hengxian {
    border: none;
    border-top: 2px solid #cccccc00;
    margin: 20px 0;
}

.hengxian3 {
    border: none;
    border-top: 2px dashed #cccccc00;
    margin: 20px 0;
}

.hengxian2 {
    height: 2px;
    /* 线条高度 */
    background: linear-gradient(to right, #e8e7e700 50%, transparent 50%);
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
    height: 90vh;

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