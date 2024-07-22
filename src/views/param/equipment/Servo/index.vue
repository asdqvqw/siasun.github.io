<template>
    <el-table :data="servodata" style="width: 100%" class="servodata">

        <el-table-column prop="key" label="⚠️ 上装伺服">
            <template #default="scope">
                <el-button type="text" @click="reedit(scope.$index)">{{ servodata[scope.$index].key
                    }}</el-button>
            </template>
        </el-table-column>

        <el-table-column prop="name">
            <template #header>
                <el-button type="primary" @click="addNewRow">添加新数据</el-button>
            </template>
        </el-table-column>
        <!-- <el-table-column>
            <template #header>
                <div style="width: 95%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
                    类型<el-select v-model.number="car_type" placeholder="请选择" style="width: 80%;">
                        <el-option label="货架车" :value=0></el-option>
                        <el-option label="V型槽" :value=1></el-option>
                        <el-option label="叉车" :value=2></el-option>
                    </el-select>
                </div>
            </template>
        </el-table-column> -->
        <el-table-column label="CAN口号">
            <template #default="scope">

                {{ scope.row.config.portID }}


            </template>
        </el-table-column>

        <el-table-column label="单元号">
            <template #default="scope">

                {{ scope.row.config.unitID }}


            </template>
        </el-table-column>

        <el-table-column label="模块内对应编号">
            <template #default="scope">

                {{ scope.row.config.canID }}


            </template>
        </el-table-column>


        <el-table-column label="原点模式">
            <template #default="scope">
                <h4>
                    {{ scope.row.config.originmode === 1 ? '是' : '否' }}
                </h4>

            </template>
        </el-table-column>

        <el-table-column label="是否有转盘">
            <template #default="scope">
                <h4>
                    {{ scope.row.config.isturn === 1 ? '是' : '否' }}
                </h4>

            </template>
        </el-table-column>

        <el-table-column label="操作">

            <template #default="scope">
                <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-dialog title="添加数据" v-model="dialogVisible" :visible="dialogVisible" width="900px" :close-on-click-modal="false"
        modal-class="kk-dialog-class" custom-class="custom-dialog">
        <DefinScrollbar height="100%" :showUpBt="true">

            <br>
            <el-form ref="form" :model="newservoRow" label-width="180px">
                <el-form-item label="名称">
                    <el-input style="width: 80%;" v-model="newservoRow.key" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="key">
                    <el-input style="width: 80%;" v-model="newservoRow.name" placeholder="英文KEY"></el-input>
                </el-form-item>
                <el-form-item label="CAN-ID">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.portID"
                        placeholder="can口号"></el-input>
                </el-form-item>
                <el-form-item label="CAN单元号">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.unitID"
                        placeholder="单元号"></el-input>
                </el-form-item>

                <el-form-item label="模块内对应点编号">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.canID"
                        placeholder="模块内对应点编号"></el-input>
                </el-form-item>
                <el-form-item label="轴ID">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.axisID"
                        placeholder="轴ID"></el-input>
                </el-form-item>
                <el-form-item label="减速比">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.ratio"
                        placeholder="减速比"></el-input>
                </el-form-item>
                <el-form-item label="编码器绝对值">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.encoder"
                        placeholder="编码器绝对值"></el-input>
                </el-form-item>
                <el-form-item label="伺服行程转换比">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.unitDist"
                        placeholder="伺服行程转换比"></el-input>
                </el-form-item>
                <el-form-item label="最大转速">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.maxRPM"
                        placeholder="最大转速"></el-input>
                </el-form-item>
                <el-form-item label="正常速度">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.normalvel"
                        placeholder="正常速度"></el-input>
                </el-form-item>

                <el-form-item label="减速速度">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.slowvel"
                        placeholder="减速速度"></el-input>
                </el-form-item>
                <el-form-item label="切换速度的临界距离">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.neartarget"
                        placeholder="切换速度的临界距离"></el-input>
                </el-form-item>
                <el-form-item label="允许误差">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.ontarget"
                        placeholder="允许误差"></el-input>
                </el-form-item>

                <el-form-item label="电机方向">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.motorDir"
                        placeholder="电机方向"></el-input>
                </el-form-item>
                <el-form-item label="码盘方向">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.encoderDir"
                        placeholder="码盘方向"></el-input>
                </el-form-item>


                <el-form-item label="原点模式">
                    <el-switch style="width: 80%;" v-model="newservoRow.config.originmode" :active-value=1
                        :inactive-value=0></el-switch>
                    <!-- <el-input style="width: 80%;" v-model.number="newservoRow.config.originmode"
                        placeholder="原点模式"></el-input> -->
                </el-form-item>

                <el-form-item label="最大行程">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.maxHeight"
                        placeholder="最大行程"></el-input>
                </el-form-item>
                <el-form-item label="凸轮半径">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.radius"
                        placeholder="凸轮半径"></el-input>
                </el-form-item>

                <el-form-item label="是否是转盘">
                    <el-switch style="width: 80%;" v-model="newservoRow.config.isturn" :active-value=1
                        :inactive-value=0></el-switch>
                    <!-- <el-input style="width: 80%;" v-model.number="newservoRow.config.isturn"
                        placeholder="是否是转盘"></el-input> -->
                </el-form-item>

                <el-form-item label="转盘速度">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.syncFineVel"
                        placeholder="转盘速度"></el-input>
                </el-form-item>

                <el-form-item label="转盘方向">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.syncDir"
                        placeholder="转盘方向"></el-input>
                </el-form-item>
                <el-form-item label="syncVelRatioUp">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.syncVelRatioUp"
                        placeholder="syncVelRatioUp"></el-input>
                </el-form-item>
                <el-form-item label="复位初始值">
                    <el-input style="width: 80%;" v-model.number="newservoRow.config.steadyHeight"
                        placeholder="复位初始值"></el-input>
                </el-form-item>



            </el-form>


            <div style="margin-top: 2%; margin-left: 75%;">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddRow">确定</el-button>

            </div>
            <br>
        </DefinScrollbar>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata, servodata } from '../common.js'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
