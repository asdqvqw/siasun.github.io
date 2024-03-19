<template>
  <div class="page-container main-view">

      <div class="table-box content-container page-content-box">
          <div class="top-container">
              <div class="left">
                  <el-button type="primary" @click="handleAdd">
                      新增
                  </el-button>
                  <el-button plain type="primary" @click="handleExport">
                      导出json
                  </el-button>
                  <el-button plain type="primary" @click="handlepeizhi" >
                      导出配置
                  </el-button>
                  &nbsp;&nbsp;<input ref="fileInputRef" type="file" style="display: none" @change="handleFileChange" accept=".json">
                  <el-button type="primary" @click="handleImport">导入配置</el-button>
                  <el-button @click="handleExpand" type="info" plain>
                      展开 / 折叠
                  </el-button>
                  <el-button @click="handleExpand11" type="info" plain>
                      查看
                  </el-button>
                  <el-dialog v-model="dialogVisible" title="数据" :visible="dialogVisible" @close="dialogVisible = false">
                      <p>{{ message }}</p>
                  </el-dialog>
              </div>

          </div>

          <div class="table-container">
              <el-table ref="ElTableRef" v-loading="dataContainer.loading" :data="dataContainer.list"
                  @cell-dblclick="handleCopyVale" border row-key="id" :tree-props="{
                      children: 'childs',
                  }" height="100%">
                  <el-table-column type="index" align="left" label="序号" width="60" fixed="left" />
                  <el-table-column label="名称" show-overflow-tooltip align="left" min-width="170" prop="name" />
                  <el-table-column label="字段" show-overflow-tooltip align="left" prop="key" width="150" />
                  <el-table-column label="值" show-overflow-tooltip align="left" prop="value" min-width="150" />
                  <el-table-column label="格式" show-overflow-tooltip align="left" prop="format" min-width="150" />
                  <el-table-column label="操作" width="200" fixed="right" class-name="small-padding fixed-width">
                      <template #default="scope">
                          <el-button :text="true" @click="handleDetails(scope.row, {
                              isShow: true,
                              afterTitle: ' - 查看',
                          })">
                              查看
                          </el-button>
                          <el-button :text="true" @click="handleEdit(scope.row, {
                              isShow: false,
                              afterTitle: ' - 编辑',
                          })">
                              编辑
                          </el-button>
                          <el-button :text="true" @click="handleAdd({
                                parentId: scope.row.id,
                            }, {
                                afterTitle: ' - 添加',
                            })" :disabled="scope.row.format === 'string' || scope.row.format === 'number'">
                                新增
                            </el-button>
                          <el-button :text="true" type="danger" @click="handleDelete(scope.row)">
                              删除
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </div>
      <EditDataDialog ref="EditDataDialogRef"></EditDataDialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import { copyValue, deepCopyObj } from '@/common/OtherTools';
import { debounceFn } from "@/common/DebounceAndThrottle";
import { responseData } from "./common/Data.js";
import { messageSuccess, confirm } from "@/action/MessagePrompt.js";
import EditDataDialog from "./components/EditDataDialog.vue";
import { toTree, unfoldTreeList } from "@/common/MenuTools";
import { guid } from "@/common/Guid";

const EditDataDialogRef = ref(null); //组件实例
const ElTableRef = ref(null); //组件实例
const router = useRouter();
const dataContainer = reactive({
  loading: false,
  showSearch: true,
  defaultExpandAll: false,
  form: {},
  params: {
      //基础参数
  },
  list: [],
});
let getDataListdata = ref(null);
/** 获取数据列表 */
const getDataList = debounceFn(function () {
  dataContainer.loading = true;
  Promise.resolve(responseData)
      .then(res => {
          let list = deepCopyObj(res.rows || []);
          /** 
           * 将树形结构展开
           * 需要换成一维数组来过滤不要展示的目录
           *  */
          list = unfoldTreeList(list, {
              childsKey: 'childs',
              setParentKey: 'parentId',
              getParentKey: 'id',
              forEachFn(item) {
                  /** 添加唯一标识以便区分 */
                  item.id = guid();
              },
          });
          /** 重新组装 */
          list = toTree(list.map(item => {
              delete item.childs;
              return item;
          }), {
              pKey: 'parentId',
              key: 'id',
              childsKey: 'childs',
              isNew: true,
          });
          dataContainer.list = list;
      })
      .catch(() => {
          return;
      })
      .finally(() => {
          dataContainer.loading = false;
      });
}, 300);
getDataList();


