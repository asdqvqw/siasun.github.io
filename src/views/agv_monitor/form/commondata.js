
import { ref } from 'vue';
import * as THREE from "three";
export const SystemParm = ref(null);
export const equipmentParm = ref(null);
export const flagclear = ref(false);
export const fileInput = ref(null);
export const carType = ref(null);
export const NavData = ref({
    Xpianyi: 0,
    Ypianyi: 0,
    Zpianyi: 0,
    EX: 0,
    EY: 0,
    EZ: 0,
  });
export const pointss = ref(null);
export const parsedLogData = ref(
    {
        car_type:0,
        electricalModule:
        {
            kinematic:
            {
                drive:
                    [
                        {
                            wheel:
                            {
                                fServoSpeed: -0.21026467742281965911,
                                nServoErrCode: 0,
                                nServoState: 56417
                            }
                        },
                        {
                            wheel:
                            {
                                fServoSpeed: 0.20026467742281965911,
                                nServoErrCode: 0,
                                nServoState: 16227
                            }
                        }
                    ],
                nDriveCount: 2
            },
            safeCheck:
            {
                bEmgStop: false,
                bHardBumper: false,
                nPlsTrig: 2
            },
            sensor:
            {
                battmetr:
                {
                    fCapPercent: 74.400001525878906,
                    sState: 2
                },
                camera:
                {
                    fthita: 0.0,
                    fx: 0.0,
                    fy: 0.0
                },
                magnetic:
                {
                    fDev:
                        [
                            0.0,
                            0.0
                        ],
                    sGrade: 0
                }
            }
        },
        equipmentInfo:
        {
            rack:
            {
                lifter_axis:
                {
                    bBottom: false,
                    bTop: false,
                    fAxisPosition: 0.0,
                    fAxisSpeed: 0.0
                },
                turn_axis:
                {
                    bLevel: false,
                    bZero: false,
                    fAxisPosition: 0.0,
                    fAxisSpeed: 0.0
                }
            },
            strEquipmentTaskMessage:  " ",
            uEquipmentState: 3,
            uEquipmentTaskError: 0,
            uEquipmentTaskID: 0,
            uEquipmentTaskState: 65535
        },
        event:
        {
            advise: "",
            detail: "",
            name: ""
        },
        nAgvState: 0,
        navInfo:
        {
            fRealThita: 3.225185604095459,
            fRealX: 1.0290000438690186,
            fRealY: 1.090000003576278687,
            fThitaDev: 0.0,
            fXDev: 0.0,
            fmVersion: "172.32.128.0",
            swVersion: "2.0.2.0"
        },
        tcInfo:
        {
            iDevX: 0,
            iDevY: 0,
            sCurSpeed: 0,
            sHeading: 0,
            sProgress: 0,
            uFromNode: 65535,
            uToNode: 65535,
            uWorkState: 0,
            ucEventState: 0,
            ucTaskState: 3,
            usBatterState: 1,
            usCargoState: 0,
            usEventDetail: 0,
            usKey: 65535,
            usTaskID: 65535
        },
        uAgvType: 0,
        nAgvVersion: -1,
        nAgvNum:-1
    }
);

export let color = ref(1);
export const raycaster = new THREE.Raycaster();
export const coordinateHistory = ref([]);