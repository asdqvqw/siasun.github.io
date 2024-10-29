import { ref } from "vue";

export const toggleCtrl = ref(false);
export const showTable = ref(false);
export const toggleElect = ref(false);
export const showCtrl = ref(false);
export const showAGV = ref(false);

export const jsondata = ref({
  car_type: 0,
  // network: [
  //   { name: "控制台IP", key: "IP", value: "" },
  //   { name: "备用IP", key: "BACKUPIP", value: "" },
  // ],
  NetMan: {
    tc: "192.168.3.88",
    screen: "192.168.3.28"
  },
  FuncSet:
  {
    keys: [
      { ch_key: "看门狗功能", des: "安全保护功能", en_key: "watchDog", value: false },
      { ch_key: "铁电储存", des: "车体状态记录功能", en_key: "TSave", value: true },
      { ch_key: "通讯协议相关", des: "通讯校验和功能", en_key: "CheckSum", value: true },
      { ch_key: "设备扩展数据", des: "是否开启设备扩展数据", en_key: "ExData", value: true },
      { ch_key: "扩展协议", des: "是否开启扩展协议", en_key: "ExAgreement", value: true },
    ],
  },
  // other: {
  //   ctrlcycle: 0.05,
  //   ThreadTOPro: 1000,
  // },
  Password: '123456',
  SerialPortMan: {
    port_1: false,
    port_2: false,
    port_3: false,
    port_4: false,
  },
  Panel: {
    Button: {
      startBtn: [2, 2, 2, 2, 1],
      stopBtn: [2, 2, 2, 2, 1],
      manualSwt: [2, 2, 2, 2, 1],
      autoSwt: [2, 2, 2, 2, 1],
    },
    Display: {
      type: 1,
      modbus: {
        type: "TCP"
      }
    }
  },
  SafetyLoop: {
    Bumper: [
      {
        name: "前保险杠",
        io_input: [4, 2, 0, 1, 0]
      }
    ],
    Emg: [
      {
        name: "前急停",
        io_input: [4, 2, 0, 1, 0]
      }
    ], PowerRelay:
    {
      name: "伺服接触器",
      io_input: [4, 2, 0, 1, 0]
    }, Pls: [
      {
        name: "前硬pls",
        type: 0,
        config:
        {
          io: {
            type: 3,
            area: [
              {
                area_output: [2, 2, 2, 2, 1]
              }
            ],
            near: [2, 2, 2, 2, 1],
            center: [2, 2, 2, 2, 1],
            far: [2, 2, 2, 2, 1]
          },
          net:
          {
            ip: "0.0.0.0",
            port: 0
          }

        }
      },
      {
        name: "前软pls",
        type: 1,
        config:
        {

          io: {
            type: 0,
            area: [
            ],
            near: [2, 2, 2, 2, 1],
            center: [2, 2, 2, 2, 1],
            far: [2, 2, 2, 2, 1]
          },
          net:
          {
            ip: "192.168.3.101",
            port: 8002
          }

        }
      }
    ],
  },

  // can1: { can_pos: [], can_open: [], can_guide: [], can_BMS: [], can_io: [], can_manual: [], can_rfid: [] },
  // can2: { can_pos: [], can_open: [], can_guide: [], can_BMS: [], can_io: [], can_manual: [], can_rfid: [] },
  // can3: { can_pos: [], can_open: [], can_guide: [], can_BMS: [], can_io: [], can_manual: [], can_rfid: [] },
  CanMan: {
    canport: [
      {
        canpos: [
        ],
        canopenpos: [],
        canguide: [],
        canencoder: [],
        canbattery: [],
        canbms: [],
        canrfid: [],
        canopenencoder: [],
        cangyro: [],
        canmanualbox: [],
        canio: []
      }
    ]
  },
  MotionParam: {
    manaul_param: {
      speed_level: [0.1, 0.3, 0.5, 0.7, 1.0],
      turn_radius: [1.5, 2.0, 2.5],
    },
    common_param: {
      up_acc: 0.5,
      down_acc: 0.7,
      small_acc: 0.1,
      max_speed: 1,
      stop_near_speed: 0.1,
      stop_open_section: 0.45,
      min_revise_radius: 5,
    },
    auto_param: {
      speed_level: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0
      ]
    }
  },
  Battery: {
    normal_percent: 70,
    low_percent: 50,
    lower_percent: 30
  },
  Kinematic: {
    // type: 1,
    delay: {
      need_delay_time: false,
      servoenable_delay_time: 200,
      servospeed_delay_time: 200
    },
    drive: [

    ],
  },

  NavSys: [],
  ManCtrlDevice: {
    type: 2,
    com:
    {
      com_id: 0
    },
    can:
    {
      can_id: 50
    },
    remoteDevice:
    {
      ip: "192.168.3.99",
      port: 80
    }
  },
  // switch: {
  //   StartButton: [],
  //   EmgButton: [],
  // },
  // HardBumper: [],
  // Sound: [],
  // Manual: {
  //   manualcom: false,
  //   manualcan: false,
  //   manualforklift: false,
  //   manualonline: false,
  //   direction: 1,
  //   com: 0,
  //   can: 0,
  //   // wheel: [0, 0, 0, 0, 0],
  //   // steer: [0, 0, 0, 0, 0],
  //   // forklift: [0, 0, 0, 0],
  //   // switch: []
  // },
  // Relay: [],
  // PLS: [],

});

