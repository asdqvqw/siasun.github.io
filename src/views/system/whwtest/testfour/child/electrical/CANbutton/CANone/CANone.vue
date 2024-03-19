<template>
    <div v-if="CANone">

        <el-button @click="CANPOSh" type="success" plain :disabled="CANOPEN || GUIDE">
            <span v-if="!CANPOS">CAN-POS设备</span>
            <span v-else>CAN-POS设备</span>
            <span :class="{ 'rotate-arrow': CANPOS }">></span>
        </el-button>

        <!-- <el-button @click="CANOPENh" type="success" plain :disabled="CANPOS || GUIDE">
            <span v-if="!CANOPEN">CAN-OPEN设备</span>
            <span v-else>CAN-OPEN设备</span>
            <span :class="{ 'rotate-arrow': CANOPEN }">></span>
        </el-button>

        <el-button @click="GUIDEh" type="success" plain :disabled="CANPOS || CANOPEN">
            <span v-if="!GUIDE">惯导</span>
            <span v-else>惯导</span>
            <span :class="{ 'rotate-arrow': GUIDE }">></span>
        </el-button> -->


        <hr v-if="CANPOS || CANOPEN || GUIDE" class="divider">
        <CANPOSe />
    </div>
</template>

<script setup>
import { CANone } from '../CANbutton.js'
import { CANPOS } from './CANone.js'
import { CANOPEN } from './CANone.js'
import { GUIDE } from './CANone.js'

import CANPOSe from './CAN-POS/CAN-POS.vue'
// import CANOPENe from './CANOPEN/CANOPEN.vue'
// import GUIDEe from './GUIDE/GUIDE.vue'

const CANPOSh = () => {
    CANPOS.value = !CANPOS.value;
};

const CANOPENh = () => {
    CANOPEN.value = !CANOPEN.value;
};

const GUIDEh = () => {
    GUIDE.value = !GUIDE.value;
};
</script>