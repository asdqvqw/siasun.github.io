import {ref}from 'vue'

export const flag = ref(true);

export const newRow = ref({
    name: '',
    value: [1,1,1,1,1],
    editingIndex: -1,
    ontime:0,
    offtime:0,
});