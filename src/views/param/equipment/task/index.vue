<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box" style="
        background-image: linear-gradient(
          to bottom right,
          #d0dcdc95,
          #d5eedf17
        );
      ">

      <div id="blockly-div" style="
                height: 100%;
                width: 100%;
              ">

        <div>
          <div v-if="responseData" class="error-details">
            <div class="error-item">

              <strong>异常名称:</strong> {{ getExceptionName(responseData.subTaskStatus.exception_name) }}
            </div>
            <div class="error-item">
              <strong>异常结果:</strong>
              {{ responseData.subTaskStatus.exception_result === 0 ? '无异常' : '有异常' }}
            </div>
            <div class="error-item">
              <strong>需要执行的接口名称:</strong> {{ responseData.subTaskStatus.sentence.name }}
            </div>
            <div class="error-item">
              <strong>类型:</strong>
              <span>
                {{ responseData.subTaskStatus.sentence.data.type === 0 ? '布尔值' :
                  responseData.subTaskStatus.sentence.data.type === 1 ? '整数' :
                    responseData.subTaskStatus.sentence.data.type === 2 ? '双精度' :
                      '未知类型' }}
              </span>
            </div>
            <div class="error-item">
              <strong>值:</strong> {{ responseData.subTaskStatus.sentence.data.value }}
            </div>
            <div class="error-item">
              <strong>输入的字符串参数:</strong> {{ responseData.subTaskStatus.sentence.param.value }}
            </div>
            <div class="error-item">
              <strong>错误码:</strong>
              <span>
                {{ responseData.curTaskError.errorCode === 0 ? '无故障' :
                  responseData.curTaskError.errorCode === 1 ? '超时故障' :
                    responseData.curTaskError.errorCode === 2 ? '异常故障' :
                      responseData.curTaskError.errorCode === 3 ? '内部故障' :
                        '未知错误' }}
              </span>
            </div>
            <div class="error-item">
              <strong>错误信息:</strong> {{ responseData.curTaskError.errorMessage }}
            </div>
          </div>

        </div>

        <div class="button-container" style="
            position: absolute;
            top: 5%;
            right: 5%;
            z-index :100;
          ">

          <el-button type="danger" @click="exportJSON">
            在线同步到AGV
          </el-button>
          <el-button type="success" @click="saveBlocks">
            离线保存到本地
          </el-button>
          <el-button type="primary" @click="loadBlocks">
            离线加载xml
          </el-button>
          <el-button type="primary" @click="loadBlocksfromAGV">
            在线加载xml
          </el-button>
          <el-button type="info" @click="checkcode">
            查看/同步代码
          </el-button>
          <!-- <el-input v-model="functionName" placeholder="输入函数名"></el-input>
          <el-button type="info" @click="startBlinking">
            闪烁
          </el-button> -->
          <el-dialog v-model="dialogVisible" title="代码" :visible="dialogVisible" @close="dialogVisible = false">
            <DefinScrollbar height="100%" :showUpBt="true">
              <pre>{{ code }}</pre>
            </DefinScrollbar>
          </el-dialog>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { jsondata, code, functions } from '../common.js'
