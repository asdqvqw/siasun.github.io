<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box" style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

            <h2 style="margin-top: 1%; margin-left: 1%;">日志</h2>
            <div class="hengxian"></div>

            <div class="box">

                <el-button type="success" style="margin-top: 2%;  width: 90%;"
                    @click="downloadFile">🕶️读取黑匣子</el-button>
                <a ref="downloadLink" style="display: none" :href="downloadUrl" download></a>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const responseData = ref(null) // 创建响应式变量
const downloadUrl = ref(null);

const downloadFile = () => {
    let userList = {
        group: 'siasun',
        account: 'test',
        password: '123456'
    }

    axios({
        method: 'get',
        url: '/api/get/blackbox',
        params: userList,
        responseType: 'blob' // 设置响应类型为 blob
    })
        .then((res) => {
            // ElMessage.success('请求成功')
            responseData.value = res.data // 将响应数据赋值给变量
            console.log('responseData', responseData.value)

            const blob = new Blob([responseData.value], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'httpBlackBox.tar.gz';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        })
        .catch((error) => {
            // console.log('error',error)
            //ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })
};
</script>


<style scoped>
.box {

    padding: 20px;
    text-align: center;
    
    width: 70%;
    margin-left: 12%;
    height: 10%;
    margin-top: 10%;
    border: 5px double #8d8a8a;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);

    background-image: linear-gradient(to bottom right, #3a3d3d95, #c6e0d017);
}

.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}
</style>