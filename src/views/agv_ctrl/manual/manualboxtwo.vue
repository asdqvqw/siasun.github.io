<template>
    <div>
        <div style="margin-left: 24%;">
            <h4>五米测试</h4><br>
            <el-button @click="fivestart" style="margin-left: -5%;" type="primary" :icon="Place">开始</el-button>
            <el-button @click="fiveend" style="margin-left: 5%;" type="primary" :icon="Setting">停止</el-button>
        </div>


        <div style="margin-left: 60%; margin-top: -6%;">
            <h4>手动任务</h4><br>
            <el-select-v2 v-model="taskValue" placeholder="Activity count" :options="taskOptions" />
            <el-button @click="settask" style="margin-left: 2%;" type="primary" :icon="Setting">设置</el-button>
        </div>
    </div>
    <br><br>

    <div style="margin-left: 24%;">
        <h4>设备动作</h4><br>
        <el-select v-model="actValue" placeholder="请选择" style="margin-left: -9%;">
            <el-option label="举升" :value=0></el-option>
            <el-option label="转盘" :value=1></el-option>
            <el-option label="2" :value=2></el-option>
            <el-option label="3" :value=3></el-option>
            <el-option label="4" :value=4></el-option>
            <el-option label="5" :value=5></el-option>
            <el-option label="6" :value=6></el-option>
        </el-select><br><br>
        <el-button @mousedown="frontdown" @mouseup="frontup" style="margin-left: -10%;" type="primary"
            :icon="Setting">正向</el-button>
        <el-button @mousedown="backdown" @mouseup="backup" style="margin-left: -5%;" type="primary"
            :icon="Setting">反向</el-button>
        <el-button @mousedown="redown" @mouseup="reup" style="margin-left: 0%;" type="primary"
            :icon="Check">复位</el-button>




        <div style="margin-left: 47%; margin-top: -14%;">
            <h4>手控类型</h4><br>

            <el-select v-model="typeValue" placeholder="手控工具切换">
                <el-option label="手控盒" :value=1></el-option>
                <el-option label="手柄" :value=2></el-option>
            </el-select>
            <el-button @click="settype" style="margin-left: 2%;" type="primary" :icon="Setting">设置</el-button>
        </div>




    </div>
    <br><br>


    <br><br>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import {
    Place,
    Setting,
    Check,
} from '@element-plus/icons-vue'

//type
const typeValue = ref();

const settype = () => {
    var userList = {
        type: 'manualtype',
        data: typeValue.value
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('设置成功')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })


}





const actValue = ref(0);
//五米
const fivestart = () => {
    var userList = {
        type: 'fivetest',
        data: true
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('五米开始')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })


}

const fiveend = () => {
    var userList = {
        type: 'fivetest',
        data: false
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('五米结束')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })
}


// 任务
const taskValue = ref(1)
const taskOptions = Array.from({ length: 50 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))


const settask = () => {
    var userList = {
        type: 'excutetask',
        data: Number(taskValue.value)
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('设置任务')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })
}

//设备
const timer = ref(null);
const frontdown = () => {

    var userList = {
        type: 'equipment',
        data: {
            axID: Number(actValue.value),
            direction: 1
        }
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('开始')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })


    timer.value = setTimeout(frontdown, 500);
}

const frontup = () => {

    clearTimeout(timer.value)
    var userList = {
        type: 'equipment',
        data: {
            axID: Number(actValue.value),
            direction: 0
        }
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        // ElMessage.success('设置任务')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })

    ElMessage.success('停止')
}

const timer2 = ref(null);
const backdown = () => {
    var userList = {
        type: 'equipment',
        data: {
            axID: Number(actValue.value),
            direction: 2
        }
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('开始')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })

    timer2.value = setTimeout(backdown, 500);
}

const backup = () => {

    clearTimeout(timer2.value)

    var userList = {
        type: 'equipment',
        data: {
            axID: Number(actValue.value),
            direction: 0
        }
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        // ElMessage.success('设置任务')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })


    ElMessage.success('停止')
}


//复位
// const timer3 = ref(null);
const redown = () => {
    var userList = {
        type: 'equipment',
        data: {
            axID: Number(actValue.value),
            direction: 3
        }
    }
    console.log(JSON.stringify(userList));
    axios({
        method: 'post',
        url: '/api/ctrl/manualdata',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('开始')
    }).catch(error => {
        // ElMessage.error('请求失败')
    }).finally(() => {
    })

    // timer3.value = setTimeout(redown, 500);
}

// const reup = () => {

//     clearTimeout(timer3.value)

//     var userList = {
//         type: 'equipment',
//         data: {
//             axID: Number(actValue.value),
//             direction: 0
//         }
//     }
//     console.log(JSON.stringify(userList));
//     axios({
//         method: 'post',
//         url: '/api/ctrl/manualdata',//这里是请求地址
//         data: JSON.stringify(userList),
//     }).then((res) => {
//         // ElMessage.success('设置任务')
//     }).catch(error => {
//         // ElMessage.error('请求失败')
//     }).finally(() => {
//     })


//     ElMessage.success('停止')
// }
</script>