import * as hans from 'blockly/msg/zh-hans';
import axios from 'axios'
import './config';
import DefinScrollbar from "@/components/DefinScrollbar.vue";
Blockly.setLocale(hans);
Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "名称";
Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "动作";
Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];

Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "为真则";
Blockly.Msg["CONTROLS_FOREACH_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_FOR_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_WHILEUNTIL_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "否则";
Blockly.Msg["PROCEDURES_CALLRETURN_TOOLTIP"] = "运行用户定义的函数“%1”，并使用它的输出值。";
jsondata.value.IO.input.forEach((item) => {

  Blockly.Blocks[item.name + 'input'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'input',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });

      this.setOutput(true, null)
      this.appendDummyInput()
        .appendField(item.key + '触发')

    }
  };
  javascriptGenerator[item.name + 'input'] = function (block) {
    return ['getBool("Input", "' + item.name + '",false)', javascriptGenerator.ORDER_ATOMIC]
  };

  Blockly.Blocks[item.name + 'InputIsExist'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'InputIsExist',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setOutput(true, null)
      this.appendDummyInput()
        .appendField(item.key + '是否存在')
    }
  };
  javascriptGenerator[item.name + 'InputIsExist'] = function (block) {
    return ['getBool("InputIsExist", "' + item.name + '",false)', javascriptGenerator.ORDER_ATOMIC]
  };

}
);
Blockly.Blocks.IO_input = {
  init: function () {
    // 获取设备选项
    const IOOptions = jsondata.value.IO.input.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    // 如果 deviceOptions 为空，则提供一个默认值
    if (IOOptions.length === 0) {
      IOOptions.push(["", ""]); // 添加一个默认选项
    }

    this.jsonInit({
      type: 'IO_input',
      colour: 90,
      tooltip: '',
      helpUrl: '',
      message0: "%1  触发",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": IOOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['IO_input'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getBool("Input","' + code1 + '",false)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.IO_InputIsExist = {
  init: function () {
    // 获取设备选项
    const IOOptions = jsondata.value.IO.input.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (IOOptions.length === 0) {
      IOOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'IO_InputIsExist',
      colour: 90,
      tooltip: '',
      helpUrl: '',
      message0: "%1  是否存在",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": IOOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['IO_InputIsExist'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getBool("InputIsExist","' + code1 + '",false)', javascriptGenerator.ORDER_ATOMIC]
};



Blockly.Blocks.IO_Output = {
  init: function () {
    // 获取设备选项
    const IOOptions = jsondata.value.IO.output.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (IOOptions.length === 0) {
      IOOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'IO_Output',
      colour: 90,
      tooltip: '',
      helpUrl: '',
      message0: "将 %1  置为 %2",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": IOOptions
        },
        {
          "type": "field_dropdown",
          "name": "Get_bool_Type",
          "options": [
            [
              "false",
              "false"
            ],
            [
              "true",
              "true"
            ]
          ]
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, null);
  }
};
javascriptGenerator['IO_Output'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = block.getFieldValue('Get_bool_Type');
  return 'setBool("Output","' + code1 + '",' + code2 + ');\n'
};
Blockly.Blocks.IO_OutputIsExist = {
  init: function () {
    // 获取设备选项
    const IOOptions = jsondata.value.IO.output.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (IOOptions.length === 0) {
      IOOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'IO_OutputIsExist',
      colour: 90,
      tooltip: '',
      helpUrl: '',
      message0: "%1  是否存在",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": IOOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['IO_OutputIsExist'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getBool("OutputIsExist","' + code1 + '",false)', javascriptGenerator.ORDER_ATOMIC]
};



//自定义积木
jsondata.value.servo.kinco.forEach((item) => {

  Blockly.Blocks[item.name + 'MoveAt'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'MoveAt',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField(item.key + '设置速度')
        .appendField(new Blockly.FieldNumber(0), "VALUE");
    }
  };
  javascriptGenerator[item.name + 'MoveAt'] = function (block) {
    var code = block.getFieldValue('VALUE')
    return 'setDouble("MoveAt", "' + item.name + '", ' + code + ');\n'
  };



  Blockly.Blocks[item.name + 'FindError'] = {
    init: function () {
      this.jsonInit({
        type: Object.keys(item)[0] + 'FindError',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setOutput(true, null);
      this.appendDummyInput()
        .appendField(item.key + '获取错误')


    }
  };
  javascriptGenerator[item.name + 'FindError'] = function (block) {
    return ['getInt("FindError", "' + item.name + '",0)', javascriptGenerator.ORDER_ATOMIC]
  };


  Blockly.Blocks[item.name + 'ServoClear'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'ServoClear',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField(item.key + '伺服清错')
    }
  };
  javascriptGenerator[item.name + 'ServoClear'] = function (block) {
    return 'setBool("ServoClear", "' + item.name + '",true);\n'
  };

  Blockly.Blocks[item.name + 'Lock'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'Lock',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField(item.key + '抱闸')
    }
  };
  javascriptGenerator[item.name + 'Lock'] = function (block) {
    return 'setBool("Lock", "' + item.name + '",true);\n'
  };


  Blockly.Blocks[item.name + 'SetHomemodeStart'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'SetHomemodeStart',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField(item.key + '复位标志位')
    }
  };
  javascriptGenerator[item.name + 'SetHomemodeStart'] = function (block) {
    return 'setBool("SetHomemodeStart", "' + item.name + '",false);\n'
  };

  Blockly.Blocks[item.name + 'GoHome'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'GoHome',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setOutput(true, null);
      this.appendDummyInput()
        .appendField(item.key + '复位')
    }
  };
  javascriptGenerator[item.name + 'GoHome'] = function (block) {
    return ['getBool("GoHome", "' + item.name + '",false)', javascriptGenerator.ORDER_ATOMIC]
  };

  Blockly.Blocks[item.name + 'Normalvel'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'Normalvel',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setOutput(true, null);
      this.appendDummyInput()
        .appendField(item.key + '的速度')
    }
  };
  javascriptGenerator[item.name + 'Normalvel'] = function (block) {
    return ['getDouble("Normalvel", "' + item.name + '",0.0)', javascriptGenerator.ORDER_ATOMIC]
  };

  Blockly.Blocks[item.name + 'ServoPos'] = {
    init: function () {
      this.jsonInit({
        type: item.name + 'ServoPos',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setOutput(true, null);
      this.appendDummyInput()
        .appendField(item.key + '的位置')
    }
  };
  javascriptGenerator[item.name + 'ServoPos'] = function (block) {
    return ['getDouble("ServoPos", "' + item.name + '",0.0)', javascriptGenerator.ORDER_ATOMIC]
  };

});
Blockly.Blocks.servo_Name = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_Name',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_Name'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');

  return ['"' + code1 + '"', javascriptGenerator.ORDER_ATOMIC]
};

Blockly.Blocks.servo_MoveAt = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_MoveAt',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴设置速度 %2",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
        {
          "type": "field_number",
          "name": "Get_number",
          "value": 0, // 默认值
          // "min": 0,   // 可选，最小值
          // "max": 100  // 可选，最大值
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['servo_MoveAt'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = block.getFieldValue('Get_number');
  return 'setDouble("MoveAt","' + code1 + '",' + code2 + ');\n'
};
Blockly.Blocks.servo_Moveto = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_Moveto',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴设置位置 %2",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['servo_Moveto'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return 'setDouble("MoveTo","' + code1 + '",' + code2 + ');\n'
};
Blockly.Blocks.servo_Finderror = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_Finderror',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴获取错误",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_Finderror'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getInt("FindError", "' + code1 + '",0)', javascriptGenerator.ORDER_ATOMIC]
};


Blockly.Blocks.servo_to_pos = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_to_pos',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴最大目标位置",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_to_pos'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("MaxHeight", "' + code1 + '",0.0)', javascriptGenerator.ORDER_ATOMIC]
};


Blockly.Blocks.servo_ServoClear = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_ServoClear',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴伺服清错",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['servo_ServoClear'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return 'setBool("ServoClear", "' + code1 + '",true);\n'
};

Blockly.Blocks.servo_Lock = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_Lock',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴抱闸",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['servo_Lock'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return 'setBool("Lock", "' + code1 + '",true);\n'
};