import { newservoRow } from '../flag.js';
const dialogVisible = ref(false);
// const car_type = ref(0);



const addNewRow = () => {
    newservoRow.value.name = '';
    newservoRow.value.key = '';
    newservoRow.value.config.portID = 0;
    newservoRow.value.config.unitID = 0;
    newservoRow.value.config.canID = 0;
    newservoRow.value.config.axisID = 0;
    newservoRow.value.config.ratio = 0;
    newservoRow.value.config.encoder = 0;
    newservoRow.value.config.unitDist = 0;
    newservoRow.value.config.maxRPM = 0;
    newservoRow.value.config.normalvel = 0;
    newservoRow.value.config.slowvel = 0;
    newservoRow.value.config.neartarget = 0;
    newservoRow.value.config.ontarget = 0;
    newservoRow.value.config.motorDir = 0;
    newservoRow.value.config.encoderDir = 0;
    newservoRow.value.config.originmode = 0;
    newservoRow.value.config.maxHeight = 0;
    newservoRow.value.config.isturn = 0;
    newservoRow.value.config.syncFineVel = 0;
    newservoRow.value.config.syncDir = 0;
    newservoRow.value.config.syncVelRatioUp = 0;
    newservoRow.value.config.steadyHeight = 0;
    newservoRow.value.config.radius = 0;



    newservoRow.value.editingIndex = -1;


    dialogVisible.value = true;

};

