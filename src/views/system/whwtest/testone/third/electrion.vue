<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box">

                <div class="left">
                    <el-button type="info" @click="handleExpand11" plain>
                        查看
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
                        <p>{{ jsondata }}</p>
                    </el-dialog>
                </div>
                <hr class="hengxian">

                <div class="left">
                    <h2>⚠️ 电器模块：</h2>
                    配置电器模块：
                    <hr class="hengxian2">
                    <h3>⚠️ 开关:</h3>
                    配置按钮相关:
                    <br><br>
                    <span class="title">🔖 启动按钮:</span>
                    
                    <el-button @click="toggleStartButton" type="text" plain :disabled="false">
                        <span v-if="!StartButton">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': StartButton }">➡️</span>
                    </el-button><br>
                    <div v-if="StartButton">
                        <switchh></switchh>
                        <br>
                    </div>
                    <br>
                    <span class="title">🔖 急停开关:</span>
                    
                    <el-button @click="toggleEmgButton" type="text" plain :disabled="false">
                        <span v-if="!EmgButton">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': EmgButton }">➡️</span>
                    </el-button><br>
                    <div v-if="EmgButton">
                        <switchhemg></switchhemg>
                        <br>
                    </div>

                    
                    <hr class="hengxian3">

                    <h3>⚠️ 防碰设备:</h3>
                    配置保险杠和PLS相关:
                    <br><br>
                    <!-- <span class="title">🔖 可切区PLS:</span>
                    <el-button @click="togglePLSparm" type="text" plain :disabled="false">
                        <span v-if="!PLSparm">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': PLSparm }">➡️</span>
                    </el-button><br>
                    <div v-if="PLSparm">
                        
                        <br>
                    </div> -->
                    <br>
                    <span class="title">🔖 硬保险杠:</span>
                    <el-button @click="toggleHunpparm" type="text" plain :disabled="false">
                        <span v-if="!Hunpparm">展开</span>
                        <span v-else>展开</span>
                        <span :class="{ 'rotate-arrow': Hunpparm }">➡️</span>
                    </el-button><br>
                    <div v-if="Hunpparm">
                        <hardBump></hardBump>
                        <br>
                    </div>

                    <!-- <hr class="hengxian3">

                    <h3>⚠️ 伺服继电器:</h3>



                    <hr class="hengxian3">

                    <h3>⚠️ 电池指示表:</h3>

                    <hr class="hengxian3">

                    <h3>⚠️ 扬声器:</h3>

                    <hr class="hengxian3">

                    <h3>⚠️ 手控设备:</h3>

                    <hr class="hengxian3">

                    <h3>⚠️ 屏幕:</h3> -->

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
import { ref } from 'vue';
import { jsondata } from '@/views/system/whwtest/testone/common/commondata.js';
import hardBump from './Bumper/Bumper.vue';
import switchh from './StartButton/switch.vue';
import switchhemg from './EmgButton/switch.vue';






const StartButton = ref(false);
const EmgButton = ref(false);
const PLSparm = ref(false);
const Hunpparm = ref(false);
const dialogVisible = ref(false);


const toggleHunpparm = () => {
    Hunpparm.value = !Hunpparm.value;
};


const togglePLSparm = () => {
    PLSparm.value = !PLSparm.value;
};

const toggleEmgButton = () => {
    EmgButton.value = !EmgButton.value;
};

const toggleStartButton = () => {
    StartButton.value = !StartButton.value;
};



const handleExpand11 = () => {
    dialogVisible.value = true;
};


const afterstep = () => {
    router.push('/main/second');
};
const nexatstep = () => {
    router.push('/main/fifth');
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