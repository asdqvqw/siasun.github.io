import {ref}from 'vue'

export const flag = ref(true);
export const flag1 = ref(true);
export const flag2 = ref(true);
export const flagex = ref(true);
export const newRow = ref({
    name: '',
    type: 0,
    near:[],
    mid:[],
    far:[]
});

export const newRowEX = ref({
    name: '',
    area:[1,1,1,1,1]
});