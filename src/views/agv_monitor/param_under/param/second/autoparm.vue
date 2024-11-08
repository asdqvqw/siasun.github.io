<template>
    <div>
        <el-table :data="AUTOPARM" style="width: 100%" class="AUTOPARM">
            <el-table-column prop="name" label="🔖 公共参数: ">
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

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata } from '../common/commondata.js'
import { AUTOPARM, AUTOPARMLEV } from '../common/commondata.js'


const handleCtrlStatusChange = (index, row) => {
    jsondata.value.MotionParam.common_param[row.key] = parseFloat(row.value);

};

const handleLevelChange = (row) => {
    jsondata.value.MotionParam.auto_param.SpeedLev = parseFloat(row.value);

}


</script>

<style>
.AUTOPARM .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>