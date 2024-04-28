<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box" style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">
      <div >
        <h2 style="margin-top: 1%; margin-left: 1%;">离线任务</h2>
        <div class="hengxian"></div>
        <div class="box">

          <el-form ref="form" :model="jsondata" label-width="80px" :rules="rules" style="width: 60%; margin-left: 18%;">
            <el-form-item label="起始点X" prop="startx">
              <el-input v-model.number="jsondata.startx" placeholder="起始点X" type="number"></el-input>
            </el-form-item>
            <el-form-item label="起始点Y" prop="starty">
              <el-input v-model.number="jsondata.starty" placeholder="起始点Y" type="number"></el-input>
            </el-form-item>
            <el-form-item label="终止点X" prop="endx">
              <el-input v-model.number="jsondata.starty" placeholder="终止点X" type="number"></el-input>
            </el-form-item>
            <el-form-item label="终止点Y" prop="endy">
              <el-input v-model.number="jsondata.starty" placeholder="终止点Y" type="number"></el-input>
            </el-form-item>
            <el-form-item label="导航类型">
              <el-select v-model.number="jsondata.navtype">
                <el-option label="无导航" :value="0"></el-option>
                <el-option label="磁带导航" :value="1"></el-option>
                <el-option label="轮廓导航" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="速度级别">
              <el-select v-model.number="jsondata.speedlev">
                <el-option v-for="option in options" :key="option.value" :label="option.label"
                  :value="option.value"></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="前向">
              <el-checkbox v-model.number="jsondata.direction"></el-checkbox>


              <el-form-item label="地标">
                <el-checkbox v-model.number="jsondata.landmark"></el-checkbox>

              </el-form-item>
            </el-form-item>




          </el-form>

          <el-form-item>
            <el-button @click="validate" style="width: 100%;" type="primary">开始</el-button>

          </el-form-item>
          <el-form-item>
            <el-button @click="validate2" style="width: 100%;" type="info">停止</el-button>
          </el-form-item>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const jsondata = ref({
  startx: 0,
  starty: 0,
  endx: 0,
  endy: 0,
  navtype: 0,
  speedlev: 1,
  direction: true,
  landmark: false
});

const options = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 }
];

const form = ref({
  startx: "",
  starty: "",
  endx: "",
  endy: ""
});

const rules = ref({
  startx: [{ required: true, message: '输入起始点X' }],
  starty: [{ required: true, message: '输入起始点Y' }],
  endx: [{ required: true, message: '输入终止点X' }],
  endy: [{ required: true, message: '输入终止点Y' }],
});



import axios from "axios";
const validate = () => {
  // form组件中校验是通过
  form.value.validate((valid) => {
    if (valid) {
      var userList = {
        type: 'StartLineNv',
        data: jsondata.value
      }
      console.log(JSON.stringify(userList));
      axios({
        method: 'post',
        url: '/api/ctrl/LineNv',//这里是请求地址
        data: JSON.stringify(userList),
      }).then((res) => {
        ElMessage.success('开始')
      }).catch(error => {
        // ElMessage.error('请求失败')
      }).finally(() => {
      })

    } else {
      alert("校验不通过");
    }
  });
};

const validate2 = () => {

      var userList = {
        type: 'StopLineNv',
        data: 0
      }
      console.log(JSON.stringify(userList));
      axios({
        method: 'post',
        url: '/api/ctrl/LineNv',//这里是请求地址
        data: JSON.stringify(userList),
      }).then((res) => {
        ElMessage.success('停止')
      }).catch(error => {
        // ElMessage.error('请求失败')
      }).finally(() => {
      })

};



</script>

<style scoped>
.hengxian {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}

.box {
  border: 5px double #8d8a8a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  width: 70%;
  height: 50%;
  margin-left: 10%;
  background-image: linear-gradient(to bottom right, #3a3d3d95, #c6e0d017);
}
.background{
  background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17);
}
</style>