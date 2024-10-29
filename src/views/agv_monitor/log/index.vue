<template>
    <el-button type="primary" @click="addCard" style="margin-left: 1vw;">添加卡片</el-button>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
        <el-card v-for="(item, index) in jsondata.SafetyLoop.Pls" :key="index" class="button-card"
            :body-style="{ padding: '20px' }">

            <div class="input-group">
                <label>名称:</label>
                <el-input v-model="item.name" placeholder="输入名称" style="width: 150px; margin-right: 10px;"></el-input>
                <el-button type="danger" @click="removeCard(index)">删除</el-button>
            </div>
            <div class="input-group">
                <label>类型:</label>
                <el-select v-model="item.type" placeholder="选择类型" style="margin-right: 10px; width: 100px;"
                    @change="handleTypeChange(index)">
                    <el-option label="IO" :value="0"></el-option>
                </el-select>
            </div>

            <div>
                <div class="input-group">
                    <label>IO类型:</label>
                    <el-select v-model="item.config.io.type" placeholder="选择IO类型"
                        style="margin-right: 10px; width: 100px;">
                        <el-option label="正常类型" :value="1"></el-option>
                        <el-option label="互斥类型" :value="2"></el-option>
                        <el-option label="单点切区" :value="3"></el-option>
                        <el-option label="多点切区" :value="4"></el-option>
                    </el-select>
                </div>

                <el-card>
                    <el-button type="success" @click="addAreaOutput(index)" style="margin-top: 10px;">添加切区</el-button>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                        <div v-for="(area, areaIndex) in item.config.io.area" :key="areaIndex" class="input-group">
                            <el-card style="flex: 1; min-width: 150px; padding: 10px;">
                                <label>切区 {{ areaIndex + 1 }}:</label>
                                {{area.area_output}}
                                <!-- <el-input v-model="area.area_output" @input="updateAreaOutput(area)"
                                    placeholder="输入区域输出" style="width: 150px; margin-right: 10px;"></el-input> -->
                                <el-button type="danger" @click="removeAreaOutput(index, areaIndex)">删除</el-button>


                                <div class="button-values">
                                    <div class="input-group">
                                        <label>IO:</label>
                                        <el-select v-model="area.area_output[0]" placeholder="选择类型"
                                            style="margin-right: 10px; width: 100px;">
                                            <el-option v-for="option in buttonOptions" :key="option.value"
                                                :label="option.label" :value="option.value" />
                                        </el-select>
                                    </div>
                                    <div class="input-group" v-if="showRouteInputa(index,areaIndex)">
                                        <label>can路数:</label>
                                        <el-select v-model="area.area_output[1]" placeholder="选择类型"
                                            style="margin-right: 10px; width: 100px;">
                                            <el-option v-for="option in canOptions" :key="option.value"
                                                :label="option.label" :value="option.value" />
                                        </el-select>
                                    </div>
                                    <div class="input-group" v-if="showModuleInputa(index,areaIndex)">
                                        <label v-if="isLocalIOa(index,areaIndex)">本地IO地址:</label>
                                        <label v-else>模块编号:</label>
                                        <el-input v-if="isLocalIOa(index,areaIndex)" v-model.number="area.area_output[2]"
                                            placeholder="模块编号" type="number"
                                            style="margin-right: 10px; width: 100px;"></el-input>
                                        <el-select v-else v-model="area.area_output[2]" placeholder="选择模块编号"
                                            style="margin-right: 10px; width: 100px;">
                                            <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)"
                                                :key="num" :label="num" :value="num" />
                                        </el-select>
                                    </div>
                                    <div class="input-group">
                                        <label v-if="isLocalIOa(index,areaIndex)">输出点对应位:</label>
                                        <label v-else-if="isGPIOa(index,areaIndex)">输入点对应位:<br>自动转化</label>
                                        <label v-else>模块内输出点编号:</label>
                                        <el-select v-if="isLocalIOa(index,areaIndex)" v-model="area.area_output[3]"
                                            placeholder="选择输出点" style="margin-right: 10px; width: 100px;">
                                            <el-option v-for="num in Array.from({ length: 10 }, (_, i) => i)" :key="num"
                                                :label="'bit' + num" :value="num" />
                                        </el-select>
                                        <el-input v-else-if="isGPIOa(index,areaIndex)" style="margin-right: 10px; width: 100px;"
                                            v-model.number="area.area_output[3]"
                                            @change="formatbit5a(index,areaIndex)"></el-input>
                                        <el-select v-else v-model="area.area_output[3]" placeholder="选择输出点"
                                            style="margin-right: 10px; width: 100px;">
                                            <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)"
                                                :key="num" :label="num" :value="num" />
                                        </el-select>
                                    </div>
                                    <div class="input-group">
                                        <label>电平:</label>
                                        <el-select v-model="area.area_output[4]" placeholder="高低电平"
                                            style="margin-right: 10px; width: 100px;">
                                            <el-option label="高" :value="1"></el-option>
                                            <el-option label="低" :value="0"></el-option>
                                        </el-select>
                                    </div>
                                </div>





                            </el-card>
                        </div>
                    </div>
                </el-card>

                <div style="display: flex; gap: 20px; flex-wrap: nowrap; margin-top: 2%;">
                    <el-card class="plscard">
                        <strong>近:</strong>
                        <div class="button-values">
                            <div class="input-group">
                                <label>IO:</label>
                                <el-select v-model="item.config.io.near[0]" placeholder="选择类型"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option v-for="option in buttonOptions" :key="option.value" :label="option.label"
                                        :value="option.value" />
                                </el-select>
                            </div>
                            <div class="input-group" v-if="showRouteInput(index)">
                                <label>can路数:</label>
                                <el-select v-model="item.config.io.near[1]" placeholder="选择类型"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option v-for="option in canOptions" :key="option.value" :label="option.label"
                                        :value="option.value" />
                                </el-select>
                            </div>
                            <div class="input-group" v-if="showModuleInput(index)">
                                <label v-if="isLocalIO(index)">本地IO地址:</label>
                                <label v-else>模块编号:</label>
                                <el-input v-if="isLocalIO(index)" v-model.number="item.config.io.near[2]"
                                    placeholder="模块编号" type="number"
                                    style="margin-right: 10px; width: 100px;"></el-input>
                                <el-select v-else v-model="item.config.io.near[2]" placeholder="选择模块编号"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)" :key="num"
                                        :label="num" :value="num" />
                                </el-select>
                            </div>
                            <div class="input-group">
                                <label v-if="isLocalIO(index)">输出点对应位:</label>
                                <label v-else-if="isGPIO(index)">输入点对应位:<br>自动转化</label>
                                <label v-else>模块内输出点编号:</label>
                                <el-select v-if="isLocalIO(index)" v-model="item.config.io.near[3]" placeholder="选择输出点"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option v-for="num in Array.from({ length: 10 }, (_, i) => i)" :key="num"
                                        :label="'bit' + num" :value="num" />
                                </el-select>
                                <el-input v-else-if="isGPIO(index)" style="margin-right: 10px; width: 100px;"
                                    v-model.number="item.config.io.near[3]" @change="formatbit5(index)"></el-input>
                                <el-select v-else v-model="item.config.io.near[3]" placeholder="选择输出点"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option v-for="num in Array.from({ length: 100 }, (_, i) => i)" :key="num"
                                        :label="num" :value="num" />
                                </el-select>
                            </div>
                            <div class="input-group">
                                <label>电平:</label>
                                <el-select v-model="item.config.io.near[4]" placeholder="高低电平"
                                    style="margin-right: 10px; width: 100px;">
                                    <el-option label="高" :value="1"></el-option>
                                    <el-option label="低" :value="0"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-card>

                </div>
            </div>


        </el-card>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js';

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

