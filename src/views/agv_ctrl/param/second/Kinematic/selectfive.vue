<template>
    <div>
        <el-table :data="tableDataCrtl" style="width: 100%" class="tableDataCrtl">

            <el-table-column prop="name" label="名称">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtl[scope.$index].name
                        }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="驱动类型">
                <template #default="scope">
                    
                    <el-button type="text" @click="reedit(scope.$index)">{{ jsondata.Kinematic.drive[scope.$index].drive_type == 0 ? '普通驱动类型' : '差速驱动类型' }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="车体坐标X(m)">
                <template #default="scope">
                    {{ jsondata.Kinematic.drive[scope.$index].install_x }}
                </template>
            </el-table-column>

            <el-table-column label="车体坐标Y(m)">
                <template #default="scope">
                    {{ jsondata.Kinematic.drive[scope.$index].install_y }}
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
            <DefinScrollbar height="100%" :showUpBt="true">
                <br>
                <el-form ref="form" :model="newRow" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="newRow" label-width="200px">
                    <br>
                    <h3>安装位置:</h3>
                    <br>
                    <el-form-item label="车体坐标系坐标X(m):">
                        <el-input v-model.number="newRow.install_x" type="number" @change="AGVpos"></el-input>
                    </el-form-item>
                    <el-form-item label="车体坐标系坐标Y(m):">
                        <el-input v-model.number="newRow.install_y" type="number" @change="AGVpos"></el-input>
                    </el-form-item>
                </el-form><br>

                <el-form label-width="120px">
                    <h3>驱动类型:</h3>
                    <br>
                    <el-form-item label="类型:">
                        <el-select v-model="newRow.drive_type" placeholder="请选择">
                            <el-option label="普通驱动类型" :value=0></el-option>
                            <el-option label="差速驱动类型" :value=1></el-option>
                        </el-select><br>
                    </el-form-item>

                    <el-form-item label="安装有驱动轮:">
                        <el-checkbox v-model="newRow.use_wheel"
                            @change="updatashowIndex">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                        驱动伺服类型&nbsp;&nbsp;
                        <el-select v-model="newRow.wheel.servo_type" placeholder="请选择" :disabled="!newRow.use_wheel"
                            @change="updatashowIndex">
                            <el-option label="无" :value=0></el-option>
                            <el-option label="普通MCU" :value=1></el-option>
                            <el-option label="差速MCU" :value=2></el-option>
                            <el-option label="Elmo伺服" :value=5></el-option>
                            <el-option label="步科伺服" :value=4></el-option>
                            <el-option label="Motec伺服" :value=6></el-option>
                            <el-option label="AMC伺服" :value=7></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="安装有转舵机构:">
                        <el-checkbox v-model="newRow.use_steer"
                            @change="updatashowIndexsteer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                        驱动伺服类型&nbsp;&nbsp;
                        <el-select v-model="newRow.steer.servo_type" placeholder="请选择" :disabled="!newRow.use_steer"
                            @change="updatashowIndexsteer">
                            <el-option label="无" :value=0></el-option>
                            <el-option label="普通MCU" :value=1></el-option>
                            <el-option label="差速MCU" :value=2></el-option>
                            <el-option label="Elmo伺服" :value=3></el-option>
                            <el-option label="步科伺服" :value=4></el-option>
                            <el-option label="Motec伺服" :value=5></el-option>
                            <el-option label="AMC伺服" :value=6></el-option>
                        </el-select>
                    </el-form-item>


                    <div style="display: flex; margin-left: 12%;">

                        <div v-if="newRow.use_wheel">
                            <wheel :wheel="newRow.wheel" @change="changedata"></wheel>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                        <div v-if="newRow.use_steer">
                            <steer :steer="newRow.steer" @change="changedata"></steer>
                            <br>
                            <el-button @click="handlesevorONE" type="primary">限位开关1</el-button>
                            <el-dialog title="限位开关1" v-model="sevorone" :visible="sevorone" width="600px"
                                :close-on-click-modal="false" class="edit-data-dialog" style="height: 40%;">
                                <div>
                                    <IO8 :wheel="newRow.steer.unclockwise_limit_switch"></IO8>
                                </div>

                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="sevorone = false">取 消</el-button>
                                    <el-button @click="handlesevorone">确定</el-button>

                                </div>

                            </el-dialog>&nbsp;

                            <el-button @click="handlesevorTWO" type="primary">限位开关2</el-button>
                            <el-dialog title="限位开关2" v-model="sevortwo" :visible="sevortwo" width="600px"
                                :close-on-click-modal="false" class="edit-data-dialog" style="height: 40%;">
                                <div>
                                    <IO9 :wheel="newRow.steer.clockwise_limit_switch"></IO9>

                                </div>

                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="sevortwo = false">取 消</el-button>
                                    <el-button @click="handlesevortwo">确定</el-button>

                                </div>

                            </el-dialog>&nbsp;



                            <el-button @click="handlesevorZERO" type="primary">零位开关</el-button>
                            <el-dialog title="零位开关" v-model="sevorzero" :visible="sevorzero" width="600px"
                                :close-on-click-modal="false" class="edit-data-dialog" style="height: 40%;">
                                <div>
                                    <IO10 :wheel="newRow.steer.zero_limit_switch"></IO10>

                                </div>

                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="sevorzero = false">取 消</el-button>
                                    <el-button @click="handlesevorzero">确定</el-button>

                                </div>

                            </el-dialog>&nbsp;<br>

                        </div>

                    </div>

                </el-form>
                <br>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" style="margin-left: 75%;">取 消</el-button>
                <el-button type="primary" @click="handleAddRow">确定</el-button>

            </div>
            <br>
        </DefinScrollbar>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import wheel from './wheel.vue';
import steer from './steer.vue';
import { tableDataCrtl } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { showIndex, showIndexsteer } from './AGVselect.js'
import { flag } from '@/views/agv_ctrl/param/common/commondata.js'
import IO8 from './IO.vue'
import IO9 from './IO.vue'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
import IO10 from './IO.vue'
const sevorone = ref(false);
const sevortwo = ref(false);
const sevorzero = ref(false);
const handlesevorONE = () => {
    flag.value = !flag.value;
    sevorone.value = true;
};

const handlesevorone = () => {
    changedata();
    sevorone.value = false;
};

const handlesevorTWO = () => {
    flag.value = !flag.value;
    sevortwo.value = true;
};
const handlesevortwo = () => {
    changedata();
    sevortwo.value = false;
};

const handlesevorZERO = () => {
    flag.value = !flag.value;
    sevorzero.value = true;
};
const handlesevorzero = () => {
    changedata();
    sevorzero.value = false;
};

const updatashowIndexsteer = () => {
    showIndexsteer.value = newRow.value.steer.servo_type;
}

const updatashowIndex = () => {
    showIndex.value = newRow.value.wheel.servo_type;
}
const title = '驱动单元';

const newRow = ref({
    name: '',
    install_x: 0,
    install_y: 0,
    use_wheel: false,
    use_steer: false,
    editingIndex: -1,
    drive_type: 0,
    wheel: {
        install_dir: 0,
        servo_type: 0,
        wheel_x: 0,
        wheel_y: 0,
        axis: {
            unit_dis: 0,
            ratio: 0,
            encoder: 0,
            acc_vel: 0,
            vel: 0,
            max_poserr_limit: 0,
            max_rpm: 0,
            Target: 0
        },
        servo: {
            canport_id: 0,
            canposunit_id: 0,
            canopenunit_id: 0,
            can_id: 0
        },
        // MeParm: [0, 0, 0.23, 21, 2700, 48],
        //SeParm: [0, 0],
        wheel_check: [0, 2, 2, 2, 0],

    },
    steer: {
        install_dir: 0,
        servo_type: 0,
        use_absolute_encoder: false,
        absolute_encoder_canport_id: 0,
        absolute_encoder_unit_id: 0,
        absolute_encoder_max: 16777216,
        absolute_encoder_zero: 16777000,
        // Coddist: [0, 0, 0.22, 1],
        // MeParm: [0, 0, 0.23],
        // SeParm: [0, 0],
        home_offset: 54,
        // sevorestu: [],
        // sevoreable: [],
        axis: {
            unit_dis: 0,
            ratio: 0,
            encoder: 0,
            acc_vel: 0,
            vel: 0,
            max_poserr_limit: 0,
            max_rpm: 0,
            Target: 0
        },
        servo: {
            canport_id: 0,
            canposunit_id: 0,
            canopenunit_id: 0,
            can_id: 0
        },
        unclockwise_limit_switch: [2, 2, 1, 0, 0],
        clockwise_limit_switch: [2, 2, 1, 1, 0],
        zero_limit_switch: [2, 2, 1, 2, 0],
    }
});

const dialogVisible = ref(false);

const addNewRow = () => {
    newRow.value.name = '';
    newRow.value.install_x = 0;
    newRow.value.install_y = 0;
    newRow.value.use_wheel = false;
    newRow.value.use_steer = false;
    newRow.value.drive_type = 0;

    newRow.value.steer.home_offset = 54;
    newRow.value.steer.use_absolute_encoder = false;
    newRow.value.steer.absolute_encoder_canport_id = 0;
    newRow.value.steer.absolute_encoder_unit_id = 0;
    newRow.value.steer.absolute_encoder_max = 16777216;
    newRow.value.steer.absolute_encoder_zero = 16777000;
    newRow.value.steer.servo_type = 0;
    // newRow.value.steer.Coddist = [0, 0, 0.22, 1];
    newRow.value.steer.install_dir = 0;
    newRow.value.steer.unclockwise_limit_switch = [2, 2, 1, 0, 0];
    newRow.value.steer.clockwise_limit_switch = [2, 2, 1, 1, 0];
    newRow.value.steer.zero_limit_switch = [2, 2, 1, 2, 0];

    newRow.value.steer.axis.unit_dis = 6.28;
    newRow.value.steer.axis.encoder = 2500;
    newRow.value.steer.axis.max_rpm = 0;
    newRow.value.steer.axis.Target = 0;
    newRow.value.steer.axis.max_poserr_limit = 0;
    newRow.value.steer.axis.vel = 1;
    newRow.value.steer.axis.acc_vel = 0.3;
    newRow.value.steer.axis.ratio = 20;
    newRow.value.steer.servo.canport_id = 0;
    newRow.value.steer.servo.canposunit_id = 0;
    newRow.value.steer.servo.canopenunit_id = 0;
    newRow.value.steer.servo.can_id = 11;

    newRow.value.editingIndex = -1;

    newRow.value.wheel.wheel_check = [0, 2, 2, 2, 0];
    newRow.value.wheel.install_dir = 0;
    newRow.value.wheel.wheel_x = 0;
    newRow.value.wheel.wheel_y = 0;
    newRow.value.wheel.servo_type = 0;

    newRow.value.wheel.axis.unit_dis = 0;
    newRow.value.wheel.axis.encoder = 2500;
    newRow.value.wheel.axis.max_rpm = 0;
    newRow.value.wheel.axis.Target = 0;
    newRow.value.wheel.axis.max_poserr_limit = 0;
    newRow.value.wheel.axis.vel = 1;
    newRow.value.wheel.axis.acc_vel = 0.3;
    newRow.value.wheel.axis.ratio = 20;
    newRow.value.wheel.servo.canport_id = 0;
    newRow.value.wheel.servo.canposunit_id = 0;
    newRow.value.wheel.servo.canopenunit_id = 0;
    newRow.value.wheel.servo.can_id = 11;


    // newRow.value.wheel.MeParm = [0, 0, 0.23, 21, 2700, 48];
    //newRow.value.wheel.SeParm = [0, 0];
    // newRow.value.steer.sevorestu = [];
    // newRow.value.steer.sevoreable = [];
    // newRow.value.steer.MeParm = [0, 0, 0.23];
    // newRow.value.steer.SeParm = [0, 0];


    console.log(tableDataCrtl);
    dialogVisible.value = true;
};



const reedit = (index) => {

    newRow.value.name = tableDataCrtl.value[index].name;
    newRow.value.editingIndex = index; // 设置编辑索引
    newRow.value.install_x = tableDataCrtl.value[index].install_x;
    newRow.value.install_y = tableDataCrtl.value[index].install_y;
    newRow.value.use_wheel = tableDataCrtl.value[index].use_wheel;
    newRow.value.drive_type = tableDataCrtl.value[index].drive_type;
    // newRow.value.wheel.MeParm = tableDataCrtl.value[index].wheel.MeParm;
    //newRow.value.wheel.SeParm = tableDataCrtl.value[index].wheel.SeParm;
    newRow.value.wheel.wheel_check = tableDataCrtl.value[index].wheel.wheel_check;

    newRow.value.wheel.install_dir = tableDataCrtl.value[index].wheel.install_dir;
    newRow.value.wheel.wheel_x = tableDataCrtl.value[index].wheel.wheel_x;
    newRow.value.wheel.wheel_y = tableDataCrtl.value[index].wheel.wheel_y;

    newRow.value.wheel.axis.unit_dis = tableDataCrtl.value[index].wheel.axis.unit_dis;
    newRow.value.wheel.axis.encoder = tableDataCrtl.value[index].wheel.axis.encoder;
    newRow.value.wheel.axis.max_rpm = tableDataCrtl.value[index].wheel.axis.max_rpm;
    newRow.value.wheel.axis.Target = tableDataCrtl.value[index].wheel.axis.Target;
    newRow.value.wheel.axis.max_poserr_limit = tableDataCrtl.value[index].wheel.axis.max_poserr_limit;
    newRow.value.wheel.axis.vel = tableDataCrtl.value[index].wheel.axis.vel;
    newRow.value.wheel.axis.acc_vel = tableDataCrtl.value[index].wheel.axis.acc_vel;
    newRow.value.wheel.axis.ratio = tableDataCrtl.value[index].wheel.axis.ratio;

    newRow.value.wheel.servo.canport_id = tableDataCrtl.value[index].wheel.servo.canport_id;
    newRow.value.wheel.servo.canposunit_id = tableDataCrtl.value[index].wheel.servo.canposunit_id;
    newRow.value.wheel.servo.canopenunit_id = tableDataCrtl.value[index].wheel.servo.canopenunit_id;
    newRow.value.wheel.servo.can_id = tableDataCrtl.value[index].wheel.servo.can_id;


    newRow.value.steer.axis.unit_dis = tableDataCrtl.value[index].steer.axis.unit_dis;
    newRow.value.steer.axis.encoder = tableDataCrtl.value[index].steer.axis.encoder;
    newRow.value.steer.axis.max_rpm = tableDataCrtl.value[index].steer.axis.max_rpm;
    newRow.value.steer.axis.Target = tableDataCrtl.value[index].steer.axis.Target;
    newRow.value.steer.axis.max_poserr_limit = tableDataCrtl.value[index].steer.axis.max_poserr_limit;
    newRow.value.steer.axis.vel = tableDataCrtl.value[index].steer.axis.vel;
    newRow.value.steer.axis.acc_vel = tableDataCrtl.value[index].steer.axis.acc_vel;
    newRow.value.steer.axis.ratio = tableDataCrtl.value[index].steer.axis.ratio;

    newRow.value.steer.servo.canport_id = tableDataCrtl.value[index].steer.servo.canport_id;
    newRow.value.steer.servo.canposunit_id = tableDataCrtl.value[index].steer.servo.canposunit_id;
    newRow.value.steer.servo.canopenunit_id = tableDataCrtl.value[index].steer.servo.canopenunit_id;
    newRow.value.steer.servo.can_id = tableDataCrtl.value[index].steer.servo.can_id;



    newRow.value.wheel.servo_type = tableDataCrtl.value[index].wheel.servo_type;

    newRow.value.use_steer = tableDataCrtl.value[index].use_steer;
    // newRow.value.steer.MeParm = tableDataCrtl.value[index].steer.MeParm;
    // newRow.value.steer.SeParm = tableDataCrtl.value[index].steer.SeParm;
    newRow.value.steer.home_offset = tableDataCrtl.value[index].steer.home_offset;
    newRow.value.steer.use_absolute_encoder = tableDataCrtl.value[index].steer.use_absolute_encoder;
    newRow.value.steer.absolute_encoder_canport_id = tableDataCrtl.value[index].steer.absolute_encoder_canport_id;
    newRow.value.steer.absolute_encoder_unit_id = tableDataCrtl.value[index].steer.absolute_encoder_unit_id;
    newRow.value.steer.absolute_encoder_max = tableDataCrtl.value[index].steer.absolute_encoder_max;
    newRow.value.steer.absolute_encoder_zero = tableDataCrtl.value[index].steer.absolute_encoder_zero;
    // newRow.value.steer.Coddist = tableDataCrtl.value[index].steer.Coddist;
    newRow.value.steer.servo_type = tableDataCrtl.value[index].steer.servo_type;
    newRow.value.steer.install_dir = tableDataCrtl.value[index].steer.install_dir;

    // newRow.value.steer.sevorestu = tableDataCrtl.value[index].steer.sevorestu;
    // newRow.value.steer.sevoreable = tableDataCrtl.value[index].steer.sevoreable;

    newRow.value.steer.unclockwise_limit_switch = tableDataCrtl.value[index].steer.unclockwise_limit_switch;
    console.log('333333,', tableDataCrtl.value[index].steer.unclockwise_limit_switch)
    console.log('2222222,', newRow.value.steer.unclockwise_limit_switch)
    newRow.value.steer.clockwise_limit_switch = tableDataCrtl.value[index].steer.clockwise_limit_switch;
    newRow.value.steer.zero_limit_switch = tableDataCrtl.value[index].steer.zero_limit_switch;


    showIndex.value = newRow.value.wheel.servo_type;
    showIndexsteer.value = newRow.value.steer.servo_type;
    console.log(tableDataCrtl);
    dialogVisible.value = true;
};
const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtl.value[newRow.value.editingIndex].name = newRow.value.name;
            tableDataCrtl.value[newRow.value.editingIndex].install_x = newRow.value.install_x;
            tableDataCrtl.value[newRow.value.editingIndex].install_y = newRow.value.install_y;
            tableDataCrtl.value[newRow.value.editingIndex].use_wheel = newRow.value.use_wheel;
            tableDataCrtl.value[newRow.value.editingIndex].use_steer = newRow.value.use_steer;
            tableDataCrtl.value[newRow.value.editingIndex].drive_type = newRow.value.drive_type;
            // tableDataCrtl.value[newRow.value.editingIndex].wheel.MeParm = newRow.value.wheel.MeParm;
            //tableDataCrtl.value[newRow.value.editingIndex].wheel.SeParm = newRow.value.wheel.SeParm;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.install_dir = newRow.value.wheel.install_dir;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_x = newRow.value.wheel.wheel_x;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_y = newRow.value.wheel.wheel_y;

            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.unit_dis = newRow.value.wheel.axis.unit_dis;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.encoder = newRow.value.wheel.axis.encoder;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.max_rpm = newRow.value.wheel.axis.max_rpm;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.Target = newRow.value.wheel.axis.Target;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.max_poserr_limit = newRow.value.wheel.axis.max_poserr_limit;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.vel = newRow.value.wheel.axis.vel;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.acc_vel = newRow.value.wheel.axis.acc_vel;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.ratio = newRow.value.wheel.axis.ratio;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canport_id = newRow.value.wheel.servo.canport_id;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canposunit_id = newRow.value.wheel.servo.canposunit_id;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canopenunit_id = newRow.value.wheel.servo.canopenunit_id;
            tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.can_id = newRow.value.wheel.servo.can_id;



            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.unit_dis = newRow.value.steer.axis.unit_dis;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.encoder = newRow.value.steer.axis.encoder;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.max_rpm = newRow.value.steer.axis.max_rpm;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.Target = newRow.value.steer.axis.Target;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.max_poserr_limit = newRow.value.steer.axis.max_poserr_limit;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.vel = newRow.value.steer.axis.vel;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.acc_vel = newRow.value.steer.axis.acc_vel;
            tableDataCrtl.value[newRow.value.editingIndex].steer.axis.ratio = newRow.value.steer.axis.ratio;
            tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canport_id = newRow.value.steer.servo.canport_id;
            tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canposunit_id = newRow.value.steer.servo.canposunit_id;
            tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canopenunit_id = newRow.value.steer.servo.canopenunit_id;
            tableDataCrtl.value[newRow.value.editingIndex].steer.servo.can_id = newRow.value.steer.servo.can_id;



            tableDataCrtl.value[newRow.value.editingIndex].wheel.servo_type = newRow.value.wheel.servo_type;
            if (newRow.value.wheel.wheel_check.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_check = newRow.value.wheel.wheel_check.value;
            }
            // if (newRow.value.steer.sevorestu.value !== undefined) {
            //     tableDataCrtl.value[newRow.value.editingIndex].steer.sevorestu = newRow.value.steer.sevorestu.value;
            // }
            // if (newRow.value.steer.sevoreable.value !== undefined) {
            //     tableDataCrtl.value[newRow.value.editingIndex].steer.sevoreable = newRow.value.steer.sevoreable.value;
            // }
            if (newRow.value.steer.unclockwise_limit_switch.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steer.unclockwise_limit_switch = newRow.value.steer.unclockwise_limit_switch.value;
                console.log('111111111', tableDataCrtl.value[newRow.value.editingIndex].steer.unclockwise_limit_switch);
            }
            if (newRow.value.steer.clockwise_limit_switch.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steer.clockwise_limit_switch = newRow.value.steer.clockwise_limit_switch.value;
            }
            if (newRow.value.steer.zero_limit_switch.value !== undefined) {
                tableDataCrtl.value[newRow.value.editingIndex].steer.zero_limit_switch = newRow.value.steer.zero_limit_switch.value;
            }


            tableDataCrtl.value[newRow.value.editingIndex].steer.home_offset = newRow.value.steer.home_offset;
            // tableDataCrtl.value[newRow.value.editingIndex].steer.MeParm = newRow.value.steer.MeParm;
            // tableDataCrtl.value[newRow.value.editingIndex].steer.SeParm = newRow.value.steer.SeParm;
            tableDataCrtl.value[newRow.value.editingIndex].steer.use_absolute_encoder = newRow.value.steer.use_absolute_encoder;
            tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_canport_id = newRow.value.steer.absolute_encoder_canport_id;
            tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_unit_id = newRow.value.steer.absolute_encoder_unit_id;
            tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_max = newRow.value.steer.absolute_encoder_max;
            tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_zero = newRow.value.steer.absolute_encoder_zero;
            // tableDataCrtl.value[newRow.value.editingIndex].steer.Coddist = newRow.value.steer.Coddist;
            tableDataCrtl.value[newRow.value.editingIndex].steer.servo_type = newRow.value.steer.servo_type;
            tableDataCrtl.value[newRow.value.editingIndex].steer.install_dir = newRow.value.steer.install_dir;


            jsondata.value.Kinematic.drive = tableDataCrtl;
            console.log(tableDataCrtl);
        } else {
            // 新增模式下添加数据
            if (newRow.value.wheel.wheel_check.value !== undefined) {
                newRow.value.wheel.wheel_check = newRow.value.wheel.wheel_check.value;
            }

            // if (newRow.value.steer.sevorestu.value !== undefined) {
            //     newRow.value.steer.sevorestu = newRow.value.steer.sevorestu.value;
            // }

            // if (newRow.value.steer.sevoreable.value !== undefined) {
            //     newRow.value.steer.sevoreable = newRow.value.steer.sevoreable.value;
            // }

            if (newRow.value.steer.unclockwise_limit_switch.value !== undefined) {
                newRow.value.steer.unclockwise_limit_switch = newRow.value.steer.unclockwise_limit_switch.value;
            }

            if (newRow.value.steer.clockwise_limit_switch.value !== undefined) {
                newRow.value.steer.clockwise_limit_switch = newRow.value.steer.clockwise_limit_switch.value;
            }

            if (newRow.value.steer.zero_limit_switch.value !== undefined) {
                newRow.value.steer.zero_limit_switch = newRow.value.steer.zero_limit_switch.value;
            }


            const newRowData = { ...newRow.value };
            tableDataCrtl.value.push(JSON.parse(JSON.stringify(newRowData)));


            jsondata.value.Kinematic.drive = tableDataCrtl;
            console.log(tableDataCrtl);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};

