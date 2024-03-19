<template>
    <el-dialog :title="configData.title + configData.afterTitle" v-model="configData.open" width="800px"
        :close-on-click-modal="false" append-to-body destroy-on-close @close="handleClose" class="edit-data-dialog">
        <div class="dialog-container">
            <el-form :model="dataContainer.form" ref="FormElRef" :inline="true" :rules="dataContainer.rules"
                label-width="150px">
                <el-row :gutter="0">
                    <el-col :span="24">
                        <el-form-item label="提示">
                            <p style="opacity: 0.8;">
                                上级菜单不允许选比自己层级小的层级，其中路由名称表示页面的名称（只能选系统有的），路由地址表示跳转地址，没有的话会根据路由名称自动匹配，可以定义外部链接
                            </p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">

                    </el-col>
                    <el-col :span="12" :xs="6">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="dataContainer.form.name" placeholder="请输入" :disabled="configData.isShow"
                                clearable />
                        </el-form-item>
                    </el-col>

                    <el-col :span="12" :xs="6">
                        <el-form-item label="字段" prop="key">
                            <el-input placeholder="请选择" style="width:100%;" :disabled="configData.isShow||isFormatDisabledarr"
                                v-model="dataContainer.form.key" clearable>

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="6">
                        <el-form-item label="值" prop="value">
                            <el-input v-model="dataContainer.form.value" placeholder="请输入" :disabled="configData.isShow || isValueDisabled
                            ||isFormatDisabledarr"
                                clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="6">
                        <el-form-item label="格式" prop="format">
                            <el-select v-model="dataContainer.form.format" placeholder="请选择格式" :disabled="configData.isShow || dataContainer.form.isFormatDisabled"
                                clearable>
                                <el-option label="串" value="string"></el-option>
                                <el-option label="数字" value="number"></el-option>
                                <el-option label="对象" value="object"></el-option>
                                <el-option label="数组" value="array"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="() => {
                    dataContainer.closeType = 'cancel';
                    configData.open = false;
                }">
                    取消
                </el-button>
                <el-button v-if="!configData.isShow" type="primary" :loading="dataContainer.loading" @click="handleSubmit">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>



<script setup>
import { ref, reactive, nextTick, watch } from 'vue';
import { initDataByConfig } from "@/common/OtherTools";
import { verifiedData } from "@/common/VerifiedTools";
import { messageError } from "@/action/MessagePrompt.js";
const isValueDisabled = ref(false);
const isFormatDisabledarr = ref(false);
//配置信息，初始化时使用
const configMap = {
    open: {
        default: false,
    },
    title: {
        default: '按钮权限数据',
    },
    afterTitle: {
        default: '',
    },
    isShow: {
        //是否只是展示
        default: false,
    },
};

const configData = reactive({});
const FormElRef = ref(null);  //组件实例
const dataContainer = reactive({
    loading: false,
    closeType: 'close',  //关闭时的类型，是由确认取消按钮关闭的还是其他地方关闭的 confirm cancel
    resolve: undefined,  //返给外部promise的回调
    reject: undefined,
    form: {},
    rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        key: [{ required: true, message: '请输入字段', trigger: 'blur' }],
        value: [],
        format: [{ required: true, message: '请输入格式', trigger: 'blur' }],
    },
    menuList: [],
});
const otherDataContainer = {
    castParams: {},  //向外部传递的参数
};
initDataByConfig(configData, {}, configMap);
/**
 * 对话框关闭时的回调
 * 根据行为类型来判断调用那个回调函数
 *  */
function handleClose() {
    if (dataContainer.closeType == 'confirm') {
        dataContainer.resolve(otherDataContainer.castParams);
    } else {
        dataContainer.reject(dataContainer.closeType, otherDataContainer.castParams);
    }
}
/**
 * 初始化数据（外部调用）
 * 返回一个promise，以提供直接的回调
 *  */
function initData(show = true, data = {}, option = {}) {
    initDataByConfig(configData, option, configMap);
    dataContainer.closeType = "close";
    dataContainer.loading = false;
    dataContainer.form = {};
    otherDataContainer.castParams = {};
    configData.open = show;
    nextTick(() => {
        dataContainer.form = data;
        // getDataInfo();

    });
    return new Promise((r, j) => {
        dataContainer.resolve = r;
        dataContainer.reject = j;
    });
}
/** 获取数据详细 */
function getDataInfo() {
    dataContainer.form = {};
}
/** 提交数据 */
function handleSubmit() {
    /** 使用组件自带方法验证数据 */
    if (!FormElRef.value) return;
    FormElRef.value.validate((valid, e) => {
        if (e) {
            /** 打印报错信息 */
            let msg = e[Object.keys(e)[0]][0].message;
            messageError(msg);
        }
        if (!valid) return;
        dataContainer.loading = true;
        setTimeout(() => {
            /** 没有后台，所以直接将数据向外部抛出 */
            otherDataContainer.castParams = dataContainer.form;
            dataContainer.closeType = 'confirm';
            configData.open = false;
            dataContainer.loading = false;
        }, 100);
    });
}
/** 
 * 数据验证
 * 外部可调用
 *  */
function validData(data) {
    const failData = verifiedData(data, {
        name: {
            msg: '名称 不能为空',
            validate(value, option) {
                if (!value && value !== 0) return false;
                return true;
            },
        },
    });
    return failData;
}
watch(() => dataContainer.form.isFormatDisabled, (newValue) => {
    // 根据选择的格式来确定值输入框是否禁用
    isFormatDisabledarr.value = newValue ;
    if (newValue) {
        // 如果选择的格式为数组或对象，则将 value 字段的验证规则设置为非必填
        dataContainer.rules.value = [];
        dataContainer.rules.name = [];
        dataContainer.rules.key = [];
    } else {
        // 否则，设置为必填
        dataContainer.rules.value = [{ required: true, message: '请输入值', trigger: 'blur' }];
        dataContainer.rules.key = [{ required: true, message: '请输入字段', trigger: 'blur' }];
        dataContainer.rules.name = [{ required: true, message: '请输入名称', trigger: 'blur' }];
    }
});


watch(() => dataContainer.form.format, (newValue) => {
    // 根据选择的格式来确定值输入框是否禁用
    isValueDisabled.value = newValue === 'array' || newValue === 'object';
    if (newValue === 'array' || newValue === 'object') {
        // 如果选择的格式为数组或对象，则将 value 字段的验证规则设置为非必填
        dataContainer.rules.value = [];
    } else {
        // 否则，设置为必填
        dataContainer.rules.value = [{ required: true, message: '请输入值', trigger: 'blur' }];
    }
});
defineExpose({
    configData,
    initData,
    dataContainer,
    handleClose,
    getDataInfo,
    handleSubmit,
    FormElRef,
    validData,
});
</script>





<style lang="scss" scoped>
.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>
