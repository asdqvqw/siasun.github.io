import * as Blockly from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript';
// import * as hans from 'blockly/msg/zh-hans';
import { jsondata } from '../common.js'
// Blockly.setLocale(hans);

//自定义积木
//返回
Blockly.Blocks.Return_Block = {
  init: function () {
    this.jsonInit({
      type: 'Return_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: "返回 %1",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": [
            [
              "再次执行",
              "0"
            ],
            [
              "执行下一步",
              "1"
            ],
            [
              "异常",
              "2"
            ],
            [
              "3",
              "3"
            ],
            [
              "4",
              "4"
            ],
            [
              "5",
              "5"
            ],
            [
              "6",
              "6"
            ],
            [
              "7",
              "7"
            ],
            [
              "8",
              "8"
            ],
            [
              "9",
              "9"
            ],
            [
              "10",
              "10"
            ],
          ]
        }
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['Return_Block'] = function (block) {
  var code = block.getFieldValue('Get_Type')
  return 'return ' + code + ' ;';
};
//输入字符串
Blockly.Blocks.String_Block = {
  init: function () {
    this.jsonInit({
      type: 'String_Block',
      colour: 180,
      tooltip: '',
      helpUrl: ''
    });
    this.setOutput(true, null);
    this.appendDummyInput()
      .appendField('“')
      .appendField(new Blockly.FieldTextInput("输入string"), "VALUE")
      .appendField('”');

  }
};
javascriptGenerator['String_Block'] = function (block) {
  var code = block.getFieldValue('VALUE');
  return ['"' + code + '"', javascriptGenerator.ORDER_ATOMIC];
};

//输出
Blockly.Blocks.Print_Block = {
  init: function () {
    this.jsonInit({
      type: 'Print_Block',
      colour: 180,
      tooltip: '',
      helpUrl: ''
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("VALUE")
      .appendField("打印");
  }
};
javascriptGenerator['Print_Block'] = function (block) {
  var code = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE);
  return 'print(' + code + ');\n';
};
//取反
Blockly.Blocks.Counter_Block = {
  init: function () {
    this.jsonInit({
      type: 'Counter_Block',
      colour: 180,
      tooltip: '',
      helpUrl: ''
    });
    this.setOutput(true, null);
    this.appendValueInput("VALUE")
      .appendField("取反");
  }
};
javascriptGenerator['Counter_Block'] = function (block) {
  var code = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE);
  return ['!' + code, javascriptGenerator.ORDER_ATOMIC];
};

//交互数据区
Blockly.Blocks.TCSET_Block = {
  init: function () {
    this.jsonInit({
      type: 'TCSET_Block',
      colour: 10,
      tooltip: '',
      helpUrl: '',
      message0: "发给控制台的数据区索引 %1 的值设置为 %2 ",
      args0: [
        {
          "type": "field_input",
          "name": "Parameter",
          "text": ""
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
javascriptGenerator['TCSET_Block'] = function (block) {
  var code1 = "setInt";
  var code2 = "DASet";
  var code3 = block.getFieldValue('Parameter');
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return code1 + '("' + code2 + '","' + code3 + '",' + code4 + ');\n';
};

Blockly.Blocks.TCSHOW_Block = {
  init: function () {
    this.jsonInit({
      type: 'TCSHOW_Block',
      colour: 10,
      tooltip: '',
      helpUrl: '',
      message0: "查询发给控制台的数据区索引 %1 的值",
      args0: [

        {
          "type": "field_input",
          "name": "Parameter",
          "text": ""
        }
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['TCSHOW_Block'] = function (block) {
  var code1 = "getInt";
  var code2 = "DAShow";

  var code3 = block.getFieldValue('Parameter');
  var code4 = -1;
  return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks.TCGET_Block = {
  init: function () {
    this.jsonInit({
      type: 'TCGET_Block',
      colour: 10,
      tooltip: '',
      helpUrl: '',
      message0: "取出控制台下发数据区索引 %1 的值",
      args0: [

        {
          "type": "field_input",
          "name": "Parameter",
          "text": ""
        }
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['TCGET_Block'] = function (block) {
  var code1 = "getInt";
  var code2 = "DAGet";

  var code3 = block.getFieldValue('Parameter');
  var code4 = 0;
  return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};

//存储数据

Blockly.Blocks.SAYE_Block = {
  init: function () {
    this.jsonInit({
      type: 'SAYE_Block',
      colour: 45,
      tooltip: '',
      helpUrl: '',
      message0: "存储 %1 数据 %2的值为 %3 ",
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
          "name": "Parameter",
          "text": ""
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
javascriptGenerator['SAYE_Block'] = function (block) {
  var code1 = block.getFieldValue('Set_Type');
  var code2;
  if (code1 === "setBool") {
    code2 = "StoreB";
  } else if (code1 === "setDouble") {
    code2 = "StoreD";
  } else if (code1 === "setInt") {
    code2 = "Store";
  }
  var code3 = block.getFieldValue('Parameter');
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return code1 + '("' + code2 + '","' + code3 + '",' + code4 + ');\n';
};


Blockly.Blocks.LOAD_Block = {
  init: function () {
    this.jsonInit({
      type: 'LOAD_Block',
      colour: 45,
      tooltip: '',
      helpUrl: '',
      message0: "加载 %1 数据 %2",
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
          "name": "Parameter",
          "text": ""
        }
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['LOAD_Block'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2;
  if (code1 === "getBool") {
    code2 = "LoadB";
  } else if (code1 === "getDouble") {
    code2 = "LoadD";
  } else if (code1 === "getInt") {
    code2 = "Load";
  }
  var code3 = block.getFieldValue('Parameter');
  if (code1 === "getBool") {
    return [code1 + '("' + code2 + '","' + code3 + '",false'  + ')', javascriptGenerator.ORDER_ATOMIC];
  } else if (code1 === "getDouble") {
    return [code1 + '("' + code2 + '","' + code3 + '",0.0'  + ')', javascriptGenerator.ORDER_ATOMIC];
  } else if (code1 === "getInt") {
    return [code1 + '("' + code2 + '","' + code3 + '",0'  + ')', javascriptGenerator.ORDER_ATOMIC];
  }
  
  
};
Blockly.Blocks.LOAD_Block_input = {
  init: function () {
    this.jsonInit({
      type: 'LOAD_Block_input',
      colour: 45,
      tooltip: '',
      helpUrl: '',
      message0: "加载 %1 数据 %2 并设置默认值为%3",
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
          "name": "Parameter",
          "text": ""
        },
        {
          "type": "input_value",
          "name": "get_bool_Type",
          "check": ['Number', "Boolean", "FunctionNameBlockType"]
        },
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['LOAD_Block_input'] = function (block) {
  var code1 = block.getFieldValue('Get_Type');
  var code2;
  if (code1 === "getBool") {
    code2 = "LoadB";
  } else if (code1 === "getDouble") {
    code2 = "LoadD";
  } else if (code1 === "getInt") {
    code2 = "Load";
  }
  var code3 = block.getFieldValue('Parameter');
  var code4 = javascriptGenerator.valueToCode(block, 'get_bool_Type', javascriptGenerator.ORDER_NONE);

  return [code1 + '("' + code2 + '","' + code3 + '",'+ code4  + ')', javascriptGenerator.ORDER_ATOMIC];

};

//扩展

Blockly.Blocks.GETEX_Block = {
  init: function () {
    this.jsonInit({
      type: 'GETEX_Block',
      colour: 0,
      tooltip: '',
      helpUrl: '',
      message0: "获取第 %1个扩展参数",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Get_Type",
          "options": [
            [
              "0",
              "0"
            ],
            [
              "1",
              "1"
            ],
            [
              "2",
              "2"
            ],
          ]
        }
      ],
    });
    this.setOutput(true, null);
  },

};
javascriptGenerator['GETEX_Block'] = function (block) {
  var code1 = "getInt";
  var code2 = "GetExtParam";

  var code3 = block.getFieldValue('Get_Type');
  var code4 = 0;
  return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};



Blockly.Blocks.Set2_Block = {
  init: function () {
    this.jsonInit({
      type: 'Set2_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: "调用类型 %1 %2 %3 %4",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Set_Type",
          "options": [
            [
              "setBool",
              "setBool"
            ],
            [
              "setDouble",
              "setDouble"
            ],
            [
              "setInt",
              "setInt"
            ],
          ]
        },
        {
          "type": "input_value",
          "name": "FunctionName",  // 将第二个参数改为内部连接器
          "check": ["String", "FunctionNameBlockType"]  // 检查连接的类型
        },
        {
          "type": "input_value",
          "name": "Parameter",
          "check": ["String", "FunctionNameBlockType"]
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean"]
        },
      ],
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['Set2_Block'] = function (block) {
  var code1 = block.getFieldValue('Set_Type');
  var code2 = javascriptGenerator.valueToCode(block, 'FunctionName', javascriptGenerator.ORDER_NONE);
  var code3 = javascriptGenerator.valueToCode(block, 'Parameter', javascriptGenerator.ORDER_NONE);
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return code1 + '(' + code2 + ',' + code3 + ',' + code4 + ');\n';
};




Blockly.Blocks.Get2_Block = {
  init: function () {
    this.jsonInit({
      type: 'Get2_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: "获取 %1 %2 %3 %4",
      args0: [
        {
          "type": "field_dropdown",
          "name": "Set_Type",
          "options": [
            [
              "getBool",
              "getBool"
            ],
            [
              "getDouble",
              "getDouble"
            ],
            [
              "getInt",
              "getInt"
            ],
          ]
        },
        {
          "type": "input_value",
          "name": "FunctionName",  // 将第二个参数改为内部连接器
          "check": ["String", "FunctionNameBlockType"]  // 检查连接的类型
        },
        {
          "type": "input_value",
          "name": "Parameter",
          "check": ["String", "FunctionNameBlockType"]
        },
        {
          "type": "input_value",
          "name": "Set_bool_Type",
          "check": ['Number', "Boolean"]
        },
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['Get2_Block'] = function (block) {
  var code1 = block.getFieldValue('Set_Type');
  var code2 = javascriptGenerator.valueToCode(block, 'FunctionName', javascriptGenerator.ORDER_NONE);
  var code3 = javascriptGenerator.valueToCode(block, 'Parameter', javascriptGenerator.ORDER_NONE);
  var code4 = javascriptGenerator.valueToCode(block, 'Set_bool_Type', javascriptGenerator.ORDER_NONE);
  return [code1 + '(' + code2 + ',' + code3 + ',' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
};


//变量
Blockly.Blocks.GValue_Block = {
  init: function () {
    this.jsonInit({
      type: 'GValue_Block',
      colour: 330,
      tooltip: '',
      helpUrl: '',
      message0: "初始化变量 %1 ",
      args0: [
        {
          "type": "field_input",
          "name": "GValue_input_Block",
          "text": ""
        }
      ],
    });

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("VALUE")
      .appendField("设置为");
  }
};
javascriptGenerator['GValue_Block'] = function (block) {
  var code1 = block.getFieldValue('GValue_input_Block');
  var code2 = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE);
  return 'var ' + code1 + '=' + code2 + ';';
};
//
Blockly.Blocks.SValue_Block = {
  init: function () {
    this.jsonInit({
      type: 'SValue_Block',
      colour: 330,
      tooltip: '',
      helpUrl: '',
      message0: "变量 %1 ",
      args0: [
        {
          "type": "field_input",
          "name": "SValue_input_Block",
          "text": ""
        }
      ],
    });
    this.setOutput(true, null);
  }
};
javascriptGenerator['SValue_Block'] = function (block) {
  var code1 = block.getFieldValue('SValue_input_Block');
  return [code1, javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks.GValue_Blockw = {
  init: function () {
    this.jsonInit({
      type: 'GValue_Blockw',
      colour: 330,
      tooltip: '',
      helpUrl: '',
      message0: "将变量 %1 ",
      args0: [
        {
          "type": "field_input",
          "name": "GValue_input_Block2",
          "text": ""
        }
      ],
    });

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendValueInput("VALUE")
      .appendField("设置为");
  }
};
javascriptGenerator['GValue_Blockw'] = function (block) {
  var code1 = block.getFieldValue('GValue_input_Block2');
  var code2 = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE);
  return code1 + '=' + code2 + ';';
};

Blockly.Blocks.GValue_Blocke = {
  init: function () {

    this.setColour(330);
    this.appendValueInput("GValue_input_Block2")
      .appendField("变量");
    this.appendValueInput("VALUE")
      .appendField("+=");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
javascriptGenerator['GValue_Blocke'] = function (block) {
  var code1 = javascriptGenerator.valueToCode(block, 'GValue_input_Block2', javascriptGenerator.ORDER_NONE);
  var code2 = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE);
  return code1 + '+=' + code2 + ';';
};


//自定义
//检测导航角度
Blockly.Blocks.CheckNavAng_Block = {
  init: function () {
    this.jsonInit({
      type: 'CheckNavAng_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: '检测导航角度'
    });
    this.setOutput(true, null);

  }
};
javascriptGenerator['CheckNavAng_Block'] = function (block) {
  return ['CheckNavAng()', javascriptGenerator.ORDER_ATOMIC];
};

//清除补偿导航角度
Blockly.Blocks.ClearNavDeltaAng_Block = {
  init: function () {
    this.jsonInit({
      type: 'ClearNavDeltaAng_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: '清除导航补偿角度'
    });
    this.setOutput(true, null);

  }
};
javascriptGenerator['ClearNavDeltaAng_Block'] = function (block) {
  return ['ClearNavDeltaAng()', javascriptGenerator.ORDER_ATOMIC];
};

//开始相机检测
Blockly.Blocks.StartCameraCheck_Block = {
  init: function () {
    this.jsonInit({
      type: 'StartCameraCheck_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: '开始相机检测'
    });
    this.setOutput(true, null);

  }
};
javascriptGenerator['StartCameraCheck_Block'] = function (block) {
  return ['StartCameraCheck()', javascriptGenerator.ORDER_ATOMIC];
};

//货物存在
Blockly.Blocks.CargoExist_Block = {
  init: function () {
    this.jsonInit({
      type: 'CargoExist_Block',
      colour: 180,
      tooltip: '',
      helpUrl: '',
      message0: '货物存在'
    });
    this.setOutput(true, null);

  }
};
javascriptGenerator['CargoExist_Block'] = function (block) {
  return ['CargoExist()', javascriptGenerator.ORDER_ATOMIC];
};