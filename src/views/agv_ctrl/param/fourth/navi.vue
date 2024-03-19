<template>
    <div>
        <div class="page-container main-view">

            <div class="table-box content-container page-content-box">

                <div class="left">
                    <el-button type="info" @click="handleExpand11" plain>
                        查看
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
                        <p>{{ jsondata }}</p>
                    </el-dialog>
                </div>
                <hr class="hengxian">

                <div class="left">
                    <h2>导航模块：</h2>
                    配置导航模块：
                    <hr class="hengxian2">
                    <h3></h3>


                    <hr class="hengxian3">

                    <h3></h3>

                    
                </div>




                <hr class="hengxian2">
                
                
                <el-button type="primary" @click="nexatstep">下一步</el-button>
                <hr class="kongge">
                <el-button type="primary" @click="afterstep">上一步</el-button>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
const dialogVisible = ref(false);
const handleExpand11 = () => {
    dialogVisible.value = true;
};


const afterstep = () => {
    router.push('/main/third');
};
const nexatstep = () => {
    router.push('/main/fifth');
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

<style scoped>
.rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
}


.hengxian {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
}

.hengxian3 {
    border: none;
    border-top: 2px dashed #ccc;
    margin: 20px 0;
}

.hengxian2 {
    height: 2px;
    /* 线条高度 */
    background: linear-gradient(to right, #e8e7e7 50%, transparent 50%);
    /* 创建自定义线条 */
    background-size: 10px 5px;
    /* 控制线条的间距和宽度 */
    margin: 20px 0;
}

.kongge {
    margin-top: 2px;
}
</style>