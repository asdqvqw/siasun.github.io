<template>
    <div>
        <el-table :data="tableDataCrtl" style="width: 100%">
            <el-table-column prop="name" label="名称">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtl[scope.$index].name
                    }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>

        <el-button type="primary" @click="addNewRow">添加驱动单元</el-button>


        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="900px"
            :close-on-click-modal="false" class="edit-data-dialog">
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="newRow" label-width="200px">
                <h3>安装位置:</h3>
                <el-form-item label="车体坐标系坐标X(ms):">
                    <el-input v-model="newRow.AGVposX" type="number" @change="AGVpos"></el-input>
                </el-form-item>
                <el-form-item label="车体坐标系坐标Y(ms):">
                    <el-input v-model="newRow.AGVposY" type="number" @change="AGVpos"></el-input>
                </el-form-item>
            </el-form><br>
            <h3>驱动类型:</h3>

            <el-select v-model="newRow.driverType" placeholder="请选择">
                <el-option label="普通驱动类型" :value=0></el-option>
                <el-option label="差速驱动类型" :value=1></el-option>
            </el-select><br>
            <el-checkbox v-model="newRow.isDrWheel">安装有驱动轮</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            驱动伺服类型
            <el-select v-model="newRow.diver.servoType" placeholder="请选择" :disabled="!newRow.isDrWheel">
                <el-option label="普通MCU" :value=0></el-option>
                <el-option label="差速MCU" :value=1></el-option>
                <el-option label="Elmo伺服" :value=2></el-option>
                <el-option label="步科伺服" :value=3></el-option>
                <el-option label="Motec伺服" :value=4></el-option>
                <el-option label="AMC伺服" :value=5></el-option>
            </el-select><br>
            <el-checkbox v-model="newRow.isSteel">安装有转舵机构</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            驱动伺服类型
            <el-select v-model="newRow.steel.RuservoType" placeholder="请选择" :disabled="!newRow.isSteel">
                <el-option label="普通MCU" :value=0></el-option>
                <el-option label="差速MCU" :value=1></el-option>
                <el-option label="Elmo伺服" :value=2></el-option>
                <el-option label="步科伺服" :value=3></el-option>
                <el-option label="Motec伺服" :value=4></el-option>
                <el-option label="AMC伺服" :value=5></el-option>
            </el-select><br>
            <br>

            <div style="display: flex;">
                <div v-if="newRow.isDrWheel">
                    <wheel :diver="newRow.diver" @change="changedata"></wheel>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div v-if="newRow.isSteel">
                    <steel :steel="newRow.steel" @change="changedata"></steel>
                </div>
                <br><br>
            </div>

            
            <!-- <pre>{{ tableDataCrtl }}</pre> -->

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleAddRow">确定</el-button>

            </div>

        </el-dialog>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import wheel from './wheel.vue';
import steel from './steel.vue';
import { tableDataCrtl } from '@/views/system/whwtest/testone/common/commondata.js'
import { jsondata } from '@/views/system/whwtest/testone/common/commondata.js'
// const testwhw = ref();
// const add = (childValue, num) => {
//     testwhw.value = childValue;

// };


const title = '驱动单元';

const newRow = ref({
    name: '',
    AGVposX: '',
    AGVposY: '',
    isDrWheel: false,
    isSteel: false,
    editingIndex: -1,
    driverType: 0,
    diver: {
        Indirection: 0,
        servoType: 0,
        MeParm: [0, 0, 0.23, 21, 2700, 48],
        SeParm: [0, 0],
        morehot: [],

    },
    steel: {
        Indirection: 0,
        RuservoType: 0,
        isCoddist: false,
        Coddist: [0, 0, 0.22, 1],
        MeParm: [0, 0, 0.23],
        SeParm: [0, 0],
        zeroindex: [54],
        sevorestu: [],
        sevoreable: [],
        LimitOne: [],
        LimitTwo: [],
        LimitZero: [],
    }
});
// const jsondata = {
//     test: [{ name: '左轮2驱动', AGVposX: '3', AGVposY: '4', isDrWheel: true }, { name: '右轮3驱动', AGVposX: '5', AGVposY: '2', isDrWheel: false }]
// };
const dialogVisible = ref(false);

