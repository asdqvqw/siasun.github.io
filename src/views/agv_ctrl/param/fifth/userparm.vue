<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box" style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)"> 

                <div class="left">
                    <el-button type="info" @click="handlecheck">
                        查看设备
                    </el-button>
                    <el-dialog v-model="checkdevice" title="设备总览" :visible="checkdevice" width="900px"
                        @close="checkdevice = false">
                        <checkbox></checkbox>
                    </el-dialog>

                    &nbsp;
                    <el-button type="info" @click="handleExpand11">
                        查看
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible"
                        @close="dialogVisible = false">
                        <pre>{{ formattedJsondata }}</pre>
                    </el-dialog>
                </div>
                <hr class="hengxian">

                <div class="left">
                    <h2>⚠️ 用户配置：</h2>
                    配置用户参数，功能等：
                    <hr class="hengxian2">
                    <h3>⚠️ 功能定制:</h3>
                    配置车体程序功能开关:
                    <el-button @click="togglefunctionc" type="text" plain :disabled="false">
                        <span v-if="!functionc">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': functionc }">➡️</span>
                    </el-button><br>
                    <div v-if="functionc">
                        <functionch />
                    </div>
                    <hr class="hengxian3">

                    <h3>⚠️ 其他:</h3>
                    控制周期与线程超时保护:
                    <el-button @click="toggleotherc" type="text" plain :disabled="false">
                        <span v-if="!otherc">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': otherc }">➡️</span>
                    </el-button><br>
                    <div v-if="otherc">
                        <el-table :data="OTHERPARM" style="width: 100%">
                            <el-table-column prop="name" label=" ">
                            </el-table-column>
                            <el-table-column prop="value" label=" ">
                                <template #default="scope">
                                    <el-input v-model="scope.row.value" placeholder="请选择" style="width:100%;"
                                        @change="handleCtrlStatusChange(scope.$index, scope.row)" type="number">

                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </div>




                <hr class="hengxian2">

                <el-button type="success" @click="nexatstep">导出到本地</el-button>
                <hr class="kongge">
                <el-button type="success" @click="updataAGV">同步到AGV</el-button>
                <hr class="kongge">
                <hr class="kongge">
                <el-button type="primary" @click="returnstep">返回</el-button>

                <hr class="kongge">
                <el-button type="primary" @click="afterstep">上一步</el-button>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { OTHERPARM } from '@/views/agv_ctrl/param/common/commondata.js'
import functionch from './function/function.vue'
import checkbox from '@/views/agv_ctrl/param/check.vue';
const checkdevice = ref(false);
const handlecheck = () => {
    checkdevice.value = true;
};
const dialogVisible = ref(false);
const functionc = ref(false);
const otherc = ref(false);

const handleCtrlStatusChange = (index, row) => {
    jsondata.value.other[row.key] = parseInt(row.value);
};
const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});

const handleExpand11 = () => {
    dialogVisible.value = true;
};
const toggleotherc = () => {
    otherc.value = !otherc.value;
};
const togglefunctionc = () => {
    functionc.value = !functionc.value;
};
const afterstep = () => {
    router.push('/main/third');
};
const returnstep = () => {
    router.push('/main/param/index');
};


import axios from 'axios'
const updataAGV = () => {

    let userList = {
        data:{
            file:'SystemParm.json',
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

    }).catch(error => {
         ElMessage.error('请求失败')
    }).finally(() => {
        
    })
}


const nexatstep = () => {
    const jsonDataToExport = JSON.stringify(jsondata.value);
    const blob = new Blob([jsonDataToExport], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SystemParm.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
</script>


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
    margin-top: 2px;
}
</style>