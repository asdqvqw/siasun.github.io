<template>

    <div>
        <h2 >✅更新网页:</h2>
        <br>
      ❗注意压缩包中携带web_root文件夹:
        <input style="margin-left: 30px;" type="file" ref="fileInput" accept=".tar.gz" @change="handleFileUpload" />
        
        <el-button type="primary" @click="commit" style="margin-top: 30px; width:80%; margin-left: 8%;">更新</el-button>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const fileInput = ref(null);

const handleFileUpload = () => {

};

const commit = () => {
  ElMessageBox.confirm('是否更新网页？', '提示').then(() => {
    uploadFile();
  }).catch(() => {
    return;
  });

}


const uploadFile = async () => {
    const file = fileInput.value.files[0];
    if (!file ) {
        return;
    }



    axios({
        method: 'post',
        url: '/api/upload',
        data: file,
        headers: {
            'Content-Type': file.type,
            'X-File-Name': file.name, // 添加自定义请求头，携带文件名
        }
    })
        .then((res) => {
            ElMessage.success('更新成功')
            ElMessage.success('刷新网页后生效')
            console.log('File uploaded successfully:', res.data);
        })
        .catch((error) => {
            ElMessage.error('Error uploading file:', error)
            console.error('Error uploading file:', error);
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })


};
</script>