import {ref}from 'vue'

export const flag = ref(true);
export const flag2 = ref(true);
export const newRow = ref({
    name: '',
    value: [1,1,1,1,1],
    editingIndex: -1,
    isHardBum:false,
    pos:7,
    HardBum:{
        one:{
            input:[],
            output:[],
        },
        two:{
            input:[],
            output:[],
        },
        reset:{
            input:[],
            output:[],
        },
    }
});

