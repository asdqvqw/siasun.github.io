<template>
    <div class="demo1">
      <el-row>
        <el-col :span="12">
            <div class="top-container">
                <div style="margin-left:30px">
                    <el-button type="primary" @click="exportJSON">
                        导出JS
                    </el-button>
                    <el-button plain type="primary" @click="saveBlocks">
                        保存配置
                    </el-button>
                    <el-button plain type="primary" @click="loadBlocks" >
                        加载配置
                    </el-button>
                </div>

            </div>
          <div id="blockly-div" style="height: 500px; width: 1000px; margin-top:30px;margin-left:80px; position: absolute;">
          </div>

        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  // 引入 Blockly
  import Blockly from 'blockly';
  import { javascriptGenerator } from 'blockly/javascript';
  import * as hans from 'blockly/msg/zh-hans';
  Blockly.setLocale(hans);
  //自定义积木
  //返回
  Blockly.Blocks.Return_Block = {
    init: function () {
      this.jsonInit({
        type: 'Return_Block',
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField('返回')
        .appendField(new Blockly.FieldNumber(0), "VALUE");
    }
  };
  javascriptGenerator['Return_Block'] = function (block) {
    var code = block.getFieldValue('VALUE')
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
  
  //Set
  Blockly.Blocks.Set_Block = {
    init: function () {
      this.jsonInit({
        type: 'Set_Block',
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
            "type": "field_input",
            "name": "FunctionName",
            "text": "调用函数"
          },
          {
            "type": "field_input",
            "name": "Parameter",
            "text": "参数"
          },
          {
            "type": "field_dropdown",
            "name": "Set_bool_Type",
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
    }
  };
  javascriptGenerator['Set_Block'] = function (block) {
    var code1 = block.getFieldValue('Set_Type');
    var code2 = block.getFieldValue('FunctionName');
    var code3 = block.getFieldValue('Parameter');
    var code4 = block.getFieldValue('Set_bool_Type');
    return code1 + '("' + code2 + '","' + code3 + '",' + code4 + ');\n';
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
  
  
  //Get
  Blockly.Blocks.Get_Block = {
    init: function () {
      this.jsonInit({
        type: 'Get_Block',
        colour: 180,
        tooltip: '',
        helpUrl: '',
        message0: "获取 %1 %2 %3 %4",
        args0: [
          {
            "type": "field_dropdown",
            "name": "Get_Type",
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
            "type": "field_input",
            "name": "FunctionName",
            "text": "调用函数"
          },
          {
            "type": "field_input",
            "name": "Parameter",
            "text": "参数"
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
      this.setOutput(true, null);
    }
  };
  javascriptGenerator['Get_Block'] = function (block) {
    var code1 = block.getFieldValue('Get_Type');
    var code2 = block.getFieldValue('FunctionName');
    var code3 = block.getFieldValue('Parameter');
    var code4 = block.getFieldValue('Get_bool_Type');
    return [code1 + '("' + code2 + '","' + code3 + '",' + code4 + ')', javascriptGenerator.ORDER_ATOMIC];
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
  
  export default {
  
    name: 'Demo1',
    data() {
      return {
        // Blockly 工作区实例
        workspace: null,
        // 工具箱配置
        toolboxXml: `
          <xml id="toolbox" style="display: none">
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
  
          <category name="函数" colour="290" custom="PROCEDURE"></category>
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
            <category name="自定义" colour="160">
              <block type="CheckNavAng_Block"></block>
              <block type="ClearNavDeltaAng_Block"></block>
              <block type="CargoExist_Block"></block>
              <block type="StartCameraCheck_Block"></block>
            </category>
          </xml>
           `,
        // Blockly 生成的代码
        code: null
      }
    },
    methods: {
      // 初始化 Blockly
      initBlockly() {
        // 注入到 blockly-div 中
        this.workspace = Blockly.inject('blockly-div', {
          toolbox: this.toolboxXml,
          theme: Blockly.Theme.defineTheme('themeName', {
            base: Blockly.Themes.Classic,
            'componentStyles': {
              'workspaceBackgroundColour': '#CCCCCC',
              'toolboxBackgroundColour': '#333',
              'toolboxForegroundColour': "#fff",
              'flyoutBackgroundColour': "#252526",
              'flyoutForegroundColour': "#ccc",
              'flyoutOpacity': 1,
              'scrollbarColour': "#797979",
              'insertionMarkerColour': "#fff",
              'insertionMarkerOpacity': .3,
              'scrollbarOpacity': .4,
              'cursorColour': "#d0d0d0",
              'blackBackground': "#333"
            },
            'fontStyle': {
              'family': 'Georgia, serif',
              'size': 12,
              'text': {
                'fill': '#000000' // 设置为黑色
              }
            },
  
          }),
          grid: {
            spacing: 30,
            length: 2,
            colour: '#000000',
            snap: true
          }
  
        });
        // 为工作区添加修改事件，触发调用 updateCode 函数
        this.workspace.addChangeListener(this.updateCode);
  
      },
  
      exportJSON() {
        if (this.code) {
          const jsonBlob = new Blob([this.code], { type: 'application/js' });
          const url = URL.createObjectURL(jsonBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'task.js';
          link.click();
          URL.revokeObjectURL(url);
        }
      },
      saveBlocks() {
        const workspace = this.workspace;
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xml);
        const link = document.createElement('a');
        link.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlText);
        link.download = 'task.xml';
        link.click();
      },
      loadBlocks() {
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
              alert(`只接受名为 task.xml 的文件`)
            }
          };
  
          reader.readAsText(file);
        };
  
        fileInput.click();
      },
      // 更新当前块对应的 JS 代码
      updateCode() {
        // 获取当前块对应的 JS 代码
        this.code = javascriptGenerator.workspaceToCode(this.workspace);
        this.code = this.code.replace(/\/\/ 描述该功能\.\.\./g, '').trim();
      }
    },
    mounted() {
  
      this.initBlockly();
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .demo1 {
    position: absolute;
    left: 50px;
    top: 50px;
    bottom: 0;
    width: calc(100vw - 50px);
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
  }</style>
  