<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box">
            <DefinScrollbar height="100%" :showUpBt="true">
            <div ref="preview">
                <!-- 这里是显示文档内容的容器 -->
            </div>
        </DefinScrollbar>
        </div>
    </div>
</template>

<script>
import { renderAsync } from "docx-preview";
import JSZip from "jszip"; // 导入 JSZip
import DefinScrollbar from "@/components/DefinScrollbar.vue";
window.JSZip = JSZip;
export default {
    mounted() {
        this.preview(); // 在组件挂载时调用 preview 方法显示预览
    },
    methods: {
        async preview() {
            const docxFilePath = "./main/pingtainei.docx";
            // 使用 fetch 获取文件的二进制数据
            const response = await fetch(docxFilePath);
            const docData = await response.blob();
            // 渲染 docx 文件到页面预览
            await renderAsync(docData, this.$refs.preview);
        }
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


.edit-data-dialog {
    .dialog-container {
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
    }
}
</style>
