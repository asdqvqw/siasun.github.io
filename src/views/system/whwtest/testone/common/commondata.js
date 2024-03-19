import { ref } from "vue";

export const toggleCtrl = ref(false);
export const showTable = ref(false);
export const toggleElect = ref(false);
export const showCtrl = ref(false);
export const showAGV = ref(false);

export const jsondata = ref({
  network: [
    { name: "控制台IP", key: "IP", value: "" },
    { name: "备用IP", key: "BACKUPIP", value: "" },
  ],
  function: [
    { name: "看门狗功能", des: "安全保护功能", key: "watchDog", value: false },
    { name: "铁电储存", des: "车体状态记录功能", key: "TSave", value: false },
  ],
  other: {
    ctrlcycle: 0.05,
    ThreadTOPro: 1000,
  },
  com: {
    comone: false,
    comtwo: false,
    comthree: false,
    comfour: false,
  },
  can1: {},
  can2: {},
  can3: {},
  OperatingParam: {
    manualparm: {
      setSpeed: [[0, 1], [2, 0], [4, 0], [6, 0], [8, 0]],
      setRadius: [[2, 1], [3, 0], [3, 0]],
    },
    autoparam: {
      UpSpeed: 0.5,
      DeSpeed: 0.7,
      SSSpeed: 0.1,
      HiSpeed: 1,
      BeSpeed: 0.1,
      Bepos: 0.45,
      MinRadius: 5,
      SpeedLev: 0,
    },
  },
  AGVmodel: {
    type: 1,
    RealyTime: [200, 200],
    OrdinaryDW: [
      {

      }
    ],
  },
  switch: {
    StartButton: [],
    EmgButton: [],
  },
  HardBumper:[]
});

export const OTHERPARM = ref([
  { name: "控制周期", value: "0.05", key: "ctrlcycle" },
  { name: "线程超时保护", value: "1000", key: "ThreadTOPro" },
]);

export const tableDataCrtl = ref([
  //   {
  //     name: '左轮驱动', AGVposX: '', AGVposY: '', isDrWheel: true, driverType: 0, isSteel: true,diver: {
  //         Indirection:0,
  //         servoType:0,
  //         MeParm: [0, 0, 0.23, 21, 2700, 48],
  //         SeParm: [0, 0],
  //         morehot: [],

  //     },
  //     steel: {
  //         Indirection:0,
  //         RuservoType:0,
  //         isCoddist: true,
  //         Coddist:[0, 0, 0.22,1],
  //         MeParm: [0, 0, 0.22],
  //         zeroindex: [54],
  //         SeParm: [0, 0],
  //         sevorestu: [],
  //         sevoreable: [],
  //         LimitOne:[],
  //         LimitTwo:[],
  //         LimitZero:[],
  //     }
  // },
  // {
  //     name: '右轮驱动', AGVposX: '', AGVposY: '', isDrWheel: true, driverType: 1, isSteel: true,diver: {
  //         Indirection:1,
  //         servoType:0,
  //         MeParm: [0, 0, 0.23, 21, 2700, 48],
  //         SeParm: [0, 0],
  //         morehot: [],


  //     }, steel: {
  //         Indirection:1,
  //         RuservoType:0,
  //         isCoddist: false,
  //         Coddist:[0, 0, 0.22,1],
  //         MeParm: [0, 0, 0.23],
  //         zeroindex: [54],
  //         SeParm: [0, 0],
  //         sevorestu: [],
  //         sevoreable: [],
  //         LimitOne:[],
  //         LimitTwo:[],
  //         LimitZero:[],
  //     }

  // }
]);

export const tableDataCrtlswitch = ref([{
  name: '启动开关',
  value: [
    1, 1, 1, 1, 1, 1
  ]
}

]);
export const tableDataCrtlswitchEmg = ref([{
  name: '急停开关',
  value: [
    1, 1, 1, 1, 1, 1
  ]
}

]);
export const tableDataCrtlBumper = ref([
//   {
//   name: 'No name',
//   value: [
//       1, 1, 1, 1, 1
//   ],
//   isHardBum: false,
//   pos:7,
//   HardBum:{
//       one:{
//           input:[],
//           output:[],
//       },
//       // two:{
//       //     input:[],
//       //     output:[],
//       // },
//       // reset:{
//       //     input:[],
//       //     output:[],
//       // },
//   }
// }

]);


export const flag = ref(false);
export const selected = ref('1');
export const RealyTimeisChecked = ref(true);
export const RealyTimeinput1 = ref(200);
export const RealyTimeinput2 = ref(200);

export const MANUALRAPARM = ref([
  { manRadLev: 0, manRadNum: 2, value: true },
  { manRadLev: 1, manRadNum: 3, value: false },
  { manRadLev: 2, manRadNum: 3, value: false },
]);


export const MANUALPARMA = ref([
  { manSpeLev: 0, adAutoSpe: 0, value: true },
  { manSpeLev: 1, adAutoSpe: 2, value: false },
  { manSpeLev: 2, adAutoSpe: 4, value: false },
  { manSpeLev: 3, adAutoSpe: 6, value: false },
  { manSpeLev: 4, adAutoSpe: 8, value: false },
]);

export const AUTOPARMLEV = ref([{ name: "速度级别设置", value: 0 }]);
export const AUTOPARM = ref([
  { name: "加速时加速度(m/s/s)", value: "0.5", key: "UpSpeed" },
  { name: "减速时加速度(m/s/s)", value: "0.7", key: "DeSpeed" },
  { name: "启/停加速度(m/s/s)", value: "0.1", key: "SSSpeed" },
  { name: "最高运行速度(m/s/s)", value: "1", key: "HiSpeed" },
  { name: "入站前巡行速度(m/s)", value: "0.1", key: "BeSpeed" },
  { name: "入站前巡行距离(m)", value: "0.45", key: "Bepos" },
  { name: "最小跟踪调整半径(m)", value: "5", key: "MinRadius" },
]);

export const tableDataCrtlnet = ref([
  { name: "控制台IP", key: "IP", value: "" },
  { name: "备用IP", key: "BACKUPIP", value: "" },
]);

export const functioncDate = ref([
  { name: "看门狗功能", des: "安全保护功能", key: "watchDog", value: false },
  { name: "铁电储存", des: "车体状态记录功能", key: "TSave", value: false },
]);

export const CANPOS = ref([]);
export const CANPOS2 = ref([]);
export const CANPOS3 = ref([]);
export const CANOPEN = ref([]);
export const CANOPEN2 = ref([]);
export const CANOPEN3 = ref([]);
export const CANGUIDE = ref([]);
export const CANGUIDE2 = ref([]);
export const CANGUIDE3 = ref([]);
export const CANBMS = ref([]);
export const CANBMS2 = ref([]);
export const CANBMS3 = ref([]);
export const CANIO = ref([]);
export const CANIO2 = ref([]);
export const CANIO3 = ref([]);
export const CANMANUAL = ref([]);
export const CANMANUAL2 = ref([]);
export const CANMANUAL3 = ref([]);
export const CANRFID = ref([]);
export const CANRFID2 = ref([]);
export const CANRFID3 = ref([]);
