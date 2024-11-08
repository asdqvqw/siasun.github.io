<template>
    <div>
        <el-button type="primary" @click="addNewRow">转舵机构</el-button>

        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog">

            <!-- <div>

                <el-button @click="handlesevorSTUTS" type="primary">伺服状态位</el-button>
                <el-dialog :title="title4" v-model="sevorstuts" :visible="sevorstuts" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO6 :wheel="steer.sevorestu"></IO6>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorstuts = false">取 消</el-button>
                        <el-button @click="handlesevorstuts">确定</el-button>

                    </div>

                </el-dialog>&nbsp;


                <el-button @click="handlesevorHOT" type="primary">伺服使能位</el-button>
                <el-dialog :title="title5" v-model="sevorhot" :visible="sevorhot" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO7 :wheel="steer.sevoreable"></IO7>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorhot = false">取 消</el-button>
                        <el-button @click="handlesevorhot">确定</el-button>

                    </div>

                </el-dialog>&nbsp;

            </div>
            <br> -->

            <div>
                <h3>安装方向:</h3>
                <el-select v-model="steer.install_dir">
                    <el-option label="正向" :value=0></el-option>
                    <el-option label="反向" :value=1></el-option>
                </el-select>
            </div>

            <div>
                <div class="table-container">
                    <div class="left-table">

                        <h3>机械参数:</h3>


                        <el-form ref="form" :model="steer" label-width="120px">
                            <el-form-item label="单元距离" style="width: 90%">
                                <el-input v-model.number="steer.axis.unit_dis" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="电机减速比" style="width: 90%">
                                <el-input v-model.number="steer.axis.ratio" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="码盘线束" style="width: 90%">
                                <el-input v-model.number="steer.axis.encoder" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="最大角度" style="width: 90%">
                                <el-input v-model.number="steer.axis.max_poserr_limit" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="角加速度" style="width: 90%">
                                <el-input v-model.number="steer.axis.acc_vel" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="角速度" style="width: 90%">
                                <el-input v-model.number="steer.axis.vel" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="Target门限" style="width: 90%"
                                v-show="showIndexsteer === 0 || showIndexsteer === 1">
                                <el-input v-model.number="steer.axis.Target" type="number"></el-input>
                            </el-form-item>
                        </el-form>

                        <!-- <el-table :data="steer.MeParm" style="width: 90%">
                            <el-table-column prop="name" label=" ">
                                <template #default="scope">
                                    {{ Meparmname[scope.$index] }}
                                </template>
</el-table-column>
<el-table-column prop="value" label=" ">
    <template #default="scope">
                                    <el-input v-model="steer.MeParm[scope.$index]" placeholder="请选择" style="width:100%;"
                                        @change="handleInputChange(scope.$index, steer.MeParm[scope.$index], steer.MeParm)"
                                        type="number">
                                    </el-input>

                                </template>
