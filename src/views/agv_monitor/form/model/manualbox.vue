<template>
  <div>
    <div style="width: 100%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">
      <el-form style=" width: 100%;">
        <div style="margin-left: 13%;">
          <el-form-item>
            <h4>控 制</h4>
          </el-form-item>

          <el-form-item style="margin-bottom: 3%; margin-top: 3%; margin-left: 3%; height: 23%;">
            <el-button-group style="width: 100%; ">
              <el-button :disabled="!value || keypressed" @mousedown='down(row_1.id)' type="info"
                @touchstart="startLongPress(row_1.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↖
                </el-icon>
              </el-button>
              <el-button :disabled="!value || keypressed" @mousedown='down(row_2.id)' type="info"
                @touchstart="startLongPress(row_2.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↑
                </el-icon>
              </el-button>
              <el-button :disabled="!value || keypressed" @mousedown='down(row_3.id)' type="info"
                @touchstart="startLongPress(row_3.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↗
                </el-icon>
              </el-button>
            </el-button-group>
          </el-form-item>


          <el-form-item style="margin-bottom: 3%; height: 5%; margin-left: 3%; height: 23%;">
            <el-button-group style="width: 100%">
              <el-button :disabled="!value || keypressed" @mousedown='down(row_4.id)' type="info"
                @touchstart="startLongPress(row_4.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ←
                </el-icon>
              </el-button>

              <el-button :disabled="!value || keypressed" @click="changeClick" type="info"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-checkbox-button :disabled="!value || keypressed" @change="changeMove" v-model="moveMode"
                  size="large">{{ Option
                  }}</el-checkbox-button>
              </el-button>

              <el-button :disabled="!value || keypressed" @mousedown='down(row_6.id)' type="info"
                @touchstart="startLongPress(row_6.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  →
                </el-icon>
              </el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item style="margin-bottom: 3%; height: 5%; margin-left: 3%; height: 23%;">
            <el-button-group style="width: 100%">
              <el-button :disabled="!value || keypressed" @mousedown='down(row_7.id)' type="info"
                @touchstart="startLongPress(row_7.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↙
                </el-icon>
              </el-button>
              <el-button :disabled="!value || keypressed" @mousedown='down(row_8.id)' type="info"
                @touchstart="startLongPress(row_8.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↓
                </el-icon>
              </el-button>
              <el-button :disabled="!value || keypressed" @mousedown='down(row_9.id)' type="info"
                @touchstart="startLongPress(row_9.id)" @touchend="endLongPress"
                style="width: 17%; height: 100%; margin-left: 2px">
                <el-icon size="30">
                  ↘
                </el-icon>
              </el-button>
            </el-button-group>
          </el-form-item>

          <el-switch @change="start" v-model="value" active-text="Open" inactive-text="Close" />

        </div>


      </el-form>

      <div style=" width: 25%; margin-left: -10%;">
        <el-form-item>
          <h4>速 度</h4>
        </el-form-item>
        <el-form-item><el-button @click="level_1" type="success" style="  margin-bottom: -2%;">1
            级</el-button></el-form-item>
        <el-form-item><el-button @click="level_2" type="success" style="   margin-bottom: -2%;">2
            级</el-button></el-form-item>
        <el-form-item><el-button @click="level_3" type="success" style="   margin-bottom: -2%;">3
            级</el-button></el-form-item>
        <el-form-item><el-button @click="level_4" type="success" style="   margin-bottom: -2%;">4
            级</el-button></el-form-item>
        <el-form-item><el-button @click="level_5" type="success" style="   margin-bottom: -2%;">5
            级</el-button></el-form-item>
      </div>
    </div>

    <div style="width: 100%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">

      <div style="width: 50%;">
        <el-form style="margin-left: 13%;">
          <h4>三 档 开 关</h4>
        </el-form><br>
        <el-form style="margin-left: 10%;">
          <el-radio-group v-model="switchPosition" style="margin: 0 auto">
            <el-radio-button @change="roboSwitch" size="large" label="left">手动</el-radio-button>

            <el-radio-button @change="roboSwitch" size="large" label="mid">空闲</el-radio-button>

            <el-radio-button @change="roboSwitch" size="large" label="right">自动</el-radio-button>
          </el-radio-group>
        </el-form>
      </div>

      <div style="width: 50%;">
        <el-form>
          <h4>PLS 切区</h4>
        </el-form><br>

        <div style="width: 100%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">


          <el-select-v2 style="width:50%" v-model="plsValue" placeholder="Activity count" :options="plsOptions" />
          <el-button @click="setPlS" style="margin-right: 5%; width:40%" type="primary" :icon="Setting">设置</el-button>

        </div>

      </div>

    </div>




    <div style="width: 100%; margin-top: 2%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">

      <div style="width: 50%;">
        <el-form style="margin-left: 13%; ">
          <h4>上 线</h4>
        </el-form><br>
        <el-form style="margin-left: 6%; margin-top: 1%;">
          <el-button @click="onLine" size="large" style="margin-left: 20%;" type="primary" :icon="Place">上线</el-button>
        </el-form>
      </div>
      <div style="width: 50%;">
        <el-form >
          <h4>上 线 点</h4>
        </el-form><br>
       
        <div style="width: 100%;
                  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5%;">

            
              <el-select-v2 style="width:50%" v-model="pointValue" placeholder="Activity count" :options="pointOptions" />
              <el-button @click="setPoint" style="margin-right: 5%; width:40%" type="primary" :icon="Setting">设置</el-button>
           

          </div>

     
      </div>
    </div>
    <br>
    <div style="width: 100%; height: 1px; background-color: black"></div>
    <br>
    <manualboxtwo></manualboxtwo>

  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { ArrowDown } from '@element-plus/icons-vue'
