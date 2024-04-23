<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box">
      <br>
      <h2>✅上传文件到AGV:</h2>

      <br>
      <div @dragover.prevent @drop="handleFileDrop" @click="openFileInput"
        style="border: 4px dashed #ccc; padding: 20px; text-align: center; cursor: pointer;  width:70%; margin-left: 10%;">
        <input type="file" ref="fileInput" style="display: none;" @change="handleFileInputChange" multiple />
        <p><h4>将文件拖放到此处上传或点击选择文件</h4><br>
          ❗注意无法上传文件夹和文件名带中文的文件。<br>
      
        </p>
        <ul v-if="filesToUpload.length > 0">
          <li v-for="(file, index) in filesToUpload" :key="index">
            {{ file.name }}
          </li>
        </ul>
      </div>
      <br>
      <el-button type="primary" @click="uploadFiles" style="margin-top: 10px; width:80%; margin-left: 8%;">上传文件</el-button>
      <br>
      <br>
      <br>
      
      <div>
        <updataweb></updataweb>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import updataweb from './web.vue'
const fileInput = ref(null);
const filesToUpload = ref([]);

const handleFileDrop = (event) => {
  event.preventDefault();
  const items = event.dataTransfer.items;
  if (items) {
    for (const item of items) {
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry(); // 获取文件对象
        if (entry.isDirectory) {
          console.error('Error: 无法上传文件夹。');
          ElMessage.error('无法上传文件夹。')
        } else {
          const file = item.getAsFile();
          // 检查文件名是否包含中文字符
          if (/[\u4e00-\u9fa5]/.test(file.name)) {
            console.error('Error: 无法上传包含中文字符的文件。');
            ElMessage.error('无法上传包含中文字符的文件。')
            continue;
          }
          filesToUpload.value.push(file);
        }
      }
    }
  }
};

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileInputChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    for (const file of files) {
      if (/[\u4e00-\u9fa5]/.test(file.name)) {
        console.error('Error: 无法上传包含中文字符的文件。');
        ElMessage.error('无法上传包含中文字符的文件。')
        continue;
      }
      filesToUpload.value.push(file);
    }
  }
};

const uploadFiles = async () => {
  for (const file of filesToUpload.value) {
    await handleFileUpload(file);
  }
  // 清空上传队列
  filesToUpload.value = [];
};

const handleFileUpload = async (file) => {
  if (!file) return;

  try {
    const response = await axios({
      method: 'post',
      url: '/api/upload',
      data: file,
      headers: {
        'Content-Type': file.type,
        'X-File-Name': file.name, // 添加自定义请求头，携带文件名
      }
    });
    ElMessage.success('上传成功')
    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    ElMessage.error('Error uploading file:', error)
    console.error('Error uploading file:', error);
  }
};
</script>
