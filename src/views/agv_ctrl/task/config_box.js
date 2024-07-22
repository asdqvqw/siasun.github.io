export const toolboxXml = `
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
`;