import manualboxtwo from './manualboxtwo.vue'
import {
  Place,
  Setting,
} from '@element-plus/icons-vue'
import { starter2 } from '@/timer.js'
const currentButtonId = ref(null)


const handleMouseUp = (event) => {
  if (currentButtonId.value === row_1.id
    || currentButtonId.value === row_2.id
    || currentButtonId.value === row_3.id
    || currentButtonId.value === row_4.id
    || currentButtonId.value === row_6.id
    || currentButtonId.value === row_7.id
    || currentButtonId.value === row_8.id
    || currentButtonId.value === row_9.id
  ) {
    currentButtonId.value = 99;
    up()
  }
}
const keypressed = ref(false)
onMounted(() => {
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
})

const handleKeyDown = (event) => {
  // console.log('key', event.key)
  if (event.key === 'o' || event.key === 'O') {
    value.value = !value.value;
    start(value.value);
  }
  if (value.value && !keypressed.value) {

    if (event.key === 'W' || event.key === 'w') {
      keypressed.value = true;
      down(row_2.id)
    }
    if (event.key === 'A' || event.key === 'a') {
      keypressed.value = true;
      down(row_4.id)
    }
    if (event.key === 'S' || event.key === 's') {
      keypressed.value = true;
      down(row_8.id)
    }
    if (event.key === 'D' || event.key === 'd') {
      keypressed.value = true;
      down(row_6.id)
    }
  }

}