/** 导入数据列表 */
const getDataList2 = debounceFn(function () {
  dataContainer.loading = true;
  Promise.resolve(getDataListdata)
      .then(res => {
          let list = deepCopyObj(res.rows || []);
          /** 
           * 将树形结构展开
           * 需要换成一维数组来过滤不要展示的目录
           *  */
          list = unfoldTreeList(list, {
              childsKey: 'childs',
              setParentKey: 'parentId',
              getParentKey: 'id',
              forEachFn(item) {
                  /** 添加唯一标识以便区分 */
                  item.id = guid();
              },
          });
          /** 重新组装 */
          list = toTree(list.map(item => {
              delete item.childs;
              return item;
          }), {
              pKey: 'parentId',
              key: 'id',
              childsKey: 'childs',
              isNew: true,
          });
          dataContainer.list = list;
      })
      .catch(() => {
          return;
      })
      .finally(() => {
          dataContainer.loading = false;
      });
}, 300);



/** 设置树形结构层级 */
function setupLevels() {
  function setFunction(list, levels) {
      list.forEach(item => {
          item.treeLevels = levels;
          if (item.childs) {
              let levels_ = levels + 1;
              setFunction(item.childs, levels_);
          }
      });
  }
  setFunction(dataContainer.list, 1);
}

/** 双击单元格，复制单元格内容 */
const handleCopyVale = (_, __, ___, event) => {
  copyValue(event.target.innerText);
  messageSuccess("复制成功，内容为：" + event.target.innerText);
};



/** 导出数据 */
const handleExport = () => {
  const listWithoutIds = JSON.parse(JSON.stringify(dataContainer.list));

  // 定义递归函数，用于遍历树结构并删除 id 和 parentId 属性
  const removeIdsFromTree = (node) => {
      // 删除当前节点的 id 和 parentId 属性
      delete node.id;
      delete node.parentId;

      // 如果当前节点有子节点，则递归调用该函数处理子节点
      if (node.childs) {
          node.childs.forEach(child => {
              removeIdsFromTree(child);
          });
      }
  };

  // 遍历树的每个节点并删除 id 和 parentId 属性
  listWithoutIds.forEach(node => {
      removeIdsFromTree(node);
  });

  // 打印处理后的数据

  const transformedData = transformData(listWithoutIds);


  // 将转换后的数据导出为 JSON 文件
  const jsonContent = JSON.stringify(transformedData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);

  // 创建一个 <a> 标签用于下载
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transformedData.json';

  // 触发点击事件进行下载
  document.body.appendChild(link);
  link.click();

  // 释放 URL 对象
  window.URL.revokeObjectURL(url);


};

/** 新增按钮操作 */
const handleAdd = (params, test) => {
  
    if (!EditDataDialogRef.value) return;
    setupLevels();

    // 获取所选行的格式和子元素情况
    const selectedRow = dataContainer.list.find(item => item.id === params.parentId);
    let format = ''; // 初始化新增数据的格式
    if (selectedRow && selectedRow.format === 'array' && selectedRow.childs.length > 0) {
        
        format = selectedRow.childs[0].format;
        // 弹出新增对话框，并将预先确定的格式传递给对话框组件
        EditDataDialogRef.value.initData(true, {
            ...params,
            format: format, // 设置新增数据的格式
            isFormatDisabled: true,
        }, {
            ...test,
            menuList: dataContainer.list,
            
        }).then((data) => {
            data.id = guid();
            let list = deepCopyObj(dataContainer.list || []);
            list = unfoldTreeList(list, {
                childsKey: 'childs',
                setParentKey: 'parentId',
                getParentKey: 'id',
            });
            list.push(data);
            list.sort((a, b) => {
                return (Number(b.sort) || 0) - (Number(a.sort) || 0);
            })
            list = toTree(list.map(item => {
                delete item.childs;
                return item;
            }), {
                pKey: 'parentId',
                key: 'id',
                childsKey: 'childs',
                isNew: true,
            });
            dataContainer.list = list;
        }).catch(() => {

        });
    } 
    else {
        // 弹出新增对话框，并将预先确定的格式传递给对话框组件
        EditDataDialogRef.value.initData(true, {
            ...params,
        }, {
            ...test,
            menuList: dataContainer.list,
        }).then((data) => {
            data.id = guid();
            let list = deepCopyObj(dataContainer.list || []);
            list = unfoldTreeList(list, {
                childsKey: 'childs',
                setParentKey: 'parentId',
                getParentKey: 'id',
            });
            list.push(data);
            list.sort((a, b) => {
                return (Number(b.sort) || 0) - (Number(a.sort) || 0);
            })
            list = toTree(list.map(item => {
                delete item.childs;
                return item;
            }), {
                pKey: 'parentId',
                key: 'id',
                childsKey: 'childs',
                isNew: true,
            });
            dataContainer.list = list;
        }).catch(() => {

        });
    }



};

/** 详情按钮操作 */
const handleDetails = (row, querys) => {
  if (!EditDataDialogRef.value) return;
  EditDataDialogRef.value.initData(true, {
      ...row,
  }, {
      ...querys,
      menuList: dataContainer.list,
  }).then(() => {

  }).catch(() => {

  });
};