const reedit = (index) => {

    newservoRow.value.name = servodata.value[index].name;
    newservoRow.value.key = servodata.value[index].key;
    newservoRow.value.config.portID = servodata.value[index].config.portID;
    newservoRow.value.config.unitID = servodata.value[index].config.unitID;
    newservoRow.value.config.canID = servodata.value[index].config.canID;
    newservoRow.value.config.axisID = servodata.value[index].config.axisID;
    newservoRow.value.config.ratio = servodata.value[index].config.ratio;
    newservoRow.value.config.encoder = servodata.value[index].config.encoder;
    newservoRow.value.config.unitDist = servodata.value[index].config.unitDist;
    newservoRow.value.config.maxRPM = servodata.value[index].config.maxRPM;
    newservoRow.value.config.normalvel = servodata.value[index].config.normalvel;
    newservoRow.value.config.slowvel = servodata.value[index].config.slowvel;
    newservoRow.value.config.neartarget = servodata.value[index].config.neartarget;
    newservoRow.value.config.ontarget = servodata.value[index].config.ontarget;
    newservoRow.value.config.motorDir = servodata.value[index].config.motorDir;
    newservoRow.value.config.encoderDir = servodata.value[index].config.encoderDir;
    newservoRow.value.config.originmode = servodata.value[index].config.originmode;
    newservoRow.value.config.maxHeight = servodata.value[index].config.maxHeight;
    newservoRow.value.config.isturn = servodata.value[index].config.isturn;
    newservoRow.value.config.syncFineVel = servodata.value[index].config.syncFineVel;
    newservoRow.value.config.syncDir = servodata.value[index].config.syncDir;
    newservoRow.value.config.syncVelRatioUp = servodata.value[index].config.syncVelRatioUp;
    newservoRow.value.config.steadyHeight = servodata.value[index].config.steadyHeight;
    newservoRow.value.config.radius = servodata.value[index].config.radius;

    newservoRow.value.editingIndex = index; // 设置编辑索引

    dialogVisible.value = true;

};

const handleAddRow = () => {
    if (newservoRow.value.name) {
        if (newservoRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            servodata.value[newservoRow.value.editingIndex].name = newservoRow.value.name;
            servodata.value[newservoRow.value.editingIndex].key = newservoRow.value.key;

            servodata.value[newservoRow.value.editingIndex].config.portID = newservoRow.value.config.portID;
            servodata.value[newservoRow.value.editingIndex].config.unitID = newservoRow.value.config.unitID;
            servodata.value[newservoRow.value.editingIndex].config.canID = newservoRow.value.config.canID;
            servodata.value[newservoRow.value.editingIndex].config.axisID = newservoRow.value.config.axisID;
            servodata.value[newservoRow.value.editingIndex].config.ratio = newservoRow.value.config.ratio;
            servodata.value[newservoRow.value.editingIndex].config.encoder = newservoRow.value.config.encoder;
            servodata.value[newservoRow.value.editingIndex].config.unitDist = newservoRow.value.config.unitDist;
            servodata.value[newservoRow.value.editingIndex].config.maxRPM = newservoRow.value.config.maxRPM;
            servodata.value[newservoRow.value.editingIndex].config.normalvel = newservoRow.value.config.normalvel;
            servodata.value[newservoRow.value.editingIndex].config.slowvel = newservoRow.value.config.slowvel;
            servodata.value[newservoRow.value.editingIndex].config.neartarget = newservoRow.value.config.neartarget;
            servodata.value[newservoRow.value.editingIndex].config.ontarget = newservoRow.value.config.ontarget;
            servodata.value[newservoRow.value.editingIndex].config.motorDir = newservoRow.value.config.motorDir;
            servodata.value[newservoRow.value.editingIndex].config.encoderDir = newservoRow.value.config.encoderDir;
            servodata.value[newservoRow.value.editingIndex].config.originmode = newservoRow.value.config.originmode;
            servodata.value[newservoRow.value.editingIndex].config.maxHeight = newservoRow.value.config.maxHeight;
            servodata.value[newservoRow.value.editingIndex].config.isturn = newservoRow.value.config.isturn;
            servodata.value[newservoRow.value.editingIndex].config.syncFineVel = newservoRow.value.config.syncFineVel;
            servodata.value[newservoRow.value.editingIndex].config.syncDir = newservoRow.value.config.syncDir;
            servodata.value[newservoRow.value.editingIndex].config.syncVelRatioUp = newservoRow.value.config.syncVelRatioUp;
            servodata.value[newservoRow.value.editingIndex].config.steadyHeight = newservoRow.value.config.steadyHeight;
            servodata.value[newservoRow.value.editingIndex].config.radius = newservoRow.value.config.radius;

            jsondata.value.servo.kinco = servodata;

        } else {
            // 新增模式下添加数据
            const newservoRowData = { ...newservoRow.value };
            servodata.value.push(JSON.parse(JSON.stringify(newservoRowData)));
            jsondata.value.servo.kinco = servodata;
            console.log('handleAddRow', newservoRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {

    servodata.value.splice(index, 1);
};

</script>


<style scoped>
.expand-content {
    height: 1000px;
}

.servotabledata {
    overflow: auto;
    height: 500px;
}
</style>
<style>
.servodata .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>