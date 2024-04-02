<template>
    <div>
        <el-table :data="tableDataCrtlBumper" style="width: 100%">
            <el-table-column prop="name" label="">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlBumper[scope.$index].name
                        }}</el-button>
                </template>
            </el-table-column>

            <el-table-column label="">

                <template #default="scope">
                    <el-button type="danger" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>

        <el-button type="primary" @click="addNewRow">添加</el-button>


        <el-dialog :title="title" v-model="dialogVisible" :visible="dialogVisible" width="1000px"
            :close-on-click-modal="false" class="edit-data-dialog">

            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="IO">
                    <IO></IO>
                </el-form-item>
                <el-form-item label="安装位置">
                    <el-select v-model="newRow.pos">
                        <el-option label="前侧" :value=0></el-option>
                        <el-option label="后侧" :value=1></el-option>
                        <el-option label="左侧" :value=2></el-option>
                        <el-option label="右侧" :value=3></el-option>
                        <el-option label="环绕四周" :value=4></el-option>
                        <el-option label="前侧+后侧" :value=5></el-option>
                        <el-option label="左侧+右侧" :value=6></el-option>
                        <el-option label="未设置" :value=7></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="newRow.isHardBum" @change="HardBumchange">车型为硬件停车型保险杠</el-checkbox><br>
                </el-form-item>
<!-- 
{{ tableDataCrtlBumper }} -->

            </el-form>

            <div v-if="newRow.isHardBum">
                &nbsp;
                <el-button @click="handlestop1input" type="primary">禁止继电器1输入点</el-button>
                <el-dialog :title="titleinput" v-model="stop1input" :visible="stop1input" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO2 :wheel="newRow.HardBum.one.input"></IO2>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stop1input = false">取 消</el-button>
                        <el-button @click="handlestop1inputQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <el-button @click="handlestop1output" type="primary">禁止继电器1输出点</el-button>
                <el-dialog :title="titleoutput" v-model="stop1output" :visible="stop1output" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO2 :wheel="newRow.HardBum.one.output"></IO2>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stop1output = false">取 消</el-button>
                        <el-button @click="handlestop1outputQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <el-button @click="handlestop2input" type="primary">禁止继电器2输入点</el-button>
                <el-dialog :title="titleinput" v-model="stop2input" :visible="stop2input" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO5 :wheel="newRow.HardBum.two.input" ></IO5>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stop2input = false">取 消</el-button>
                        <el-button @click="handlestop2inputQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <el-button @click="handlestop2output" type="primary">禁止继电器2输出点</el-button>
                <el-dialog :title="titleoutput" v-model="stop2output" :visible="stop2output" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO5 :wheel="newRow.HardBum.two.output" ></IO5>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stop2output = false">取 消</el-button>
                        <el-button @click="handlestop2outputQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <el-button @click="handlestopresetI" type="primary">复位继电器输入点</el-button>
                <el-dialog :title="titleinput" v-model="resetI" :visible="resetI" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO6 :wheel="newRow.HardBum.reset.input" ></IO6>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="resetI = false">取 消</el-button>
                        <el-button @click="handlestopresetIQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <el-button @click="handlestopresetO" type="primary">复位继电器输出点</el-button>
                <el-dialog :title="titleoutput" v-model="resetO" :visible="resetO" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO6 :wheel="newRow.HardBum.reset.output" ></IO6>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="resetO = false">取 消</el-button>
                        <el-button @click="handlestopresetOQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;
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
import IO from './IO.vue'
import IO2 from './IOinoutPut.vue'
import IO5 from './IOinoutPut.vue'
import IO6 from './IOinoutPut.vue'
import { flag, flag2, newRow } from './bumpdata.js';
import { tableDataCrtlBumper } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
const stop1input = ref(false);
const stop1output = ref(false);
const stop2input = ref(false);
const stop2output = ref(false);
const resetI = ref(false);
const resetO = ref(false);
const titleinput = '输入点';
const titleoutput = '输出点';
const title = '硬保险杠';



const dialogVisible = ref(false);

const handlestopresetI = () => {
    flag2.value = !flag2.value;
    resetI.value = true;
};

const handlestopresetIQ = () => {
    resetI.value = false;
};


const handlestopresetO = () => {
    flag2.value = !flag2.value;
    resetO.value = true;
};

const handlestopresetOQ = () => {
    resetO.value = false;
};



const handlestop2output = () => {
    flag2.value = !flag2.value;
    stop2output.value = true;
};

const handlestop2outputQ = () => {
    stop2output.value = false;
};


const handlestop2input = () => {
    flag2.value = !flag2.value;
    stop2input.value = true;
};

const handlestop2inputQ = () => {
    stop2input.value = false;
};




const handlestop1output = () => {
    flag2.value = !flag2.value;
    stop1output.value = true;
};

const handlestop1outputQ = () => {
    stop1output.value = false;
};


const handlestop1input = () => {
    flag2.value = !flag2.value;
    stop1input.value = true;
};

const handlestop1inputQ = () => {
    stop1input.value = false;
};

const HardBumchange = () => {
    newRow.isHardBum = !newRow.isHardBum;
};