const addCard = () => {
    jsondata.value.SafetyLoop.Pls.push({
        name: '请输入名称',
        type: 0,
        config: {
            io: {
                type: 3,
                area: [{ area_output: [2, 2, 2, 2, 1] }],
                near: [2, 2, 2, 2, 1],
            }
        }
    });
};

const removeCard = (index) => {
    jsondata.value.SafetyLoop.Pls.splice(index, 1);
};

const handleTypeChange = (index) => {
    const item = jsondata.value.SafetyLoop.Pls[index];
    if (item.type === 0) {
        item.config = {
            io: {
                type: 3,
                area: [{ area_output: [2, 2, 2, 2, 1] }],
                near: [2, 2, 2, 2, 1],
                center: [2, 2, 2, 2, 1],
                far: [2, 2, 2, 2, 1]
            }
        };
    }
};
const addAreaOutput = (index) => {
    jsondata.value.SafetyLoop.Pls[index].config.io.area.push({ area_output: [0, 0, 0, 0, 0] });
};

const removeAreaOutput = (itemIndex, areaIndex) => {
    jsondata.value.SafetyLoop.Pls[itemIndex].config.io.area.splice(areaIndex, 1);
};

const showRouteInput = (index) => {
    return [3, 2, 5].includes(jsondata.value.SafetyLoop.Pls[index].config.io.near[0]);
};

const showModuleInput = (index) => {
    return !isGPIO(index);
};

const isGPIO = (index) => {
    return jsondata.value.SafetyLoop.Pls[index].config.io.near[0] === 4;
};

const isLocalIO = (index) => {
    return jsondata.value.SafetyLoop.Pls[index].config.io.near[0] === 1;
};





// // 更新区域输出
// const updateAreaOutput = (area) => {
//     area.area_output = area.area_output
//         .split(',')
//         .map(num => Number(num.trim()))
//         .filter(num => !isNaN(num));
// };



const formatbit5 = (index) => {
    // Implement your formatting logic here
    const decimal = parseInt(jsondata.value.SafetyLoop.Pls[index].config.io.near[3], 16);
    jsondata.value.SafetyLoop.Pls[index].config.io.near[3] = isNaN(decimal) ? 2 : parseInt(jsondata.value.SafetyLoop.Pls[index].config.io.near[3], 16);
};
const showRouteInputa = (index,areaIndex) => {
    return [3, 2, 5].includes(jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[0]);
};

const showModuleInputa = (index,areaIndex) => {
    return !isGPIO(index,areaIndex);
};

const isGPIOa = (index,areaIndex) => {
    return jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[0] === 4;
};

const isLocalIOa = (index,areaIndex) => {
    return jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[0] === 1;
};
const formatbit5a = (index,areaIndex) => {
    // Implement your formatting logic here
    const decimal = parseInt(jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[3], 16);
    jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[3] = isNaN(decimal) ? 2 : parseInt(jsondata.value.SafetyLoop.Pls[index].config.io.area[areaIndex].area_output[3], 16);
};
</script>

<style lang="scss" scoped>
.button-card {
    margin-left: 1.5vw;
    width: 80vw;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
}

.plscard {
    width: 20vw;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #f9f9f9;
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