const handleKeyUp = (event) => {
  console.log('key', event.key)
  if ((event.key === 'W' || event.key === 'w'
    || event.key === 'A' || event.key === 'a'
    || event.key === 'S' || event.key === 's'
    || event.key === 'D' || event.key === 'd')
    && keypressed.value) {
    if (currentButtonId.value === row_1.id
      || currentButtonId.value === row_2.id
      || currentButtonId.value === row_3.id
      || currentButtonId.value === row_4.id
      || currentButtonId.value === row_6.id
      || currentButtonId.value === row_7.id
      || currentButtonId.value === row_8.id
      || currentButtonId.value === row_9.id
    ) {
      currentButtonId.value = 99;
      up()
      keypressed.value = false;
    }

  }
}
const moveMode = ref(false)
const Option = ref("DEF")
const value = ref(false)
const plsValue = ref('')
const pointValue = ref('')
const plsOptions = Array.from({ length: 16 }).map((_, idx) => ({
  value: `${idx}`,
  label: `${idx}`,
}))
const pointOptions = Array.from({ length: 200 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const isPress = ref(false)
const switchPosition = ref('left')
const requestNum = ref(0);
const requestEnd = ref(0);
// 定时器
const timer = ref()
// const starter2 = ref()
// 选中的
const current_row = reactive({
  id: '',
  text: '',
  params: {}
})
const current_id = ref()
let current_speed = 1

//params是post的参数到时候自己设置
const row_1 = reactive({
  id: 1,
  text: '↖',
  params: {
    a: 4
  },
})
const row_2 = reactive({
  id: 2,
  text: '↑',
  params: {
    a: 0
  }
})
const row_3 = reactive({
  id: 3,
  text: '↗',
  params: {
    a: 5
  },
})
const row_4 = reactive({
  id: 4,
  text: '←',
  params: {
    a: 2
  },
})
const row_5 = reactive({
  id: 5,
  text: '×',
  params: {
    a: 10
  },
})
const row_6 = reactive({
  id: 6,
  text: '→',
  params: {
    a: 3
  },
})
const row_7 = reactive({
  id: 7,
  text: '↙',
  params: {
    a: 6
  },
})
const row_8 = reactive({
  id: 8,
  text: '↓',
  params: {
    a: 1
  },
})
const row_9 = reactive({
  id: 9,
  text: '↘',
  params: {
    a: 7
  },
})
const row_10 = reactive({
  id: 10,
  text: '',
  params: {
    a: 13
  },
})
const row_11 = reactive({
  id: 11,
  text: '',
  params: {
    a: 12
  },
})

// 鼠标按下
function down(id) {
  currentButtonId.value = id
  isPress.value = true
  if (value.value == true) {
    onEnd()
  }
  requestNum.value = 0;
  requestEnd.value = 0;
  current_id.value = id
  getCurrent(id)
  timer.value = setInterval(() => {
    go()
  }, 600)//修改请求速度就这里 单位毫秒
}
const longPressTimeout = ref(null);
function startLongPress(id) {

  longPressTimeout.value = setTimeout(() => {
    isPress.value = true
    if (value.value == true) {
      onEnd()
    }
    requestNum.value = 0;
    requestEnd.value = 0;
    current_id.value = id
    getCurrent(id)
    timer.value = setInterval(() => {
      go()
    }, 600)//修改请求速度就这里 单位毫秒
  }, 500); // 设置延时时间，单位为毫秒

}
const endLongPress = () => {

  isPress.value = false
  if (value.value == true) {
    starter2.value = setInterval(() => {
      onStart()
    }, 600)
    console.log("Start()")
  }
  clearTimeout(timer.value)
  current_id.value = ""
  timer.value = ""
  leave();
  clearTimeout(longPressTimeout.value);
  clearTimeout(timer.value);
};
const getCurrent = (id) => {
  switch (id) {
    case 1:
      current_row.id = row_1['id'],
        current_row.params = row_1['params']
      break;
    case 2:
      current_row.id = row_2['id'],
        current_row.params = row_2['params']
      break;
    case 3:
      current_row.id = row_3['id'],
        current_row.params = row_3['params']
      break;
    case 4:
      current_row.id = row_4['id'],
        current_row.params = row_4['params']
      break;
    case 5:
      current_row.id = row_5['id'],
        current_row.params = row_5['params']
      break;
    case 6:
      current_row.id = row_6['id'],
        current_row.params = row_6['params']
      break;
    case 7:
      current_row.id = row_7['id'],
        current_row.params = row_7['params']
      break;
    case 8:
      current_row.id = row_8['id'],
        current_row.params = row_8['params']
      break;
    case 9:
      current_row.id = row_9['id'],
        current_row.params = row_9['params']
      break;
    case 10:
      current_row.id = row_10['id'],
        current_row.params = row_10['params']
      break;
    case 11:
      current_row.id = row_11['id'],
        current_row.params = row_11['params']
      break;
  }
}

const go = () => {
  requestNum.value++
  var userList;
  if (moveMode.value == true && (current_row.params.a == 4 || current_row.params.a == 5 || current_row.params.a == 6 || current_row.params.a == 7)) {
    userList = { uCmdType: 0, uCmdParm: (current_row.params.a + 4), uCmdParmExt: '' }
    console.log("!!!PRESSING!!!")
  }
  else if (moveMode.value == true && (current_row.params.a == 2 || current_row.params.a == 3)) {
    userList = { uCmdType: 0, uCmdParm: (current_row.params.a + 10), uCmdParmExt: '' }
  }
  else {
    userList = { uCmdType: 0, uCmdParm: current_row.params.a, uCmdParmExt: '' }
  }


  console.log(JSON.stringify(userList));
  console.log(typeof JSON.stringify(userList))

  axios({
    method: 'post',
    url: '/api/ctrl/manual',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')

  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
    requestEnd.value++
  })
}

// 放开鼠标
function up() {
  isPress.value = false
  if (value.value == true) {
    starter2.value = setInterval(() => {
      onStart()
    }, 600)
    console.log("Start()")
  }
  clearTimeout(timer.value)
  current_id.value = ""
  timer.value = ""
}

// 鼠标移出事件
const leave = () => {
  if (isPress.value == true) {
    if (value.value == true) {
      starter2.value = setInterval(() => {
        onStart()
      }, 600)
      console.log("Start()")
    }

    clearTimeout(timer.value)
    current_id.value = ""
    timer.value = ""

    console.log("mouse leave")
    isPress.value = false
  }
}

// 速度选择
const level_1 = () => {
  let url = '/api/ctrl/manual';
  let param = {
    a: 1
  }
  current_speed = 1
  level(url, param)

}
const level_2 = () => {
  let url = '/api/ctrl/manual';
  let param = {
    a: 1
  }
  current_speed = 2
  level(url, param)

}
const level_3 = () => {
  let url = '/api/ctrl/manual';
  let param = {
    a: 1
  }
  current_speed = 3
  level(url, param)

}
const level_4 = () => {
  let url = '/api/ctrl/manual';
  let param = {
    a: 1
  }
  current_speed = 4
  level(url, param)

}
const level_5 = () => {
  let url = '/api/ctrl/manual';
  let param = {
    a: 1
  }
  current_speed = 5
  level(url, param)

}
const level = (url, param) => {
  var userList = { uCmdType: 3, uCmdParm: current_speed, uCmdParmExt: '' }

  console.log(JSON.stringify(userList));
  console.log(typeof JSON.stringify(userList))

  axios({
    method: 'post',
    url: url,//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 上线事件
const onLine = () => {
  var userList = { uCmdType: 2, uCmdParm: 0, uCmdParmExt: '' }

  console.log(JSON.stringify(userList));
  console.log(typeof JSON.stringify(userList))

  axios({
    method: 'post',
    url: '/api/ctrl/manual',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 开始 循环发送停止信号
const start = (value) => {
  if (value == true) {
    starter2.value = setInterval(() => {
      onStart()
    }, 600)//修改请求速度就这里 单位毫秒
    console.log("Start()")
  }
  else {
    onEnd()
  }
}

const onStart = () => {
  console.log(typeof 4)
  var userList = { uCmdType: 4, uCmdParm: 12, uCmdParmExt: '' }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/manual',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 结束 循环发送停止信号
function onEnd() {
  console.log("onEnd()")
  clearInterval(starter2.value)
  starter2.value = ""
}

// 模式选择
const roboSwitch = (value) => {
  let swNum = 1
  switch (value.target.value) {
    case 'left':
      swNum = 1
      break
    case 'mid':
      swNum = 2
      break
    case 'right':
      swNum = 3
      break
  }
  var userList = { triswt: swNum }

  console.log(JSON.stringify(userList));
  console.log(typeof JSON.stringify(userList))

  axios({
    method: 'post',
    url: '/api/ctrl/triswt',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')

  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// PLS设置
const setPlS = () => {
  // console.log(typeof Number(plsValue.value))
  var userList = { plscut: Number(plsValue.value) }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/plscut',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 上线点设置
const setPoint = () => {
  var userList = { onlinepoint: Number(pointValue.value) }
  console.log(JSON.stringify(userList));
  axios({
    method: 'post',
    url: '/api/ctrl/onlinepoint',//这里是请求地址
    data: JSON.stringify(userList),
  }).then((res) => {
    // ElMessage.success('请求成功')
  }).catch(error => {
    // ElMessage.error('请求失败')
  }).finally(() => {
  })
}

// 手控移动中间按钮功能
const changeMove = () => {
  if (moveMode.value == true) {
    Option.value = "PRESS"
  }
  else {
    Option.value = "DEF"
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button>span {
  width: 100%;
  height: 100%;
}

::v-deep .el-checkbox-button {
  width: 100%;
  height: 100%;
}

::v-deep span.el-checkbox-button__inner {
  width: 100%;
  height: 100%;
}
</style>


<style scoped>
.kongzhi {
  height: 30%;
  width: 100% !important;
  margin-top: -10%;
  position: relative;
}
</style>