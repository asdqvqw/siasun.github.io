<template>
  <div>
    <!-- <el-select v-model="selectedFunction" placeholder="Select a function">
      <el-option v-for="aaa in functions" :key="aaa" :label="aaa.name" :value="aaa.key"></el-option>
    </el-select> -->
    <!-- <el-autocomplete v-model="selectedFunction"  :fetch-suggestions="fetchSuggestions"
      placeholder="🦊链接车体后选择文件.." >

    </el-autocomplete> -->

    <el-table :data="jsondata.Task" style="width: 100%" class="jsondatatask">
      <el-table-column label="⚠️ 任务列表" width="120">
        <template #default="{ row }">
          <el-input v-model.number="row.note" />
        </template>
      </el-table-column>
      <el-table-column label="任务 ID" width="100">
        <template #default="{ row }">
          <el-input v-model.number="row.id" />
        </template>
      </el-table-column>
      <el-table-column label="任务步骤">
        <template #default="{ row }">
          <div>
            <el-button type="primary" @click="addTaskList(row)">添加函数</el-button>
            <el-button type="danger" @click="removeTaskList(row)">删除函数</el-button>
          </div>
          <el-table :data="row.taskList" style="width: 100%">
            <el-table-column label="函数">
              <template #default="{ row: taskItem }">
                <el-select v-model="taskItem.main" placeholder="选择函数">
                  <el-option v-for="aaa in functions" :key="aaa" :label="aaa.name" :value="aaa.key"></el-option>
                </el-select>
                <!-- <el-autocomplete v-model="taskItem.main" :fetch-suggestions="fetchSuggestions"
                :suggestions="formattedFunctions" value-key="value"
                  placeholder="🦊链接车体后选择文件.." >

                </el-autocomplete> -->
              </template>
              <!-- <el-input v-model="taskItem.main" /> -->

            </el-table-column>
            <el-table-column label="异常">
              <template #default="{ row: taskItem }">
                <ul>
                  <li v-for="(exception, exceptionIndex) in taskItem.exceptions" :key="`exception-${exceptionIndex}`">
                    <div style="width: 95%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
                      <el-select v-model="taskItem.exceptions[exceptionIndex]" placeholder="选择异常">
                        <el-option v-for="aaa in functions" :key="aaa" :label="aaa.name" :value="aaa.key"></el-option>
                      </el-select>

                      <!-- <el-input v-model="taskItem.exceptions[exceptionIndex]" /> -->
                      &nbsp;
                      <el-button type="danger" @click="removeException(taskItem, exceptionIndex)">删除</el-button>
                    </div>
                  </li>
                  <br>
                  <el-button type="primary" @click="addException(taskItem)">添加异常</el-button>
                </ul>
              </template>



            </el-table-column>




            <el-table-column label="返回和跳转">
              <template #default="{ row: taskItem }">
                <div v-for="(jump, jumpIndex) in taskItem.jump" :key="`jump-${jumpIndex}`">
                  <div style="width: 95%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
                    <el-input v-model.number="jump.condition" placeholder="条件" />
                    <el-input v-model.number="jump.index" placeholder="跳转索引" />
                    &nbsp;
                    <el-button type="danger" @click="removeJump(taskItem, jumpIndex)">删除</el-button>
                  </div>
                </div>
                <br>
                <el-button type="primary" @click="addJump(taskItem)">添加跳转</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>


      <el-table-column width="180">
        <template #header>
          <div style="width: 95%;
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
            <el-button style="width: 40%;" type="primary" @click="addTask">添加任务</el-button>
            <el-button style="width: 40%; " type="danger" @click="removeTask">删除任务</el-button>
          </div>
        </template>
      </el-table-column>


    </el-table>

  </div>

</template>

<script setup>
import { ref, watchEffect,computed } from 'vue';
import { jsondata, code } from '../common.js'

const functions = ref([]);

// // 解析 functionString 并提取函数名
// functions.value = code.value.split('\n')
//   .filter(line => line.trim().startsWith('function'))
//   .map(line => line.split('(')[0].split(' ')[1]);

const selectedFunction = ref(null);
// watchEffect(() => {
//   // 解析 code.value 并提取函数名
//   functions.value = code.value.split('\n')
//     .filter(line => line.trim().startsWith('function'))
//     .map(line => line.split('(')[0].split(' ')[1]);
// });
watchEffect(() => {
  let name = ''
  functions.value = code.value.split('\n')
    .reduce((acc, line) => {
      if (line.trim().startsWith('function')) {
        // 提取函数名
        const functionName = line.split('(')[0].split(' ')[1]

        // 如果 name 为空,则设置为 functionName
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


const newException = ref('');

function addTask() {
  jsondata.value.Task.push({
    note: '',
    id: 0,
    taskList: [],
  });
}

function removeTask() {
  jsondata.value.Task.pop();
}

const fetchSuggestions = (query, callback) => {
  const matchedFiles = functions.value.filter(file => file.name.includes(query));
  for (let i of matchedFiles) {
    i.value = i.name;  //将想要展示的数据作为value
  }
  callback(matchedFiles);
}
// 计算属性,用于将 functions 数组转换成适合 el-autocomplete 的数据格式
const formattedFunctions = computed(() => {
  return functions.value.map(file => ({
    value: file.key,
    label: file.name
  }))
})
function addTaskList(task) {
  task.taskList.push({
    main: '',
    exceptions: [''],
    jump: [
      {
        condition: 0,
        index: 0,
      },
    ],
  });
}

function removeTaskList(task) {
  task.taskList.pop();
}

function addException(taskItem) {
  taskItem.exceptions.push(newException.value);
  newException.value = '';
}

function removeException(taskItem, index) {
  taskItem.exceptions.splice(index, 1);
}

function addJump(taskItem) {
  taskItem.jump.push({
    condition: 0,
    index: 0,
  });
}

function removeJump(taskItem, index) {
  taskItem.jump.splice(index, 1);
}
</script>


<style>
.jsondatatask .el-table__body tr:nth-child(2n) {
  background-color: #ada7a757;
  /* 隔行背景色 */
}
</style>