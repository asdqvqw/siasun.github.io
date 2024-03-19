<template>
    <div class="page-container main-view">
      <div class="table-box content-container page-content-box">
        <div class="left">
              <el-button @click="handleExpand11" type="info" plain>
                查看
              </el-button>
              <el-dialog
                v-model="dialogVisible"
                title="数据"
                :visible="dialogVisible"
                @close="dialogVisible = false"
              >
                <p>{{ jsondata }}</p>
              </el-dialog>
            </div>
        <div class="left">
  
          <el-button @click="toggleELECT" type="primary" plain>
            <span v-if="!toggleElect">电气模块</span>
            <span v-else>电气模块</span>
            <span :class="{ 'rotate-arrow': toggleElect }">></span>
          </el-button>
        </div>
  
        <hr v-if="toggleElect" class="divider" >
        <div v-if="toggleElect">
            
        </div>
  
      </div>
    </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dialogVisible = ref(false);
  
  const toggleElect = ref(false);
  
  const jsondata = ref({
  
  });
  
  const handleExpand11 = () => {
    dialogVisible.value = true;
  };
  
  
  const toggleELECT = () => {
    toggleElect.value = !toggleElect.value;
  };
  
  </script>
  
  <style scoped>
  .rotate-arrow {
    transition: transform 0.3s ease-in-out;
    transform: rotate(90deg);
  }
  .divider {
    border: none;
    border-top: 2px solid #ccc;
    margin: 20px 0;
  }
  </style>
  
  
  
  
  <style lang="scss" scoped>
  .main-view {
    display: flex;
    flex-direction: column;
  
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
  
  
  