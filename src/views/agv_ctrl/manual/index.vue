
<template>
    <el-row style="margin: 100px 30px 30px 30px" :gutter="10">
      <el-col :xs="15" :sm="15" :md="15" :lg="8" :xl="8">
        <el-row>
          <h4 style="margin: 10px auto">控 制</h4>
        </el-row>
        <el-row style="margin-bottom: 2px; height: 90px">
          <el-button-group style="width: 100%">
            <el-button :disabled="!value|| (row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_1.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↖
              </el-icon>
            </el-button>
            <el-button :disabled="!value||  (row_1.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_2.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↑
              </el-icon>
            </el-button>
            <el-button :disabled="!value||  (row_2.isPress) ||(row_1.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_3.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↗
              </el-icon>
            </el-button>
          </el-button-group>
      </el-row>
      <el-row style="margin-bottom: 2px; height: 90px">
          <el-button-group style="width: 100%">
            <el-button :disabled="!value||  (row_2.isPress) ||(row_3.isPress)||(row_1.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_4.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ←
              </el-icon>
            </el-button>
  
            <el-button :disabled="!value ||(row_1.isPress) ||(row_2.isPress)||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress)||(row_9.isPress)" @click="changeClick" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-checkbox-button :disabled="!value||(row_1.isPress) ||(row_2.isPress)||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress)||(row_9.isPress)" @change="changeMove" v-model="moveMode" size="large">{{ Option
              }}</el-checkbox-button>
          </el-button>
  
            <el-button :disabled="!value||  (row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_1.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_6.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                →
              </el-icon>
            </el-button>
          </el-button-group>
        </el-row>
        <el-row style="margin-bottom: 2px; height: 90px">
          <el-button-group style="width: 100%">
            <el-button :disabled="!value||  (row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_1.isPress)||(row_8.isPress) ||(row_9.isPress)" @click="toggleButton(row_7.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↙
              </el-icon>
            </el-button>
            <el-button :disabled="!value||  (row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_1.isPress) ||(row_9.isPress)" @click="toggleButton(row_8.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↓
              </el-icon>
            </el-button>
            <el-button :disabled="!value||  (row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_1.isPress)" @click="toggleButton(row_9.id)" type="info"
              style="width: 31%; height: 100%; margin-left: 2px">
              <el-icon size="30">
                ↘
              </el-icon>
            </el-button>
          </el-button-group>
        </el-row>
  
        <el-switch :disabled ="(row_2.isPress) ||(row_3.isPress)||(row_4.isPress)||(row_6.isPress)||(row_7.isPress)||(row_8.isPress) ||(row_1.isPress)||(row_9.isPress)" @change="start" v-model="value" size="large" active-text="Open" inactive-text="Close" />
      </el-col>
  
      <el-col :xs="9" :sm="9" :md="9" :lg="4" :xl="4">
        <el-row>
          <h4 style="margin-bottom: 10px;margin: 10px auto">速 度</h4>
        </el-row>
        <el-row><el-button @click="level_1" type="success" style="margin: 4px auto; width: 60%; height: 40px">1
            级</el-button></el-row>
        <el-row><el-button @click="level_2" type="success" style="margin: 4px auto; width: 60%; height: 40px">2
            级</el-button></el-row>
        <el-row><el-button @click="level_3" type="success" style="margin: 4px auto; width: 60%; height: 40px">3
            级</el-button></el-row>
        <el-row><el-button @click="level_4" type="success" style="margin: 4px auto; width: 60%; height: 40px">4
            级</el-button></el-row>
        <el-row><el-button @click="level_5" type="success" style="margin: 4px auto; width: 60%; height: 40px">5
            级</el-button></el-row>
      </el-col>
  
      <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
        <el-row>
          <h4 style="margin: 10px auto">模 式</h4>
        </el-row>
        <el-row>
          <el-radio-group v-model="switchPosition" style="margin: 0 auto">
            <el-radio-button @change="roboSwitch" size="large" label="left">手动</el-radio-button>
            <el-radio-button @change="roboSwitch" size="large" label="mid">空闲</el-radio-button>
            <el-radio-button @change="roboSwitch" size="large" label="right">自动</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row>
          <h4 style="margin: 10px auto">上 线</h4>
        </el-row>
        <el-row>
          <el-button @click="onLine" size="large" style="margin: 0 auto" type="primary" :icon="Place">上线</el-button>
        </el-row>
      </el-col>
  
      <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
        <el-row>
          <h4 style="margin: 10px auto">PLS 区 域</h4>
        </el-row>
        <el-row>
          <div style="margin: 0 auto">
            <el-form-item prop="count">
              <el-select-v2 v-model="plsValue" placeholder="Activity count" :options="plsOptions" />
              <el-button @click="setPlS" style="margin-left: 2px;" type="primary" :icon="Setting">设置</el-button>
            </el-form-item>
          </div>
        </el-row>
        <el-row>
          <h4 style="margin: 10px auto">上 线 点</h4>
        </el-row>
        <el-row>
          <div style="margin: 0 auto">
            <el-form-item prop="count">
              <el-select-v2 v-model="pointValue" placeholder="Activity count" :options="pointOptions" />
              <el-button @click="setPoint" style="margin-left: 2px;" type="primary"
                :icon="Setting">设置</el-button>
            </el-form-item>
  
          </div>
  
        </el-row>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  import axios from "axios";
  //import { ref } from 'vue';
  import { reactive, ref } from "vue";
  // import { ElButton } from 'element-plus';
  // import 'element-plus/lib/theme-chalk/index.css';
  import { ElMessage } from "element-plus";
  // import { ArrowDown } from '@element-plus/icons-vue'
  // import {
  //   Place,
  //   Setting,
  // } from '@element-plus/icons-vue'
  // import { id } from "element-plus/es/locale";
  const buttons = ref([]);
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
  
  // const isPress = ref(false)
  const switchPosition = ref('left')
  const requestNum = ref(0);
  const requestEnd = ref(0);
  // 定时器
  const timer = ref()
  const starter = ref()
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
    isPress:false
  })
  const row_2 = reactive({
    id: 2,
    text: '↑',
    params: {
      a: 0
    },
    isPress:false
  })
  const row_3 = reactive({
    id: 3,
    text: '↗',
    params: {
      a: 5
    },
    isPress:false
  })
  const row_4 = reactive({
    id: 4,
    text: '←',
    params: {
      a: 2
    },
    isPress:false
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
    isPress:false
  })
  const row_7 = reactive({
    id: 7,
    text: '↙',
    params: {
      a: 6
    },
    isPress:false
  })
  const row_8 = reactive({
    id: 8,
    text: '↓',
    params: {
      a: 1
    },
    isPress:false
  })
  const row_9 = reactive({
    id: 9,
    text: '↘',
    params: {
      a: 7
    },
    isPress:false
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
  function toggleButton(id) {
    if (row_1.isPress || row_2.isPress||row_3.isPress||row_4.isPress||row_6.isPress ||row_7.isPress||row_8.isPress||row_9.isPress) {
      up();
    } else {
      down(id);
    }
  }
  
  // 鼠标按下
  function down(id) {
    if(id === 1)
    {
      row_1.isPress =true
    }else if(id===2)
    {
      row_2.isPress =true
    }else if(id===3)
    {
      row_3.isPress =true
    }else if(id===4)
    {
      row_4.isPress =true
    }else if(id===6)
    {
      row_6.isPress =true
    }else if(id===7)
    {
      row_7.isPress =true
    }else if(id===8)
    {
      row_8.isPress =true
    }else if(id===9)
    {
      row_9.isPress =true
    }
    if (value.value == true) {
      onEnd()
    }
    requestNum.value = 0;
    requestEnd.value = 0;
    current_id.value = id
    getCurrent(id)
    console.log("!!!PRESwwwwwwwwSING!!!")
    timer.value = setInterval(() => {
      go()
    }, 600)//修改请求速度就这里 单位毫秒
  }
  
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
    if (moveMode.value == true && (current_row.params.a == 4 || current_row.params.a == 5 || current_row.params.a == 6 || current_row.params.a == 7)) {
      var userList = { uCmdType: 0, uCmdParm: (current_row.params.a + 4), uCmdParmExt: '' }
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
    row_1.isPress =false
    row_2.isPress =false
    row_3.isPress =false
    row_4.isPress =false
    row_6.isPress =false
    row_7.isPress =false
    row_8.isPress =false
    row_9.isPress =false
    console.log(row_1.isPress)
    if (value.value == true) {
      starter.value = setInterval(() => {
        onStart()
      }, 600)
      console.log("Start()")
    }
    clearTimeout(timer.value)
    current_id.value = ""
    timer.value = ""
  }
  
  
  // 鼠标移出事件
  // const leave = () => {
  //   if (isPress.value == true) {
  //     if (value.value == true) {
  //       starter.value = setInterval(() => {
  //         onStart()
  //       }, 600)
  //       console.log("Start()")
  //     }
  
  //     clearTimeout(timer.value)
  //     current_id.value = ""
  //     timer.value = ""
  
  //     console.log("mouse leave")
  //     isPress.value = false
  //   }
  // }
  
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
      ElMessage.success('请求成功')
    }).catch(error => {
      ElMessage.error('请求失败')
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
      starter.value = setInterval(() => {
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
    clearInterval(starter.value)
    starter.value = ""
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
  
  
  