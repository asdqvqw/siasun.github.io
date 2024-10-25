<template>
  <el-button type="primary" @click="addCanPort" style="margin-left: 1vw;">添加 CAN 端口</el-button>
  {{ canMan }}
  <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
    <el-card v-for="(port, portIndex) in canMan.canport" :key="portIndex" class="button-card"
      :body-style="{ padding: '20px' }">
      <div>
        <strong>CAN {{ portIndex + 1 }}</strong>
        <el-button style="margin-left: 1vw;" type="danger" @click="removeCanPort(portIndex)">删除</el-button>
      </div>
      <el-tabs>
        <!-- CAN Pos 配置 -->
        <el-tab-pane label="CAN Pos">
          <el-card class="input-group">
            <el-button type="success" @click="addCanPos(portIndex)" style="margin-bottom: 10px;">添加 CAN Pos</el-button>

            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(pos, posIndex) in port.canpos" :key="posIndex" class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removeCanPos(portIndex, posIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="pos.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="pos.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- CAN Open Pos 配置 -->
        <el-tab-pane label="CAN Open">
          <el-card class="input-group">
            <el-button type="success" @click="addCanOpenPos(portIndex)" style="margin-bottom: 10px;">添加 CAN Open
              Pos</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(openPos, openPosIndex) in port.canopenpos" :key="openPosIndex" class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removeCanOpenPos(portIndex, openPosIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="openPos.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="openPos.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>伺服类型:</label>
                  <el-input v-model.number="openPos.servotype" type="number" placeholder="输入服务类型"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- CAN Guide 配置 -->
        <el-tab-pane label="惯导">
          <el-card class="input-group">
            <el-button type="success" @click="addcanguide(portIndex)" style="margin-bottom: 10px;">添加 CAN
              Guide</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canguide, canguideIndex) in port.canguide" :key="canguideIndex" class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanguide(portIndex, canguideIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canguide.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canguide.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- CAN canencoder 配置 -->
        <el-tab-pane label="Canencoder">
          <el-card class="input-group">
            <el-button type="success" @click="addcanencoder(portIndex)" style="margin-bottom: 10px;">添加 CAN
              Canencoder</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canencoder, canencoderIndex) in port.canencoder" :key="canencoderIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanencoder(portIndex, canencoderIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canencoder.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canencoder.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>




        <!-- CAN canbattery 配置 -->
        <el-tab-pane label="电池">
          <el-card class="input-group">
            <el-button type="success" @click="addcanbattery(portIndex)" style="margin-bottom: 10px;">添加 CAN
              battery</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canbattery, canbatteryIndex) in port.canbattery" :key="canbatteryIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanbattery(portIndex, canbatteryIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canbattery.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canbattery.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>



        <!-- CAN canbms 配置 -->
        <el-tab-pane label="电池指示表">
          <el-card class="input-group">
            <el-button type="success" @click="addcanbms(portIndex)" style="margin-bottom: 10px;">添加 CAN
              BMS</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canbms, canbmsIndex) in port.canbms" :key="canbmsIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanbms(portIndex, canbmsIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canbms.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canbms.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>



          <!-- CAN canrfid 配置 -->
          <el-tab-pane label="RFID">
          <el-card class="input-group">
            <el-button type="success" @click="addcanrfid(portIndex)" style="margin-bottom: 10px;">添加 CAN
              RFID</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canrfid, canrfidIndex) in port.canrfid" :key="canrfidIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanrfid(portIndex, canrfidIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canrfid.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canrfid.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>

          <!-- CAN canopenencoder 配置 -->
          <el-tab-pane label="canopenencoder">
          <el-card class="input-group">
            <el-button type="success" @click="addcanopenencoder(portIndex)" style="margin-bottom: 10px;">添加 CAN
              canopenencoder</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canopenencoder, canopenencoderIndex) in port.canopenencoder" :key="canopenencoderIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanopenencoder(portIndex, canopenencoderIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canopenencoder.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canopenencoder.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>

          <!-- CAN cangyro 配置 -->
          <el-tab-pane label="陀螺仪">
          <el-card class="input-group">
            <el-button type="success" @click="addcangyro(portIndex)" style="margin-bottom: 10px;">添加 CAN
              cangyro</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(cangyro, cangyroIndex) in port.cangyro" :key="cangyroIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecangyro(portIndex, cangyroIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="cangyro.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="cangyro.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>


          <!-- CAN canmanualbox 配置 -->
          <el-tab-pane label="手控">
          <el-card class="input-group">
            <el-button type="success" @click="addcanmanualbox(portIndex)" style="margin-bottom: 10px;">添加 CAN
              canmanualbox</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canmanualbox, canmanualboxIndex) in port.canmanualbox" :key="canmanualboxIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanmanualbox(portIndex, canmanualboxIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canmanualbox.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canmanualbox.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>


          <!-- CAN canio 配置 -->
          <el-tab-pane label="IO">
          <el-card class="input-group">
            <el-button type="success" @click="addcanio(portIndex)" style="margin-bottom: 10px;">添加 CAN
              io</el-button>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

              <el-card v-for="(canio, canioIndex) in port.canio" :key="canioIndex"
                class="sensor-input">
                <div class="button-group">
                  <el-button type="danger" @click="removecanio(portIndex, canioIndex)"
                    style="margin-left: 10px;">删除</el-button>
                </div>

                <div class="input-group">
                  <label>CAN ID通讯号:</label>
                  <el-input v-model.number="canio.canid" type="number" placeholder="输入 CAN ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>

                <div class="input-group">
                  <label>单元编号:</label>
                  <el-input v-model.number="canio.unitid" type="number" placeholder="输入 Unit ID"
                    style="width: 100px; margin-right: 10px;"></el-input>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>


      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const canMan = ref({
  canport: [
  ]
});

// 添加 CAN 端口
const addCanPort = () => {
  canMan.value.canport.push({
    canpos: [],
    canopenpos: [],
    canguide: [],
    canencoder: [],
    canbattery:[],
    canbms:[],
    canrfid:[],
    canopenencoder:[],
    cangyro:[],
    canmanualbox:[],
    canio:[],
  });
};

// 删除 CAN 端口
const removeCanPort = (index) => {
  canMan.value.canport.splice(index, 1);
};

// 添加 CAN Pos
const addCanPos = (portIndex) => {
  canMan.value.canport[portIndex].canpos.push({ canid: 2, unitid: 0 });
};

// 删除 CAN Pos
const removeCanPos = (portIndex, posIndex) => {
  canMan.value.canport[portIndex].canpos.splice(posIndex, 1);
};

// 添加 CAN Open Pos
const addCanOpenPos = (portIndex) => {
  canMan.value.canport[portIndex].canopenpos.push({ canid: 2, unitid: 0, servotype: 1 });
};

// 删除 CAN Open Pos
const removeCanOpenPos = (portIndex, openPosIndex) => {
  canMan.value.canport[portIndex].canopenpos.splice(openPosIndex, 1);
};

// 添加 CAN canguide
const addcanguide = (portIndex) => {
  canMan.value.canport[portIndex].canguide.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canguide
const removecanguide = (portIndex, canguideIndex) => {
  canMan.value.canport[portIndex].canguide.splice(canguideIndex, 1);
};

// 添加 CAN canencoder
const addcanencoder = (portIndex) => {
  canMan.value.canport[portIndex].canencoder.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canencoder
const removecanencoder = (portIndex, canencoderIndex) => {
  canMan.value.canport[portIndex].canencoder.splice(canencoderIndex, 1);
};
// 添加 CAN canbattery
const addcanbattery = (portIndex) => {
  canMan.value.canport[portIndex].canbattery.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canbattery
const removecanbattery = (portIndex, canbatteryIndex) => {
  canMan.value.canport[portIndex].canbattery.splice(canbatteryIndex, 1);
};

// 添加 CAN canbms
const addcanbms = (portIndex) => {
  canMan.value.canport[portIndex].canbms.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canbms
const removecanbms = (portIndex, canbmsIndex) => {
  canMan.value.canport[portIndex].canbms.splice(canbmsIndex, 1);
};

// 添加 CAN canrfid
const addcanrfid = (portIndex) => {
  canMan.value.canport[portIndex].canrfid.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canrfid
const removecanrfid = (portIndex, canrfidIndex) => {
  canMan.value.canport[portIndex].canrfid.splice(canrfidIndex, 1);
};

// 添加 CAN canopenencoder
const addcanopenencoder = (portIndex) => {
  canMan.value.canport[portIndex].canopenencoder.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canopenencoder
const removecanopenencoder = (portIndex, canopenencoderIndex) => {
  canMan.value.canport[portIndex].canopenencoder.splice(canopenencoderIndex, 1);
};


// 添加 CAN cangyro
const addcangyro = (portIndex) => {
  canMan.value.canport[portIndex].cangyro.push({ canid: 2, unitid: 0 });
};

// 删除 CAN cangyro
const removecangyro = (portIndex, cangyroIndex) => {
  canMan.value.canport[portIndex].cangyro.splice(cangyroIndex, 1);
};

// 添加 CAN canmanualbox
const addcanmanualbox = (portIndex) => {
  canMan.value.canport[portIndex].canmanualbox.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canmanualbox
const removecanmanualbox = (portIndex, canmanualboxIndex) => {
  canMan.value.canport[portIndex].canmanualbox.splice(canmanualboxIndex, 1);
};

// 添加 CAN canio
const addcanio = (portIndex) => {
  canMan.value.canport[portIndex].canio.push({ canid: 2, unitid: 0 });
};

// 删除 CAN canio
const removecanio = (portIndex, canioIndex) => {
  canMan.value.canport[portIndex].canio.splice(canioIndex, 1);
};

</script>




<style lang="scss" scoped>
.button-card {
  width: 85vw;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #f9f9f9;
}

.input-group {
  display: flex;
  flex-direction: center;
  margin-bottom: 10px;
}

.input-group label {
  margin-right: 10px;
  /* 标签与输入框之间的间距 */
  width: auto;
  /* 标签宽度自适应 */
}

.sensor-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sensor-input label {
  width: 8vw;
  /* Fixed width for labels to align */
  margin-right: 10px;
}
</style>

<style scoped>
.button-group {
  display: flex;
  align-items: center;
  /* 按钮垂直居中 */
  margin-bottom: 10px;
  /* 按钮与输入框的间距 */
}
</style>