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

        <div class="button-container" style="
            position: absolute;
            top: 5%;
            right: 5%;
            z-index :100;
          ">

          <el-button type="danger" @click="exportJSON">
            同步js与xml到AGV
          </el-button>
          <el-button type="success" @click="saveBlocks">
            保存js与xml到本地
          </el-button>
          <el-button type="primary" @click="loadBlocks">
            在本地加载xml
          </el-button>
          <el-button type="primary" @click="loadBlocksfromAGV">
            在AGV加载xml
          </el-button>
          <el-button type="info" @click="checkcode">
            查看代码
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
import { jsondata, code } from '../common.js'
import * as hans from 'blockly/msg/zh-hans';
import axios from 'axios'
import './config';
import DefinScrollbar from "@/components/DefinScrollbar.vue";
Blockly.setLocale(hans);
Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "名称";
Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "任务";
Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];

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
    this.jsonInit({
      type: 'IO_input',
      colour: 180,
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
    this.jsonInit({
      type: 'IO_InputIsExist',
      colour: 180,
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
    this.jsonInit({
      type: 'IO_Output',
      colour: 180,
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
  return 'setBool("Output","' + code1 + '",'+code2+');\n'
};
Blockly.Blocks.IO_OutputIsExist = {
  init: function () {
    // 获取设备选项
    const IOOptions = jsondata.value.IO.output.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'IO_OutputIsExist',
      colour: 180,
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

Blockly.Blocks.servo_MoveAt = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'servo_MoveAt',
      colour: 180,
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
Blockly.Blocks.servo_Finderror = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'servo_Finderror',
      colour: 180,
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
Blockly.Blocks.servo_ServoClear = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'servo_ServoClear',
      colour: 180,
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
    this.jsonInit({
      type: 'servo_Lock',
      colour: 180,
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
    this.jsonInit({
      type: 'servo_SetHomemodeStart',
      colour: 180,
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
    this.jsonInit({
      type: 'servo_GoHome',
      colour: 180,
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
Blockly.Blocks.servo_Normalvel = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.servo.kinco.map(device => {
      return [device.key, device.name]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'servo_Normalvel',
      colour: 180,
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
    this.jsonInit({
      type: 'servo_ServoPos',
      colour: 180,
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




Blockly.Blocks.check_x = {
  init: function () {
    // 获取设备选项
    const deviceOptions = jsondata.value.device.camera.map(device => {
      return [device.key, device.value]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'check_x',
      colour: 180,
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
    const deviceOptions = jsondata.value.device.camera.map(device => {
      return [device.key, device.value]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'check_y',
      colour: 180,
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
    const deviceOptions = jsondata.value.device.camera.map(device => {
      return [device.key, device.value]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'check_thitea',
      colour: 180,
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
    const deviceOptions = jsondata.value.device.camera.map(device => {
      return [device.key, device.value]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'check_ID',
      colour: 180,
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
    const IOOptions = jsondata.value.device.camera.map(device => {
      return [device.key, device.value]; // 显示名称和实际值
    });
    this.jsonInit({
      type: 'check_ON',
      colour: 180,
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
  return 'setBool("SetCameraOn","' + code1 + '",'+code2+');\n'
};
const toolboxXml = `
<xml id="toolbox" style="display: none">
   <category name="任务" colour="290" custom="PROCEDURE"></category>
  <category name="伺服" colour="180">
    <block type="servo_MoveAt"></block>
    <block type="servo_Finderror"></block>
    <block type="servo_ServoClear"></block>
    <block type="servo_Lock"></block>
    <block type="servo_SetHomemodeStart"></block>
    <block type="servo_GoHome"></block>
    <block type="servo_Normalvel"></block>
    <block type="servo_ServoPos"></block>

  </category>
  <category name="传感器" colour="180">
  <category name="输入点" colour="180">
    <block type="IO_input"></block>
    <block type="IO_InputIsExist"></block>
  </category>

      <category name="输出点" colour="180">
    <block type="IO_Output"></block>
      <block type="IO_OutputIsExist"></block>
      
  </category>
      <category name="设备" colour="180">
      <block type="check_x"></block>
      <block type="check_y"></block>
      <block type="check_ID"></block>
      <block type="check_ON"></block>
      <block type="check_thitea"></block>
      
  </category>
  </category>

  <category name="控制" colour="180">
      <block type="Return_Block"></block>
      <block type="String_Block"></block>
      <block type="Print_Block"></block>
      <block type="Set_Block"></block>
      <block type="Set2_Block"></block>
      <block type="Get_Block"></block>
      <block type="Get2_Block"></block>
      <block type="Counter_Block"></block>
    </category>
      <category name="变量" colour="330">
      <block type="GValue_Block"></block>
      <block type="SValue_Block"></block>
      <block type="GValue_Blockw"></block>
      <block type="GValue_Blocke"></block>
    </category>
    <category name="逻辑" colour="180">
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

        <category name="任务" colour="290" custom="PROCEDURE"></category>
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

  workspace.value.addChangeListener(updateCode);
};
const dialogVisible = ref(false)
const checkcode = () => {
  dialogVisible.value = true;
};
const functionName = ref('');
const startBlinking = () => {
  // 获取所有积木
  const allBlocks = workspace.value.getAllBlocks();

  // 查找匹配的函数块
  const matchingBlocks = allBlocks.filter(b => b.getFieldValue('NAME') === functionName.value);

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

    const intervalId = setInterval(() => {
      ishight = !ishight;
      highlightBlocks(matchingBlocks); // 切换高亮状态
    }, 500);

    // // 停止闪烁的逻辑 (可选)
    // setTimeout(() => {
    //   clearInterval(intervalId);
    //   matchingBlocks.forEach(block => {
    //     block.setHighlighted(false); // 确保在结束后关闭高亮
    //     highlightBlocks(block.getChildren()); // 关闭子积木的高亮
    //   });
    // }, 5000);
  } else {
    ElMessage.error('未找到指定函数块');
  }
};



const exportJSON = async () => {
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
  code.value = javascriptGenerator.workspaceToCode(workspace.value);
  code.value = code.value.replace(/\/\/ 描述该功能\.\.\./g, '').trim();
};

onMounted(() => {
  initBlockly();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo1 {

  margin-top: 100px;
}
</style>
