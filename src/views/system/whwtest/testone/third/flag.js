import {ref}from 'vue'

export const flag = ref(false);

export const newRow = ref({
    name: '',
    value: [1,1,1,1,1,1],
    editingIndex: -1,
});

export const flagEmg = ref(false);

export const newRowEmg = ref({
    name: '',
    value: [1,1,1,1,1,1],
    editingIndex: -1,
});