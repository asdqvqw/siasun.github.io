<template>
    <el-form ref="form" :model="newRow" label-width="80px">


        <el-form-item label="类型">
            <el-select v-model="newRow.type" placeholder="请选择">
                <el-option label="IO" :value=0></el-option>
                <el-option label="网络" :value=1 v-if="false"></el-option>
            </el-select><br>
        </el-form-item>

        <el-form-item label="选择串口">
            <el-select v-model="newRow.com" placeholder="请选择">
                <el-option label="未使用串口" :value=0></el-option>

                <template v-for="(value, key, index) in jsondata">
                    <el-option v-if="jsondata[key]" :key="index" :label="key" :value="index + 1"></el-option>
                </template> 
            </el-select><br>
        </el-form-item>

    </el-form>

    {{ newRow }}
    {{ jsondata.com1 }}
</template>

<script setup>

import { ref } from 'vue'

const newRow = ref(
    {
        type: 1,
        com: 2
    }
);

const jsondata = ref({
    com1: true,
    com2: true,
    com3: false,
    com4: false,
})


</script>