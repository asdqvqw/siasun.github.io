import{_ as Q,aV as v,r as J,ck as z,bB as H,o as O,e as W,f as n,a as w,b as l,m as _,g as Z,aB as ee,t as te,E as ae,l as X,p as le,q as oe,j as re,c as se,bH as ne,cl as ie,x as M,ch as F,cg as C,cm as I,cn as K,bc as de,c8 as ue}from"./index-caff8e60.js";import{v as ce}from"./el-loading-9b526f95.js";import{a as fe,E as me}from"./el-table-column-8c0ff588.js";import"./el-tag-04477fc1.js";import"./el-tooltip-4ed993c7.js";import"./el-popper-43a958b5.js";import"./el-scrollbar-1cd9d3fa.js";import{E as Y}from"./el-dialog-7f1b612f.js";import{d as G}from"./DebounceAndThrottle-5b857d59.js";/* empty css                */import{E as pe,a as he}from"./el-col-3facc683.js";import{E as _e,a as ye}from"./el-select-4af5c7db.js";import{E as be,a as ge}from"./el-form-item-23f7055a.js";import{v as ve}from"./VerifiedTools-314f4468.js";import"./index-ed56ac9a.js";import"./debounce-21948476.js";import"./index-5ef17c51.js";import"./strings-76a06904.js";let A={rows:[{key:"CAN",name:"总线",value:"can1",format:"string"},{key:"num",name:"数量",value:1,format:"number"},{key:"io",name:"IO",format:"array",childs:[{format:"object",childs:[{key:"test1",name:"测试1",value:1,format:"number"},{key:"test2",name:"测试2",value:2,format:"number"}]},{format:"object",childs:[{key:"test1",name:"测试1",value:1,format:"number"},{key:"test2",name:"测试2",value:2,format:"number"}]}]},{key:"iotwo",name:"IO2",format:"array",childs:[{format:"array",childs:[{format:"number",value:2},{format:"number",value:2},{format:"number",value:2}]},{format:"array",childs:[{format:"number",value:2},{format:"number",value:2},{format:"number",value:2}]}]},{key:"wheelS",name:"轮舵",format:"object",childs:[{key:"wheel",name:"轮",value:2,format:"number"},{key:"steer",name:"舵",value:2,format:"number"}]}]};const we=N=>(le("data-v-aecbffb3"),N=N(),oe(),N),ke={class:"dialog-container"},Ee=we(()=>w("p",{style:{opacity:"0.8"}}," 上级菜单不允许选比自己层级小的层级，其中路由名称表示页面的名称（只能选系统有的），路由地址表示跳转地址，没有的话会根据路由名称自动匹配，可以定义外部链接 ",-1)),De={class:"dialog-footer"},xe={__name:"EditDataDialog",setup(N,{expose:g}){const E=v(!1),s=v(!1),S={open:{default:!1},title:{default:"按钮权限数据"},afterTitle:{default:""},isShow:{default:!1}},f=J({}),D=v(null),a=J({loading:!1,closeType:"close",resolve:void 0,reject:void 0,form:{},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],key:[{required:!0,message:"请输入字段",trigger:"blur"}],value:[],format:[{required:!0,message:"请输入格式",trigger:"blur"}]},menuList:[]}),x={castParams:{}};z(f,{},S);function T(){a.closeType=="confirm"?a.resolve(x.castParams):a.reject(a.closeType,x.castParams)}function V(m=!0,d={},h={}){return z(f,h,S),a.closeType="close",a.loading=!1,a.form={},x.castParams={},f.open=m,ee(()=>{a.form=d}),new Promise((b,y)=>{a.resolve=b,a.reject=y})}function U(){a.form={}}function L(){D.value&&D.value.validate((m,d)=>{if(d){let h=d[Object.keys(d)[0]][0].message;te(h)}m&&(a.loading=!0,setTimeout(()=>{x.castParams=a.form,a.closeType="confirm",f.open=!1,a.loading=!1},100))})}function B(m){return ve(m,{name:{msg:"名称 不能为空",validate(h,b){return!(!h&&h!==0)}}})}return H(()=>a.form.isFormatDisabled,m=>{s.value=m,m?(a.rules.value=[],a.rules.name=[],a.rules.key=[]):(a.rules.value=[{required:!0,message:"请输入值",trigger:"blur"}],a.rules.key=[{required:!0,message:"请输入字段",trigger:"blur"}],a.rules.name=[{required:!0,message:"请输入名称",trigger:"blur"}])}),H(()=>a.form.format,m=>{E.value=m==="array"||m==="object",m==="array"||m==="object"?a.rules.value=[]:a.rules.value=[{required:!0,message:"请输入值",trigger:"blur"}]}),g({configData:f,initData:V,dataContainer:a,handleClose:T,getDataInfo:U,handleSubmit:L,FormElRef:D,validData:B}),(m,d)=>{const h=be,b=pe,y=ae,k=_e,$=ye,R=he,q=ge,P=X,o=Y;return O(),W(o,{title:f.title+f.afterTitle,modelValue:f.open,"onUpdate:modelValue":d[5]||(d[5]=t=>f.open=t),width:"800px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClose:T,class:"edit-data-dialog"},{footer:n(()=>[w("div",De,[l(P,{onClick:d[4]||(d[4]=()=>{a.closeType="cancel",f.open=!1})},{default:n(()=>[_(" 取消 ")]),_:1}),f.isShow?Z("",!0):(O(),W(P,{key:0,type:"primary",loading:a.loading,onClick:L},{default:n(()=>[_(" 提交 ")]),_:1},8,["loading"]))])]),default:n(()=>[w("div",ke,[l(q,{model:a.form,ref_key:"FormElRef",ref:D,inline:!0,rules:a.rules,"label-width":"150px"},{default:n(()=>[l(R,{gutter:0},{default:n(()=>[l(b,{span:24},{default:n(()=>[l(h,{label:"提示"},{default:n(()=>[Ee]),_:1})]),_:1}),l(b,{span:24}),l(b,{span:12,xs:6},{default:n(()=>[l(h,{label:"名称",prop:"name"},{default:n(()=>[l(y,{modelValue:a.form.name,"onUpdate:modelValue":d[0]||(d[0]=t=>a.form.name=t),placeholder:"请输入",disabled:f.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),l(b,{span:12,xs:6},{default:n(()=>[l(h,{label:"字段",prop:"key"},{default:n(()=>[l(y,{placeholder:"请选择",style:{width:"100%"},disabled:f.isShow||s.value,modelValue:a.form.key,"onUpdate:modelValue":d[1]||(d[1]=t=>a.form.key=t),clearable:""},null,8,["disabled","modelValue"])]),_:1})]),_:1}),l(b,{span:12,xs:6},{default:n(()=>[l(h,{label:"值",prop:"value"},{default:n(()=>[l(y,{modelValue:a.form.value,"onUpdate:modelValue":d[2]||(d[2]=t=>a.form.value=t),placeholder:"请输入",disabled:f.isShow||E.value||s.value,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),l(b,{span:12,xs:6},{default:n(()=>[l(h,{label:"格式",prop:"format"},{default:n(()=>[l($,{modelValue:a.form.format,"onUpdate:modelValue":d[3]||(d[3]=t=>a.form.format=t),placeholder:"请选择格式",disabled:f.isShow||a.form.isFormatDisabled,clearable:""},{default:n(()=>[l(k,{label:"串",value:"string"}),l(k,{label:"数字",value:"number"}),l(k,{label:"对象",value:"object"}),l(k,{label:"数组",value:"array"})]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["title","modelValue"])}}},Ce=Q(xe,[["__scopeId","data-v-aecbffb3"]]);const Ie={class:"page-container main-view"},Ke={class:"table-box content-container page-content-box"},Ne={class:"top-container"},Se={class:"left"},je={class:"table-container"},Te={__name:"index",setup(N){const g=v(null),E=v(null);re();const s=J({loading:!1,showSearch:!0,defaultExpandAll:!1,form:{},params:{},list:[]});let S=v(null);G(function(){s.loading=!0,Promise.resolve(A).then(o=>{let t=C(o.rows||[]);t=I(t,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id",forEachFn(e){e.id=F()}}),t=K(t.map(e=>(delete e.childs,e)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=t}).catch(()=>{}).finally(()=>{s.loading=!1})},300)();const D=G(function(){s.loading=!0,Promise.resolve(S).then(o=>{let t=C(o.rows||[]);t=I(t,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id",forEachFn(e){e.id=F()}}),t=K(t.map(e=>(delete e.childs,e)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=t}).catch(()=>{}).finally(()=>{s.loading=!1})},300);function a(){function o(t,e){t.forEach(r=>{if(r.treeLevels=e,r.childs){let i=e+1;o(r.childs,i)}})}o(s.list,1)}const x=(o,t,e,r)=>{ie(r.target.innerText),M("复制成功，内容为："+r.target.innerText)},T=()=>{const o=JSON.parse(JSON.stringify(s.list)),t=c=>{delete c.id,delete c.parentId,c.childs&&c.childs.forEach(j=>{t(j)})};o.forEach(c=>{t(c)});const e=y(o),r=JSON.stringify(e,null,2),i=new Blob([r],{type:"application/json"}),u=window.URL.createObjectURL(i),p=document.createElement("a");p.href=u,p.download="transformedData.json",document.body.appendChild(p),p.click(),window.URL.revokeObjectURL(u)},V=(o,t)=>{if(!g.value)return;a();const e=s.list.find(i=>i.id===o.parentId);let r="";e&&e.format==="array"&&e.childs.length>0?(r=e.childs[0].format,g.value.initData(!0,{...o,format:r,isFormatDisabled:!0},{...t,menuList:s.list}).then(i=>{i.id=F();let u=C(s.list||[]);u=I(u,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id"}),u.push(i),u.sort((p,c)=>(Number(c.sort)||0)-(Number(p.sort)||0)),u=K(u.map(p=>(delete p.childs,p)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=u}).catch(()=>{})):g.value.initData(!0,{...o},{...t,menuList:s.list}).then(i=>{i.id=F();let u=C(s.list||[]);u=I(u,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id"}),u.push(i),u.sort((p,c)=>(Number(c.sort)||0)-(Number(p.sort)||0)),u=K(u.map(p=>(delete p.childs,p)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=u}).catch(()=>{})},U=(o,t)=>{g.value&&g.value.initData(!0,{...o},{...t,menuList:s.list}).then(()=>{}).catch(()=>{})},L=(o,t)=>{g.value&&(a(),g.value.initData(!0,{...o},{...t,menuList:s.list}).then(e=>{let r=C(s.list||[]);r=I(r,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id"}),r=r.filter(i=>i.id!=e.id),r.push(e),r.sort((i,u)=>(Number(u.sort)||0)-(Number(i.sort)||0)),r=K(r.map(i=>(delete i.childs,i)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=r}).catch(()=>{}))},B=o=>{ue("确认删除该数据？","提示").then(()=>{let t=C(s.list||[]);t=I(t,{childsKey:"childs",setParentKey:"parentId",getParentKey:"id"}),t=t.filter(e=>e.id!=o.id),t.sort((e,r)=>(Number(r.sort)||0)-(Number(e.sort)||0)),t=K(t.map(e=>(delete e.childs,e)),{pKey:"parentId",key:"id",childsKey:"childs",isNew:!0}),s.list=t,M("删除成功")}).catch(()=>{})},m=()=>{if(!E.value)return;s.defaultExpandAll=!s.defaultExpandAll;function o(t){t.forEach(e=>{E.value.toggleRowExpansion(e),e.childs&&o(e.childs)})}o(s.list)},d=v(!1),h=v(""),b=()=>{const o=JSON.parse(JSON.stringify(s.list)),t=r=>{delete r.id,delete r.parentId,r.childs&&r.childs.forEach(i=>{t(i)})};o.forEach(r=>{t(r)});const e=y(o);h.value=e,d.value=!0};function y(o){if(Array.isArray(o)){const t={};return o.forEach(e=>{e.format==="string"||e.format==="number"?t[e.key]=y(e.value):e.format==="object"?t[e.key]=y(e.childs):e.format==="array"&&(t[e.key]=k(e.childs))}),t}else return o}function k(o){const t=[];return o.forEach(e=>{e.format==="object"?t.push(y(e.childs)):e.format==="string"||e.format==="number"?t.push(y(e.value)):e.format==="array"&&t.push(k(e.childs))}),t}const $=()=>{const o=JSON.stringify(A,null,2);console.log(A);const t=new Blob([o],{type:"application/json"}),e=window.URL.createObjectURL(t),r=document.createElement("a");r.href=e,r.download="Data.json",document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(e)},R=v(null),q=()=>{R.value.click()},P=o=>{const t=o.target.files[0];if(!t)return;const e=new FileReader;e.onload=()=>{S=JSON.parse(e.result),D()},e.readAsText(t)};return(o,t)=>{const e=X,r=Y,i=me,u=fe,p=ce;return O(),se("div",Ie,[w("div",Ke,[w("div",Ne,[w("div",Se,[l(e,{type:"primary",onClick:V},{default:n(()=>[_(" 新增 ")]),_:1}),l(e,{plain:"",type:"primary",onClick:T},{default:n(()=>[_(" 导出json ")]),_:1}),l(e,{plain:"",type:"primary",onClick:$},{default:n(()=>[_(" 导出配置 ")]),_:1}),_("   "),w("input",{ref_key:"fileInputRef",ref:R,type:"file",style:{display:"none"},onChange:P,accept:".json"},null,544),l(e,{type:"primary",onClick:q},{default:n(()=>[_("导入配置")]),_:1}),l(e,{onClick:m,type:"info",plain:""},{default:n(()=>[_(" 展开 / 折叠 ")]),_:1}),l(e,{onClick:b,type:"info",plain:""},{default:n(()=>[_(" 查看 ")]),_:1}),l(r,{modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=c=>d.value=c),title:"数据",visible:d.value,onClose:t[1]||(t[1]=c=>d.value=!1)},{default:n(()=>[w("p",null,de(h.value),1)]),_:1},8,["modelValue","visible"])])]),w("div",je,[ne((O(),W(u,{ref_key:"ElTableRef",ref:E,data:s.list,onCellDblclick:x,border:"","row-key":"id","tree-props":{children:"childs"},height:"100%"},{default:n(()=>[l(i,{type:"index",align:"left",label:"序号",width:"60",fixed:"left"}),l(i,{label:"名称","show-overflow-tooltip":"",align:"left","min-width":"170",prop:"name"}),l(i,{label:"字段","show-overflow-tooltip":"",align:"left",prop:"key",width:"150"}),l(i,{label:"值","show-overflow-tooltip":"",align:"left",prop:"value","min-width":"150"}),l(i,{label:"格式","show-overflow-tooltip":"",align:"left",prop:"format","min-width":"150"}),l(i,{label:"操作",width:"200",fixed:"right","class-name":"small-padding fixed-width"},{default:n(c=>[l(e,{text:!0,onClick:j=>U(c.row,{isShow:!0,afterTitle:" - 查看"})},{default:n(()=>[_(" 查看 ")]),_:2},1032,["onClick"]),l(e,{text:!0,onClick:j=>L(c.row,{isShow:!1,afterTitle:" - 编辑"})},{default:n(()=>[_(" 编辑 ")]),_:2},1032,["onClick"]),l(e,{text:!0,onClick:j=>V({parentId:c.row.id},{afterTitle:" - 添加"}),disabled:c.row.format==="string"||c.row.format==="number"},{default:n(()=>[_(" 新增 ")]),_:2},1032,["onClick","disabled"]),l(e,{text:!0,type:"danger",onClick:j=>B(c.row)},{default:n(()=>[_(" 删除 ")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[p,s.loading]])])]),l(Ce,{ref_key:"EditDataDialogRef",ref:g},null,512)])}}},Xe=Q(Te,[["__scopeId","data-v-70c90537"]]);export{Xe as default};