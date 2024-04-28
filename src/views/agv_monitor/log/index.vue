<template>
    <div class="page-container main-view">
        <div class="table-box content-container page-content-box">
            <el-button @click="aaaaa">aaaaaa</el-button>
            <el-button @click="bbbb">bbbb</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const flag = ref(0)
const aaaaa = () => {

    switch (flag.value) {
        case 0:
            console.log('11111')
            return;
        case 2:
            console.log('333')
            return;
        case 3:
            console.log('4444')
            return;
    }




    console.log('222222')
}

const bbbb =() =>{
    flag.value = 'aaa';
}

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