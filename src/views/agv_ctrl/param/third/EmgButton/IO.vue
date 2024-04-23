<template>
    <div>

        <el-radio v-for="(item, index) in radios" :key="index" v-model="selected" :label="item.value"
            @change="handleChange">
            <pre>{{ item.label }}</pre>
        </el-radio>


        <div v-if="selected1">
            远程模块连接到:
            <el-radio v-for="(item, index) in conradios" :key="index" v-model="selectedcan" :label="item.value"
                @change="handleChange">
                <pre>{{ item.label }}</pre>
            </el-radio>
            <br>

            CAN-POS模块编号:
            <el-select v-model="selectedcan1" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            模块内输出点编号:
            <el-select v-model="selectedcan2" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            信号极性:
            <el-select v-model="selectedcan3" @change="generateJSON">
                <el-option label="输出高电平有效" value="0"></el-option>
                <el-option label="输出低电平有效" value="1"></el-option>
            </el-select>
            <br>
            按钮类型:
            <el-select v-model="selectedcan4" @change="generateJSON">
                <el-option label="非自锁式" value="0"></el-option>
                <el-option label="自锁式" value="1"></el-option>
            </el-select>
        </div>

        <div v-if="selected2">
            远程模块连接到:
            <el-radio v-for="(item, index) in conradios" :key="index" v-model="selectedcan" :label="item.value"
                @change="handleChange">
                <pre>{{ item.label }}</pre>
            </el-radio>
            <br>

            CAN-OPEN模块编号:
            <el-select v-model="selectedcan1" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            模块内输出点编号:
            <el-select v-model="selectedcan2" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            信号极性:
            <el-select v-model="selectedcan3" @change="generateJSON">
                <el-option label="输出高电平有效" value="0"></el-option>
                <el-option label="输出低电平有效" value="1"></el-option>
            </el-select>
            <br>
            按钮类型:
            <el-select v-model="selectedcan4" @change="generateJSON">
                <el-option label="非自锁式" value="0"></el-option>
                <el-option label="自锁式" value="1"></el-option>
            </el-select>
        </div>

        <div v-if="selected3">

            本地IO地址:
            <el-input v-model="selectedcan" type="number" @change="generateJSON">
            </el-input>
            <br>
            输出点对应位:
            <el-select v-model="selectedcan1" @change="generateJSON">
                <el-option label="BIT1" value="0"></el-option>
                <el-option label="BIT2" value="1"></el-option>
                <el-option label="BIT3" value="2"></el-option>
                <el-option label="BIT4" value="3"></el-option>
                <el-option label="BIT5" value="4"></el-option>
                <el-option label="BIT6" value="5"></el-option>
                <el-option label="BIT7" value="6"></el-option>
            </el-select>
            <br>
            信号极性:
            <el-select v-model="selectedcan2" @change="generateJSON">
                <el-option label="输出高电平有效" value="0"></el-option>
                <el-option label="输出低电平有效" value="1"></el-option>
            </el-select>
            <br>
            按钮类型:
            <el-select v-model="selectedcan4" @change="generateJSON">
                <el-option label="非自锁式" value="0"></el-option>
                <el-option label="自锁式" value="1"></el-option>
            </el-select>
        </div>

        <div v-if="selected4">
            远程模块连接到:
            <el-radio v-for="(item, index) in conradios" :key="index" v-model="selectedcan" :label="item.value"
                @change="handleChange">
                <pre>{{ item.label }}</pre>
            </el-radio>
            <br>

            CAN-IO模块编号:
            <el-select v-model="selectedcan1" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            模块内输出点编号:
            <el-select v-model="selectedcan2" @change="generateJSON">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
            </el-select>
            <br>
            信号极性:
            <el-select v-model="selectedcan3" @change="generateJSON">
                <el-option label="输出高电平有效" value="0"></el-option>
                <el-option label="输出低电平有效" value="1"></el-option>
            </el-select>
            <br>
            按钮类型:
            <el-select v-model="selectedcan4" @change="generateJSON">
                <el-option label="非自锁式" value="0"></el-option>
                <el-option label="自锁式" value="1"></el-option>
            </el-select>
        </div>

        <div v-if="selected5">
            输入点对应位:
            <el-input v-model="selectedcan"  @change="generateJSON">
            </el-input>
            <br>
            信号极性:
            <el-select v-model="selectedcan1" @change="generateJSON">
                <el-option label="输出高电平有效" value="0"></el-option>
                <el-option label="输出低电平有效" value="1"></el-option>
            </el-select>
            <br>
            按钮类型:
            <el-select v-model="selectedcan4" @change="generateJSON">
                <el-option label="非自锁式" value="0"></el-option>
                <el-option label="自锁式" value="1"></el-option>
            </el-select>
        </div>



    </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
import { flagEmg, newRowEmg } from '../flag.js'
const selected = ref('1');
const selected1 = ref(true);
const selected2 = ref(false);
const selected3 = ref(false);
const selected4 = ref(false);
const selected5 = ref(false);

const selectedcan = ref('1');
const selectedcan1 = ref('1');
const selectedcan2 = ref('1');
const selectedcan3 = ref('1');
const selectedcan4 = ref('1');

const decimalOutput = ref('');
const hexOutput = ref('');
// const props = defineProps({
//     wheel: {
//         type: Array,
//         required: true
//     }
// });



