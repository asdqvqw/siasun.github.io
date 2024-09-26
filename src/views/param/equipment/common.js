import { ref } from "vue";

export const jsondata = ref({
    version: '1.0',
    IO: {
        input: [],
        output: []
    },
    servo: {kinco:[]},
    Task: [

    ],
    device:[]
});

export const code = ref('');
export const EQUversion = ref([
    { name: "版本号", value: "" },
]);

export const IOinputdata = ref([

]);

export const IOoutputdata = ref([

]);
export const servodata = ref([

]);
export const taskdata = ref([

]);