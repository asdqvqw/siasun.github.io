import {ref}from 'vue'

export const flag = ref(true);
export const flag2 = ref(true);
export const newRow = ref({
    name: '',
    input:[0,2,2,2,0],
    output:[0,2,2,2,0],
    editingIndex: -1,
});