<template>
    <div>
        <el-button @click="handlesevorTWO" type="primary">限位开关2</el-button>
        {{ newrow }}
        <el-dialog :title="title7" v-model="sevortwo" :visible="sevortwo" width="600px" :close-on-click-modal="false"
            class="edit-data-dialog">
            <div>
                <IO9 :wheel="newrow.test" @update:wheel="updateWheel"></IO9>

            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="sevortwo = false">取 消</el-button>
                <el-button @click="handlesevortwo">确定</el-button>

            </div>

        </el-dialog>&nbsp;
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IO9 from './IO.vue'
const sevortwo = ref(false);
const newrow = ({
    test:[]
})
const updateWheel = (newValue) => {
  newrow.test = newValue;
}
const handlesevorTWO = () => {
    sevortwo.value = true;
}
const handlesevortwo = () =>{
    sevortwo.value = false;
}
</script>