/** 编辑按钮操作 */
const handleEdit = (row, querys) => {
  if (!EditDataDialogRef.value) return;
  setupLevels();
  EditDataDialogRef.value.initData(true, {
      ...row,
  }, {
      ...querys,
      menuList: dataContainer.list,
  }).then((data) => {
      let list = deepCopyObj(dataContainer.list || []);
      /** 
       * 将树形结构展开
       * 需要换成一维数组来过滤不要展示的目录
       *  */
      list = unfoldTreeList(list, {
          childsKey: 'childs',
          setParentKey: 'parentId',
          getParentKey: 'id',
      });
      /** 过滤修改的 */
      list = list.filter(item => {
          return item.id != data.id;
      });
      list.push(data);
      /** 排序 */
      list.sort((a, b) => {
          return (Number(b.sort) || 0) - (Number(a.sort) || 0);
      })
      /** 重新组装 */
      list = toTree(list.map(item => {
          delete item.childs;
          return item;
      }), {
          pKey: 'parentId',
          key: 'id',
          childsKey: 'childs',
          isNew: true,
      });
      dataContainer.list = list;
  }).catch(() => {

  });
};

/** 删除 */
const handleDelete = (data) => {
  confirm('确认删除该数据？', '提示').then(() => {
      let list = deepCopyObj(dataContainer.list || []);
      /** 
       * 将树形结构展开
       * 需要换成一维数组来过滤不要展示的目录
       *  */
      list = unfoldTreeList(list, {
          childsKey: 'childs',
          setParentKey: 'parentId',
          getParentKey: 'id',
      });
      /** 过滤修改的 */
      list = list.filter(item => {
          return item.id != data.id;
      });
      /** 排序 */
      list.sort((a, b) => {
          return (Number(b.sort) || 0) - (Number(a.sort) || 0);
      })
      /** 重新组装 */
      list = toTree(list.map(item => {
          delete item.childs;
          return item;
      }), {
          pKey: 'parentId',
          key: 'id',
          childsKey: 'childs',
          isNew: true,
      });
      dataContainer.list = list;
      messageSuccess("删除成功");
  }).catch(() => { });
};


/** 展开/折叠行 */
const handleExpand = () => {
  if (!ElTableRef.value) return;
  dataContainer.defaultExpandAll = !dataContainer.defaultExpandAll;
  function setupState(list) {
      list.forEach(item => {
          ElTableRef.value.toggleRowExpansion(item);
          if (item.childs) {
              setupState(item.childs);
          }
      });
  }
  setupState(dataContainer.list);
};

const dialogVisible = ref(false);
const message = ref('');


const handleExpand11 = () => {
  // 复制数据并处理
  const listWithoutIds = JSON.parse(JSON.stringify(dataContainer.list));

  // 定义递归函数，用于遍历树结构并删除 id 和 parentId 属性
  const removeIdsFromTree = (node) => {
      // 删除当前节点的 id 和 parentId 属性
      delete node.id;
      delete node.parentId;

      // 如果当前节点有子节点，则递归调用该函数处理子节点
      if (node.childs) {
          node.childs.forEach(child => {
              removeIdsFromTree(child);
          });
      }
  };

  // 遍历树的每个节点并删除 id 和 parentId 属性
  listWithoutIds.forEach(node => {
      removeIdsFromTree(node);
  });

  // 打印处理后的数据



  const transformedData = transformData(listWithoutIds);
  message.value = transformedData;
  dialogVisible.value = true;
};


function transformData(data) {

  if (Array.isArray(data)) {
      const result = {};
      data.forEach(item => {

          if (item.format === 'string' || item.format === 'number') {
              result[item.key] = transformData(item.value);

          } else if (item.format === 'object') {
              result[item.key] = transformData(item.childs);

          } else if (item.format === 'array') {
              result[item.key] = transformarr(item.childs);

          }

      });
      return result;
  } else {
      return data;
  }
}
function transformarr(data) {

  const result = [];
  data.forEach(item => {
      if (item.format === 'object') {
          result.push(transformData(item.childs));
      } else if (item.format === 'string' || item.format === 'number') {
          result.push(transformData(item.value));
      } else if (item.format === 'array') {
          result.push(transformarr(item.childs));
      }
  });
  return result;

}


const handlepeizhi = () => {

  // 将 responseData 对象转换为一个合法的 JavaScript 代码字符串
   const responseDataString = JSON.stringify(responseData, null, 2);
      console.log(responseData)

  const blob = new Blob([responseDataString], { type: 'application/json' });


  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'Data.json'; // 设置下载文件的名称为 Data.js

  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
};

//导入配置
const fileInputRef = ref(null);

const handleImport = () => {
// 触发文件选择对话框
fileInputRef.value.click();
};

const handleFileChange = (event) => {
const file = event.target.files[0];
if (!file) return;

// 读取文件内容
const reader = new FileReader();
reader.onload = () => {    
   getDataListdata = JSON.parse(reader.result);
   getDataList2();
};
reader.readAsText(file);
};

</script>





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
