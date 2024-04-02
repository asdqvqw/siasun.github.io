<template>
    <div>
        <div>
            <el-checkbox v-model="delayisChecked" @change="delay">轮或舵因伺服响应慢需要设置延时时间</el-checkbox><br>
            使能前延时时间(ms):<el-input v-model="delayinput1" :disabled="!delayisChecked" type="number" style="width: 10%;" @change="delay"></el-input>
            给定前延时时间(ms):<el-input v-model="delayinput2" :disabled="!delayisChecked" type="number" style="width: 10%;" @change="delay"></el-input>
        </div>
        <br>
        <div>
            <!-- <el-radio v-for="(item, index) in radios" :key="index" v-model="selected" :label="item.value"
                @change="handleChange">
                <pre>{{ item.label }}</pre>
            </el-radio> -->

            <!-- <div v-if="selected1">
                <one />
            </div>

            <div v-if="selected2">
                <two />
            </div>

            <div v-if="selected3">
                <three />
            </div>

            <div v-if="selected4">
                <four />
            </div>

            <div v-if="selected5"> -->
                <five />
            <!-- </div> -->

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { jsondata, selected } from '../../common/commondata.js'
import { delayisChecked, delayinput1,delayinput2} from '../../common/commondata.js'
// import { tableDataCrtl } from '@/views/agv_ctrl/param/common/commondata.js'

import one from './selectone.vue';
import two from './selecttwo.vue';
import three from './selectthree.vue';
import four from './selectfour.vue';
import five from './selectfive.vue';


const radios = [
    { label: '普通双轮差动型', value: '1' },
    { label: '普通三轮车型', value: '2' },
    { label: '全方位三轮差动型', value: '3' },
    { label: '全方位三轮前后驱动型', value: '4' },
    { label: '其他类型', value: '5' }
];



const selected1 = ref(true);
const selected2 = ref(false);
const selected3 = ref(false);
const selected4 = ref(false);
const selected5 = ref(false);

const delay = () =>{
    
    if(!delayisChecked.value)
    {
        jsondata.value.Kinematic.delay.need_delay_time =false;
        jsondata.value.Kinematic.delay.servoenable_delay_time =200;
        jsondata.value.Kinematic.delay.servospeed_delay_time =200;
    }else{
        jsondata.value.Kinematic.delay.need_delay_time =true;
        jsondata.value.Kinematic.delay.servoenable_delay_time =parseInt(delayinput1.value);
        jsondata.value.Kinematic.delay.servospeed_delay_time =parseInt(delayinput2.value);
        // jsondata.value.Kinematic.delay =[parseInt(delayinput1.value),parseInt(delayinput2.value)];
    }
    
};

const handleChange = () => {
    switch (selected.value) {
        case '1':
            selected1.value = true;
            selected2.value = false;
            selected3.value = false;
            selected4.value = false;
            selected5.value = false;
            jsondata.value.Kinematic.type = 1;
            return;
        case '2':
            selected1.value = false;
            selected2.value = true;
            selected3.value = false;
            selected4.value = false;
            selected5.value = false;
            jsondata.value.Kinematic.type = 2;
            return;
        case '3':
            selected1.value = false;
            selected2.value = false;
            selected3.value = true;
            selected4.value = false;
            selected5.value = false;
            jsondata.value.Kinematic.type = 3;
            return;
        case '4':
            selected1.value = false;
            selected2.value = false;
            selected3.value = false;
            selected4.value = true;
            selected5.value = false;
            jsondata.value.Kinematic.type = 4;
            return;
        case '5':
            selected1.value = false;
            selected2.value = false;
            selected3.value = false;
            selected4.value = false;
            selected5.value = true;
            jsondata.value.Kinematic.type = 5;
            return;
    }

};

watch(selected, handleChange);


</script>



<style scoped>
.rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
}


.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}

.hengxian3 {
    border: none;
    border-top: 2px dashed #ccc;
    margin: 20px 0;
}

.hengxian2 {
    height: 2px;
    /* 线条高度 */
    background: linear-gradient(to right, #e8e7e7 50%, transparent 50%);
    /* 创建自定义线条 */
    background-size: 10px 5px;
    /* 控制线条的间距和宽度 */
    margin: 20px 0;
}

.kongge {
    margin-top: 20px;
}
</style>