</el-table-column>
</el-table> -->
                    </div>
                    <div class="right-table">
                        <h3>伺服参数:</h3>

                        <el-form ref="form" :model="steer" label-width="130px">
                            <el-form-item label="CANOPEN端口号" style="width: 90%"
                                v-show="showIndexsteer === 2 || showIndexsteer === 3 || showIndexsteer === 4 || showIndexsteer === 5">
                                <el-input v-model.number="steer.servo.canport_id" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="CANPOS端口号" style="width: 90%"
                                v-show="showIndexsteer === 0 || showIndexsteer === 1">
                                <el-input v-model.number="steer.servo.can_id" type="number"></el-input>
                            </el-form-item>

                            <el-form-item label="CANPOS编号" style="width: 90%"
                                v-show="showIndexsteer === 0 || showIndexsteer === 1">
                                <el-input v-model.number="steer.servo.canposunit_id" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="CANOPEN编号" style="width: 90%"
                                v-show="showIndexsteer === 2 || showIndexsteer === 3 || showIndexsteer === 4 || showIndexsteer === 5">
                                <el-input v-model.number="steer.servo.canopenunit_id" type="number"></el-input>
                            </el-form-item>
                        </el-form>

                        <!-- <el-table :data="steer.SeParm" style="width: 90%">
                            <el-table-column prop="name" label=" ">
                                <template #default="scope">
                                    {{ Separmname[scope.$index] }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label=" ">
                                <template #default="scope">
                                    <el-input v-model="steer.SeParm[scope.$index]" placeholder="请选择" style="width:100%;"
                                        @change="handleInputChange(scope.$index, steer.SeParm[scope.$index], steer.SeParm)"
                                        type="number">
                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table> -->
                    </div>


                </div>
                <h3>舵绝对码盘:</h3>
                <el-checkbox v-model="steer.use_absolute_encoder">启用舵绝对码盘</el-checkbox>
                <div v-if="steer.use_absolute_encoder">

                    <el-form ref="form" :model="steer" label-width="130px">
                            <el-form-item label="码盘CAN端口号" style="width: 90%">
                                <el-input v-model.number="steer.absolute_encoder_canport_id" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="码盘模块编号" style="width: 90%">
                                <el-input v-model.number="steer.absolute_encoder_unit_id" type="number"></el-input>
                            </el-form-item>

                            <el-form-item label="码盘最大值" style="width: 90%">
                                <el-input v-model.number="steer.absolute_encoder_max" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="零位码盘值" style="width: 90%">
                                <el-input v-model.number="steer.absolute_encoder_zero" type="number"></el-input>
                            </el-form-item>
                        </el-form>
                    <!-- <el-table :data="steer.Coddist" style="width: 90%">
                        <el-table-column prop="name" label=" ">
                            <template #default="scope">
                                {{ coddistname[scope.$index] }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label=" ">
                            <template #default="scope">
                                <el-input v-model="steer.Coddist[scope.$index]" placeholder="请选择" style="width:100%;"
                                    @change="handleInputChange(scope.$index, steer.Coddist[scope.$index], steer.Coddist)"
                                    type="number">
                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table> -->
                </div>


                <h3>舵角校正:</h3>
                <br>
                <el-form ref="form" :model="steer" label-width="130px">
                    <el-form-item label="零位索引偏差" style="width: 45%">
                        <el-input v-model.number="steer.home_offset" type="number"></el-input>
                    </el-form-item>
                </el-form>
                <!-- <el-table :data="steer.home_offset" style="width: 90%">
                    <el-table-column prop="name" label=" ">
                        <template #default="scope">
                            {{ home_offset[scope.$index] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" label=" ">
                        <template #default="scope">
                            <el-input v-model="steer.home_offset[scope.$index]" placeholder="请选择" style="width:100%;"
                                @change="handleInputChange(scope.$index, steer.home_offset[scope.$index], steer.home_offset)"
                                type="number">
                            </el-input>
                        </template>
                    </el-table-column>
                </el-table> -->

                <!-- <el-button @click="handlesevorONE" type="primary">限位开关1</el-button>
                <el-dialog :title="title6" v-model="sevorone" :visible="sevorone" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO8 :wheel="steer.unclockwise_limit_switch"></IO8>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorone = false">取 消</el-button>
                        <el-button @click="handlesevorone">确定</el-button>

                    </div>

                </el-dialog>&nbsp;

                <el-button @click="handlesevorTWO" type="primary">限位开关2</el-button>
                <el-dialog :title="title7" v-model="sevortwo" :visible="sevortwo" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO9 :wheel="steer.clockwise_limit_switch"></IO9>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevortwo = false">取 消</el-button>
                        <el-button @click="handlesevortwo">确定</el-button>

                    </div>

                </el-dialog>&nbsp;


                <el-button @click="handlesevorZERO" type="primary">零位开关</el-button>
                <el-dialog :title="title8" v-model="sevorzero" :visible="sevorzero" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO10 :wheel="steer.zero_limit_switch"></IO10>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorzero = false">取 消</el-button>
                        <el-button @click="handlesevorzero">确定</el-button>

                    </div>

                </el-dialog>&nbsp;<br> -->

            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleAddRow">确定</el-button>

            </div>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import IO6 from './IO.vue'
import IO7 from './IO.vue'
import IO8 from './IO.vue'
import IO9 from './IO.vue'
import IO10 from './IO.vue'

import { flag } from '../../common/commondata.js'
import { showIndexsteer } from './AGVselect.js'


const props = defineProps({
    steer: {
        type: String,
        required: true
    }
});



const title = '驱动轮';

const title4 = '伺服状态位';
const title5 = '伺服使能位';
const title6 = '限位开关1';
const title7 = '限位开关2';
const title8 = '零位开关';
const dialogVisible = ref(false);

const sevorstuts = ref(false);
const sevorhot = ref(false);
const sevorone = ref(false);
const sevortwo = ref(false);
const sevorzero = ref(false);
// const handleCtrlStatusChange = (index, row) => {
//     childValue.value[index] = parseInt(row.value);
// };


const handlesevorONE = () => {
    flag.value = !flag.value;
    sevorone.value = true;
};
const handlesevorTWO = () => {
    flag.value = !flag.value;
    sevortwo.value = true;
};


const handlesevorone = () => {
    sevorone.value = false;
};

const handlesevortwo = () => {

    sevortwo.value = false;
};
const handlesevorZERO = () => {
    flag.value = !flag.value;
    sevorzero.value = true;
};
const handlesevorzero = () => {

    sevorzero.value = false;
};


const handlesevorstuts = () => {
    sevorstuts.value = false;
};
const handlesevorSTUTS = () => {
    flag.value = !flag.value;
    sevorstuts.value = true;
};
const handlesevorhot = () => {
    sevorhot.value = false;

};
const handlesevorHOT = () => {
    flag.value = !flag.value;
    sevorhot.value = true;
};


const addNewRow = () => {
    dialogVisible.value = true;
};

const handleAddRow = () => {
    dialogVisible.value = false;
};


</script>











<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}

.table-container {
    display: flex;
}

.left-table {
    flex: 1;
}

.right-table {
    flex: 1;
}
</style>