Blockly.Blocks.servo_SetHomemodeStart = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_SetHomemodeStart',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴复位标志位",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['servo_SetHomemodeStart'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return 'setBool("SetHomemodeStart", "' + code1 + '",false);\n'
};
Blockly.Blocks.servo_GoHome = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_GoHome',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴复位",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_GoHome'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getBool("GoHome", "' + code1 + '",false)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.servo_HomeGoHome = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_HomeGoHome',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴原点模式复位",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_HomeGoHome'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getBool("HomeModeGoHome", "' + code1 + '",false)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.servo_Normalvel = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_Normalvel',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴的速度",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_Normalvel'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("Normalvel", "' + code1 + '",0.0)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.servo_ServoPos = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_ServoPos',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴的位置",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_ServoPos'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("ServoPos", "' + code1 + '",0.0)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.servo_ServoPos1 = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'servo_ServoPos1',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴的码值",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['servo_ServoPos1'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("GetLifterPos", "' + code1 + '",0)', javascriptGenerator.ORDER_ATOMIC]
};
Blockly.Blocks.set_pos_zero = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'set_pos_zero',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: " %1 轴设置当前位置为原点",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },

      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['set_pos_zero'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return 'setDouble("DefineHomeEx", "' + code1 + '",0.0);\n'
};

Blockly.Blocks.AGV_STOP = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'AGV_STOP',
      colour: 60,
      tooltip: '',
      helpUrl: '',
      message0: "AGV停止",
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['AGV_STOP'] = function (block) {
  var code1 = "rack";
  return 'setBool("agvStop", "' + code1 + '",true);\n'
};

