<template>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
        <el-card class="button-card" :body-style="{ padding: '20px' }">
            <div class="input-group">
                <strong>{{ jsondata.PowerRelay.name }}</strong>
            </div>
            <div class="button-values">
                <div class="input-group">
                    <label>IO:</label>
                    <el-select v-model="jsondata.PowerRelay.io_input[0]" placeholder="选择类型" 
                        @change="handleTypeChange" style="margin-right: 10px; width: 100px;">
                        <el-option v-for="option in buttonOptions" :key="option.value" 
                            :label="option.label" :value="option.value" />
                    </el-select>
                </div>
                <div class="input-group" v-if="showRouteInput()">
                    <label>can路数:</label>
                    <el-select v-model="jsondata.PowerRelay.io_input[1]" placeholder="选择类型" 
                        style="margin-right: 10px; width: 100px;">
                        <el-option v-for="option in canOptions" :key="option.value" 
                            :label="option.label" :value="option.value" />
                    </el-select>
                </div>
                <div class="input-group" v-if="showModuleInput()">
                    <label v-if="isLocalIO()">本地IO地址:</label>
                    <label v-else>模块编号:</label>
                    <el-input v-if="isLocalIO()" v-model.number="jsondata.PowerRelay.io_input[2]" 
                        placeholder="模块编号" type="number" 
                        style="margin-right: 10px; width: 100px;"></el-input>
                    <el-select v-else v-model="jsondata.PowerRelay.io_input[2]" placeholder="选择模块编号" 
                        style="margin-right: 10px; width: 100px;">
                        <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i + 1)" 
                            :key="num" :label="num" :value="num" />
                    </el-select>
                </div>
                <div class="input-group">
                    <label v-if="isLocalIO()">输出点对应位:</label>
                    <label v-else-if="isGPIO()">输入点对应位:<br>自动转化</label>
                    <label v-else>模块内输出点编号:</label>
                    <el-select v-if="isLocalIO()" v-model="jsondata.PowerRelay.io_input[3]" 
                        placeholder="选择输出点" style="margin-right: 10px; width: 100px;">
                        <el-option v-for="num in Array.from({ length: 10 }, (_, i) => i + 1)" 
                            :key="num" :label="'bit' + num" :value="num" />
                    </el-select>
                    <el-input v-else-if="isGPIO()" style="margin-right: 10px; width: 100px;" 
                        v-model.number="jsondata.PowerRelay.io_input[3]" @change="formatbit5"> 
                    </el-input>

                    <el-select v-else v-model="jsondata.PowerRelay.io_input[3]" placeholder="选择输出点" 
                        style="margin-right: 10px; width: 100px;">
                        <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i + 1)" 
                            :key="num" :label="num" :value="num" />
                    </el-select>
                </div>
                <div class="input-group">
                    <label>电平:</label>
                    <el-select v-model="jsondata.PowerRelay.io_input[4]" placeholder="高低电平" 
                        style="margin-right: 10px; width: 100px;">
                        <el-option label="高" :value="1"></el-option>
                        <el-option label="低" :value="0"></el-option>
                    </el-select>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata, adjustbit5 } from '@/views/agv_ctrl/param/common/commondata.js'

// 按钮选项
const buttonOptions = [
    { label: 'CAN-POS', value: 1 },
    { label: 'CAN-OPEN', value: 2 },
    { label: '本地IO', value: 3 },
    { label: 'CAN-IO', value: 4 },
    { label: 'GPIO', value: 5 }
];
const canOptions = [
    { label: 'CAN1', value: 1 },
    { label: 'CAN2', value: 2 },
    { label: 'CAN3', value: 3 },
    { label: 'CAN4', value: 4 },
    { label: 'CAN5', value: 5 },
];

// 处理类型变化
const handleTypeChange = () => {
    if (![1, 2, 4].includes(jsondata.value.PowerRelay.io_input[0])) {
        jsondata.value.PowerRelay.io_input[1] = 2; // 重置路数
    }
    if (![3].includes(jsondata.value.PowerRelay.io_input[0])) {
        jsondata.value.PowerRelay.io_input[2] = 2;
        jsondata.value.PowerRelay.io_input[3] = 2;
    }
};

// 判断是否显示路数输入框
const showRouteInput = () => {
    return [1, 2, 4].includes(jsondata.value.PowerRelay.io_input[0]);
};

// 判断是否显示模块编号输入框
const showModuleInput = () => {
    return !isGPIO();
};

// 检查是否为GPIO
const isGPIO = () => {
    return jsondata.value.PowerRelay.io_input[0] === 5; // GPIO 的值
};

// 检查是否为本地IO
const isLocalIO = () => {
    return jsondata.value.PowerRelay.io_input[0] === 3; // 本地IO 的值
};

// 格式化 bit5
const formatbit5 = () => {
    const decimal = parseInt(jsondata.value.PowerRelay.io_input[3], 16);
    jsondata.value.PowerRelay.io_input[3] = isNaN(decimal) ? 2 : parseInt(jsondata.value.PowerRelay.io_input[3], 16);
};
</script>

<style lang="scss" scoped>
.button-card {
    width: 30vw;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
}

.button-values {
    display: flex;
    flex-direction: column;
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.input-group label {
    margin-right: 10px;
}
</style>