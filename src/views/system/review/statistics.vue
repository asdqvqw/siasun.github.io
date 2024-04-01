<template>

    <el-button class="EXButtonstatistics" @click="clickbutton" v-show="!importflag">统计</el-button>

    <el-dialog title="统计" v-model="dialogVisible" custom-class="custom-dialog">
        <tong></tong>
    </el-dialog>

    <el-button class="EXButtonreseve" @click="clickbuttona" v-show="!importflag">预留</el-button>

    <el-dialog title="预留" v-model="dialogVisiblea" custom-class="custom-dialog">


        <el-button @click="prevItem">＜</el-button>
        <el-button @click="nextItem">＞</el-button><br>

        <div class="parsedItemsdata" v-if="parsedLogData[currentCoordinateIndex].parsedItems">
            <h2>{{ parsedLogData[currentCoordinateIndex].parsedItems[currentItemIndex_Y].itemName }}</h2>
            <div v-for="(value, key) in parsedLogData[currentCoordinateIndex].parsedItems[currentItemIndex_Y].itemObject"
                :key="key">
                {{ key }}: {{ value }}
            </div>
        </div>

    </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import { parsedLogData, currentCoordinateIndex,importflag } from './sharedata.js'
import tong from './components/bbb_Aqw.vue';
const dialogVisible = ref(false);
let currentItemIndex_Y = ref(0);
const clickbutton = () => {
    dialogVisible.value = true;
};

const dialogVisiblea = ref(false);
const clickbuttona = () => {
    console.log('11111',parsedLogData.value)
    dialogVisiblea.value = true;
};

const prevItem = () => {
  if (currentItemIndex_Y.value > 0) {
    currentItemIndex_Y.value--;
  }
};
const nextItem = () => {
  if (currentItemIndex_Y.value < parsedLogData.value[currentCoordinateIndex.value].parsedItems.length - 1) {
    currentItemIndex_Y.value++;
  }
};
</script>


<style>
.EXButtonstatistics {
    background-image: url('./img/button.gif');
    background-size: 100%;
    background-position: center;
    background-color: #30499344;
    width: 200px;
    height: 40px;
    color: rgb(246, 241, 241);
    border: none;
    font-weight: bold;
    position: absolute;
    right: 0px;
    top: 420px;
    /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}
.EXButtonreseve {
    background-image: url('./img/button.gif');
    background-size: 100%;
    background-position: center;
    background-color: #30499344;
    width: 200px;
    height: 40px;
    color: rgb(246, 241, 241);
    border: none;
    font-weight: bold;
    position: absolute;
    right: 0px;
    top: 480px;
    /* clip-path: polygon(90% 0%, 100% 25%, 100% 75%, 90% 100%, 10% 100%, 0% 75%, 0% 25%, 10% 0%); */
}

</style>