Blockly.Blocks.check_x = {
  init: function () {
    // 获取设备选项
    let deviceOptions = [];
    if (jsondata.value.device.camera) {
      deviceOptions = jsondata.value.device.camera.map(device => {
        return [device.key, device.value]; // 显示名称和实际值
      });
    }

    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'check_x',
      colour: 30,
      tooltip: '',
      helpUrl: '',
      message0: "获取 %1  x坐标",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['check_x'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("ReadCameraX", "' + code1 + '", 99)', javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks.check_y = {
  init: function () {
    // 获取设备选项
    let deviceOptions = [];
    if (jsondata.value.device.camera) {
      deviceOptions = jsondata.value.device.camera.map(device => {
        return [device.key, device.value]; // 显示名称和实际值
      });
    }
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'check_y',
      colour: 30,
      tooltip: '',
      helpUrl: '',
      message0: "获取 %1  y坐标",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['check_y'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("ReadCameraY", "' + code1 + '", 99)', javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks.check_thitea = {
  init: function () {
    // 获取设备选项
    let deviceOptions = [];
    if (jsondata.value.device.camera) {
      deviceOptions = jsondata.value.device.camera.map(device => {
        return [device.key, device.value]; // 显示名称和实际值
      });
    }
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'check_thitea',
      colour: 30,
      tooltip: '',
      helpUrl: '',
      message0: "获取 %1  角度",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['check_thitea'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getDouble("ReadCameraAngle", "' + code1 + '", 99)', javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks.check_ID = {
  init: function () {
    // 获取设备选项
    let deviceOptions = [];
    if (jsondata.value.device.camera) {
      deviceOptions = jsondata.value.device.camera.map(device => {
        return [device.key, device.value]; // 显示名称和实际值
      });
    }
    if (deviceOptions.length === 0) {
      deviceOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'check_ID',
      colour: 30,
      tooltip: '',
      helpUrl: '',
      message0: "获取 %1  ID",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": deviceOptions
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['check_ID'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  return ['getInt("ReadCameraID", "' + code1 + '", 0)', javascriptGenerator.ORDER_ATOMIC];
};
Blockly.Blocks.check_ON = {
  init: function () {
    // 获取设备选项
    let IOOptions = [];
    if (jsondata.value.device.camera) {
      IOOptions = jsondata.value.device.camera.map(device => {
        return [device.key, device.value]; // 显示名称和实际值
      });
    }
    if (IOOptions.length === 0) {
      IOOptions.push(["", ""]); // 添加一个默认选项
    }
    this.jsonInit({
      type: 'check_ON',
      colour: 30,
      tooltip: '',
      helpUrl: '',
      message0: "%2 %1  ",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": IOOptions
        },
        {
          "type": "field_dropdown",
          "name": "Get_bool_Type",
          "options": [
            [
              "关闭",
              "false"
            ],
            [
              "打开",
              "true"
            ]
          ]
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, null);
  }
};
javascriptGenerator['check_ON'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = block.getFieldValue('Get_bool_Type');
  return 'setBool("SetCameraOn","' + code1 + '",' + code2 + ');\n'
};

//Set
Blockly.Blocks.Set_Block = {
  init: function () {
    // 获取所有需要的数组
    const outputOptions = jsondata.value.IO.output.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });

    const inputOptions = jsondata.value.IO.input.map(device => {
      return [device.key, device.name];
    });

    const servoOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name];
    });

    // 获取 device 中所有字段的选项
    const deviceOptions = Object.entries(jsondata.value.device || {}).flatMap(([key, devices]) => {
      return devices.map(device => [device.key, device.value]); // 提取 key 和 value
    });

    // 合并所有选项
    const IOOptions = outputOptions.concat(inputOptions, servoOptions, deviceOptions);


    IOOptions.push(["", ""]); // 添加一个默认选项

    this.jsonInit({
      type: 'Set_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: "%3设置调用 %1车体函数 %2  默认值%4",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Set_Type",
          "options": [
            [
              "布尔型",
              "setBool"
            ],
            [
              "双精度型",
              "setDouble"
            ],
            [
              "整型",
              "setInt"
            ],
          ]
        },
        {
          "type": "field_input",
          "name": "FunctionName",
          "text": "调用函数"
        },
        {
          "type": "field_dropdown",
          "name": "Parameter",
          "options": IOOptions
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['Set_Block'] = function (block) {
  var code1 = block.getFieldValue('Set_Type');
  var code2 = block.getFieldValue('FunctionName');
  var code3 = block.getFieldValue('Parameter');
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return code1 + '("' + code2 + '","' + code3 + '",' + code4 + ');\n';
};
//Get
Blockly.Blocks.Get_Block = {
  init: function () {
    // 获取所有需要的数组
    const outputOptions = jsondata.value.IO.output.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });

    const inputOptions = jsondata.value.IO.input.map(device => {
      return [device.key, device.name];
    });

    const servoOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name];
    });

    // 获取 device 中所有字段的选项
    const deviceOptions = Object.entries(jsondata.value.device || {}).flatMap(([key, devices]) => {
      return devices.map(device => [device.key, device.value]); // 提取 key 和 value
    });

    // 合并所有选项
    const IOOptions = outputOptions.concat(inputOptions, servoOptions, deviceOptions);


    IOOptions.push(["", ""]); // 添加一个默认选项

    this.jsonInit({
      type: 'Get_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: " %3调用返回%1 车体函数 %2  默认值%4",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": [
            [
              "布尔型",
              "getBool"
            ],
            [
              "双精度型",
              "getDouble"
            ],
            [
              "整型",
              "getInt"
            ],
          ]
        },
        {
          "type": "field_input",
          "name": "FunctionName",
          "text": "调用函数"
        },
        {
          "type": "field_dropdown",
          "name": "Parameter",
          "options": IOOptions
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['Get_Block'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = block.getFieldValue('FunctionName');
  var code3 = block.getFieldValue('Parameter');
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};


//Get
Blockly.Blocks.Get_Block2 = {
  init: function () {
    this.jsonInit({
      type: 'Get_Block2',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: " 调用返回%1 车体函数 %2 %3 默认值%4",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": [
            [
              "布尔型",
              "getBool"
            ],
            [
              "双精度型",
              "getDouble"
            ],
            [
              "整型",
              "getInt"
            ],
          ]
        },
        {
          "type": "field_input",
          "name": "FunctionName",
          "text": "调用函数"
        },
        {
          "type": "input_value",
          "name": "Parameter",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['Get_Block2'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2 = block.getFieldValue('FunctionName');
  var code3 = javascriptGenerator.valueToCode(block, 'Parameter', javascriptGenerator.ORDER_NONE);
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};



Blockly.Blocks.error_Block = {
  init: function () {
    this.jsonInit({
      type: 'error_Block',
      colour: 20,
      tooltip: '',
      helpUrl: '',
    });

    this.appendDummyInput('INPUT')
      .appendField("异常个数")
      .appendField(new Blockly.FieldDropdown(
        Array.from({ length: 20 }, (v, k) => [`${k + 1}`, `${k + 1}`])
      ), 'NUMBER')

    this.setOutput(true, null);
    this.updateInputs(); // 初始化时添加输入字段
    this.setOnChange(this.onChange.bind(this)); // 绑定变化事件
  },

  // 更新输入字段的方法
  updateInputs: function () {
    const numberOfSteps = parseInt(this.getFieldValue('NUMBER'), 10);
    const currentSteps = this.inputList.filter(input => input.name.startsWith('VALUE_')).length;

    // 添加输入字段
    for (let i = currentSteps; i < numberOfSteps; i++) {
      const stepInput = this.appendValueInput(`VALUE_${i}`)
    }

    // 删除多余的输入字段
    for (let i = currentSteps - 1; i >= numberOfSteps; i--) {
      this.removeInput(`VALUE_${i}`);

    }
  },

  // 监听变化事件
  onChange: function (event) {
    if (event.type === Blockly.Events.CHANGE) {
      if (event.element === 'field' && event.name === 'NUMBER') {
        this.updateInputs();
      } else if (event.element === 'field' && event.name.startsWith('STEP_NUMBER_')) {
        const index = parseInt(event.name.split('_')[2], 10);
        const selectedNumber = parseInt(this.getFieldValue(event.name), 10);
        this.updateStepInputs(index, selectedNumber);
      }
    }
  },

  // 更新步骤输入的方法
  updateStepInputs: function (index, selectedNumber) {
    const currentInputs = this.inputList.filter(input => input.name.startsWith(`STEP_INPUT_${index}_`)).length;

    // 添加或删除步骤输入字段
    for (let i = currentInputs; i < selectedNumber; i++) {
      this.appendValueInput(`STEP_INPUT_${index}_${i}`)
        .appendField(`第 ${index + 1} 步 第 ${i + 1}个异常`)
        .setCheck('Number'); // 可选：设置输入类型为数字
    }

    for (let i = currentInputs - 1; i >= selectedNumber; i--) {
      this.removeInput(`STEP_INPUT_${index}_${i}`);
    }
  }
};
javascriptGenerator['error_Block'] = function (block) {
  return ''; // 根据需要生成代码
};
Blockly.Blocks.task_Block = {
  init: function () {
    this.jsonInit({
      type: 'task_Block',
      colour: 20,
      tooltip: '',
      helpUrl: '',
    });

    this.appendDummyInput('INPUT')
      .appendField(new Blockly.FieldNumber(), 'NUMBER1')
      .appendField("号任务共")
      .appendField(new Blockly.FieldDropdown(
        Array.from({ length: 20 }, (v, k) => [`${k + 1}`, `${k + 1}`])
      ), 'NUMBER')
      .appendField("步");

    this.updateInputs(); // 初始化时添加输入字段
    this.setOnChange(this.onChange.bind(this)); // 绑定变化事件
  },

  // 更新输入字段的方法
  updateInputs: function () {
    const numberOfSteps = parseInt(this.getFieldValue('NUMBER'), 10);
    const currentSteps = this.inputList.filter(input => input.name.startsWith('VALUE_')).length;

    // 添加输入字段
    for (let i = currentSteps; i < numberOfSteps; i++) {

      const stepInput = this.appendValueInput(`VALUE_${i}`)
        .appendField(`第 ${i + 1} 步动作`)

      this.appendValueInput(`VALUE2_${i}`)
        .appendField('异常');
    }

    // 删除多余的输入字段
    for (let i = currentSteps - 1; i >= numberOfSteps; i--) {
      this.removeInput(`VALUE_${i}`);
      this.removeInput(`VALUE2_${i}`);
    }
  },

  // 监听变化事件
  onChange: function (event) {
    if (event.type === Blockly.Events.CHANGE) {
      if (event.element === 'field' && event.name === 'NUMBER') {
        this.updateInputs();
      } else if (event.element === 'field' && event.name.startsWith('STEP_NUMBER_')) {
        const index = parseInt(event.name.split('_')[2], 10);
        const selectedNumber = parseInt(this.getFieldValue(event.name), 10);
        this.updateStepInputs(index, selectedNumber);
      }
    }
  },

  // 更新步骤输入的方法
  updateStepInputs: function (index, selectedNumber) {
    const currentInputs = this.inputList.filter(input => input.name.startsWith(`STEP_INPUT_${index}_`)).length;

    // 添加或删除步骤输入字段
    for (let i = currentInputs; i < selectedNumber; i++) {
      this.appendValueInput(`STEP_INPUT_${index}_${i}`)
        .appendField(`第 ${index + 1} 步 第 ${i + 1}个异常`)
        .setCheck('Number'); // 可选：设置输入类型为数字
    }

    for (let i = currentInputs - 1; i >= selectedNumber; i--) {
      this.removeInput(`STEP_INPUT_${index}_${i}`);
    }
  }
};
javascriptGenerator['task_Block'] = function (block) {
  return ''; // 根据需要生成代码
};

const toolboxXml = `
<xml id="toolbox" style="display: none">
     <category name="任务" colour="20">
      <block type="task_Block"></block>
      <block type="error_Block"></block>
   
      
    </category>
    <category name="动作" colour="290" custom="PROCEDURE">
      
    </category>
  
  <category name="伺服" colour="60">
    
    
    <block type="servo_Name"></block>
    <block type="servo_MoveAt"></block>
    <block type="servo_Finderror"></block>
    <block type="servo_ServoClear"></block>
    <block type="servo_Lock"></block>
    <block type="servo_SetHomemodeStart"></block>
    <block type="set_pos_zero"></block>
    <block type="servo_GoHome"></block>
    <block type="servo_HomeGoHome"></block>
    <block type="servo_Normalvel"></block>
    <block type="servo_ServoPos"></block>
    <block type="AGV_STOP"></block>
    <block type="servo_ServoPos1"></block>
    <block type="servo_Moveto"></block>
    <block type="servo_to_pos"></block>
    

  </category>
    <category name="数据存储" colour="45">
      <block type="SAYE_Block"></block>
      <block type="LOAD_Block"></block>
      <block type="LOAD_Block_input"></block>

      
    </category>
    <category name="交互数据" colour="10">
            <block type="TCSET_Block"></block>
            <block type="TCSHOW_Block"></block>
            <block type="TCGET_Block"></block>
    </category>
  <category name="输入点" colour="90">
    <block type="IO_input"></block>
    <block type="IO_InputIsExist"></block>
  </category>

      <category name="输出点" colour="90">
    <block type="IO_Output"></block>
      <block type="IO_OutputIsExist"></block>
      
  </category>
      <category name="设备" colour="30">
      <block type="check_x"></block>
      <block type="check_y"></block>
      <block type="check_ID"></block>
      <block type="check_ON"></block>
      <block type="check_thitea"></block>
      
  </category>
  

  <category name="控制" colour="180">
      <block type="Return_Block"></block>
      <block type="String_Block"></block>
      <block type="Print_Block"></block>
      <block type="Set_Block"></block>
      
      <block type="Get_Block"></block>
      
      <block type="Counter_Block"></block>
      <block type="Get_Block2"></block>
      
    </category>
      <category name="变量" colour="330">
      <block type="GValue_Block"></block>
      <block type="SValue_Block"></block>
      <block type="GValue_Blockw"></block>
      <block type="GValue_Blocke"></block>
    </category>
    <category name="逻辑" colour="210">
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_boolean"></block>
          <block type="logic_null"></block>
          <block type="logic_ternary"></block>
          <block type="controls_if"></block>
          <block type="controls_ifelse"></block>
        </category>

        <category name="循环" colour="120">
          <block type="controls_repeat_ext"></block>
          <block type="controls_whileUntil"></block>
          <block type="controls_for"></block>
          <block type="controls_forEach"></block>
          <block type="controls_flow_statements"></block>
        </category>
        <category name="数学" colour="230">
          <block type="math_number"></block>
          <block type="math_arithmetic"></block>
          <block type="math_single"></block>
          <block type="math_trig"></block>
          <block type="math_constant"></block>
          <block type="math_number_property"></block>
          <block type="math_round"></block>
          <block type="math_on_list"></block>
          <block type="math_modulo"></block>
          <block type="math_constrain"></block>
          <block type="math_random_int"></block>
          <block type="math_random_float"></block>
        </category>

        <category name="列表" colour="260">
            <block type="lists_create_empty"></block>
            <block type="lists_create_with"></block>
            <block type="lists_repeat"></block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf"></block>
            <block type="lists_getIndex"></block>
            <block type="lists_setIndex"></block>
            <block type="lists_getSublist"></block>
            <block type="lists_split"></block>
            <block type="lists_sort"></block>
          </category>
          <category name="文本" colour="160">
          <block type="text_length"></block>
          <block type="text_isEmpty"></block>
          <block type="text_indexOf"></block>
          <block type="text_charAt"></block>
          <block type="text_getSubstring"></block>
          <block type="text_changeCase"></block>
          </category>
          <category name="扩展" colour="0">
            <block type="GETEX_Block"></block>
          </category>
        </category>


</xml>
`;
const workspace = ref(null);
// ${jsondata.value.IO.input.map(item => `
//     <category name="${item.key}" colour="180">
//       <block type="${item.name + 'input'}"></block>
//       <block type="${item.name + 'InputIsExist'}"></block>
//     </category>
//       `).join('')}
//sifu
// ${jsondata.value.servo.kinco.map(item => `
//     <category name="${item.key}" colour="180">
//       <block type="${item.name + 'MoveAt'}"></block>
//       <block type="${item.name + 'Normalvel'}"></block>
//       <block type="${item.name + 'ServoPos'}"></block>
//       <block type="${item.name + 'FindError'}"></block>
//       <block type="${item.name + 'ServoClear'}"></block>
//       <block type="${item.name + 'Lock'}"></block>
//       <block type="${item.name + 'SetHomemodeStart'}"></block>
//       <block type="${item.name + 'GoHome'}"></block>
//     </category>
//   `).join('')}

const initBlockly = () => {
  console.log('toolboxXml', toolboxXml);
  workspace.value = Blockly.inject('blockly-div', {

    toolbox: toolboxXml,
    theme: Blockly.Theme.defineTheme('themeName', {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: '#000000',
        toolboxBackgroundColour: '#333',
        toolboxForegroundColour: '#fff',
        flyoutBackgroundColour: '#252526',
        flyoutForegroundColour: '#ccc',
        flyoutOpacity: 1,
        scrollbarColour: '#797979',
        insertionMarkerColour: '#fff',
        insertionMarkerOpacity: 0.3,
        scrollbarOpacity: 0.4,
        cursorColour: '#d0d0d0',
        blackBackground: '#333',
      },
      fontStyle: {
        family: 'Georgia, serif',
        size: 12,
        text: {
          fill: '#ffffff', // 设置为黑色
        },
      },
    }),
    grid: {
      spacing: 30,
      length: 2,
      colour: '#ffffff',
      snap: true,
    },
  });

  // workspace.value.addChangeListener(updateCode);
};
const dialogVisible = ref(false)
const checkcode = () => {
  updateCode();
  dialogVisible.value = true;
};
const functionName = ref('');
let intervalId = {};
const currentBlinkColor = ref({});
const startBlinking = () => {
  // 获取所有积木
  const allBlocks = workspace.value.getAllBlocks();

  // 查找匹配的函数块
  const matchingBlocks = allBlocks.filter(b => b.getFieldValue('NAME') === functionName.value);
  // 检查是否已经在闪烁状态
  updateCode();

  if (currentBlinkColor.value[matchingBlocks] === 'green') {

    return;
  }
  if (matchingBlocks.length > 0) {
    let ishight = false;

    // 定义高亮函数
    const highlightBlocks = (blocks) => {
      blocks.forEach(block => {
        block.setHighlighted(ishight);
        // 递归高亮子积木
        highlightBlocks(block.getChildren());
      });
    };

    highlightBlocks(matchingBlocks); // 初始高亮
    currentBlinkColor.value[matchingBlocks] = 'green';

    intervalId[matchingBlocks] = setInterval(() => {
      ishight = !ishight;
      highlightBlocks(matchingBlocks); // 切换高亮状态
    }, 500);


  } else {

  }
};


const getExceptionName = (exceptionKey) => {
  const exception = functions.value.find(func => func.key === exceptionKey);
  return exception ? exception.name : exceptionKey; // 如果找不到匹配，返回原始的异常名称
};

const exportJSON = async () => {
  updateCode();
  if (code.value) {
    const jsonBlob = new Blob([code.value], { type: 'application/javascript' });
    const xml = Blockly.Xml.workspaceToDom(workspace.value);
    const xmlText = Blockly.Xml.domToText(xml);
    const xmlBlob = new Blob([xmlText], { type: 'text/xml' });

    await Promise.all([
      handleFileUpload(jsonBlob, 'task.js'),
      handleFileUpload(xmlBlob, 'task.xml'),
    ]);
  }
};
const handleFileUpload = async (file, fileName) => {
  if (!file) return;

  try {
    const response = await axios({
      method: 'post',
      url: '/api/upload',
      data: file,
      headers: {
        'Content-Type': file.type,
        'X-File-Name': fileName,
      },
    });
    ElMessage.success(`${fileName} 上传成功`);
    console.log(`${fileName} 上传成功:`, response.data);
  } catch (error) {
    ElMessage.error(`上传 ${fileName} 时出错:`, error);
    console.error(`上传 ${fileName} 时出错:`, error);
  }
};

const saveBlocks = () => {
  updateCode();
  if (code.value) {
    const jsonBlob = new Blob([code.value], { type: 'application/js' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'task.js';
    link.click();
    URL.revokeObjectURL(url);

    const xml = Blockly.Xml.workspaceToDom(workspace.value);
    const xmlText = Blockly.Xml.domToText(xml);
    const link1 = document.createElement('a');
    link1.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlText);
    link1.download = 'task.xml';
    link1.click();
  }


};

const loadBlocks = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xml';

  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileName = file.name;

      if (fileName === 'task.xml') {
        const xmlText = reader.result;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const workspace = Blockly.getMainWorkspace();
        workspace.clear();

        Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);

        const metrics = workspace.getMetrics();
        const x = metrics.contentWidth / 2 - metrics.viewWidth / 2;
        const y = metrics.contentHeight / 2 - metrics.viewHeight / 2;
        workspace.scroll(x, y);
      } else {
        alert(`只接受名为 task.xml 的文件`);
      }
    };

    reader.readAsText(file);
    ElMessage.success('完成');
  };

  fileInput.click();
};


const loadBlocksfromAGV = () => {

  let userList = {
    data: 'task.xml',
    group: 'siasun',
    account: 'test',
    password: '123456'
  }

  axios({
    method: 'post',
    url: '/api/data/jsoneditor',
    data: JSON.stringify(userList)
  })
    .then((res) => {
      ElMessage.success('请求成功')
      const xmlText = res.data;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const workspace = Blockly.getMainWorkspace();
      workspace.clear();

      Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);

      const metrics = workspace.getMetrics();
      const x = metrics.contentWidth / 2 - metrics.viewWidth / 2;
      const y = metrics.contentHeight / 2 - metrics.viewHeight / 2;
      workspace.scroll(x, y);
    })
    .catch((error) => {
      ElMessage.error('请求失败')
    })
    .finally(() => {
      // 可以在此处执行其他操作
    })


};



const updateCode = () => {


  const allBlocks = workspace.value.getAllBlocks();
  const matchingBlocks = allBlocks.filter(b => {
    const name = b.getFieldValue('NAME');
    const isFunctionBlock = b.type === 'procedures_defnoreturn' || b.type === 'procedures_defreturn'; // 检查块类型
    return name && isFunctionBlock; // 确保有名称且是函数定义块
  });
  matchingBlocks.forEach(block => {
    const name = block.getFieldValue('NAME'); // 获取当前名称
    const comment = block.getCommentText(); // 获取当前注释

    // 设置新的名称和注释
    block.setFieldValue(comment, 'NAME'); // 将注释设置为名称
    block.setCommentText(name); // 将名称设置为注释

  });

  code.value = javascriptGenerator.workspaceToCode(workspace.value);
  code.value = code.value.replace(/\/\/ 描述该功能\.\.\./g, '').trim();
  const allBlocks1 = workspace.value.getAllBlocks();
  const matchingBlocks1 = allBlocks1.filter(b => {
    const name = b.getFieldValue('NAME');
    const isFunctionBlock = b.type === 'procedures_defnoreturn' || b.type === 'procedures_defreturn'; // 检查块类型
    return name && isFunctionBlock; // 确保有名称且是函数定义块
  });
  matchingBlocks1.forEach(block => {
    const name = block.getFieldValue('NAME'); // 获取当前名称
    const comment = block.getCommentText(); // 获取当前注释

    // 设置新的名称和注释
    block.setFieldValue(comment, 'NAME'); // 将注释设置为名称
    block.setCommentText(name); // 将名称设置为注释


  });

};

onMounted(() => {
  initBlockly();
});

import { timer_task } from '@/timer.js'
const responseData = ref(null)
const fetchVelocity1 = () => {
  let userList = {
    group: 'siasun',
    account: 'test',
    password: '123456'
  }
  axios({
    method: 'post',
    url: '/api/data/analysis',
    data: JSON.stringify(userList)
  })
    .then((res) => {
      responseData.value = res.data;
      // 根据 taskStatus 更新闪烁状态
      const taskStatus = responseData.value.subTaskStatus.main_result;
      if (taskStatus === 1) {
        //停止闪烁
        const allBlocks = workspace.value.getAllBlocks();
        const matchingBlocks = allBlocks.filter(b => b.getFieldValue('NAME') === responseData.value.subTaskStatus.main_name);

        if (matchingBlocks.length > 0) {
          clearInterval(intervalId[matchingBlocks]);
          matchingBlocks.forEach(block => {
            block.setHighlighted(false); // 确保在结束后关闭高亮
            highlightBlocks(block.getChildren()); // 关闭子积木的高亮
            currentBlinkColor.value[matchingBlocks] === null;
          });

        }
      } else {
        functionName.value = responseData.value.subTaskStatus.main_name;
        startBlinking();
        //开始闪烁
      }



    })
    .catch((error) => {

    })
    .finally(() => {

    })


  timer_task.value = setTimeout(fetchVelocity1, 500);
}

onMounted(() => {
  fetchVelocity1()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo1 {

  margin-top: 100px;
}
</style>
<style scoped>
.data-item {
  padding: 10px;
  transition: background-color 0.3s;
}

.error-details {
  position: absolute;
  background-color: #f9f9f967;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  top: 18%;
  right: 5%;
  z-index: 100;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.error-item {
  margin-bottom: 10px;
}

.error-item strong {
  color: #333;
}
</style>