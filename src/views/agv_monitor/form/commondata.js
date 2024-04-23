
import { ref } from 'vue';
import * as THREE from "three";
export const parsedLogData = ref(
    {
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
            fRealThita: 6.255185604095459,
            fRealX: 0.0290000438690186,
            fRealY: 0.090000003576278687,
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
        uAgvType: 0
    }
);

export let color = ref(1);
export const raycaster = new THREE.Raycaster();