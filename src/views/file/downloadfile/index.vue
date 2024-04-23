<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box">


            <div style="display: flex; align-items: center;">
                <el-input v-model="filename" style="width: 70%; margin-right: 4%; margin-left: 2%;
                margin-top: 2%;" placeholder="文件名.."></el-input>
                <el-button @click="listfile" type="primary" style="width: 15%; margin-top: 2%;">搜索</el-button>
            </div>
            <br>
            <el-table :data="filelist">
                <el-table-column prop="name" label="文件名">

                </el-table-column>
                <el-table-column prop="created" label="创建时间"></el-table-column>
                <el-table-column prop="modified" label="修改时间"></el-table-column>

                <el-table-column prop="size" label="文件大小"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="success" @click="handleContextMenuClick($event, row)">下载</el-button>
                        <!-- <el-button type="success" @click="handleContextMenuClick($event, row)">下载</el-button> -->
                    </template>
                    
                </el-table-column>

                
            </el-table>


            <!-- <el-input v-model="input"></el-input>
            <el-button @click="downloadFile">点击下载文件</el-button> -->
            <a ref="downloadLink" style="display: none" :href="downloadUrl" download></a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ArrayCamera } from 'three';
const responseData = ref(null) // 创建响应式变量
const downloadUrl = ref(null);
const input = ref('');
const filelist = ref(null)
const filename = ref('');
const selectedFile = ref(null);


const listfile = () => {
    let userList = {
        data: filename.value
    }

    axios({
        method: 'post',
        url: '/api/get/files',
        data: JSON.stringify(userList)
    })
        .then((res) => {
            //ElMessage.success('请求成功')
            filelist.value = res.data // 将响应数据赋值给变量
            // console.log('responseData',responseData.value)
        })
        .catch((error) => {
            // console.log('error',error)
            //ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })

}
const downloadFile = () => {
    let userList = {
        file: input.value
    }

    axios({
        method: 'get',
        url: '/api/download',
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
            a.download = input.value;
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


const handleContextMenuClick = (event, row) => {
    event.preventDefault();
    selectedFile.value = row;

    if (selectedFile.value) {
        input.value = selectedFile.value.name;
        console.log('1111', input.value)
        downloadFile();
    }

};



</script>

<style lang="scss" scoped>
.main-view {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 600px;

    >.page-query-box {
        margin: 0 0 10px 0 !important;
        padding: 10px 10px 0px 10px;

        :deep(.el-form-item) {
            margin-bottom: 10px !important;
        }

        :deep(.el-form-item--default) {
            width: 100%;
            margin-right: 0;
        }
    }

    >.content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px 10px;
        box-sizing: border-box;
        background: #fff;

        overflow: auto !important;

        >.top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 0 10px 0;
        }

        >.table-container {
            flex: 1 1 auto;
            height: 0;
            overflow: auto;
        }
    }

    .pagination-container {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 10px 0 0 0;
    }
}
</style>