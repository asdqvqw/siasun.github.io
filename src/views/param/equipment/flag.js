import {ref}from 'vue'

export const flag = ref(false);
export const flag2 = ref(false);
export const newRow = ref({
    name: '',
    key:'',
    config: [1,1,1,1,1,1],
    editingIndex: -1,
});
export const newoutRow = ref({
    name: '',
    key:'',
    config: [1,1,1,1,1,1],
    editingIndex: -1,
});
export const flagEmg = ref(false);

export const newRowEmg = ref({
    name: '',
    value: [1,1,1,1,1,1],
    editingIndex: -1,
});
export const newservoRow = ref({
    name: '',
    key:'',
    // car_type:0,
    config: {
        portID:0,
        unitID:0,
        canID:0,
        axisID:0,
        ratio:0,
        encoder:0,
        unitDist:0,
        maxRPM:0,
        normalvel:0,
        slowvel   :0,     
        neartarget:0,
        ontarget:0,
        motorDir:0,
        encoderDir:0,
        originmode:0,
        maxHeight:0,
        radius:0,
        isturn:0,
        syncFineVel:0,
        syncDir:0,
        syncVelRatioUp:0,
        steadyHeight:0,
    },
    editingIndex: -1,
});


export const newtaskRow = ref({
    id: -1,
    note:'',
    taskList: [],
    editingIndex: -1,
});
