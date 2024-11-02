<template>
    <div>
        <el-table :data="versionparam" style="width: 100%" class="UserPermissions">
            <el-table-column prop="name" label="⚠️ 版本号 ">
            </el-table-column>
            <el-table-column prop="value" label=" ">
                <template #default="scope">
                    <el-input v-model="scope.row.value" placeholder="版本号" style="width:100%;"
                        @change="handleCtrlStatusChange(scope.$index, scope.row)" >

                    </el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { versionparam } from '@/views/agv_ctrl/param/common/commondata.js'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
const handleCtrlStatusChange = (index, row) => {
    jsondata.value.version = row.value;
};
</script>

<style scoped>
.UserPermissions .el-table__body tr:nth-child(2n) {
    background-color: #ada7a757;
    /* 隔行背景色 */
}
</style>