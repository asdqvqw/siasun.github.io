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
                    


            </el-form>

            <div v-if="newRow.isHardBum">
                &nbsp;
                <el-button @click="handlestop1input" type="primary">禁止继电器1输入点</el-button>
                <el-dialog :title="titleinput" v-model="stop1input" :visible="stop1input" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO2 :diver="newRow.HardBum.one.input"></IO2>
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
                        <IO2 :diver="newRow.HardBum.one.output" ></IO2>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stop1output = false">取 消</el-button>
                        <el-button @click="handlestop1outputQ">确定</el-button>
                    </div>
                </el-dialog>&nbsp;

                <!-- <el-button @click="handlesevorHOT" type="primary">禁止继电器2输入点</el-button>
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

                <el-button @click="handlesevorHOT" type="primary">禁止继电器2输出点</el-button>
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

                <el-button @click="handlesevorHOT" type="primary">复位继电器输入点</el-button>
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

                <el-button @click="handlesevorHOT" type="primary">复位继电器输出点</el-button>
                <el-dialog :title="title5" v-model="sevorhot" :visible="sevorhot" width="600px"
                    :close-on-click-modal="false" class="edit-data-dialog">
                    <div>
                        <IO5 :diver="diver.morehot" ></IO5>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="sevorhot = false">取 消</el-button>
                        <el-button @click="handlesevorhot">确定</el-button>
                    </div>
                </el-dialog>&nbsp; -->
            </div>

            <!-- <pre>{{ newRow.value }}</pre> -->
            <pre>{{ tableDataCrtlBumper }}</pre>
            <pre>{{ flag }}</pre>
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
import { flag,flag2, newRow } from './bumpdata.js';
import { tableDataCrtlBumper } from '@/views/system/whwtest/testone/common/commondata.js'
import { jsondata } from '@/views/system/whwtest/testone/common/commondata.js'
const stop1input = ref(false);
const stop1output = ref(false);
const titleinput = '输入点';
const titleoutput = '输出点';
const title = '硬保险杠';



const dialogVisible = ref(false);

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
    console.log('addNewRow', newRow.value.value.value)
    dialogVisible.value = true;
    flag.value = !flag.value;
};

const reedit = (index) => {

    newRow.value.name = tableDataCrtlBumper.value[index].name;
    newRow.value.pos = tableDataCrtlBumper.value[index].pos;
    newRow.value.isHardBum = tableDataCrtlBumper.value[index].isHardBum;
    newRow.value.value.value = tableDataCrtlBumper.value[index].value;
    if(tableDataCrtlBumper.value[index].HardBum.one.input!==undefined)
    {
        newRow.value.HardBum.one.input = tableDataCrtlBumper.value[index].HardBum.one.input;
    }
    if(tableDataCrtlBumper.value[index].HardBum.one.output!==undefined)
    {
        newRow.value.HardBum.one.output = tableDataCrtlBumper.value[index].HardBum.one.output;
    }
    
    newRow.value.editingIndex = index; // 设置编辑索引
    console.log('reedit', newRow.value.HardBum.one.input)
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
            console.log('1111',newRow.value.HardBum.one.input.value)
            if(newRow.value.HardBum.one.input.value !== undefined)
            {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.one.input = newRow.value.HardBum.one.input.value;
            }
            if(newRow.value.HardBum.one.output.value !== undefined)
            {
                tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum.one.output = newRow.value.HardBum.one.output.value;
            }
            
            if (newRow.value.value != undefined) {
                tableDataCrtlBumper.value[newRow.value.editingIndex].value = newRow.value.value;
            }
            jsondata.value.HardBumper = tableDataCrtlBumper;
            console.log('handleAddRow', newRow.value.HardBum.one.input.value);
            console.log('handleAddRow', tableDataCrtlBumper.value[newRow.value.editingIndex].HardBum);
        } else {
            // 新增模式下添加数据
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
