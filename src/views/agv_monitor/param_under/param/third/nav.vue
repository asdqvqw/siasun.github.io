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
                        <!-- <h2>⚠️ 电器模块：</h2>
                        配置电器模块： -->
                        <hr class="hengxian2">
                        <!-- <h3>⚠️ 面板:</h3>

                        <br>
                        <switchburron></switchburron> -->
                        <!-- <div v-if="StartButton">
                            <switchh></switchh>
                            
                        </div>
 
                        <div v-if="EmgButton">
                            <switchhemg></switchhemg>
                      
                        </div> -->


                        <!-- <hr class="hengxian3">

                        <h3>⚠️ 安全回路:</h3>
                        <br>
                        <el-tabs>
                            <el-tab-pane label="PLS设置">
                                <PLS></PLS>
                            </el-tab-pane>


                            <el-tab-pane label="保险杠">
                                <hardBump></hardBump>
                            </el-tab-pane>



                            <el-tab-pane label="继电器">
                                <relay></relay>
                            </el-tab-pane>
                            <el-tab-pane label="急停">
                                <switchhemg></switchhemg>
                            </el-tab-pane>
                            

                        </el-tabs> -->
                        <!-- <div v-if="PLSparm">
                            <PLS></PLS>

                        </div>

  
                        <div v-if="Hunpparm">
                            <hardBump></hardBump>
                            
                        </div>

                        <hr class="hengxian3">


                        <div v-if="Relay">
                            <relay></relay>
                            
                        </div> -->
                        <!-- <hr class="hengxian3">

                        <h3>⚠️ 电池指示器:</h3>

                        <br>
                        <Better></Better>
                        <hr class="hengxian3"> -->
                        <!-- 
                        <h3 style="display: inline-block;">⚠️ 扬声器:</h3>

                        <el-button @click="togglesoundparm" type="text" plain :disabled="false">
                            <span v-if="!soundparm">展开</span>
                            <span v-else>展开</span>
                            <span :class="{ 'rotate-arrow': soundparm }">➡️</span>
                        </el-button><br> -->
                        <!-- <div v-if="soundparm">
                            <sound></sound>
                            <br>
                        </div> -->


                        <!-- <h3 style="display: inline-block;">⚠️ 手控设备:</h3> -->
                        <!-- 

                        <el-button @click="toggleManparm" type="text" plain :disabled="false">
                            <span v-if="!Manparm">展开</span>
                            <span v-else>展开</span>
                            <span :class="{ 'rotate-arrow': Manparm }">➡️</span>
                        </el-button> -->
                        <!-- <br><br>
                        <div v-if="Manparm">
                            <Manual></Manual>
                            <br>
                        </div>


                        <hr class="hengxian3"> -->

                    <h3>⚠️ 导航:</h3>
                    <br>
                    <navparm></navparm>
                    </div>




                    <hr class="hengxian2">


                </DefinScrollbar>
         

        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { jsondata,pagenum } from '../common/commondata.js';
import hardBump from './Bumper/index.vue';
import relay from './Relay/index.vue';
import switchburron from './button/index.vue'
import switchh from './StartButton/switch.vue';
import switchhemg from './EmgButton/index.vue';
import SCREEN from './Screen/Screen.vue';
import Better from './Better/Better.vue';
import PLS from './PLS/index.vue';
import Manual from './Manaul/index.vue';
import navparm from './nav/index.vue';
import sound from './Sound/Sound.vue';
import checkbox from '../check.vue';
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const checkdevice = ref(false);
const handlecheck = () => {
    checkdevice.value = true;
};

const formattedJsondata = computed(() => {
    return JSON.stringify(jsondata.value, null, 2);
});


const StartButton = ref(true);
const EmgButton = ref(true);
const PLSparm = ref(true);
const Hunpparm = ref(true);
const dialogVisible = ref(false);
const Relay = ref(true);
const Manparm = ref(true);
const soundparm = ref(true);

const toggleHunpparm = () => {
    Hunpparm.value = !Hunpparm.value;
};

const togglesoundparm = () => {
    soundparm.value = !soundparm.value;
};

const toggleManparm = () => {
    Manparm.value = !Manparm.value;
};

const toggleRelay = () => {
    Relay.value = !Relay.value;
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
    pagenum.value = 7;
};
const nexatstep = () => {
    pagenum.value = 4;
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