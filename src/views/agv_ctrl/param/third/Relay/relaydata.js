import {ref}from 'vue'

export const flag = ref(true);
export const flag2 = ref(true);
export const newRow = ref({
    name: '',
    input:[],
    output:[],
    editingIndex: -1,
});