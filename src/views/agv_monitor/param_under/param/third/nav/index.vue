<template>
    <el-button type="primary" @click="addCard" style="margin-left: 1vw;">添加卡片</el-button>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
        <el-card v-for="(item, index) in jsondata.NavSys" :key="index" class="button-card"
            :body-style="{ padding: '20px' }">
            <div class="input-group">
                <label>名称:</label>
                <el-input v-model="item.name" placeholder="输入名称" style="width: 150px; margin-right: 10px;"></el-input>
                <el-button type="danger" @click="removeCard(index)">删除</el-button>
            </div>

            <div class="input-group">
                <label>类型:</label>
                <el-select v-model="item.type" @change="onTypeChange(item)" placeholder="选择类型"
                    style="width: 150px; margin-right: 10px;">
                    <el-option label="轮廓导航" :value="1"></el-option>
                    <el-option label="磁导航" :value="2"></el-option>
                    <el-option label="惯性导航" :value="3"></el-option>
                    <el-option label="二维码导航" :value="4"></el-option>
                </el-select>
            </div>

            <div v-if="item.sensor">
                <h4>传感器配置:</h4>
                <div v-for="(sensor, sensorIndex) in item.sensor" :key="sensorIndex" class="sensor-group">
                    <el-card v-if="item.type === 1">
                        
                        <div class="input-group">
                            <label>X 限制:</label>
                            <el-input v-model="sensor.x_limit" placeholder="输入 X 限制"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>角度限制:</label>
                            <el-input v-model="sensor.thita_limit" placeholder="输入角度限制"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>死算距离:</label>
                            <el-input v-model="sensor.deadReckoningDist" placeholder="输入死算距离"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>高级死算距离:</label>
                            <el-input v-model="sensor.highLevel_deadReckoningDist" placeholder="输入高级死算距离"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <el-button type="danger" @click="removeSensor(index, sensorIndex)">删除传感器</el-button>
                    </el-card>

                    <el-card v-else-if="item.type === 2">
                        
                        <div class="input-group">
                            <label>传感器类型:</label>
                            <el-input v-model="sensor.type" placeholder="输入传感器类型"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>方向:</label>
                            <el-input v-model="sensor.dir" placeholder="输入方向"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>分辨率:</label>
                            <el-input v-model="sensor.resolution" placeholder="输入分辨率"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>CAN 端口 ID:</label>
                            <el-input v-model="sensor.canport_id" placeholder="输入 CAN 端口 ID"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>单元 ID:</label>
                            <el-input v-model="sensor.unit_id" placeholder="输入单元 ID"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>X 安装位置:</label>
                            <el-input v-model="sensor.x_install" placeholder="输入 X 安装位置"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>Y 安装位置:</label>
                            <el-input v-model="sensor.y_install" placeholder="输入 Y 安装位置"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <el-button type="danger" @click="removeSensor(index, sensorIndex)">删除传感器</el-button>
                    </el-card>

                    <el-card v-else-if="item.type === 3 || item.type === 4">
                        
                        <div class="input-group">
                            <label>X 安装位置:</label>
                            <el-input v-model="sensor.x_install" placeholder="输入 X 安装位置"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <div class="input-group">
                            <label>Y 安装位置:</label>
                            <el-input v-model="sensor.y_install" placeholder="输入 Y 安装位置"
                                style="width: 100px; margin-right: 10px;"></el-input>
                        </div>
                        <el-button type="danger" @click="removeSensor(index, sensorIndex)">删除传感器</el-button>
                    </el-card>
                    
                </div>
                <el-button type="success" @click="addSensor(index)">添加传感器</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata } from '../../common/commondata.js';

// 添加卡片
const addCard = () => {
    jsondata.value.NavSys.push({
        name: '请输入名称',
        type: 1,
        sensor: [{
            x_limit: 0.10,
            thita_limit: 0.174,
            deadReckoningDist: 0.30,
            highLevel_deadReckoningDist: 0.10,
        }] // 初始化一个传感器对象
    });
};

// 删除卡片
const removeCard = (index) => {
    jsondata.value.NavSys.splice(index, 1);
};

// 添加传感器
const addSensor = (index) => {
    const newSensor = (jsondata.value.NavSys[index].type === 1) ? {
        x_limit: 0,
        thita_limit: 0,
        deadReckoningDist: 0,
        highLevel_deadReckoningDist: 0,
    } : {
        type: 1,
        dir: 0,
        resolution: 0,
        canport_id: 0,
        unit_id: 0,
        x_install: 0,
        y_install: 0,
    };
    jsondata.value.NavSys[index].sensor.push(newSensor);
};

// 删除传感器
const removeSensor = (cardIndex, sensorIndex) => {
    jsondata.value.NavSys[cardIndex].sensor.splice(sensorIndex, 1);
};

// 切换传感器类型时的处理
const onTypeChange = (item) => {
    // 根据选择的类型重置传感器数组
    if (item.type === 1) {
        item.sensor = [{
            x_limit: 0,
            thita_limit: 0,
            deadReckoningDist: 0,
            highLevel_deadReckoningDist: 0,
        }];
    } else if (item.type === 2) {
        item.sensor = [{
            type: 1,
            dir: 0,
            resolution: 0,
            canport_id: 0,
            unit_id: 0,
            x_install: 0,
            y_install: 0,
        }];
    } else {
        item.sensor = [{
            x_install: 0,
            y_install: 0,
        }];
    }
};
</script>

<style lang="scss" scoped>
.button-card {
    width: 22vw;
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

.sensor-group {
    margin-top: 10px;
}
</style>