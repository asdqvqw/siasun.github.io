<template>
    <div>
        <el-table :data="MANUALPARMA" style="width: 100%">
            <el-table-column prop="manSpeLev" label="速度级别">

            </el-table-column>
            <el-table-column prop="adAutoSpe" label="对应的自动速度级别">
                <template #default="scope">
                    <el-select v-model="scope.row.adAutoSpe" placeholder="请选择">
                        <el-option label="0" :value=0></el-option>
                        <el-option label="1" :value=1></el-option>
                        <el-option label="2" :value=2></el-option>
                        <el-option label="3" :value=3></el-option>
                        <el-option label="4" :value=4></el-option>
                        <el-option label="5" :value=5></el-option>
                        <el-option label="6" :value=6></el-option>
                        <el-option label="7" :value=7></el-option>
                        <el-option label="8" :value=8></el-option>
                        <el-option label="9" :value=9></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="是否省缺">
                <template #default="scope">
                    <el-radio v-model="scope.row.value" :label="true" @change="statusChange(scope.row)">
                        是
                    </el-radio>
                </template>
            </el-table-column>
            
        </el-table>
        
        <br>
        <el-table :data="MANUALRAPARM" style="width: 100%">
            <el-table-column prop="manRadLev" label="转弯半径级别">

            </el-table-column>
            <el-table-column prop="manRadNum" label="半径值(m)" >
                <template #default="scope">
                    <el-input v-model="scope.row.manRadNum" placeholder="请输入半径" type="number">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="是否省缺">
                <template #default="scope">
                    <el-radio v-model="scope.row.value" :label="true" @change="statusChangeR(scope.row)">
                        是
                    </el-radio>
                </template>
            </el-table-column>
            
        </el-table>
        
    </div>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue'
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
import { MANUALPARMA } from '@/views/agv_ctrl/param/common/commondata.js'
import { MANUALRAPARM } from '@/views/agv_ctrl/param/common/commondata.js'


// jsondata.value.OperatingParam.manualparm = {
//     ...jsondata.value.OperatingParam.manualparm,
//     setSpeed: computed(() => {
//         console.log('2222')
//         return MANUALPARMA.value.map((row) => [
//             parseInt(row.adAutoSpe),
//             row.value === true?1:0,
//         ]);
//     })
// };

// jsondata.value.OperatingParam.manualparm = {
//     ...jsondata.value.OperatingParam.manualparm,
//     setRadius: computed(() => {
//         console.log('1111')
//         return MANUALRAPARM.value.map((row) => [
//             parseInt(row.manRadNum),
//             row.value === true?1:0,
//         ]);
//     })
// };


const statusChange = (row) => {
    MANUALPARMA.value.forEach((data) => {
    
    if (data !== row) {
      data.value = false
    }
  })

}

const statusChangeR = (row) => {
    MANUALRAPARM.value.forEach((data) => {
    if (data !== row) {
      data.value = false
    }
  })
}
watch(MANUALPARMA.value, () => {
    console.log('111')
  jsondata.value.OperatingParam.manualparm.setSpeed = MANUALPARMA.value.map((row) => [
            parseFloat(row.adAutoSpe),
            row.value === true?1:0,
        ]);;
});

watch(MANUALRAPARM.value, () => {
    console.log('222')
  jsondata.value.OperatingParam.manualparm.setRadius = MANUALRAPARM.value.map((row) => [
            parseFloat(row.manRadNum),
            row.value === true?1:0,
        ]);
});
</script>
  

  
<style lang="scss" scoped></style>