const generateJSON = () => {
    if (selected.value === "1" || selected.value === "2" || selected.value === "4") {
        newRowEmg.value.value = [parseInt(selected.value), parseInt(selectedcan.value), parseInt(selectedcan1.value), parseInt(selectedcan2.value), parseInt(selectedcan3.value), parseInt(selectedcan4.value)]
    } else if (selected.value === "3") {
        newRowEmg.value.value = [parseInt(selected.value), parseInt(selectedcan.value), parseInt(selectedcan1.value), parseInt(selectedcan2.value), parseInt(selectedcan4.value)]
    } else if (selected.value === "5") {
        const decimal = parseInt(selectedcan.value, 16);
        decimalOutput.value = isNaN(decimal) ? '' : decimal.toString();
        newRowEmg.value.value = [parseInt(selected.value), parseInt(decimalOutput.value), parseInt(selectedcan1.value), parseInt(selectedcan4.value)]
    }
    console.log('generateJSON', newRowEmg.value.value)
};

const radios = [
    { label: 'CAN-POS', value: '1' },
    { label: 'CAN-OPEN', value: '2' },
    { label: '本地IO', value: '3' },
    { label: 'CAN-IO', value: '4' },
    { label: 'GPIO', value: '5' }
];

const conradios = [
    { label: 'CAN1', value: '1' },
    { label: 'CAN2', value: '2' },
    { label: 'CAN3', value: '3' },
];
const putJSON = () => {

    if (newRowEmg.value.value.value !== undefined) {
        if (newRowEmg.value.value.value[0] === 1 || newRowEmg.value.value.value[0] === 2 || newRowEmg.value.value.value[0] === 4) {
            selected.value = newRowEmg.value.value.value[0].toString();

            selectedcan.value = newRowEmg.value.value.value[1].toString();
            selectedcan1.value = newRowEmg.value.value.value[2].toString();
            selectedcan2.value = newRowEmg.value.value.value[3].toString();
            selectedcan3.value = newRowEmg.value.value.value[4].toString();
            selectedcan4.value = newRowEmg.value.value.value[5].toString();
            handleChange();
        } else if (newRowEmg.value.value.value[0] === 3) {

            selected.value = newRowEmg.value.value.value[0].toString();

            selectedcan.value = newRowEmg.value.value.value[1].toString();
            selectedcan1.value = newRowEmg.value.value.value[2].toString();
            selectedcan2.value = newRowEmg.value.value.value[3].toString();
            selectedcan4.value = newRowEmg.value.value.value[4].toString();
            handleChange();
        } else if (newRowEmg.value.value.value[0] === 5) {
            selected.value = newRowEmg.value.value.value[0].toString();
            const decimal = parseInt(newRowEmg.value.value.value[1], 10);
            hexOutput.value = isNaN(decimal) ? '' : decimal.toString(16);
            selectedcan.value = hexOutput.value.toString();
           // selectedcan.value = newRowEmg.value.value.value[1].toString();
            selectedcan1.value = newRowEmg.value.value.value[2].toString();
            selectedcan4.value = newRowEmg.value.value.value[3].toString();
            handleChange();
        }

    }
    else {

        if (newRowEmg.value.value !== undefined) {
            if (newRowEmg.value.value[0] === 1 || newRowEmg.value.value[0] === 2 || newRowEmg.value.value[0] === 4) {
                selected.value = newRowEmg.value.value[0].toString();

                selectedcan.value = newRowEmg.value.value[1].toString();
                selectedcan1.value = newRowEmg.value.value[2].toString();
                selectedcan2.value = newRowEmg.value.value[3].toString();
                selectedcan3.value = newRowEmg.value.value[4].toString();
                selectedcan4.value = newRowEmg.value.value[5].toString();
                handleChange();
            } else if (newRowEmg.value.value[0] === 3) {

                selected.value = newRowEmg.value.value[0].toString();

                selectedcan.value = newRowEmg.value.value[1].toString();
                selectedcan1.value = newRowEmg.value.value[2].toString();
                selectedcan2.value = newRowEmg.value.value[3].toString();
                selectedcan4.value = newRowEmg.value.value[4].toString();
                handleChange();
            } else if (newRowEmg.value.value[0] === 5) {
                selected.value = newRowEmg.value.value[0].toString();
                const decimal = parseInt(newRowEmg.value.value[1], 10);
                hexOutput.value = isNaN(decimal) ? '' : decimal.toString(16);
                selectedcan.value = hexOutput.value.toString();
                //selectedcan.value = newRowEmg.value.value[1].toString();
                selectedcan1.value = newRowEmg.value.value[2].toString();
                selectedcan4.value = newRowEmg.value.value[3].toString();
                handleChange();
            }

        } else {

            selected.value = '1';

            selectedcan.value = '1';
            selectedcan1.value = '1';
            selectedcan2.value = '1';
            selectedcan3.value = '1';
            selectedcan4.value = '1';
            handleChange();
            console.log('putJSONelse')

        }








    }


};



const handleChange = () => {
    console.log('handleChange', selected.value)
    switch (selected.value) {
        case '1':
            selected1.value = true;
            selected2.value = false;
            selected3.value = false;
            selected4.value = false;
            selected5.value = false;
            generateJSON();
            return;
        case '2':
            selected1.value = false;
            selected2.value = true;
            selected3.value = false;
            selected4.value = false;
            selected5.value = false;
            generateJSON();
            return;
        case '3':
            selected1.value = false;
            selected2.value = false;
            selected3.value = true;
            selected4.value = false;
            selected5.value = false;
            generateJSON();
            return;
        case '4':
            selected1.value = false;
            selected2.value = false;
            selected3.value = false;
            selected4.value = true;
            selected5.value = false;
            generateJSON();
            return;
        case '5':
            selected1.value = false;
            selected2.value = false;
            selected3.value = false;
            selected4.value = false;
            selected5.value = true;
            generateJSON();
            return;
    }

};
putJSON();

let lastRunTime = 0;

watch(flagEmg, () => {
    const currentTime = Date.now();
    if (currentTime - lastRunTime >= 700) {
        putJSON();
        lastRunTime = currentTime;
    }
});
</script>