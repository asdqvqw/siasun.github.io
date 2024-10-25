<template>
    <el-tabs>
        <el-tab-pane v-for="(port, portIndex) in jsondata.canMan.canport" :key="portIndex"
            :label="'CAN Port ' + (portIndex + 1)">
            <div v-if="port.canpos.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Pos:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

                        <div v-for="item in port.canpos" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Pos 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canopenpos.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Open Pos:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">

                        <div v-for="item in port.canopenpos" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Open Pos 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                                <p>伺服类型:
                                    <span v-if="item.servotype === 0">Elmo伺服</span>
                                    <span v-else-if="item.servotype === 1">步科伺服</span>
                                    <span v-else-if="item.servotype === 2">Motec伺服</span>
                                    <span v-else-if="item.servotype === 3">AMC伺服</span>
                                </p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canguide.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Guide:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canguide" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Guide 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canencoder.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Encoder:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canencoder" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Encoder 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canbattery.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Battery:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canbattery" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Battery 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canrfid.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN RFID:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canrfid" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN RFID 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canmanualbox.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Manual Box:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canmanualbox" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Manual Box 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.canio.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN IO:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.canio" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN IO 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>

            <div v-if="port.cangyro.length">
                <el-card class="custom-card" :body-style="{ padding: '20px' }">
                    <h4>CAN Gyro:</h4>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 2%;">
                        <div v-for="item in port.cangyro" :key="item.canid">
                            <el-card class="item-card" :body-style="{ padding: '10px' }">
                                <p>CAN Gyro 编号: {{ item.canid }}</p>
                                <p>CAN 通讯 ID 号: {{ item.unitid }}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
import { jsondata } from '@/views/agv_ctrl/param/common/commondata.js'
//   const jsondata.canMan = ref({
//     canport: [
//       {
//         canpos: [{ canid: 2, unitid: 0 }, { canid: 3, unitid: 1 }],
//         canopenpos: [{ canid: 2, unitid: 0, servotype: 1 }],
//         canguide: [{ canid: 2, unitid: 0 }, { canid: 2, unitid: 0 }],
//         canencoder: [{ canid: 2, unitid: 0 }],
//         canbattery: [{ canid: 2, unitid: 0 }],
//         canrfid: [{ canid: 2, unitid: 0 }],
//         jsondata.canManualbox: [],
//         canio: [{ canid: 2, unitid: 0 }],
//         cangyro: []
//       },
//       {
//         canpos: [],
//         canopenpos: [],
//         canguide: [],
//         canencoder: [{ canid: 2, unitid: 0 }],
//         canbattery: [],
//         canrfid: [{ canid: 2, unitid: 0 }],
//         jsondata.canManualbox: [{ canid: 2, unitid: 0 }, { canid: 2, unitid: 0 }],
//         canio: [{ canid: 2, unitid: 0 }],
//         cangyro: [{ canid: 2, unitid: 0 }]
//       }
//       // 可以添加更多的端口
//     ]
//   });
</script>

<style>
.custom-card {
    margin-bottom: 20px;
}

.item-card {
    width: 15vw;
    margin-bottom: 10px;
}
</style>