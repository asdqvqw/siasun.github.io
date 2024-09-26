<template>
  <div class="page-container main-view">
    <div class="table-box content-container page-content-box" style="
        background-image: linear-gradient(
          to bottom right,
          #d0dcdc95,
          #d5eedf17
        );
      ">
      <div class="demo1">
        <el-row>
          <el-col :span="12">
            <div class="top-container">
              <div style="margin-left: 30px">
                <el-button type="primary" @click="exportJSON">
                  导出JS
                </el-button>
                <el-button plain type="primary" @click="saveBlocks">
                  保存配置
                </el-button>
                <el-button plain type="primary" @click="loadBlocks">
                  加载配置
                </el-button>
              </div>
            </div>
            <div id="blockly-div" style="
                height: 500px;
                width: 1000px;
                margin-top: 30px;
                margin-left: 80px;
                position: absolute;
              "></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
// import './config';
// import {toolboxXml} from './config_box'
// import * as Blockly from 'blockly/core'
// import { javascriptGenerator } from 'blockly/javascript';
// import * as hans from 'blockly/msg/zh-hans';
const jsonData = {"tool":[{"test":1},{"test":2}]};
// Blockly.setLocale(hans);
//自定义积木
//返回
//自定义积木
jsonData.tool.forEach((item) => {
  const blockType = Object.keys(item)[0];
  Blockly.Blocks[blockType] = {
    init: function() {
      this.jsonInit({
        type: blockType,
        colour: 180,
        tooltip: '',
        helpUrl: ''
      });
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput()
        .appendField(blockType)
        .appendField(new Blockly.FieldNumber(item[blockType]), "VALUE");
    }
  };
  javascriptGenerator[blockType] = function(block) {
    var code = block.getFieldValue('VALUE')
    return code + ' ;';
  };
});

const toolboxXml = `
<xml id="toolbox" style="display: none">
  <category name="Controls" colour="180">
    ${jsonData.tool.map(item => `
      <block type="${Object.keys(item)[0]}"></block>
    `).join('')}
  </category>
</xml>
`;
const workspace = ref(null);

const code = ref(null);

const initBlockly = () => {
  workspace.value = Blockly.inject('blockly-div', {
    toolbox: toolboxXml,
    theme: Blockly.Theme.defineTheme('themeName', {
      base: Blockly.Themes.Classic,
      componentStyles: {
        workspaceBackgroundColour: '#CCCCCC',
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
          fill: '#000000', // 设置为黑色
        },
      },
    }),
    grid: {
      spacing: 30,
      length: 2,
      colour: '#000000',
      snap: true,
    },
  });

  workspace.value.addChangeListener(updateCode);
};

const exportJSON = () => {
  if (code.value) {
    const jsonBlob = new Blob([code.value], { type: 'application/js' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'task.js';
    link.click();
    URL.revokeObjectURL(url);
  }
};

const saveBlocks = () => {
  const xml = Blockly.Xml.workspaceToDom(workspace.value);
  const xmlText = Blockly.Xml.domToText(xml);
  const link = document.createElement('a');
  link.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlText);
  link.download = 'task.xml';
  link.click();
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
  };

  fileInput.click();
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
  position: absolute;
  left: 50px;
  top: 50px;
  bottom: 0;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
</style>