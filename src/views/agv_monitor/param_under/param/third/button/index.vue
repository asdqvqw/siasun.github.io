<template>
    <el-tabs>
        <el-tab-pane label="开关设置">
            <div style="display: flex;  gap: 20px; flex-wrap: wrap;">
                <el-card v-for="(value, key) in jsondata.Panel.Button" :key="key" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <h4>{{ formatButtonKey(key) }}</h4>
                    <div class="button-values">
                        <div class="input-group">
                            <label>IO:</label>
                            <el-select v-model="jsondata.Panel.Button[key][0]" placeholder="选择类型"
                                @change="handleTypeChange(key)" style="margin-right: 10px; width: 100px;">
                                <el-option v-for="option in buttonOptions" :key="option.value" :label="option.label"
                                    :value="option.value" />
                            </el-select>
                        </div>
                        <div class="input-group" v-if="showRouteInput(key)">
                            <label>can路数:</label>
                            <el-select v-model="jsondata.Panel.Button[key][1]" placeholder="选择类型"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="option in canOptions" :key="option.value" :label="option.label"
                                    :value="option.value" />
                            </el-select>
                        </div>
                        <div class="input-group" v-if="showModuleInput(key)">
                            <label v-if="isLocalIO(key)">本地IO地址:</label>
                            <label v-else>模块编号:</label>
                            <el-input v-if="isLocalIO(key)" v-model.number="jsondata.Panel.Button[key][2]"
                                placeholder="模块编号" type="number" style="margin-right: 10px; width: 100px; "></el-input>
                            <el-select v-else v-model="jsondata.Panel.Button[key][2]" placeholder="选择模块编号"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)" :key="num"
                                    :label="num" :value="num" />
                            </el-select>
                        </div>
                        <div class="input-group">
                            <label v-if="isLocalIO(key)">输出点对应位:</label>
                            <label v-else-if="isGPIO(key)">输入点对应位:<br>自动转化</label>
                            <label v-else>模块内输出点编号:</label>
                            <el-select v-if="isLocalIO(key)" v-model="jsondata.Panel.Button[key][3]" placeholder="选择输出点"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 10 }, (_, i) => i)" :key="num"
                                    :label="'bit' + num" :value="num" />
                            </el-select>
                            <el-input v-else-if="isGPIO(key)" style="margin-right: 10px; width: 100px;"
                                v-model.number="jsondata.Panel.Button[key][3]" @change="formatbit5(key)"> </el-input>

                            <el-select v-else v-model="jsondata.Panel.Button[key][3]" placeholder="选择输出点"
                                style="margin-right: 10px; width: 100px;">
                                <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)" :key="num"
                                    :label="num" :value="num" />
                            </el-select>
                        </div>
                        <div class="input-group">
                            <label>电平:</label>
                            <el-select v-model="jsondata.Panel.Button[key][4]" placeholder="高低电平"
                                style="margin-right: 10px; width: 100px;">
                                <el-option label="高" :value="1"></el-option>
                                <el-option label="低" :value="0"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="屏幕">
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <el-card :body-style="{ padding: '20px' }" class="button-card">
                    <h4>类型</h4>
                    <!-- <el-input-number v-model="jsondata.Panel.Display.type" :min="1" :max="10" /> -->
                    <el-select v-model="jsondata.Panel.Display.type" placeholder="高低电平"
                        style="margin-right: 10px; width: 100px;">
                        <el-option label="无屏幕" :value="0"></el-option>
                        <el-option label="modus屏幕" :value="1"></el-option>
                        <el-option label="数码管" :value="2"></el-option>
                    </el-select>
                </el-card>

                <el-card v-if="jsondata.Panel.Display.type === 1" :body-style="{ padding: '20px' }" class="button-card">
                    <h4>Modbus 类型</h4>
                    <!-- <el-input v-model="jsondata.Panel.Display.modbus.type" placeholder="输入 Modbus 类型" /> -->
                    <el-select v-model="jsondata.Panel.Display.modbus.type" placeholder="高低电平"
                        style="margin-right: 10px; width: 100px;">
                        <el-option label="网口屏幕" value="TCP"></el-option>
                        <el-option label="串口屏幕" value="RTU"></el-option>
                    </el-select>
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata, adjustbit5 } from '../../common/commondata.js'




// 按钮选项
const buttonOptions = [
    { label: '不启用', value: 0 },
    { label: 'CAN-POS', value: 2 },
    { label: 'CAN-OPEN', value: 3 },
    { label: '本地IO', value: 1 },
    { label: 'CAN-IO', value: 5 },
    { label: 'GPIO', value: 4 }
];
const canOptions = [
    { label: 'CAN1', value: 1 },
    { label: 'CAN2', value: 2 },
    { label: 'CAN3', value: 3 },
    { label: 'CAN4', value: 4 },
    { label: 'CAN5', value: 5 },
];

// 格式化按钮名称
const formatButtonKey = (key) => {
    switch (key) {
        case 'startBtn':
            return '启动按钮';
        case 'manualSwt':
            return '手动';
        case 'autoSwt':
            return '自动';
        case 'brakeBtn':
            return '抱闸';
            case 'emgBtn':
            return '急停';
        default:
            return key;
    }
};

const formatbit5 = (key) => {
    console.log('1111', key)
    const decimal = parseInt(jsondata.value.Panel.Button[key][3], 16);
    jsondata.value.Panel.Button[key][3] = isNaN(decimal) ? 2 : parseInt(jsondata.value.Panel.Button[key][3], 16);
};
// 处理类型变化
const handleTypeChange = (key) => {
    // 如果选择的是不需要路数的选项，重置路数
    if (![1, 2, 4].includes(jsondata.value.Panel.Button[key][0])) {
        jsondata.value.Panel.Button[key][1] = 2; // 重置路数
    }
    if (![3].includes(jsondata.value.Panel.Button[key][0])) {
        jsondata.value.Panel.Button[key][2] = 2;
        jsondata.value.Panel.Button[key][3] = 2;
    }
};

// 判断是否显示路数输入框
const showRouteInput = (key) => {
    return [3, 2, 5].includes(jsondata.value.Panel.Button[key][0]);
};

// 判断是否显示模块编号输入框
const showModuleInput = (key) => {
    return !isGPIO(key);
};

// 检查是否为GPIO
const isGPIO = (key) => {
    return jsondata.value.Panel.Button[key][0] === 4; // GPIO 的值
};

// 检查是否为本地IO
const isLocalIO = (key) => {
    return jsondata.value.Panel.Button[key][0] === 1; // 本地IO 的值
};
</script>

<style lang="scss" scoped>
.button-card {
    width: 14vw;
    /* 每个卡片占宽度的25% */
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
}

.button-values {
    display: flex;
    flex-direction: column;
    /* 垂直排列输入项 */
}

.input-group {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
    margin-bottom: 10px;
    /* 每个输入项之间的间距 */
}

.input-group label {
    margin-right: 10px;
    /* 标签与输入框之间的间距 */
}
</style>