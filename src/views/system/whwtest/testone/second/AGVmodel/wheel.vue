<template>
    <div>
        <el-button type="primary" @click="addNewRow">驱动轮</el-button>

        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog">

            <div>
                <!-- <el-button @click="handlesevor" type="primary">伺服使能位</el-button>
                <el-dialog :title="title1" v-model="sevorenab" :visible="sevorenab" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO1 :diver="diver.servoab"></IO1>
                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorenab = false">取 消</el-button>
                        <el-button @click="handlesevorEN">确定</el-button>

                    </div>

                </el-dialog> &nbsp;

                <el-button @click="handlesevorSTOP" type="primary">电机抱闸</el-button>
                <el-dialog :title="title2" v-model="sevorstop" :visible="sevorstop" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO2 :diver="diver.motorhold"></IO2>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorstop = false">取 消</el-button>
                        <el-button @click="handlesevorST">确定</el-button>

                    </div>

                </el-dialog>&nbsp;


                <el-button @click="handlesevorREADY" type="primary">Ready信号</el-button>
                <el-dialog :title="title3" v-model="sevorready" :visible="sevorready" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO3 :diver="diver.Ready"></IO3>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorready = false">取 消</el-button>
                        <el-button @click="handlesevorready">确定</el-button>

                    </div>

                </el-dialog>&nbsp; -->


                <!-- <el-button @click="handlesevorSTUTS" type="primary">伺服状态位</el-button>
                <el-dialog :title="title4" v-model="sevorstuts" :visible="sevorstuts" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO4 :diver="diver.sevorestu"></IO4>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorstuts = false">取 消</el-button>
                        <el-button @click="handlesevorstuts">确定</el-button>

                    </div>

                </el-dialog>&nbsp; -->


                <el-button @click="handlesevorHOT" type="primary">过热检测</el-button>
                <el-dialog :title="title5" v-model="sevorhot" :visible="sevorhot" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO5 :diver="diver.morehot" ></IO5>

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorhot = false">取 消</el-button>
                        <el-button @click="handlesevorhot">确定</el-button>

                    </div>

                </el-dialog>&nbsp;

            </div>
            <br>
            <div>
                <h3>安装方向:</h3>
                <el-select v-model="diver.Indirection">
                    <el-option label="正向" :value=0></el-option>
                    <el-option label="反向" :value=1></el-option>
                </el-select>
            </div>

            <div>
                <div class="table-container">
                    <div class="left-table">

                        <h3>机械参数:</h3>
                        <el-table :data="diver.MeParm" style="width: 90%">
                            <el-table-column prop="name" label=" ">
                                <template #default="scope">
                                    {{ Meparmname[scope.$index] }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label=" ">
                                <template #default="scope">
                                    <el-input v-model="diver.MeParm[scope.$index]" placeholder="请选择" style="width:100%;"
                                    @change="handleInputChange(scope.$index, diver.MeParm[scope.$index],diver.MeParm)" type="number">
                                    </el-input>
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="right-table">
                        <h3>伺服参数:</h3>
                        <el-table :data="diver.SeParm" style="width: 90%">
                            <el-table-column prop="name" label=" ">
                                <template #default="scope">
                                    {{ Separmname[scope.$index] }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label=" ">
                                <template #default="scope">
                                    <el-input v-model="diver.SeParm[scope.$index]" placeholder="请选择" style="width:100%;"
                                    @change="handleInputChange(scope.$index, diver.SeParm[scope.$index],diver.SeParm)" type="number">
                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
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
import IO1 from './IO.vue'
import IO2 from './IO.vue'
import IO3 from './IO.vue'
import IO4 from './IO.vue'
import IO5 from './IO.vue'
import { flag } from '@/views/system/whwtest/testone/common/commondata.js'
function handleInputChange(index, event,MeParm) {
    MeParm[index] = parseInt(event);
}

const Meparmname = ref(['驱动内坐标X', '驱动内坐标Y', '车轮直径(m)', '电机减速比', '最大转速rpm', '码盘线数'])
const Separmname = ref(['CAN端口号', 'CAN-OPEN编号'])

// const childValue = ref([]);

// const emit = defineEmits(['Returnjson'])

// emit('Returnjson', childValue.value, 666);

const props = defineProps({
    diver: {
        type: String,
        required: true
    }
});





// const Indirection = ref('');


const title = '驱动轮';
const title1 = '伺服使能位';
const title2 = '电机抱闸';
const title3 = 'Ready信号';
const title4 = '伺服状态位';
const title5 = '过热检测';
const dialogVisible = ref(false);
const sevorenab = ref(false);
const sevorstop = ref(false);
const sevorready = ref(false);
const sevorstuts = ref(false);
const sevorhot = ref(false);


const handlesevorready = () => {
    sevorready.value = false;
};
const handlesevorREADY = () => {
    flag.value = !flag.value;
    sevorready.value = true;
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


const handlesevorST = () => {
    sevorstop.value = false;
};
const handlesevorSTOP = () => {
    flag.value = !flag.value;
    sevorstop.value = true;
};
const handlesevorEN = () => {
    sevorenab.value = false;
};
const handlesevor = () => {
    flag.value = !flag.value;
    sevorenab.value = true;
    
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