const addNewRow = () => {
    newRow.value.name = 'No name';
    newRow.value.pos = 7;
    newRow.value.isHardBum = false;
    newRow.value.value.value = [1, 1, 1, 1, 1];
    newRow.value.editingIndex = -1;
    newRow.value.HardBum.one.input = [0,2,2,2,0];
    newRow.value.HardBum.one.output = [0,2,2,2,0];

    newRow.value.HardBum.two.input = [0,2,2,2,0];
    newRow.value.HardBum.two.output = [0,2,2,2,0];

    newRow.value.HardBum.reset.input = [0,2,2,2,0];
    newRow.value.HardBum.reset.output = [0,2,2,2,0];

    console.log('addNewRow', newRow.value.value.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const reedit = (index) => {

    newRow.value.name = tableDataCrtlBumper.value[index].name;
    newRow.value.pos = tableDataCrtlBumper.value[index].pos;
    newRow.value.isHardBum = tableDataCrtlBumper.value[index].isHardBum;
    newRow.value.value.value = tableDataCrtlBumper.value[index].value;
    if (tableDataCrtlBumper.value[index].HardBum.one.input !== undefined) {
        newRow.value.HardBum.one.input = tableDataCrtlBumper.value[index].HardBum.one.input;
    }
    if (tableDataCrtlBumper.value[index].HardBum.one.output !== undefined) {
        newRow.value.HardBum.one.output = tableDataCrtlBumper.value[index].HardBum.one.output;
    }
    if (tableDataCrtlBumper.value[index].HardBum.two.input !== undefined) {
        newRow.value.HardBum.two.input = tableDataCrtlBumper.value[index].HardBum.two.input;
    }
    if (tableDataCrtlBumper.value[index].HardBum.two.output !== undefined) {
        newRow.value.HardBum.two.output = tableDataCrtlBumper.value[index].HardBum.two.output;
    }
    if (tableDataCrtlBumper.value[index].HardBum.reset.input !== undefined) {
        newRow.value.HardBum.reset.input = tableDataCrtlBumper.value[index].HardBum.reset.input;
    }
    if (tableDataCrtlBumper.value[index].HardBum.reset.output !== undefined) {
        newRow.value.HardBum.reset.output = tableDataCrtlBumper.value[index].HardBum.reset.output;
    }

    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', index)
    console.log('reedit', tableDataCrtlBumper.value[index].value)
    console.log('reedit', newRow.value.value.value)
    flag.value = !flag.value;
    dialogVisible.value = true;

};

const handleAddRow = () => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlBumper.value[newRow.value.editingIndex].name = newRow.value.name;
            tableDataCrtlBumper.value[newRow.value.editingIndex].pos = newRow.value.pos;
            tableDataCrtlBumper.value[newRow.value.editingIndex].isHardBum = newRow.value.isHardBum;
            console.log('1111', newRow.value.HardBum.one.input.value)
            if (newRow.value.HardBum.one.input.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.one.input = newRow.value.HardBum.one.input.value;
            }
            if (newRow.value.HardBum.one.output.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.one.output = newRow.value.HardBum.one.output.value;
            }
            if (newRow.value.HardBum.two.input.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.two.input = newRow.value.HardBum.two.input.value;
            }
            if (newRow.value.HardBum.two.output.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.two.output = newRow.value.HardBum.two.output.value;
            }
            if (newRow.value.HardBum.reset.input.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.reset.input = newRow.value.HardBum.reset.input.value;
            }
            if (newRow.value.HardBum.reset.output.value !== undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.reset.output = newRow.value.HardBum.reset.output.value;
            }

            if (newRow.value.value != undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].value = newRow.value.value;
            }
            jsondata.value.HardBumper = tableDataCrtlBumper;
            console.log('handleAddRow', newRow.value.HardBum.one.input.value);
            console.log('handleAddRow', tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum);
        } else {
            // 新增模式下添加数据
            if (newRow.value.HardBum.one.output.value !== undefined) {
                newRow.value.HardBum.one.output = newRow.value.HardBum.one.output.value;
            }
            if (newRow.value.HardBum.one.input.value !== undefined) {
                newRow.value.HardBum.one.input = newRow.value.HardBum.one.input.value;
            }
            if (newRow.value.HardBum.two.output.value !== undefined) {
                newRow.value.HardBum.two.output = newRow.value.HardBum.two.output.value;
            }
            if (newRow.value.HardBum.two.input.value !== undefined) {
                newRow.value.HardBum.two.input = newRow.value.HardBum.two.input.value;
            }
            if (newRow.value.HardBum.reset.output.value !== undefined) {
                newRow.value.HardBum.reset.output = newRow.value.HardBum.reset.output.value;
            }
            if (newRow.value.HardBum.reset.input.value !== undefined) {
                newRow.value.HardBum.reset.input = newRow.value.HardBum.reset.input.value;
            }

            const newRowData = { ...newRow.value };

            tableDataCrtlBumper.value.push(JSON.parse(JSON.stringify(newRowData)));
            jsondata.value.HardBumper = tableDataCrtlBumper;
            console.log('handleAddRow', newRowData);
        }
        dialogVisible.value = false;
    } else {
        ElMessage.error('请填写完整数据');
    }
};


const deleteRow = (index) => {
    tableDataCrtlBumper.value.splice(index, 1);
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
