<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box">

            <div class="left">
                <el-button @click="togglePos" type="primary" plain
                    :disabled="CAN_openD || CAN_guideD || CAN_bmsD || CAN_ioD || CAN_manualD || CAN_Rfid">
                    <span v-if="!CAN_posD">CAN-POS设备</span>
                    <span v-else>CAN-POS设备</span>
                    <span :class="{ 'rotate-arrow': CAN_posD }">👉</span>
                </el-button>

                <el-button @click="toggleopen" type="primary" plain
                    :disabled="CAN_posD || CAN_guideD || CAN_bmsD || CAN_ioD || CAN_manualD || CAN_Rfid">
                    <span v-if="!CAN_openD">CAN-OPEN设备</span>
                    <span v-else>CAN-OPEN设备</span>
                    <span :class="{ 'rotate-arrow': CAN_openD }">👉</span>
                </el-button>

                <el-button @click="toggleguide" type="primary" plain
                    :disabled="CAN_posD || CAN_openD || CAN_bmsD || CAN_ioD || CAN_manualD || CAN_Rfid">
                    <span v-if="!CAN_guideD">惯导设备</span>
                    <span v-else>惯导设备</span>
                    <span :class="{ 'rotate-arrow': CAN_guideD }">👉</span>
                </el-button>

                <el-button @click="toggleBMS" type="primary" plain
                    :disabled="CAN_posD || CAN_openD || CAN_guideD || CAN_ioD || CAN_manualD || CAN_Rfid">
                    <span v-if="!CAN_bmsD">锂电池管理</span>
                    <span v-else>锂电池管理</span>
                    <span :class="{ 'rotate-arrow': CAN_bmsD }">👉</span>
                </el-button>

                <el-button @click="toggleIO" type="primary" plain
                    :disabled="CAN_posD || CAN_openD || CAN_guideD || CAN_bmsD || CAN_manualD || CAN_Rfid">
                    <span v-if="!CAN_ioD">CAN-IO</span>
                    <span v-else>CAN-IO</span>
                    <span :class="{ 'rotate-arrow': CAN_ioD }">👉</span>
                </el-button>

                <el-button @click="toggleMANUAL" type="primary" plain
                    :disabled="CAN_posD || CAN_openD || CAN_guideD || CAN_bmsD || CAN_ioD || CAN_Rfid">
                    <span v-if="!CAN_manualD">CAN手控盒</span>
                    <span v-else>CAN手控盒</span>
                    <span :class="{ 'rotate-arrow': CAN_manualD }">👉</span>
                </el-button>

                <el-button @click="toggleRFID" type="primary" plain
                    :disabled="CAN_posD || CAN_openD || CAN_guideD || CAN_bmsD || CAN_ioD || CAN_manualD">
                    <span v-if="!CAN_Rfid">CAN-RFID</span>
                    <span v-else>CAN-RFID</span>
                    <span :class="{ 'rotate-arrow': CAN_Rfid }">👉</span>
                </el-button>
            </div>


            
            <div v-if="CAN_posD">
                <Can_Pos />
            </div>

            <div v-if="CAN_openD">
                <Can_Open />
            </div>

            <div v-if="CAN_guideD">
                <Can_guide />
            </div>

            <div v-if="CAN_bmsD">
                <Can_bms />
            </div>
            
            <div v-if="CAN_ioD">
                <Can_io />
            </div>

            <div v-if="CAN_manualD">
                <Can_manual />
            </div>

            <div v-if="CAN_Rfid">
                <Can_rfid />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Can_Pos from './Can_Pos.vue';
import Can_Open from './Can_open.vue';
import Can_guide from './Can_guide.vue';
import Can_bms from './Can_BMS.vue';
import Can_io from './Can_IO.vue';
import Can_manual from './Can_Manual.vue';
import Can_rfid from './Can_RFID.vue';
const CAN_openD = ref(false);
const CAN_bmsD = ref(false);
const CAN_posD = ref(false);
const CAN_guideD = ref(false);
const CAN_ioD = ref(false);
const CAN_manualD = ref(false);
const CAN_Rfid = ref(false);


const togglePos = () => {
    CAN_posD.value = !CAN_posD.value;
};
const toggleopen = () => {
    CAN_openD.value = !CAN_openD.value;
};
const toggleguide = () => {
    CAN_guideD.value = !CAN_guideD.value;
};

const toggleIO = () => {
    CAN_ioD.value = !CAN_ioD.value;
};
const toggleMANUAL = () => {
    CAN_manualD.value = !CAN_manualD.value;
};
const toggleRFID = () => {
    CAN_Rfid.value = !CAN_Rfid.value;
};
const toggleBMS = () => {
    CAN_bmsD.value = !CAN_bmsD.value;
};


</script>

<style lang="scss" scoped>
.main-view {
    display: flex;
    flex-direction: column;

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
</style>
  

<style scoped>
.rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
}
</style>
  