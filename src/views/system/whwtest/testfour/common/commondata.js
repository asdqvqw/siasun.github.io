
import { ref } from 'vue';

export const toggleCtrl = ref(false);
export const showTable = ref(false);
export const toggleElect = ref(false);
export const showCtrl = ref(false);
export const showAGV = ref(false);


export const jsondata = ref({
  WatchDog: true,
  TSave: false,
  TongXun: true,
  network: {
    IP: "",
    BACKUP: "",
    DCamera: "",
  },
});


export const tableData = ref([
  { name: '看门狗功能', eg: '安全保护功能', status: '启用' },
  { name: '铁电存储功能', eg: '车体状态记录功能', status: '禁用' },
  { name: '通讯协议相关', eg: '启用通讯校验和功能', status: '启用' },
]);


export const tableDataCrtl = ref([
  { name: "控制台IP", eg: "IP", status: "" },
  { name: "备用IP", eg: "备用", status: "" },
  { name: "3D相机", eg: "IP地址", status: "" },
]);