const addNewRow = () => {
    newRow.value.name = '';
    newRow.value.AGVposX = '';
    newRow.value.AGVposY = '';
    newRow.value.isDrWheel = false;
    newRow.value.isSteel = false;
    newRow.value.driverType = 0;
    newRow.value.diver.MeParm = [0, 0, 0.23, 21, 2700, 48];
    newRow.value.diver.SeParm = [0, 0];
    newRow.value.steel.MeParm = [0, 0, 0.23];
    newRow.value.steel.zeroindex = [54];

    newRow.value.steel.SeParm = [0, 0];
    newRow.value.steel.isCoddist = false;
    newRow.value.steel.RuservoType = 0;
    newRow.value.steel.Coddist = [0, 0, 0.22, 1];
    newRow.value.diver.morehot = [];

    newRow.value.editingIndex = -1;
    newRow.value.diver.Indirection = 0;
    newRow.value.steel.Indirection = 0;
    newRow.value.steel.sevorestu = [];
    newRow.value.steel.sevoreable = [];
    newRow.value.steel.LimitOne = [];
    newRow.value.steel.LimitTwo = [];
    newRow.value.steel.LimitZero = [];
    newRow.value.diver.servoType = 0;

    console.log(tableDataCrtl);
    dialogVisible.value = true;
};



const reedit = (index) => {

    newRow.value.name = tableDataCrtl.value[index].name;
    newRow.value.editingIndex = index; // 设置编辑索引
    newRow.value.AGVposX = tableDataCrtl.value[index].AGVposX;
    newRow.value.AGVposY = tableDataCrtl.value[index].AGVposY;
    newRow.value.isDrWheel = tableDataCrtl.value[index].isDrWheel;
    newRow.value.driverType = tableDataCrtl.value[index].driverType;
    newRow.value.diver.MeParm = tableDataCrtl.value[index].diver.MeParm;
    newRow.value.diver.SeParm = tableDataCrtl.value[index].diver.SeParm;
    newRow.value.diver.morehot = tableDataCrtl.value[index].diver.morehot;

    newRow.value.diver.Indirection = tableDataCrtl.value[index].diver.Indirection;
    newRow.value.diver.servoType = tableDataCrtl.value[index].diver.servoType;


    newRow.value.isSteel = tableDataCrtl.value[index].isSteel;
    newRow.value.steel.MeParm = tableDataCrtl.value[index].steel.MeParm;
    newRow.value.steel.zeroindex = tableDataCrtl.value[index].steel.zeroindex;
    newRow.value.steel.SeParm = tableDataCrtl.value[index].steel.SeParm;
    newRow.value.steel.isCoddist = tableDataCrtl.value[index].steel.isCoddist;
    newRow.value.steel.Coddist = tableDataCrtl.value[index].steel.Coddist;
    newRow.value.steel.RuservoType = tableDataCrtl.value[index].steel.RuservoType;
    newRow.value.steel.Indirection = tableDataCrtl.value[index].steel.Indirection;
    newRow.value.steel.sevorestu = tableDataCrtl.value[index].steel.sevorestu;
    newRow.value.steel.sevoreable = tableDataCrtl.value[index].steel.sevoreable;

    newRow.value.steel.LimitOne = tableDataCrtl.value[index].steel.LimitOne;
    newRow.value.steel.LimitTwo = tableDataCrtl.value[index].steel.LimitTwo;
    newRow.value.steel.LimitZero = tableDataCrtl.value[index].steel.LimitZero;

    console.log(tableDataCrtl);
    dialogVisible.value = true;
};
const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtl.value[newRow.value.editingIndex].name = newRow.value.name;
            tableDataCrtl.value[newRow.value.editingIndex].AGVposX = newRow.value.AGVposX;
            tableDataCrtl.value[newRow.value.editingIndex].AGVposY = newRow.value.AGVposY;
            tableDataCrtl.value[newRow.value.editingIndex].isDrWheel = newRow.value.isDrWheel;
            tableDataCrtl.value[newRow.value.editingIndex].isSteel = newRow.value.isSteel;
            tableDataCrtl.value[newRow.value.editingIndex].driverType = newRow.value.driverType;
            tableDataCrtl.value[newRow.value.editingIndex].diver.MeParm = newRow.value.diver.MeParm;
            tableDataCrtl.value[newRow.value.editingIndex].diver.SeParm = newRow.value.diver.SeParm;
            tableDataCrtl.value[newRow.value.editingIndex].diver.Indirection = newRow.value.diver.Indirection;
            tableDataCrtl.value[newRow.value.editingIndex].diver.servoType = newRow.value.diver.servoType;
            if (newRow.value.diver.morehot.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].diver.morehot = newRow.value.diver.morehot.value;
            }
            if (newRow.value.steel.sevorestu.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steel.sevorestu = newRow.value.steel.sevorestu.value;
            }
            if (newRow.value.steel.sevoreable.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steel.sevoreable = newRow.value.steel.sevoreable.value;
            }
            if (newRow.value.steel.LimitOne.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steel.LimitOne = newRow.value.steel.LimitOne.value;
            }
            if (newRow.value.steel.LimitTwo.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steel.LimitTwo = newRow.value.steel.LimitTwo.value;
            }
            if (newRow.value.steel.LimitZero.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steel.LimitZero = newRow.value.steel.LimitZero.value;
            }


            tableDataCrtl.value[newRow.value.editingIndex].steel.zeroindex = newRow.value.steel.zeroindex;
            tableDataCrtl.value[newRow.value.editingIndex].steel.MeParm = newRow.value.steel.MeParm;
            tableDataCrtl.value[newRow.value.editingIndex].steel.SeParm = newRow.value.steel.SeParm;
            tableDataCrtl.value[newRow.value.editingIndex].steel.isCoddist = newRow.value.steel.isCoddist;
            tableDataCrtl.value[newRow.value.editingIndex].steel.Coddist = newRow.value.steel.Coddist;
            tableDataCrtl.value[newRow.value.editingIndex].steel.RuservoType = newRow.value.steel.RuservoType;
            tableDataCrtl.value[newRow.value.editingIndex].steel.Indirection = newRow.value.steel.Indirection;


            jsondata.value.AGVmodel.OrdinaryDW = tableDataCrtl;
            console.log(tableDataCrtl);
        } else {
            // 新增模式下添加数据
            const newRowData = { ...newRow.value };
            tableDataCrtl.value.push(JSON.parse(JSON.stringify(newRowData)));


            jsondata.value.AGVmodel.OrdinaryDW = tableDataCrtl;
            console.log(tableDataCrtl);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};

