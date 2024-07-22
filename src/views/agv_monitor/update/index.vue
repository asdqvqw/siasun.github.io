<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box"
      style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)">

      <h2 style="margin-top: 1%; margin-left: 1%;">变量</h2>
      <div class="hengxian"></div>
      <div v-if="jsondata.item" class="flex-container">
        <div v-for="(item, index) in jsondata.item.slice(currentItemIndex_Y, currentItemIndex_Y + 4)" :key="index"
          class="container">
          <h2>{{ '👉' + item.name }}</h2>
          <el-table :data="getTableData(currentItemIndex_Y + index)" border class="custom-tablebianliang">
            <el-table-column prop="key" label="💫字段" width="90%"></el-table-column>
            <el-table-column prop="value" label="内容"></el-table-column>
          </el-table>

        </div>

        
        <div>
          <br>
          <el-button @click="prevItem" class="buttonAA">＜</el-button>
          <br>
          <br>
          <el-button @click="nextItem" class="buttonAA">＞</el-button>
        </div>


      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { timer_from } from '@/timer.js'
const jsondata = ref({
  item: [
    {
      name: "测试数据",
      mac: "asd",
      nodefine: 1,
      vvv: "CombinEquipment",
      ma2c: "asd",
      no2define: 1,
      vv2v: "CombinEquipment",
      ma1c: "asd",
      no1define: 1,
      vv1v: "CombinEquipment",
      ma12c: "asd",
      no12define: 1,
      vv32v: "CombinEquipment",
      m3ac: "asd",
      no3define: 1,
      vv3v: "CombinEquipment",
      ma32c: "asd",
      no32define: 1,
      vv32v: "CombinEquipment",
    },
    {
      name: "测试数据",
      json: "4234"
    },
    {
      name: "测试数据",
      json: true
    },
    {
      name: "测试数据",
      mac: "asd",
      nodefine: 1
    },

  ],
})




const parsedata = ref([])
const parse = () => {
  parsedata.value = [];
  //item
  const items = jsondata.value.item;
  for (const item of items) {
    const itemName = item.name;
    let itemObject = {};
    // 遍历item对象中的键值对
    for (const key in item) {
      if (key !== "name") {
        let keyvalue = item[key];
        itemObject[key] = keyvalue;

      }
    }
    parsedata.value.push({ itemName, itemObject });

  }
  console.log(parsedata.value)
}
parse();

const currentItemIndex_Y = ref(0)
const prevItem = () => {
  if (currentItemIndex_Y.value > 0) {
    currentItemIndex_Y.value = currentItemIndex_Y.value - 4;
  }
};
const nextItem = () => {
  if (currentItemIndex_Y.value < jsondata.value.item.length - 4) {
    currentItemIndex_Y.value = currentItemIndex_Y.value + 4;
  }
};
const getTableData = (index) => {
  if (index <= jsondata.value.item.length - 1) {
    const itemObject = parsedata.value[index].itemObject;
    console.log('11111', Object.entries(itemObject).map(([key, value]) => ({ key, value })))
    return Object.entries(itemObject).map(([key, value]) => ({ key, value }));

  }
  return [];
};

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
    url: '/api/data/table',
    data: JSON.stringify(userList)
  })
    .then((res) => {
      responseData.value = res.data
      jsondata.value.item = responseData.value;
      parse();
    })
    .catch((error) => {

    })
    .finally(() => {

    })

  timer_from.value = setTimeout(fetchVelocity1, 400);
}

onMounted(() => {
  fetchVelocity1()
})

</script>

<style lang="scss" scoped>
.container {
  width: 22%;
  border-style: ridge;
  border-width: 2px;
  border-radius: 20px;
  margin-top: -1%;
  margin-left: 1%;
  overflow: auto;
  border: 1px solid #797474;
  box-shadow: 4px 4px 10px rgba(103, 102, 102, 0.3);
  padding: 20px;
  text-align: center;
  background-image: linear-gradient(to top right, #d2d2d2, #c3c3c3);
}

.flex-container {
  display: flex;
  height: 70%;
  border: 5px double #8d8a8a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  width: 90%;
  border-radius: 10px;
  margin-left: 2%;
  margin: 0 auto;
  background-image: linear-gradient(to top right, #e4e4e4, #f1f5f2);

}

.buttonAA {
  margin-left: 50%;
  width: 10%;
  border-radius: 25px;
  background-image: linear-gradient(to bottom right, #2c323295, #d5eedf17);
}

.hengxian {
  border: none;
  border-top: 2px solid #ccc;
  margin: 20px 0;
}
</style>

<style lang="scss" scoped>
::v-deep .el-table {
  background: rgba(255, 255, 255, 0)
}

::v-deep .el-table_expanded-cell {
  background: rgba(255, 255, 255, 0)
}

::v-deep .el-table th {
  background: rgba(255, 255, 255, 0)
}

::v-deep .el-table tr {
  background: rgba(255, 255, 255, 0)
}

::v-deep .el-table td {
  background: rgba(255, 255, 255, 0)
}


</style>

<style>

.custom-tablebianliang .el-table__body tr:nth-child(2n) {
    background-color: #768aaa67;
    /* 隔行背景色 */
}
</style>