const changedata = () => {
    if (newRow.value.editingIndex !== -1) {
        // 编辑模式下更新数据
        tableDataCrtl.value[newRow.value.editingIndex].name = newRow.value.name;
        tableDataCrtl.value[newRow.value.editingIndex].install_x = newRow.value.install_x;
        tableDataCrtl.value[newRow.value.editingIndex].install_y = newRow.value.install_y;
        tableDataCrtl.value[newRow.value.editingIndex].use_wheel = newRow.value.use_wheel;
        tableDataCrtl.value[newRow.value.editingIndex].use_steer = newRow.value.use_steer;
        tableDataCrtl.value[newRow.value.editingIndex].drive_type = newRow.value.drive_type;
        // tableDataCrtl.value[newRow.value.editingIndex].wheel.MeParm = newRow.value.wheel.MeParm;
        //tableDataCrtl.value[newRow.value.editingIndex].wheel.SeParm = newRow.value.wheel.SeParm;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.install_dir = newRow.value.wheel.install_dir;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_x = newRow.value.wheel.wheel_x;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_y = newRow.value.wheel.wheel_y;

        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.unit_dis = newRow.value.wheel.axis.unit_dis;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.encoder = newRow.value.wheel.axis.encoder;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.max_rpm = newRow.value.wheel.axis.max_rpm;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.Target = newRow.value.wheel.axis.Target;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.max_poserr_limit = newRow.value.wheel.axis.max_poserr_limit;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.vel = newRow.value.wheel.axis.vel;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.acc_vel = newRow.value.wheel.axis.acc_vel;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.axis.ratio = newRow.value.wheel.axis.ratio;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canport_id = newRow.value.wheel.servo.canport_id;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canposunit_id = newRow.value.wheel.servo.canposunit_id;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.canopenunit_id = newRow.value.wheel.servo.canopenunit_id;
        tableDataCrtl.value[newRow.value.editingIndex].wheel.servo.can_id = newRow.value.wheel.servo.can_id;



        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.unit_dis = newRow.value.steer.axis.unit_dis;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.encoder = newRow.value.steer.axis.encoder;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.max_rpm = newRow.value.steer.axis.max_rpm;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.Target = newRow.value.steer.axis.Target;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.max_poserr_limit = newRow.value.steer.axis.max_poserr_limit;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.vel = newRow.value.steer.axis.vel;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.acc_vel = newRow.value.steer.axis.acc_vel;
        tableDataCrtl.value[newRow.value.editingIndex].steer.axis.ratio = newRow.value.steer.axis.ratio;
        tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canport_id = newRow.value.steer.servo.canport_id;
        tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canposunit_id = newRow.value.steer.servo.canposunit_id;
        tableDataCrtl.value[newRow.value.editingIndex].steer.servo.canopenunit_id = newRow.value.steer.servo.canopenunit_id;
        tableDataCrtl.value[newRow.value.editingIndex].steer.servo.can_id = newRow.value.steer.servo.can_id;



        tableDataCrtl.value[newRow.value.editingIndex].wheel.servo_type = newRow.value.wheel.servo_type;
        if (newRow.value.wheel.wheel_check.value !== undefined) {
            tableDataCrtl.value[newRow.value.editingIndex].wheel.wheel_check = newRow.value.wheel.wheel_check.value;
        }
        // if (newRow.value.steer.sevorestu.value !== undefined) {
        //     tableDataCrtl.value[newRow.value.editingIndex].steer.sevorestu = newRow.value.steer.sevorestu.value;
        // }
        // if (newRow.value.steer.sevoreable.value !== undefined) {
        //     tableDataCrtl.value[newRow.value.editingIndex].steer.sevoreable = newRow.value.steer.sevoreable.value;
        // }
        if (newRow.value.steer.unclockwise_limit_switch.value !== undefined) {
            tableDataCrtl.value[newRow.value.editingIndex].steer.unclockwise_limit_switch = newRow.value.steer.unclockwise_limit_switch.value;
            console.log('111111111', tableDataCrtl.value[newRow.value.editingIndex].steer.unclockwise_limit_switch);
        }
        if (newRow.value.steer.clockwise_limit_switch.value !== undefined) {
            tableDataCrtl.value[newRow.value.editingIndex].steer.clockwise_limit_switch = newRow.value.steer.clockwise_limit_switch.value;
        }
        if (newRow.value.steer.zero_limit_switch.value !== undefined) {
            tableDataCrtl.value[newRow.value.editingIndex].steer.zero_limit_switch = newRow.value.steer.zero_limit_switch.value;
        }


        tableDataCrtl.value[newRow.value.editingIndex].steer.home_offset = newRow.value.steer.home_offset;
        // tableDataCrtl.value[newRow.value.editingIndex].steer.MeParm = newRow.value.steer.MeParm;
        // tableDataCrtl.value[newRow.value.editingIndex].steer.SeParm = newRow.value.steer.SeParm;
        tableDataCrtl.value[newRow.value.editingIndex].steer.use_absolute_encoder = newRow.value.steer.use_absolute_encoder;
        tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_canport_id = newRow.value.steer.absolute_encoder_canport_id;
        tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_unit_id = newRow.value.steer.absolute_encoder_unit_id;
        tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_max = newRow.value.steer.absolute_encoder_max;
        tableDataCrtl.value[newRow.value.editingIndex].steer.absolute_encoder_zero = newRow.value.steer.absolute_encoder_zero;
        // tableDataCrtl.value[newRow.value.editingIndex].steer.Coddist = newRow.value.steer.Coddist;
        tableDataCrtl.value[newRow.value.editingIndex].steer.servo_type = newRow.value.steer.servo_type;
        tableDataCrtl.value[newRow.value.editingIndex].steer.install_dir = newRow.value.steer.install_dir;




    } else {
        // 新增模式下添加数据
        if (newRow.value.wheel.wheel_check.value !== undefined) {
            newRow.value.wheel.wheel_check = newRow.value.wheel.wheel_check.value;
        }

        // if (newRow.value.steer.sevorestu.value !== undefined) {
        //     newRow.value.steer.sevorestu = newRow.value.steer.sevorestu.value;
        // }

        // if (newRow.value.steer.sevoreable.value !== undefined) {
        //     newRow.value.steer.sevoreable = newRow.value.steer.sevoreable.value;
        // }

        if (newRow.value.steer.unclockwise_limit_switch.value !== undefined) {
            newRow.value.steer.unclockwise_limit_switch = newRow.value.steer.unclockwise_limit_switch.value;
        }

        if (newRow.value.steer.clockwise_limit_switch.value !== undefined) {
            newRow.value.steer.clockwise_limit_switch = newRow.value.steer.clockwise_limit_switch.value;
        }

        if (newRow.value.steer.zero_limit_switch.value !== undefined) {
            newRow.value.steer.zero_limit_switch = newRow.value.steer.zero_limit_switch.value;
        }


    }

    jsondata.value.Kinematic.drive = tableDataCrtl;
};


const deleteRow = (index) => {
    console.log('11111', index)
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

<style>
.tableDataCrtl .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>