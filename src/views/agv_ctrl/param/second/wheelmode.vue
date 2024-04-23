<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box">

                <div class="left">

                    <el-button type="info" @click="handlecheck" >
                        查看设备
                    </el-button>
                    <el-dialog v-model="checkdevice" title="设备总览" :visible="checkdevice" 
                    width="900px" @close="checkdevice = false" >
                        <checkbox></checkbox>
                    </el-dialog>

                    &nbsp;


                    <el-button type="info" @click="handleExpand11" >
                        查看
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
                        <pre>{{ formattedJsondata }}</pre>
                    </el-dialog>
                </div>
                
                <hr class="hengxian">

                <div class="left">
                    <h2>⚠️ 驱动模型：</h2>
                    配置车体驱动模型
                    <hr class="hengxian2">
                    <h3>⚠️ 运行参数</h3>
                    配置手动运行参数和自动运行参数:
                    <br><br>
                    <span class="title">🔖 自动参数:</span>
                    <el-button @click="toggleautoparm" type="text" plain :disabled="false">
                        <span v-if="!autoparm">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': autoparm }">➡️</span>
                    </el-button><br>
                    <div v-if="autoparm">
                        <autoparmh />
                    </div>
                    <br>
                    <span class="title">🔖 手动参数:</span>
                    <el-button @click="togglemanualparm" type="text" plain :disabled="false">
                        <span v-if="!manualparm">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': manualparm }">➡️</span>
                    </el-button><br>

                    <div v-if="manualparm">
                        <manualparmh />
                    </div>
                    <hr class="hengxian3">


                    <h3>⚠️ 车体模型</h3>
                    配置车体类型和轮舵机械参数:
                    <el-button @click="toggleKinematic" type="text" plain :disabled="false">
                        <span v-if="!Kinematic">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': Kinematic }">➡️</span>
                    </el-button><br>

                    <div v-if="Kinematic">
                        <Kinematich />
                    </div>

                    
                </div>
                <hr class="hengxian2">
                <el-button type="primary" @click="nexatstep">下一步</el-button>
                <hr class="kongge">
                <el-button type="primary" @click="afterstep">上一步</el-button>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref,computed } from 'vue';
import { jsondata } from '../common/commondata.js';
import manualparmh from './manualparm.vue';
import autoparmh from './autoparm.vue';
import Kinematich from './Kinematic/Kinematic.vue';
import checkbox from '@/views/agv_ctrl/param/check.vue';
const checkdevice = ref(false);
const handlecheck = () => {
    checkdevice.value = true;
};
const dialogVisible = ref(false);
const manualparm = ref(false);
const autoparm = ref(false);
const Kinematic = ref(false);
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
    router.push('/main/param/index');
};
const nexatstep = () => {
    router.push('/main/third');
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

.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>