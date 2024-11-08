<template>
    <el-tabs>
        <el-tab-pane label="激光导航">
            <el-button type="primary" @click="addCard" style="margin-left: 1vw;">添加卡片</el-button>
            <div style="display: flex;  gap: 20px; flex-wrap: wrap;">
                <el-card v-for="(item, index) in jsondata.Sensors.Laser" :key="index" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <div class="input-group">
                        <label>名称:</label>
                        <el-input v-model="item.name" placeholder="输入名称"
                            style="width: 150px; margin-right: 10px;"></el-input>
                        <el-button type="danger" @click="removeCard(index)">删除</el-button>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="磁导航">
            <el-button type="primary" @click="addCardMagnet" style="margin-left: 1vw;">添加卡片</el-button>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">

                <el-card v-for="(item, index) in jsondata.Sensors.Magnet" :key="index" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <div class="input-group">
                        <label>名称:</label>
                        <el-input v-model="item.name" placeholder="输入名称"
                            style="width: 150px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>传感器类型:</label>
                        <el-input v-model.number="item.type" placeholder="输入传感器类型" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>方向:</label>
                        <el-input v-model.number="item.dir" placeholder="输入方向" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>分辨率:</label>
                        <el-input v-model.number="item.resolution" placeholder="输入分辨率" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>CAN 端口 ID:</label>
                        <el-input v-model.number="item.canport_id" placeholder="输入 CAN 端口 ID" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>单元 ID:</label>
                        <el-input v-model.number="item.unit_id" placeholder="输入单元 ID" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>X 安装位置:</label>
                        <el-input v-model.number="item.x_install" placeholder="输入 X 安装位置" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>Y 安装位置:</label>
                        <el-input v-model.number="item.y_install" placeholder="输入 Y 安装位置" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <el-button type="danger" @click="removeCardMagnet(index)">删除</el-button>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="惯导">
            <el-button type="primary" @click="addCardGyro" style="margin-left: 1vw;">添加卡片</el-button>
            <div style="display: flex;  gap: 20px; flex-wrap: wrap;">
                <el-card v-for="(item, index) in jsondata.Sensors.Gyro" :key="index" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <div class="input-group">
                        <label>名称:</label>
                        <el-input v-model="item.name" placeholder="输入名称"
                            style="width: 150px; margin-right: 10px;"></el-input>
                        <el-button type="danger" @click="removeCardGyro(index)">删除</el-button>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="二维码">
            <el-button type="primary" @click="addCardQR_Code_Siasun" style="margin-left: 1vw;">添加卡片</el-button>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">

                <el-card v-for="(item, index) in jsondata.Sensors.QR_Code_Siasun" :key="index" class="button-card"
                    :body-style="{ padding: '20px' }">
                    <div class="input-group">
                        <label>名称:</label>
                        <el-input v-model="item.name" placeholder="输入名称"
                            style="width: 150px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>can端口号:</label>
                        <el-input v-model.number="item.canPortID" placeholder="can端口号" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>单元编号:</label>
                        <el-input v-model.number="item.unitID" placeholder="单元编号" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>can id:</label>
                        <el-input v-model.number="item.canID" placeholder="can id" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>类型</label>
                        <el-input v-model.number="item.type" placeholder="类型" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>延时计数:</label>
                        <el-input v-model.number="item.delayCount" placeholder="延时计数" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>X 位置:</label>
                        <el-input v-model.number="item.x" placeholder="输入 X 位置" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>Y 位置:</label>
                        <el-input v-model.number="item.y" placeholder="输入 Y 位置" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>角度位置:</label>
                        <el-input v-model.number="item.fAngle" placeholder="角度位置" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>gain:</label>
                        <el-input v-model.number="item.gain" placeholder="gain" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>snack:</label>
                        <el-input v-model.number="item.snack" placeholder="snack" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>gain2:</label>
                        <el-input v-model.number="item.gain2" placeholder="gain2" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>snack2:</label>
                        <el-input v-model.number="item.snack2" placeholder="snack2" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>同步时间:</label>
                        <el-input v-model.number="item.syncTime" placeholder="同步时间" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>心跳:</label>
                        <el-input v-model.number="item.heartTime" placeholder="心跳" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>相机分辨率:</label>
                        <el-input v-model.number="item.cameraResolution" placeholder="分辨率" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <div class="input-group">
                        <label>转换:</label>
                        <el-select v-model.number="item.bEnableTransform" placeholder="是否启用" type="number"
                            style="width: 100px; margin-right: 10px;">
                            <el-option  label='启用'
                                :value="true"></el-option>
                            <el-option  label='禁用'
                                :value="false"></el-option>
                        </el-select>
                    </div>
                    <div class="input-group">
                        <label>转换数据:</label>
                        <el-input v-model.number="item.fTransformData" placeholder="转换数据" type="number"
                            style="width: 100px; margin-right: 10px;"></el-input>
                    </div>
                    <el-button type="danger" @click="removeCardQR_Code_Siasun(index)">删除</el-button>
                </el-card>
            </div>
        </el-tab-pane>

    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'

const addCard = () => {
    jsondata.value.Sensors.Laser.push({
        name: '请输入名称',
    });
};

const removeCard = (index) => {
    jsondata.value.Sensors.Laser.splice(index, 1);
};

const addCardGyro = () => {
    jsondata.value.Sensors.Gyro.push({
        name: '请输入名称',
    });
};

const removeCardGyro = (index) => {
    jsondata.value.Sensors.Gyro.splice(index, 1);
};

const addCardMagnet = () => {
    jsondata.value.Sensors.Magnet.push({
        name: '请输入名称',
        type: 0,
        dir: 0,
        resolution: 0,
        canport_id: 0,
        unit_id: 0,
        x_install: 0,
        y_install: 0
    });
};

const removeCardMagnet = (index) => {
    jsondata.value.Sensors.Magnet.splice(index, 1);
};
const addCardQR_Code_Siasun = () => {
    jsondata.value.Sensors.QR_Code_Siasun.push({
        name: '请输入名称',
        canPortID: 0,
        unitID: 0,
        canID: 44,
        type: 0,
        delayCount: 0,
        x: 0,
        y: 0,
        fAngle: 0,
        gain: 50,
        snack: 10,
        gain2: 50,
        snack2: 10,
        syncTime: 12,
        heartTime: 5,
        cameraResolution: 1,
        bEnableTransform: false,
        fTransformData: 0.0
    });
};
const removeCardQR_Code_Siasun = (index) => {
    jsondata.value.QR_Code_Siasun.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.button-card {
    width: 20vw;
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