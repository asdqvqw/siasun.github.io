<template>
    <el-table :data="Object.entries(jsondata.device)" style="width: 100%">
        <el-table-column label="⚠️ 设备" width="200">
            <template #default="scope">
                <el-button @click="toggleCollapse(scope.row[0])" type="info">
                    {{ isCollapsed(scope.row[0]) ? '展开' : '折叠' }}
                </el-button>
                <el-button @click="removeField(scope.row[0])" type="danger" style="margin-left: 10px;">删除</el-button>
            </template>
        </el-table-column>

        <el-table-column label="设备名" width="200">
            <template #default="scope">
                <span>{{ scope.row[0] }}</span>
            </template>
        </el-table-column>

        <el-table-column label="对象" width="500">
            <template #default="scope">
                <el-table v-if="!isCollapsed(scope.row[0])" :data="scope.row[1]" style="width: 100%">
                    <el-table-column prop="key" label="名称" width="200">
                        <template #default="subScope">
                            <el-input v-model="subScope.row.key" placeholder="输入名称"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" label="值" width="200">
                        <template #default="subScope">
                            <el-input v-model="subScope.row.value" placeholder="输入值"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="" width="100">
                        <template #header>
                            <el-button v-if="!isCollapsed(scope.row[0])" @click="addObject(scope.row[1])" type="text"
                                style="margin-top: 10px;">添加数据</el-button>
                        </template>
                        <template #default="subScope">
                            <el-button @click="removeObject(scope.row[1], subScope.row)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>

        <el-table-column width="200">
            <template #header>
                <el-button @click="openInputDialog" type="primary" style="margin-top: 20px;">添加设备</el-button>
            </template>
        </el-table-column>
    </el-table>
<!-- 
    <el-button @click="saveChanges" type="success" style="margin-top: 20px;">保存更改</el-button> -->
</template>

<script setup>
import { ref } from 'vue';
import { ElButton, ElTable, ElTableColumn, ElInput, ElMessageBox, ElMessage } from 'element-plus';
import { jsondata, devicedata } from '../common.js'
//   // 初始化 jsondata
//   const jsondata = ref({
//     device: {

//     }
//   });

// 存储折叠状态
const collapsedFields = ref(new Set());

// 打开输入对话框
const openInputDialog = () => {
    ElMessageBox.prompt('请输入设备名', '添加设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[^\u4e00-\u9fa5]+$/,  // 不允许包含中文
        inputErrorMessage: '不能包含中文'
    }).then(({ value }) => {
        if (!jsondata.value.device) {
            jsondata.value.device = {};
        }
        // 将新设备添加为对象项，初始对象为空数组
        jsondata.value.device[value] = [];
    }).catch(() => {
        ElMessage({
            message: '已取消添加设备',
            type: 'info',
        });
    });
};

// 切换折叠状态
const toggleCollapse = (fieldName) => {
    if (collapsedFields.value.has(fieldName)) {
        collapsedFields.value.delete(fieldName);
    } else {
        collapsedFields.value.add(fieldName);
    }
};

// 是否折叠
const isCollapsed = (fieldName) => {
    return collapsedFields.value.has(fieldName);
};

// 删除设备
const removeField = (fieldName) => {
    delete jsondata.value.device[fieldName]; // 从对象中删除设备
};

// 添加对象
const addObject = (objects) => {
    objects.push({ key: '', value: '' });
};

// 删除对象
const removeObject = (objects, object) => {
    const index = objects.indexOf(object);
    if (index !== -1) {
        objects.splice(index, 1);
    }
};

// 保存更改
const saveChanges = () => {
    console.log('保存的 JSON 数据:', JSON.stringify(jsondata.value, null, 2));
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>