<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box"
                style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
                <DefinScrollbar height="100%" :showUpBt="true">
                    <div class="left">
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
                        <el-button type="primary" @click="updataAGV">同步到AGV</el-button>
                        &nbsp;
                        <input ref="importInput" type="file" accept=".json" style="display: none"
                            @change="handleImport" />
                        <el-button @click="$refs.importInput.click()" type="success">
                            本地导入
                        </el-button>
                        <el-button type="success" @click="nexatstep">导出到本地</el-button>
                    </div>
                    <hr class="hengxian">

                    <el-table :data="EQUversion" style="width: 100%" class="EQUversion">

                        <el-table-column prop="name" label="⚠️ 版本"></el-table-column>

                        <el-table-column prop="value">
                            <template #default="scope">
                                <el-input v-model="jsondata.version" placeholder="请选择" style="width:100%;">

                                </el-input>

                            </template>
                        </el-table-column>

                    </el-table>
                    <hr class="hengxian3">
                    <IO></IO>
                    <IOOUT></IOOUT>
                    <hr class="hengxian3">
                    <servo_equ></servo_equ>
                    <hr class="hengxian3">
                    <equtask></equtask>
                    <hr class="hengxian3">
                    <device></device>
                    <!-- <hr class="hengxian2"> -->
                </DefinScrollbar>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
import axios from 'axios'
import {
    jsondata, EQUversion, IOinputdata, IOoutputdata
    , servodata, taskdata
} from './common.js'
import IO from "./IO/index.vue";
import IOOUT from "./IOout/index.vue";
import servo_equ from "./Servo/index.vue";
import equtask from "./Servo/task.vue";
import device from "./other/index.vue";

const dialogVisible = ref(false)


const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});
const handleExpand11 = () => {
    dialogVisible.value = true;
};


const updataAGV = () => {

    let userList = {
        data: {
            file: 'equipment.json',
            value: jsondata.value
        },
        group: 'siasun',
        account: 'test',
        password: '123456'
    }
    console.log(userList)

    axios({
        method: 'post',
        url: '/api/ctrl/jsoneditor',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('请求成功')


        var userLists = {
            type: 'syncParm',
            data: true
        }
        console.log(JSON.stringify(userLists));
        axios({
            method: 'post',
            url: '/api/ctrl/manualdata',//这里是请求地址
            data: JSON.stringify(userLists),
        }).then((res) => {
            ElMessage.success('同步参数')
        }).catch(error => {
            // ElMessage.error('请求失败')
        }).finally(() => {
        })


    }).catch(error => {
        ElMessage.error('请求失败')
    }).finally(() => {

    })



}



const responseData = ref(null) // 创建响应式变量
const syncAgvParm = () => {
    let userList = {
        data: 'equipment.json',
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
            responseData.value = res.data;
            jsondata.value = res.data;
            syncdata();
        })
        .catch((error) => {
            ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })
}
const nexatstep = () => {
    const jsonDataToExport = JSON.stringify(jsondata.value);
    const blob = new Blob([jsonDataToExport], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment.json';
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
        syncdata();

    };
    reader.readAsText(file);

    ElMessage.success('导入成功');
};

const syncdata = () => {
    if (jsondata.value.IO !== undefined) {
        if (jsondata.value.IO.input !== undefined) {
            IOinputdata.value = jsondata.value.IO.input;
        }
        if (jsondata.value.IO.output !== undefined) {
            IOoutputdata.value = jsondata.value.IO.output;
        }
    }
    if (jsondata.value.servo.kinco !== undefined) {
        if (jsondata.value.servo !== undefined) {
            servodata.value = jsondata.value.servo.kinco;
        }

    }

}
</script>


<style scoped>
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
.EQUversion .el-table__body tr:nth-child(1n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
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