const changedata = () => {
    tableDataCrtl.value[newRow.value.editingIndex].name = newRow.value.name;
    tableDataCrtl.value[newRow.value.editingIndex].AGVposX = newRow.value.AGVposX;
    tableDataCrtl.value[newRow.value.editingIndex].AGVposY = newRow.value.AGVposY;
    tableDataCrtl.value[newRow.value.editingIndex].isDrWheel = newRow.value.isDrWheel;
    tableDataCrtl.value[newRow.value.editingIndex].isSteel = newRow.value.isSteel;
    tableDataCrtl.value[newRow.value.editingIndex].driverType = newRow.value.driverType;
    tableDataCrtl.value[newRow.value.editingIndex].diver.MeParm = newRow.value.diver.MeParm;
    tableDataCrtl.value[newRow.value.editingIndex].diver.SeParm = newRow.value.diver.SeParm;
    tableDataCrtl.value[newRow.value.editingIndex].diver.Indirection = newRow.value.diver.Indirection;
    tableDataCrtl.value[newRow.value.editingIndex].diver.servoType = newRow.value.diver.servoType;
    if (newRow.value.diver.morehot.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].diver.morehot = newRow.value.diver.morehot.value;
    }
    if (newRow.value.steel.sevorestu.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].steel.sevorestu = newRow.value.steel.sevorestu.value;
    }
    if (newRow.value.steel.sevoreable.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].steel.sevoreable = newRow.value.steel.sevoreable.value;
    }
    if (newRow.value.steel.LimitOne.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].steel.LimitOne = newRow.value.steel.LimitOne.value;
    }
    if (newRow.value.steel.LimitTwo.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].steel.LimitTwo = newRow.value.steel.LimitTwo.value;
    }
    if (newRow.value.steel.LimitZero.value !== undefined) {
        tableDataCrtl.value[newRow.value.editingIndex].steel.LimitZero = newRow.value.steel.LimitZero.value;
    }



    tableDataCrtl.value[newRow.value.editingIndex].steel.zeroindex = newRow.value.steel.zeroindex;
    tableDataCrtl.value[newRow.value.editingIndex].steel.MeParm = newRow.value.steel.MeParm;
    tableDataCrtl.value[newRow.value.editingIndex].steel.SeParm = newRow.value.steel.SeParm;
    tableDataCrtl.value[newRow.value.editingIndex].steel.isCoddist = newRow.value.steel.isCoddist;
    tableDataCrtl.value[newRow.value.editingIndex].steel.Coddist = newRow.value.steel.Coddist;
    tableDataCrtl.value[newRow.value.editingIndex].steel.RuservoType = newRow.value.steel.RuservoType;
    tableDataCrtl.value[newRow.value.editingIndex].steel.Indirection = newRow.value.steel.Indirection;


    jsondata.value.AGVmodel.OrdinaryDW = tableDataCrtl;
};


const deleteRow = (index) => {
    tableDataCrtl.value.splice(index, 1);
};
</script>

    







  
  
<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>