<template>
    <div>
        <el-table :data="AUTOPARM" style="width: 100%">
            <el-table-column prop="name" label=" ">
                <template #default="scope">
                    <span>🔶{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="value" label=" ">

                <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="请选择" style="width:100%;"
                        @change="handleCtrlStatusChange(scope.$index, scope.row)" type="number">

                    </el-input>
                </template>
            </el-table-column>
        </el-table>

        <el-table :data="AUTOPARMLEV" style="width: 100%">
            <el-table-column prop="name" label="">
                <template #default="scope">
                    <span>🔶{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="">

                <template #default="scope">
                    <el-select v-model="scope.row.value" placeholder="请选择" @change="handleLevelChange(scope.row)">
                        <el-option label="0级速度,值0.1" value="0"></el-option>
                        <el-option label="1级速度,值0.2" value="1"></el-option>
                        <el-option label="2级速度,值0.3" value="2"></el-option>
                        <el-option label="3级速度,值0.4" value="3"></el-option>
                        <el-option label="4级速度,值0.5" value="4"></el-option>
                        <el-option label="5级速度,值0.6" value="5"></el-option>
                        <el-option label="6级速度,值0.7" value="6"></el-option>
                        <el-option label="7级速度,值0.8" value="7"></el-option>
                        <el-option label="8级速度,值0.9" value="8"></el-option>
                        <el-option label="9级速度,值1" value="9"></el-option>
                    </el-select>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { AUTOPARM, AUTOPARMLEV } from '@/views/agv_ctrl/param/common/commondata.js'


const handleCtrlStatusChange = (index, row) => {
    jsondata.value.OperatingParam.autoparam[row.key] = parseFloat(row.value);

};

const handleLevelChange = (row) => {
    jsondata.value.OperatingParam.autoparam.SpeedLev = parseFloat(row.value);

}


</script>