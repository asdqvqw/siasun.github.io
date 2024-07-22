<template>
    <el-form ref="form" :model="MANUALDATA" label-width="150px">
        <el-form-item label="🎆选择手控盒">
            <el-checkbox v-model="MANUALDATA.manualcom" @change="syncdata">✨串口手控盒</el-checkbox>
            <el-checkbox v-model="MANUALDATA.manualcan" @change="syncdata">✨CAN手控盒</el-checkbox>
            <el-checkbox v-model="MANUALDATA.manualforklift" @change="syncdata">✨叉车手柄</el-checkbox>
            <el-checkbox v-model="MANUALDATA.manualonline" @change="syncdata">✨无线手控盒</el-checkbox>
        </el-form-item>

        <el-form-item label="🎆选择串口">
            <el-select v-model="MANUALDATA.com" placeholder="请选择" :disabled="!MANUALDATA.manualcom" @change="syncdata">
                <el-option label="未使用串口" :value=0></el-option>

                <template v-for="(value, key, index) in filteredJsonData">
                    <el-option v-if="value === true" :key="index" :label="key"
                        :value="parseInt(key.slice(3))"></el-option>
                </template>
            </el-select><br>
        </el-form-item>

        <el-form-item label="🎆自动上线初始方向">
            <el-select v-model="MANUALDATA.direction" placeholder="请选择"
                :disabled="!MANUALDATA.manualcom && !MANUALDATA.manualcan && !MANUALDATA.manualforklift"
                @change="syncdata">
                <el-option label="前进" :value=0></el-option>
                <el-option label="后退" :value=1></el-option>
            </el-select><br>
        </el-form-item>

        <el-form-item label="🎆选择can线">
            <el-select v-model="MANUALDATA.can" placeholder="请选择"
                :disabled="!MANUALDATA.manualcan && !MANUALDATA.manualforklift" @change="syncdata">
                <el-option label="未安装" :value=0></el-option>
                <el-option v-for="(canKey, index) in canOptions" :key="index" :label="('can' + canKey)"
                    :value="canKey"></el-option>
            </el-select><br>
        </el-form-item>

    </el-form>


</template>

<script setup>
import { ref, computed } from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { MANUALDATA } from '@/views/agv_ctrl/param/common/commondata.js'


const IOweidong = ref(false);


const syncdata = () => {
    jsondata.value.Manual = MANUALDATA;
    console.log('1111', jsondata.value.Manaul)
};



const canOptions = computed(() => {
    return Object.keys(jsondata.value)
        .filter(key => key.startsWith('can') && Array.isArray(jsondata.value[key].can_manual) && jsondata.value[key].can_manual.length > 0)
        .map(key => parseInt(key.slice(3))); // 提取键中的数字部分
});

const filteredJsonData = computed(() => {
    return Object.fromEntries(
        Object.entries(jsondata.value.com).filter(([key, value]) => key.startsWith('com') && value === true)
    );
});
</script>

<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>