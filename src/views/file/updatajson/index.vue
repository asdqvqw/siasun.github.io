<template>

    <div class="page-container main-view">
        <div class="table-box content-container page-content-box"
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

            <h2 style="margin-top: 1%; margin-left: 1%;">JSON</h2>
            <div class="hengxian"></div>
            <div style="display: flex; align-items: center;">

                <el-autocomplete v-model="filename" @change="listfile" @click="listfile"
                    :fetch-suggestions="fetchSuggestions" placeholder="🦊链接车体后选择文件.."
                    style="width: 70%; margin-right: 4%; margin-left: 4%; margin-top: 0%;">

                </el-autocomplete>
                <el-button @click="syncAgvParm" type="primary" style="width: 15%; margin-top: 0%;"
                    :icon="Loading">加载</el-button>
            </div>
            <br>
            <DefinScrollbar height="100%" :showUpBt="true">

                <el-input type="textarea" v-model="inputJsonData" class="custom-textarea"></el-input>

            </DefinScrollbar>

            <br>

            <el-button @click="commit" type="primary" style="margin-top: 0%;" :icon="Upload">提交</el-button>

        </div>

    </div>


</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import {
    Loading,
    Upload
} from '@element-plus/icons-vue'
import DefinScrollbar from "@/components/DefinScrollbar.vue";
const jsondata = ref() // 创建响应式变量

const filelist = ref([])
const filename = ref('');
const filename2 = ref('');
const inputfilename = ref('.json');

const fetchSuggestions = (query, callback) => {
    const matchedFiles = filelist.value.filter(file => file.name.includes(query));
    for (let i of matchedFiles) {
        i.value = i.name;  //将想要展示的数据作为value
    }
    callback(matchedFiles);
}

import { ElMessage, ElMessageBox } from 'element-plus';
const commit = () => {
    ElMessageBox.confirm('是否提交修改'
        , '提示').then(() => {
            updateJsonData();
        }).catch(() => {
            return;
        });

}




const listfile = () => {
    let userList = {
        data: inputfilename.value
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
    jsondata.value = '';
    inputJsonData.value = JSON.stringify(jsondata.value, null, 2);
}


const syncAgvParm = () => {
    let userList = {
        data: filename.value,
        group: 'siasun',
        account: 'test',
        password: '123456'
    }

    axios({
        method: 'post',
        url: '/api/data/jsoneditor',
        data: JSON.stringify(userList)
    })
        .then((res) => {
            ElMessage.success('请求成功')
            jsondata.value = res.data
            // console.log('responseData',responseData.value)
            inputJsonData.value = JSON.stringify(jsondata.value, null, 2);
            filename2.value = filename.value;
        })
        .catch((error) => {
            ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })
}


const inputJsonData = ref(JSON.stringify(jsondata.value, null, 2))

const updateJsonData = () => {
    try {
        jsondata.value = JSON.parse(inputJsonData.value)

    } catch (error) {
        ElMessage.error('json格式错误')
        ElMessage.info(error.message)
        // 处理 JSON 解析错误
    }


    let userList = {
        data: {
            file: filename2.value,
            value: jsondata.value
        },
        group: 'siasun',
        account: 'test',
        password: '123456'
    }
    console.log(userList)

    axios({
        method: 'post',
        url: '/api/ctrl/jsoneditor',//这里是请求地址
        data: JSON.stringify(userList),
    }).then((res) => {
        ElMessage.success('提交成功')

    }).catch(error => {
        ElMessage.error('提交失败')
    }).finally(() => {

    })

}

</script>

<style lang="scss" scoped>
.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}

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

.custom-textarea {
    height: 10000px;
    /* 将高度设置为 50% */
    margin-top: 0% !important;
    width: 90%;
    margin-left: 4%;
    padding: 5px;
    /* 添加内边距 */
    border: 1px solid #9d9a9a;
    /* 添加边框 */
    border-radius: 4px;
    /* 添加边框圆角 */
    box-sizing: border-box;
    /* 设置盒模型为边框盒模型 */
    font-size: 14px;
    /* 设置字体大小 */
    line-height: 1.5;
    /* 设置行高 */
    resize: none !important;
    /* 允许垂直调整大小 */
}

:deep(.el-textarea__inner) {

    resize: none;
    /* 禁止用户手动调整文本框的尺寸 */
    height: 100%;
}
</style>