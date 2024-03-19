<template>
    <div>
        
        <el-table :data="tableDataCrtlPLS" style="width: 100%">
            <el-table-column prop="name" label="">
                <template #default="scope">
                    <el-button type="text" @click="reedit(scope.$index)">{{ tableDataCrtlPLS[scope.$index].name
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


        <el-dialog title="PLS" v-model="dialogVisible" :visible="dialogVisible" width="800px"
            :close-on-click-modal="false" class="edit-data-dialog">
            <el-form ref="form" :model="newRow" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="newRow.name" placeholder="请输入名称"></el-input>
                </el-form-item>

                <el-form-item label="类型">
                    <el-select v-model="newRow.type" placeholder="请选择">
                        <el-option label="IO" :value=0></el-option>
                        <el-option label="网络" :value=1></el-option>
                    </el-select><br>
                </el-form-item>


                <div v-if="newRow.type === 0">
                    <el-form-item label="IO">
                        &nbsp;
                        <el-button @click="handleIOnear" type="primary">近距离区域</el-button>
                        <el-dialog title="近" v-model="IOnear" :visible="IOnear" width="600px"
                            :close-on-click-modal="false" class="edit-data-dialog">
                            <div>
                                <IO :diver="newRow.near"></IO>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="IOnear = false">取 消</el-button>
                                <el-button @click="handleIOnearQ">确定</el-button>
                            </div>
                        </el-dialog>&nbsp;

                        <el-button @click="handleIOmid" type="primary">中距离区域</el-button>
                        <el-dialog title="中" v-model="IOmid" :visible="IOmid" width="600px"
                            :close-on-click-modal="false" class="edit-data-dialog">
                            <div>
                                <IO1 :diver="newRow.mid"></IO1>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="IOmid = false">取 消</el-button>
                                <el-button @click="handleIOmidQ">确定</el-button>
                            </div>
                        </el-dialog>&nbsp;


                        <el-button @click="handleIOfar" type="primary">远距离区域</el-button>
                        <el-dialog title="远" v-model="IOfar" :visible="IOfar" width="600px"
                            :close-on-click-modal="false" class="edit-data-dialog">
                            <div>
                                <IO2 :diver="newRow.far"></IO2>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="IOfar = false">取 消</el-button>
                                <el-button @click="handleIOfarQ">确定</el-button>
                            </div>
                        </el-dialog>&nbsp;



                    </el-form-item>
                    <el-form-item label="切区类型">

                        <el-select v-model="newRow.CUTtype" placeholder="请选择">
                            <el-option label="正常类型" :value=0></el-option>
                            <el-option label="互斥类型" :value=1></el-option>
                            <el-option label="单点切区" :value=2></el-option>
                            <el-option label="多点切区" :value=3></el-option>
                        </el-select><br>
                    </el-form-item>

                    <el-form-item label="切区设置">




                        <el-table :data="tableDataCrtlTYPE" style="width: 100%">
                            <el-table-column prop="name" label="">
                                <template #default="scopeEX">
                                    <el-button type="text" @click="reeditEX(scopeEX.$index)">{{
            tableDataCrtlTYPE[scopeEX.$index].name
        }}</el-button>
                                </template>
                            </el-table-column>

                            <el-table-column label="">

                                <template #default="scopeEX">
                                    <el-button type="danger" @click="deleteRowEX(scopeEX.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>


                        <br><br>

                        <el-button type="primary" @click="addNewRowEX()">添加</el-button>

                        <!-- {{ newRowEX.area }} -->
                        <el-dialog title="切区设置" v-model="dialogVisibleEX" :visible="dialogVisibleEX" width="600px"
                            :close-on-click-modal="false" class="edit-data-dialog">


                            <el-form ref="form" :model="newRowEX" label-width="80px">
                                <el-form-item label="名称">
                                    <el-input v-model="newRowEX.name" placeholder="请输入名称"></el-input>
                                </el-form-item>



                                <el-form-item label="控制区域">
                                    <IOEX></IOEX>
                                </el-form-item>




                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisibleEX = false">取 消</el-button>
                                <el-button @click="handleAddRowEX()">确定</el-button>

                            </div>
                        </el-dialog>
                    </el-form-item>

                    <!-- {{ tableDataCrtlTYPE }} -->
                </div>
                <div v-else-if="newRow.type === 1">
                    <el-form-item label="IP">
                        <el-input v-model="newRow.ip" placeholder="请输入IP"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号">
                        <el-input v-model="newRow.port" placeholder="端口号"></el-input>
                    </el-form-item>
                </div>



            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="handleAddRow(true)">确定</el-button>

            </div>

        </el-dialog>
        <!-- {{ tableDataCrtlPLS }} -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { flag,  flagex, newRow, newRowEX } from './plsdata.js';
import IO from './IO.vue';
import IO1 from './IO.vue';
import IO2 from './IO.vue';
import IOEX from './IOEXP.vue'
import { tableDataCrtlPLS } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'


const IOfar = ref(false);
const IOnear = ref(false);
const IOmid = ref(false);


const handleIOnear = () => {
    flag.value = !flag.value;
    IOnear.value = true;
};

const handleIOnearQ = () => {
    handleAddRow(false)
    IOnear.value = false;
};

const handleIOmid = () => {
    flag.value = !flag.value;
    IOmid.value = true;
};

const handleIOmidQ = () => {
    handleAddRow(false)
    IOmid.value = false;
};

const handleIOfar = () => {
    flag.value = !flag.value;
    IOfar.value = true;
};

const handleIOfarQ = () => {
    handleAddRow(false)
    IOfar.value = false;
};


const tableDataCrtlTYPE = ref([
    // {
    //     name: 'No name',
    //     area:[]
    // }

]);




const dialogVisible = ref(false);
const dialogVisibleEX = ref(false);

const addNewRow = () => {
    newRow.value.name = 'No name';
    newRow.value.type = 0;
    newRow.value.CUTtype = 0;
    newRow.value.port = '';
    newRow.value.ip = '';
    newRow.value.near = [];
    newRow.value.area = [];
    newRow.value.mid = [];
    newRow.value.far = [];
    newRow.value.editingIndex = -1;
    dialogVisible.value = true;
};




const addNewRowEX = () => {
    flagex.value = !flagex.value;
    newRowEX.value.name = 'No name';
    newRowEX.value.area.value = [1, 1, 1, 1, 1];
    newRowEX.value.editingIndex = -1;
    console.log('1111', newRowEX.value.area);
    dialogVisibleEX.value = true;
};


const reedit = (index) => {

    newRow.value.name = tableDataCrtlPLS.value[index].name;
    newRow.value.type = tableDataCrtlPLS.value[index].type;
    newRow.value.CUTtype = tableDataCrtlPLS.value[index].CUTtype;
    newRow.value.port = tableDataCrtlPLS.value[index].port;
    newRow.value.ip = tableDataCrtlPLS.value[index].ip;

    if (tableDataCrtlPLS.value[index].near !== undefined) {
        newRow.value.near = tableDataCrtlPLS.value[index].near;
    }
    if (tableDataCrtlPLS.value[index].mid !== undefined) {
        newRow.value.mid = tableDataCrtlPLS.value[index].mid;
    }
    if (tableDataCrtlPLS.value[index].far !== undefined) {
        newRow.value.far = tableDataCrtlPLS.value[index].far;
    }
    if (tableDataCrtlPLS.value[index].area !== undefined) {
        newRow.value.area = tableDataCrtlPLS.value[index].area;
    }

    tableDataCrtlTYPE.value = tableDataCrtlPLS.value[index].area;

    console.log('111',newRow.value.near)
    console.log('222',newRow.value.mid)
    console.log('333',newRow.value.far)
    newRow.value.editingIndex = index; // 设置编辑索引
    dialogVisible.value = true;

};

const reeditEX = (index) => {
    flagex.value = !flagex.value;
    newRowEX.value.name = tableDataCrtlTYPE.value[index].name;


    // if (tableDataCrtlTYPE.value[index].area !== undefined) {
    newRowEX.value.area.value = tableDataCrtlTYPE.value[index].area;
    // }

    console.log('333', tableDataCrtlTYPE.value[index].area)
    console.log('444', newRowEX.value.area.value)
    newRowEX.value.editingIndex = index; // 设置编辑索引

    dialogVisibleEX.value = true;

};


const handleAddRow = (bool) => {
    if (newRow.value.name) {
        if (newRow.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlPLS.value[newRow.value.editingIndex].name = newRow.value.name;
            tableDataCrtlPLS.value[newRow.value.editingIndex].type = newRow.value.type;
            
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].near;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].mid;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].far;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].ip;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].port;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].area;
            delete tableDataCrtlPLS.value[newRow.value.editingIndex].CUTtype;
            if (newRow.value.type === 0) {
                tableDataCrtlPLS.value[newRow.value.editingIndex].CUTtype = newRow.value.CUTtype;

                if (newRow.value.mid.value !== undefined) {
                    console.log('mid', newRow.value.mid.value)
                    tableDataCrtlPLS.value[newRow.value.editingIndex].mid = newRow.value.mid.value;

                } else { tableDataCrtlPLS.value[newRow.value.editingIndex].mid = [];
                    console.log('mid') }


                if (newRow.value.near.value !== undefined) {
                    console.log('near', newRow.value.near.value)
                    tableDataCrtlPLS.value[newRow.value.editingIndex].near = newRow.value.near.value;

                } else { tableDataCrtlPLS.value[newRow.value.editingIndex].near = [];
                    console.log('near')}



                if (newRow.value.far.value !== undefined) {
                    console.log('far', newRow.value.far.value)
                    tableDataCrtlPLS.value[newRow.value.editingIndex].far = newRow.value.far.value;

                } else { tableDataCrtlPLS.value[newRow.value.editingIndex].far = [] ;
                    console.log('far')
                }

                if (newRow.value.area.value !== undefined) {
                    console.log('area', newRow.value.area.value)
                    tableDataCrtlPLS.value[newRow.value.editingIndex].area = newRow.value.area.value;

                } else { tableDataCrtlPLS.value[newRow.value.editingIndex].area = [] ;
                    console.log('area')
                }
                tableDataCrtlPLS.value[newRow.value.editingIndex].area = tableDataCrtlTYPE.value;
                tableDataCrtlTYPE.value = [];


            } else {

                tableDataCrtlPLS.value[newRow.value.editingIndex].ip = newRow.value.ip;
                tableDataCrtlPLS.value[newRow.value.editingIndex].port = newRow.value.port;
            }


            jsondata.value.PLS = tableDataCrtlPLS;

        } else {
            if (bool) {
                // 新增模式下添加数据
                if (newRow.value.near.value !== undefined) {
                    newRow.value.near = newRow.value.near.value;
                }
                if (newRow.value.mid.value !== undefined) {
                    newRow.value.mid = newRow.value.mid.value;
                }
                if (newRow.value.far.value !== undefined) {
                    newRow.value.far = newRow.value.far.value;
                }
                newRow.value.area = tableDataCrtlTYPE.value;
                tableDataCrtlTYPE.value = [];
                const newRowData = { ...newRow.value };

                // 根据类型添加字段
                if (newRow.value.type === 0) {
                    delete newRowData.ip;
                    delete newRowData.port;
                } else {
                    delete newRowData.near;
                    delete newRowData.mid;
                    delete newRowData.far;
                    delete newRowData.CUTtype;
                }

                tableDataCrtlPLS.value.push(JSON.parse(JSON.stringify(newRowData)));
                jsondata.value.PLS = tableDataCrtlPLS;

            }

        }
        if (bool) { dialogVisible.value = false; }

    } else {
        ElMessage.error('请填写完整数据');
    }
};


const handleAddRowEX = () => {
    if (newRowEX.value.name) {
        if (newRowEX.value.editingIndex !== -1) {
            // 编辑模式下更新数据
            tableDataCrtlTYPE.value[newRowEX.value.editingIndex].name = newRowEX.value.name;
            if (newRowEX.value.area !== undefined) {
                tableDataCrtlTYPE.value[newRowEX.value.editingIndex].area = newRowEX.value.area;
            }

            console.log('111', tableDataCrtlTYPE.value[newRowEX.value.editingIndex].area)
            console.log('222', newRowEX.value.area)
        } else {
            // 新增模式下添加数据

            const newRowData = { ...newRowEX.value };


            tableDataCrtlTYPE.value.push(JSON.parse(JSON.stringify(newRowData)));


        }
        dialogVisibleEX.value = false;

    } else {
        ElMessage.error('请填写完整数据');
    }
};




const deleteRow = (index) => {
    tableDataCrtlPLS.value.splice(index, 1);
};
const deleteRowEX = (index) => {
    tableDataCrtlTYPE.value.splice(index, 1);
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