export const tableDataCrtlRelay = ref([
  // {
  //     name: 'No name',
  //     input: [],
  //     output: [],
  // }

]);

export const tableDataCrtlBetter = ref(
  {
    type: 0,
    elect: 0,
    param: []
  }
);

export const MANUALDATA = ref(
  {
    manualcom: false,
    manualcan: false,
    manualforklift: false,
    manualonline: false,
    direction: 1,
    com: 0,
    can: 0,
  }
);


export const adjustbit5 = ref(2);
export const OTHERPARM = ref([
  { name: "控制周期", value: "0.05", key: "ctrlcycle" },
  { name: "线程超时保护", value: "1000", key: "ThreadTOPro" },
]);
export const UserPermissionsparam = ref([
  { name: "密码", value: "123456", key: "Password" },
]);

export const tableDataCrtl = ref([
  //   {
  //     name: '左轮驱动', install_x: '', install_y: '', use_wheel: true, drive_type: 0, use_steer: true,wheel: {
  //         install_dir:0,
  //         servo_type:0,
  //         MeParm: [0, 0, 0.23, 21, 2700, 48],
  //         SeParm: [0, 0],
  //         wheel_check: [],

  //     },
  //     steer: {
  //         install_dir:0,
  //         servo_type:0,
  //         use_absolute_encoder: true,
  //         Coddist:[0, 0, 0.22,1],
  //         MeParm: [0, 0, 0.22],
  //         home_offset: [54],
  //         SeParm: [0, 0],
  //         sevorestu: [],
  //         sevoreable: [],
  //         unclockwise_limit_switch:[],
  //         clockwise_limit_switch:[],
  //         zero_limit_switch:[],
  //     }
  // },
  // {
  //     name: '右轮驱动', install_x: '', install_y: '', use_wheel: true, drive_type: 1, use_steer: true,wheel: {
  //         install_dir:1,
  //         servo_type:0,
  //         MeParm: [0, 0, 0.23, 21, 2700, 48],
  //         SeParm: [0, 0],
  //         wheel_check: [],


  //     }, steer: {
  //         install_dir:1,
  //         servo_type:0,
  //         use_absolute_encoder: false,
  //         Coddist:[0, 0, 0.22,1],
  //         MeParm: [0, 0, 0.23],
  //         home_offset: [54],
  //         SeParm: [0, 0],
  //         sevorestu: [],
  //         sevoreable: [],
  //         unclockwise_limit_switch:[],
  //         clockwise_limit_switch:[],
  //         zero_limit_switch:[],
  //     }

  // }
]);

export const tableDataCrtlswitch = ref([

]);
export const tableDataCrtlswitchEmg = ref([
]);

export const tableDataCrtlSound = ref([


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
export const tableDataCrtlPLS = ref([
  // {
  //     name: 'No name',
  //     type: 0,
  // }

]);

export const flag = ref(false);
export const selected = ref('1');
export const delayisChecked = ref(true);
export const delayinput1 = ref(200);
export const delayinput2 = ref(200);

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
  { name: "加速时加速度(m/s/s)", value: "0.5", key: "up_acc" },
  { name: "减速时加速度(m/s/s)", value: "0.7", key: "down_acc" },
  { name: "起步加速度(m/s/s)", value: "0.1", key: "small_acc" },
  { name: "最高运行速度(m/s/s)", value: "1", key: "max_speed" },
  { name: "停车接近速度(m/s)", value: "0.1", key: "stop_near_speed" },
  { name: "停车开放段(m)", value: "0.45", key: "stop_open_section" },
  { name: "最小跟踪调整半径(m)", value: "5", key: "min_revise_radius" },
]);
export const autoParam = ref({
  speed_level: [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0
  ]
});
export const manualvelParam = ref({
  speed_level: [
    0.1, 0.3, 0.5, 0.7, 1.0
  ]
});
export const manualradiusParam = ref({
  speed_level: [
    1.5, 2.0, 2.5
  ]
});
export const tableDataCrtlnet = ref([
  { name: "控制台", key: "tc", value: "192.168.3.88" },
  { name: "屏幕", key: "screen", value: "192.168.3.28" },
]);

export const functioncDate = ref([
  { ch_key: "看门狗功能", des: "安全保护功能", en_key: "watchDog", value: false },
  { ch_key: "铁电储存", des: "车体状态记录功能", en_key: "TSave", value: true },
  { ch_key: "通讯协议相关", des: "通讯校验和功能", en_key: "CheckSum", value: true },
  { ch_key: "设备扩展数据", des: "是否开启设备扩展数据", en_key: "ExData", value: true },
  { ch_key: "扩展协议", des: "是否开启扩展协议", en_key: "ExAgreement", value: true },
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
