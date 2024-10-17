<template>
  <div>
    <el-table :data="jsondata.Task" style="width: 100%" class="jsondatatask">
      <el-table-column label="⚠️ 任务列表" width="200">

        <template #default="{ row }">

          <div :class="isCollapsed(row) ? 'zhedie' : 'zhankai'">
            <div
              :class="{ 'highlight-green': blinkingStates.green[row.id], 'highlight-red': blinkingStates.red[row.id] }"
              class="data-item">
              <el-button @click="toggleCollapse(row)" type="info">{{ isCollapsed(row) ? '折叠' : '展开' }}</el-button>
              <el-button type="danger" @click="removeTask(row)">删除</el-button>
              <el-input style="margin-top: 3%;" v-model.number="row.note" />
              <!-- && responseData.curTaskID === row.id -->
              <div v-if="isCollapsed(row) && responseData && responseData.curTaskID === row.id" class="error-details">
                <div class="error-item">
                  <strong>异常名称:</strong>
                  <span v-if="responseData.subTaskStatus.exception_name !== undefined">
                    {{ getExceptionName(responseData.subTaskStatus.exception_name) }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>异常结果:</strong>
                  <span v-if="responseData.subTaskStatus.exception_result !== undefined">
                    {{ responseData.subTaskStatus.exception_result === 0 ? '无异常' : '有异常' }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>需要执行的接口名称:</strong>
                  <span v-if="responseData.subTaskStatus.sentence.name !== undefined">
                    {{ responseData.subTaskStatus.sentence.name }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>类型:</strong>
                  <span v-if="responseData.subTaskStatus.sentence.data.type !== undefined">
                    {{ responseData.subTaskStatus.sentence.data.type === 0 ? '布尔值' :
                      responseData.subTaskStatus.sentence.data.type === 1 ? '整数' :
                        responseData.subTaskStatus.sentence.data.type === 2 ? '双精度' :
                          '未知类型' }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>值:</strong>
                  <span v-if="responseData.subTaskStatus.sentence.data.value !== undefined">
                    {{ responseData.subTaskStatus.sentence.data.value }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>输入的字符串参数:</strong>
                  <span v-if="responseData.subTaskStatus.sentence.param.value !== undefined">
                    {{ responseData.subTaskStatus.sentence.param.value }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>错误码:</strong>
                  <span v-if="responseData.curTaskError.errorCode !== undefined">
                    {{ responseData.curTaskError.errorCode === 0 ? '无故障' :
                      responseData.curTaskError.errorCode === 1 ? '超时故障' :
                        responseData.curTaskError.errorCode === 2 ? '异常故障' :
                          responseData.curTaskError.errorCode === 3 ? '内部故障' :
                            '未知错误' }}
                  </span>
                  <span v-else>null</span>
                </div>
                <div class="error-item">
                  <strong>错误信息:</strong>
                  <span v-if="responseData.curTaskError.errorMessage !== undefined">
                    {{ responseData.curTaskError.errorMessage }}
                  </span>
                  <span v-else>null</span>
                </div>
              </div>




            </div>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="任务 ID" width="100">
        <template #default="{ row }">

          <div :class="isCollapsed(row) ? 'zhedie' : 'zhankai'">
            <div
              :class="{ 'highlight-green': blinkingStates.green[row.id], 'highlight-red': blinkingStates.red[row.id] }"
              class="data-item">
              <el-input v-model.number="row.id" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="任务步骤">
        <template #header>
          <div style="width: 100%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
            <span>任务步骤</span>

            <el-button type="primary" @click="addTask">添加任务</el-button>
            <!-- <el-input v-model.number="inputid" placeholder="输入项目名" style="margin-bottom: 10px; width: 10%;"></el-input>
            <el-button @click="startBlinkinggreen" type="primary" >开始闪烁（黄）</el-button>
            <el-button @click="startBlinkingRed" type="danger" >开始闪烁（红）</el-button>
            <el-button @click="stopBlinkingRed" type="danger" >结束闪烁</el-button> -->
          </div>
        </template>
        <template #default="{ row }">
          <div :class="{ 'highlight-green': blinkingStates.green[row.id], 'highlight-red': blinkingStates.red[row.id] }"
            class="data-item">
            <div v-if="isCollapsed(row)">



              <div>
                <el-button type="primary" @click="addTaskList(row)">添加动作</el-button>
                <!-- <el-input v-model="inputact" placeholder="输入项目名" style="margin-bottom: 10px; width: 10%;"></el-input>
            <el-button @click="startBlinkinggreenact" type="primary" >开始闪烁（黄）</el-button>
            <el-button @click="startBlinkingRedact" type="danger" >开始闪烁（红）</el-button>
            <el-button @click="stopBlinkingRedact" type="danger" >结束闪烁</el-button> -->
              </div>
              <el-table :data="row.taskList" style="width: 100%">
                <el-table-column label="动作">
                  <template #default="{ row: taskItem }">
                    <div
                      :class="{ 'highlight-green': blinkingStatesact.green[taskItem.main], 'highlight-red': blinkingStatesact.red[taskItem.main] }"
                      class="data-item">
                      <span style="font-size: 16px;font-style:oblique; margin-right: 10px;">第{{
                        row.taskList.indexOf(taskItem) + 1 }}步</span>
                      <el-button type="danger" @click="removeTaskList(row, taskItem)">删除动作</el-button>
                      <el-select v-model="taskItem.main" placeholder="选择动作">
                        <el-option v-for="aaa in functions" :key="aaa" :label="aaa.name.replace(/^\/\/\s*/, '')"
                          :value="aaa.key"></el-option>
                      </el-select>
                    </div>
                  </template>


                </el-table-column>
                <el-table-column label="动作异常">
                  <template #default="{ row: taskItem }">
                    <div
                      :class="{ 'highlight-green': blinkingStatesact.green[taskItem.main], 'highlight-red': blinkingStatesact.red[taskItem.main] }"
                      class="data-item">
                      <ul>
                        <li v-for="(exception, exceptionIndex) in taskItem.exceptions"
                          :key="`exception-${exceptionIndex}`">
                          <div style="width: 95%;
                            display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
                            <el-select v-model="taskItem.exceptions[exceptionIndex]" placeholder="动作中检测异常">
                              <el-option v-for="aaa in functions" :key="aaa" :label="aaa.name.replace(/^\/\/\s*/, '')"
                                :value="aaa.key"></el-option>
                            </el-select>

                            &nbsp;
                            <el-button type="danger" @click="removeException(taskItem, exceptionIndex)">删除</el-button>
                          </div>
                        </li>
                        <br>
                        <el-button type="primary" @click="addException(taskItem)">添加异常</el-button>
                      </ul>
                    </div>
                  </template>



                </el-table-column>




                <el-table-column label="执行结果和跳转">
                  <template #default="{ row: taskItem }">
                    <div
                      :class="{ 'highlight-green': blinkingStatesact.green[taskItem.main], 'highlight-red': blinkingStatesact.red[taskItem.main] }"
                      class="data-item">
                      <div v-for="(jump, jumpIndex) in taskItem.jump" :key="`jump-${jumpIndex}`">
                        <div style="width: 95%;
                         display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
                          <el-select v-model="jump.condition" placeholder="执行结果">
                            <el-option v-for="option in conditionOptions" :label="option.label" :value="option.value" />
                          </el-select>
                          <el-select v-model="jump.index" placeholder="跳转索引">
                            <el-option v-for="step in row.taskList"
                              :label="'第 ' + (row.taskList.indexOf(step) + 1) + ' 步'"
                              :value="row.taskList.indexOf(step) + 1" />
                          </el-select>
                          <!-- <el-input v-model.number="jump.index" placeholder="跳转索引" /> -->
                          &nbsp;
                          <el-button type="danger" @click="removeJump(taskItem, jumpIndex)">删除</el-button>
                        </div>
                      </div>
                      <br>
                      <el-button type="primary" @click="addJump(taskItem)">添加跳转</el-button>
                    </div>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
        </template>
      </el-table-column>

    </el-table>

  </div>

</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { jsondata, code, functions } from '../common.js'
import { ElTable, ElTableColumn, ElInput, ElButton } from 'element-plus';

const conditionOptions = ref([
  { label: '重复执行', value: 0 },
  { label: '正常', value: 1 },
  { label: '异常', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  // 其他条件...
]);
watchEffect(() => {
  let name = ''
  functions.value = code.value.split('\n')
    .reduce((acc, line) => {
      if (line.trim().startsWith('function')) {
        // 提取函数名
        const functionName = line.split('(')[0].split(' ')[1]

        if (!name) {
          name = functionName
        }

        // 添加到结果数组
        acc.push({
          name,
          key: functionName
        })

        // 更新 name
        name = line
      } else {
        // 更新 name
        name = line
      }
      return acc
    }, [])
})
const getExceptionName = (exceptionKey) => {
  const exception = functions.value.find(func => func.key === exceptionKey);
  return exception ? exception.name : exceptionKey; // 如果找不到匹配，返回原始的异常名称
};

const newException = ref('');
import { timer_taskequ } from '@/timer.js'
function addTask() {
  jsondata.value.Task.push({
    note: '',
    id: 0,
    taskList: [],
  });
}

const stopAllBlinking = () => {
  jsondata.value.Task.forEach(task => {
    const itemId = task.id;
    clearInterval(blinkIntervals.green[itemId]); // 清除绿色定时器
    delete blinkIntervals.green[itemId]; // 删除绿色定时器记录
    blinkingStates.value.green[itemId] = false; // 取消绿色闪烁状态

    clearInterval(blinkIntervals.red[itemId]); // 清除红色定时器
    delete blinkIntervals.red[itemId]; // 删除红色定时器记录
    blinkingStates.value.red[itemId] = false; // 取消红色闪烁状态

    currentBlinkColor.value[itemId] = null; // 重置当前闪烁颜色
  });
};
const inputid = ref(0);
let blinkIntervals = {
  green: {},
  red: {},
}; // 存储每个项目的闪烁定时器
const blinkingStates = ref({
  green: {},
  red: {},
}); // 存储闪烁状态
const currentBlinkColor = ref({}); // 存储当前闪烁颜色
// 选择要闪烁的项目
const selectedItem = computed(() => {
  return jsondata.value.Task.find(aaa => aaa.id === responseData.value.curTaskID);
});
const startBlinkinggreen = () => {
  if (selectedItem.value) {

    const item = selectedItem.value;

    // 清除旧的闪烁状态
    for (const id in currentBlinkColor.value) {
      if (Number(id) !== item.id) {
        clearInterval(blinkIntervals.green[Number(id)]);
        delete blinkIntervals.green[Number(id)];
        blinkingStates.value.green[Number(id)] = false;
        clearInterval(blinkIntervals.red[Number(id)]);
        delete blinkIntervals.red[Number(id)];
        blinkingStates.value.red[Number(id)] = false;
        delete currentBlinkColor.value[Number(id)];
      }
    }
    // 检查是否已经在闪烁状态
    if (currentBlinkColor.value[item.id] === 'green') {
      return;
    }
    clearInterval(blinkIntervals.red[item.id]);
    delete blinkIntervals.red[item.id];
    blinkingStates.value.red[item.id] = false;
    blinkingStates.value.green[item.id] = true;
    currentBlinkColor.value[item.id] = 'green';
    // 如果没有定时器，则创建一个新的定时器
    if (!blinkIntervals.green[item.id]) {
      blinkIntervals.green[item.id] = setInterval(() => {
        blinkingStates.value.green[item.id] = !blinkingStates.value.green[item.id];
      }, 500); // 每500毫秒切换一次高亮
    }


  }
};


const startBlinkingRed = () => {
  if (selectedItem.value) {
    const item = selectedItem.value;

    // 清除旧的闪烁状态
    for (const id in currentBlinkColor.value) {
      if (Number(id) !== item.id) {
        clearInterval(blinkIntervals.green[Number(id)]);
        delete blinkIntervals.green[Number(id)];
        blinkingStates.value.green[Number(id)] = false;
        clearInterval(blinkIntervals.red[Number(id)]);
        delete blinkIntervals.red[Number(id)];
        blinkingStates.value.red[Number(id)] = false;
        delete currentBlinkColor.value[Number(id)];
      }
    }

    if (currentBlinkColor.value[item.id] === 'red') {
      return;
    }

    clearInterval(blinkIntervals.green[item.id]); // 清除对应项目的定时器
    delete blinkIntervals.green[item.id]; // 删除定时器记录
    blinkingStates.value.green[item.id] = false; // 取消闪烁状态
    blinkingStates.value.red[item.id] = true; // 设置为闪烁状态
    currentBlinkColor.value[item.id] = 'red';
    // 如果没有定时器，则创建一个新的定时器
    if (!blinkIntervals.red[item.id]) {
      blinkIntervals.red[item.id] = setInterval(() => {
        blinkingStates.value.red[item.id] = !blinkingStates.value.red[item.id];
      }, 500); // 每500毫秒切换一次高亮
    }
  }
};


const stopBlinkingRed = () => {
  if (selectedItem.value) {
    const item = selectedItem.value;

    clearInterval(blinkIntervals.green[item.id]); // 清除对应项目的定时器
    delete blinkIntervals.green[item.id]; // 删除定时器记录
    blinkingStates.value.green[item.id] = false; // 取消闪烁状态
    clearInterval(blinkIntervals.red[item.id]); // 清除对应项目的定时器
    delete blinkIntervals.red[item.id]; // 删除定时器记录
    blinkingStates.value.red[item.id] = false; // 取消闪烁状态
    currentBlinkColor.value[item.id] = null;
  }
};

//任务闪烁
const inputact = ref('');
let blinkIntervalsact = {
  green: {},
  red: {},
}; // 存储每个项目的闪烁定时器
const blinkingStatesact = ref({
  green: {},
  red: {},
}); // 存储闪烁状态
const currentBlinkColoract = ref({}); // 存储当前闪烁颜色
// 选择要闪烁的项目
const selectedItemact = computed(() => {
  return jsondata.value.Task.flatMap(task => task.taskList).find(taskItem => taskItem.main === responseData.value.subTaskStatus.main_name);
});
const startBlinkinggreenact = () => {
  if (selectedItemact.value) {

    const item = selectedItemact.value;

    // 清除旧的闪烁状态
    for (const id in currentBlinkColoract.value) {
      if (id !== item.main) {
        console.log('main',id)
        console.log('itemmain',item.main)
        clearInterval(blinkIntervalsact.green[id]);
        delete blinkIntervalsact.green[id];
        blinkingStatesact.value.green[id] = false;
        clearInterval(blinkIntervalsact.red[id]);
        delete blinkIntervalsact.red[id];
        blinkingStatesact.value.red[id] = false;
        delete currentBlinkColoract.value[id];
      }
    }
    // 检查是否已经在闪烁状态
    if (currentBlinkColoract.value[item.main] === 'green') {
      return;
    }
    clearInterval(blinkIntervalsact.red[item.main]);
    delete blinkIntervalsact.red[item.main];
    blinkingStatesact.value.red[item.main] = false;
    blinkingStatesact.value.green[item.main] = true;
    currentBlinkColoract.value[item.main] = 'green';
    // 如果没有定时器，则创建一个新的定时器
    if (!blinkIntervalsact.green[item.main]) {
      blinkIntervalsact.green[item.main] = setInterval(() => {
        blinkingStatesact.value.green[item.main] = !blinkingStatesact.value.green[item.main];
      }, 500); // 每500毫秒切换一次高亮
    }


  }
};


const startBlinkingRedact = () => {
  if (selectedItemact.value) {
    const item = selectedItemact.value;

    for (const id in currentBlinkColoract.value) {
      if (id !== item.main) {
        console.log('main',id)
        console.log('itemmain',item.main)
        clearInterval(blinkIntervalsact.green[id]);
        delete blinkIntervalsact.green[id];
        blinkingStatesact.value.green[id] = false;
        clearInterval(blinkIntervalsact.red[id]);
        delete blinkIntervalsact.red[id];
        blinkingStatesact.value.red[id] = false;
        delete currentBlinkColoract.value[id];
      }
    }

    if (currentBlinkColoract.value[item.main] === 'red') {
      return;
    }
    clearInterval(blinkIntervalsact.green[item.main]);
    delete blinkIntervalsact.green[item.main];
    blinkingStatesact.value.green[item.main] = false;
    blinkingStatesact.value.red[item.main] = true;
    currentBlinkColoract.value[item.main] = 'red';

    if (!blinkIntervalsact.red[item.main]) {
      blinkIntervalsact.red[item.main] = setInterval(() => {
        blinkingStatesact.value.red[item.main] = !blinkingStatesact.value.red[item.main];
      }, 500);
    }
  }
};


const stopBlinkingRedact = () => {
  if (selectedItemact.value) {
    const item = selectedItemact.value;

    clearInterval(blinkIntervalsact.green[item.main]); // 清除对应项目的定时器
    delete blinkIntervalsact.green[item.main]; // 删除定时器记录
    blinkingStatesact.value.green[item.main] = false; // 取消闪烁状态
    clearInterval(blinkIntervalsact.red[item.main]); // 清除对应项目的定时器
    delete blinkIntervalsact.red[item.main]; // 删除定时器记录
    blinkingStatesact.value.red[item.main] = false; // 取消闪烁状态
    currentBlinkColoract.value[item.main] = null;
  }
};


function removeTask(task) {
  const index = jsondata.value.Task.indexOf(task);
  if (index > -1) {
    jsondata.value.Task.splice(index, 1);
  }
}

function addTaskList(task) {
  task.taskList.push({
    main: '',
    exceptions: [''],
    jump: [
      {

      },
    ],
  });
}

function removeTaskList(row, taskItem) {
  const index = row.taskList.indexOf(taskItem);
  if (index > -1) {
    row.taskList.splice(index, 1);
  }
}

function addException(taskItem) {
  if (!taskItem.exceptions) {
    taskItem.exceptions = []; // 初始化 exceptions 数组
  }
  taskItem.exceptions.push(newException.value);
  newException.value = '';
}

function removeException(taskItem, index) {
  taskItem.exceptions.splice(index, 1);
}

function addJump(taskItem) {
  if (!taskItem.jump) {
    taskItem.jump = []; // 初始化 exceptions 数组
  }
  taskItem.jump.push({

  });
}

function removeJump(taskItem, index) {
  taskItem.jump.splice(index, 1);
}

const collapsedRows = ref(new Set());

function isCollapsed(row) {
  return collapsedRows.value.has(row);
}

function toggleCollapse(row) {
  if (collapsedRows.value.has(row)) {
    collapsedRows.value.delete(row);
  } else {
    collapsedRows.value.add(row);
  }
}

import axios from 'axios'
const responseData = ref(null)
const fetchVelocity1 = () => {
  let userList = {
    group: 'siasun',
    account: 'test',
    password: '123456'
  }
  axios({
    method: 'post',
    url: '/api/data/analysis',
    data: JSON.stringify(userList)
  })
    .then((res) => {
      responseData.value = res.data;

      // 根据 taskStatus 更新闪烁状态
      const taskId = responseData.value.curTaskID;
      const taskStatus = responseData.value.taskStatus;
      if (taskStatus === 0) {
        stopBlinkingRed(); // 停止闪烁
      } else if (taskStatus === 1) {
        startBlinkinggreen(); // 启动绿色闪烁
      } else if (taskStatus === 2 || taskStatus === 3) {
        startBlinkingRed(); // 启动红色闪烁
      }

      if (taskId === 0) {
        stopAllBlinking();
      }

      const taskStatusact = responseData.value.subTaskStatus.main_result;
      const taskStatusact2 = responseData.value.subTaskStatus.exception_result;
      if (taskStatusact2 === 1) {
        startBlinkingRedact();
      } else if (taskStatusact === 0) {
        startBlinkinggreenact(); // 启动绿色闪烁
      } else {
        stopBlinkingRedact(); // 停止闪烁
      }


    })
    .catch((error) => {

    })
    .finally(() => {

    })


  timer_taskequ.value = setTimeout(fetchVelocity1, 500);
}

onMounted(() => {
  fetchVelocity1()
})

</script>


<style>
.jsondatatask .el-table__body tr:nth-child(2n) {
  background-color: #ada7a757;
  /* 隔行背景色 */
}
</style>

<style scoped>
.zhedie {
  top: 10px;
  position: absolute;
}

.zhangkai {
  top: 10px;
  position: absolute;
}
</style>

<style scoped>
.data-item {
  padding: 15px;
  transition: background-color 0.3s;
}

.highlight-green {
  background-color: rgba(81, 227, 81, 0.741);
  /* 黄色高亮 */
}

.highlight-red {
  background-color: rgba(248, 63, 63, 0.644);
  /* 红色高亮 */
}

.error-details {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.error-item {
  margin-bottom: 10px;
}

.error-item strong {
  color: #333;
}
</style>