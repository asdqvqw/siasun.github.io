<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box"
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

            <h2 style="margin-top: 1%; margin-left: 1%;">管理</h2>
            <div class="hengxian"></div>

            <div style="display: flex; align-items: center;">
                <el-input v-model="filename" style="width: 70%; margin-right: 4%; margin-left: 2%;
                margin-top: 0%;" placeholder="🤪文件名.." :disabled="!passwordflag"></el-input>
                <el-button @click="listfile" type="primary" style="width: 15%; margin-top: 0%;" :disabled="!passwordflag"
                    :icon="Search">搜索</el-button>
                <el-button @click="passwordcheck" :disabled="passwordflag" type="primary"
                    style="width: 15%; margin-top: 0%;" :icon="Delete">删除权限</el-button>
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
                        <div class="button-container">
                            <!-- <el-button type="success" @click="commit($event, row)" :icon="Download">下载</el-button> -->
                            <div v-if="passwordflag">
                                <el-button type="danger" @click="commitde($event, row)" :icon="Delete">删除</el-button>
                            </div>
                        </div>
                    </template>

                </el-table-column>


            </el-table>


            <a ref="downloadLink" style="display: none" :href="downloadUrl" download></a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {
    Search,
    Download,
    Delete
} from '@element-plus/icons-vue'

import { ArrayCamera } from 'three';
const responseData = ref(null) // 创建响应式变量
const downloadUrl = ref(null);
const input = ref('');
const filelist = ref(null)
const filename = ref('');
const selectedFile = ref(null);
const passwordflag = ref(false);
const passwordcheck = () => {
    let password = '';  // 声明密码变量

    ElMessageBox.prompt('请输入密码', '提示', {
        inputType: 'password',
        inputPattern: /^.{6,}$/,
        inputErrorMessage: '密码格式错误'
    }).then(({ value }) => {
        password = value;

        if (password === 'siasun') {
            passwordflag.value = true;
        } else {
            ElMessage.error('密码错误');
        }
    }).catch(() => {
        return;
    });
}

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

import { ElMessage, ElMessageBox } from 'element-plus';
const commit = (event, row) => {
    ElMessageBox.confirm('下载文件？' + row.name
        , '提示').then(() => {
            handleContextMenuClick(event, row);
        }).catch(() => {
            return;
        });

}
const commitde = (event, row) => {
    ElMessageBox.confirm('删除文件？' + row.name
        , '提示').then(() => {
            handleContextMenuClickde(event, row);
        }).catch(() => {
            return;
        });

}
const handleContextMenuClick = (event, row) => {
    event.preventDefault();
    selectedFile.value = row;

    if (selectedFile.value) {
        input.value = selectedFile.value.name;
        console.log('1111', input.value)
        downloadFile();
    }

};
const selectedFilede = ref(null);
const inputde = ref('');
const handleContextMenuClickde = (event, row) => {
    event.preventDefault();
    selectedFilede.value = row;

    if (selectedFilede.value) {
        inputde.value = selectedFilede.value.name;

        DeleteFile();
    }

};
const DeleteFile = () => {
    let userList = {
        dele: inputde.value
    }

    axios({
        method: 'get',
        url: '/api/download',
        params: userList,
    })
        .then((res) => {
            ElMessage.success('删除成功')
        })
        .catch((error) => {
            // console.log('error',error)
            //ElMessage.error('请求失败')
        })
        .finally(() => {
            // 可以在此处执行其他操作
        })

    listfile();
};

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
</style>

<style scoped>
.button-container {
    display: flex;
    /* 将容器设置为Flex容器 */
    align-items: center;
    /* 垂直居中对齐子元素 */
}

.button-container>* {
    margin-right: 10px;
    /* 子元素之间的水平间距 */
}
</style>