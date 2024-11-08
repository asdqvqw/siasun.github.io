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
                            @close="dialogVisible = false">
                            <DefinScrollbar height="100%" :showUpBt="true">
                                <pre>{{ formattedJsondata }}</pre>
                            </DefinScrollbar>
                        </el-dialog>
                        &nbsp;
                        <el-button type="primary" @click="afterstep">上一步</el-button>

                        <el-button type="primary" @click="nexatstep">下一步</el-button>
                    </div>

                    <hr class="hengxian">

                    <div class="left">
                        <!-- <h2>⚠️ 驱动模型：</h2>
                        配置车体驱动模型
                        &nbsp;车型:&nbsp;<el-select v-model="jsondata.car_type">
                            <el-option label="货架车" :value="0"></el-option> -->
                            <!-- <el-option label="V型槽" :value="1"></el-option> -->
                        <!-- </el-select> -->
                        <hr class="hengxian2">

                        <h3>⚠️ 车体模型</h3>
                        <!-- 配置车体类型和轮舵机械参数:
                        <el-button @click="toggleKinematic" type="text" plain :disabled="false">
                            <span v-if="!Kinematic">展开</span>
                            <span v-else>展开</span>
                            <span :class="{ 'rotate-arrow': Kinematic }">➡️</span>
                        </el-button>
                        <br> -->

                        <div v-if="Kinematic">
                            <Kinematich />
                        </div>



                        <hr class="hengxian3">

                        <h3>⚠️ 运行参数</h3>
                        <br>
                        <el-tabs>
                            <el-tab-pane label="公共参数">
                                <autoparmh />
                            </el-tab-pane>
                            <el-tab-pane label="手动参数">
                                <manualparmh />
                            </el-tab-pane>
                            <el-tab-pane label="自动参数">
                                <commonparmh />
                            </el-tab-pane>
 
                        </el-tabs>

                    </div>
                    <hr class="hengxian2">

                </DefinScrollbar>
            </div>

   

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { jsondata,pagenum } from '../common/commondata.js';
import manualparmh from './manualparm.vue';
import autoparmh from './autoparm.vue';
import commonparmh from './commonparm.vue';
import Kinematich from './Kinematic/Kinematic.vue';
import checkbox from '../check.vue';
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const checkdevice = ref(false);
const handlecheck = () => {
    checkdevice.value = true;
};
const dialogVisible = ref(false);
const manualparm = ref(true);
const autoparm = ref(true);
const Kinematic = ref(true);
const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});

const toggleKinematic = () => {
    Kinematic.value = !Kinematic.value;
};

const handleExpand11 = () => {
    dialogVisible.value = true;
};

const togglemanualparm = () => {
    manualparm.value = !manualparm.value;
};
const toggleautoparm = () => {
    autoparm.value = !autoparm.value;
};

const afterstep = () => {
    pagenum.value = 1;
};
const nexatstep = () => {
    pagenum.value = 3;
};
</script>


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

<style scoped>
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
    margin-top: 2px;
}

.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
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