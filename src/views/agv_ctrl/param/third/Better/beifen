<template>
    <el-form ref="form" :model="tableDataCrtlBetter" label-width="120px">

        <el-form-item label="🎈电量表类型">
            <el-select v-model="tableDataCrtlBetter.type" placeholder="请选择" @change="typechange">
                <el-option label="无电量表" :value=0></el-option>
                <el-option label="CAN电量表" :value=1></el-option>
                <el-option label="电池管理系统" :value=2></el-option>
                <el-option label="IO模块" :value=3></el-option>
            </el-select><br>
        </el-form-item>


        <div v-if="tableDataCrtlBetter.type === 0">

        </div>

        <div v-if="tableDataCrtlBetter.type === 1 || tableDataCrtlBetter.type === 2">
            <el-form-item label="🎈输出类型">
                <el-select v-model="tableDataCrtlBetter.elect" placeholder="请选择" @change="syncdata">
                    <el-option label="电流(A)" :value=0></el-option>
                    <el-option label="电压(V)" :value=1></el-option>
                    <el-option label="电量百分比(%)" :value=2></el-option>

                </el-select><br>
            </el-form-item>

            <el-table :data="BETTERPARM" style="width: 90%">
                <el-table-column prop="name" label=" ">
                    <template #default="scope">
                        {{ BETTERPARM[scope.$index] }}
                    </template>
                </el-table-column>
                <el-table-column prop="value" label=" ">
                    <template #default="scope">
                        <el-input v-model="tableDataCrtlBetter.param[scope.$index]" placeholder="请输入" style="width:100%;"
                            @change="handleInputChange(scope.$index, tableDataCrtlBetter.param[scope.$index], tableDataCrtlBetter.param)"
                            type="number">
                        </el-input>

                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div v-else-if="tableDataCrtlBetter.type === 3">
            <el-form-item label="🎈输出类型">
                <el-select v-model="tableDataCrtlBetter.elect" placeholder="请选择" @change="syncdata">
                    <el-option label="电流" :value=0></el-option>
                    <el-option label="电压" :value=1></el-option>
                    <el-option label="电量百分比" :value=2></el-option>

                </el-select><br>
            </el-form-item>

            <el-table :data="BETTERPARMA" style="width: 90%">
                <el-table-column prop="name" label=" ">
                    <template #default="scope">
                        {{ BETTERPARMA[scope.$index] }}
                    </template>
                </el-table-column>
                <el-table-column prop="value" label=" ">
                    <template #default="scope">
                        <el-input v-model="tableDataCrtlBetter.param[scope.$index]" placeholder="请输入" style="width:100%;"
                            @change="handleInputChange(scope.$index, tableDataCrtlBetter.param[scope.$index], tableDataCrtlBetter.param)"
                            type="number">
                        </el-input>

                    </template>
                </el-table-column>
            </el-table>
        </div>


    </el-form>

    <!-- {{ tableDataCrtlBetter }} -->

</template>

<script setup>

import { ref,watch } from 'vue'
import { tableDataCrtlBetter } from '@/views/agv_ctrl/param/common/commondata.js'
 import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'

 
const BETTERPARM = ref([
    "🎈很低阈值",
    "🎈低阈值",
    "🎈正常阈值",
]);

const BETTERPARMA = ref([
    "🎈很低阈值",
    "🎈低阈值",
    "🎈正常阈值",
    "🎈比例系数"
]);



function handleInputChange(index, event,MeParm) {
    MeParm[index] = parseInt(event);
    syncdata();
}

const syncdata = () =>
{
    jsondata.value.Better = tableDataCrtlBetter;
}


const typechange = () =>
{
    if (tableDataCrtlBetter.value.type === 1 || tableDataCrtlBetter.value.type === 2) {
        tableDataCrtlBetter.value.param = tableDataCrtlBetter.value.param.slice(0, 3); // 删除第四个元素以保持数组长度为 3
    } 
    syncdata();
}

</script>