import{_ as z,d as B,r as V,aV as I,eo as $,o as _,e as v,f as t,a as b,b as a,m as c,g as S,aB as G,t as J,E as U,l as j,a_ as W,c as X,bH as k,by as L,j as Y,w as P,ej as Z,x as Q,cb as x}from"./index-5a02a582.js";import{_ as ee,h as ae,v as te}from"./PowerTools-4d0354e8.js";import{E as oe}from"./el-pagination-b495b384.js";import"./el-tag-d38e9329.js";import"./el-select-4ab05db7.js";import"./el-scrollbar-f84df57f.js";import"./el-popper-14405c0a.js";/* empty css                        *//* empty css                    */import"./el-tooltip-4ed993c7.js";/* empty css                */import{a as R,E as F}from"./el-col-4b5196b2.js";import{S as K}from"./index-23f7de95.js";import"./el-form-item-4ed993c7.js";import{d as ne}from"./DebounceAndThrottle-5b857d59.js";import{E as le}from"./el-dialog-b2cb2e5c.js";import{E as re}from"./el-tree-d7afc698.js";import{E as ie}from"./el-switch-9ebcdaf0.js";import{E as se}from"./el-input-number-e8770bd8.js";import{v as de}from"./VerifiedTools-314f4468.js";import{E as A,a as q}from"./index-47868e7b.js";import{a as pe,E as ue}from"./index-2d5070ff.js";import{E as me}from"./index-4f765bf2.js";import"./isEqual-b3bf3dc1.js";import"./Uint8Array-4d1929d4.js";import"./strings-a4654d41.js";import"./debounce-50d2dbad.js";import"./index-7705d533.js";import"./index-7da9e489.js";import"./initCloneObject-e81f77d6.js";let E={total:314,rows:[],code:200,msg:"查询成功"};const H=[];for(let e=0;e<20;e++)H.push({name:e===0?"超级管理员":"普通用户",sign:e===0?"admin":"common",content:`测试角色${e+1}`,sort:e,status:!0,createTime:new Date().toLocaleString()});E.rows=H;E.total=E.rows.length;const N={open:{default:!1},title:{default:"角色数据"},afterTitle:{default:""},isShow:{default:!1}},fe=B({name:"EditDataDialog",components:{},setup(){const e=V({}),o=I(null),l=V({loading:!1,closeType:"close",resolve:void 0,reject:void 0,form:{},rules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"}]},treeData:[{id:1,label:"Level one 1",children:[{id:3,label:"Level two 2-1",children:[{id:4,label:"Level three 3-1-1"},{id:5,label:"Level three 3-1-2",disabled:!0}]},{id:2,label:"Level two 2-2",disabled:!0,children:[{id:6,label:"Level three 3-2-1"},{id:7,label:"Level three 3-2-2",disabled:!0}]}]}]}),h={castParams:{}};$(e,{},N);function D(){l.closeType=="confirm"?l.resolve(h.castParams):l.reject(l.closeType,h.castParams)}function w(u=!0,n={},m={}){return $(e,m,N),l.closeType="close",l.loading=!1,l.form={},h.castParams={},e.open=u,G(()=>{l.form=n}),new Promise((r,i)=>{l.resolve=r,l.reject=i})}function g(){l.form={}}function p(){o.value&&o.value.validate((u,n)=>{if(n){let m=n[Object.keys(n)[0]][0].message;J(m)}u&&setTimeout(()=>{h.castParams={name:"数据保存成功了，向外部通知"},l.closeType="confirm",e.open=!1},1e3)})}function s(u){return de(u,{name:{msg:"名称 不能为空",validate(m,r){return!(!m&&m!==0)}}})}return{configData:e,initData:w,dataContainer:l,handleClose:D,getDataInfo:g,handleSubmit:p,FormElRef:o,validData:s}}}),ce={class:"dialog-container"},ge={class:"dialog-footer"};function he(e,o,l,h,D,w){const g=U,p=A,s=R,u=se,n=ie,m=re,r=F,i=q,C=j,y=le;return _(),v(y,{title:e.configData.title+e.configData.afterTitle,modelValue:e.configData.open,"onUpdate:modelValue":o[6]||(o[6]=f=>e.configData.open=f),width:"800px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClose:e.handleClose,class:"edit-data-dialog"},{footer:t(()=>[b("div",ge,[a(C,{onClick:o[5]||(o[5]=()=>{e.dataContainer.closeType="cancel",e.configData.open=!1})},{default:t(()=>[c(" 取消 ")]),_:1}),e.configData.isShow?S("",!0):(_(),v(C,{key:0,type:"primary",onClick:e.handleSubmit},{default:t(()=>[c(" 提交 ")]),_:1},8,["onClick"]))])]),default:t(()=>[b("div",ce,[a(i,{model:e.dataContainer.form,ref:"FormElRef",inline:!0,rules:e.dataContainer.rules,"label-width":"100px"},{default:t(()=>[a(r,{gutter:0},{default:t(()=>[a(s,{span:12,xs:6},{default:t(()=>[a(p,{label:"角色名称",prop:"name"},{default:t(()=>[a(g,{modelValue:e.dataContainer.form.name,"onUpdate:modelValue":o[0]||(o[0]=f=>e.dataContainer.form.name=f),placeholder:"请输入",disabled:e.configData.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),a(s,{span:12,xs:6},{default:t(()=>[a(p,{label:"角色标识",prop:"sign"},{default:t(()=>[a(g,{modelValue:e.dataContainer.form.sign,"onUpdate:modelValue":o[1]||(o[1]=f=>e.dataContainer.form.sign=f),placeholder:"请输入",disabled:e.configData.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),a(s,{span:12,xs:6},{default:t(()=>[a(p,{label:"排序",prop:"sort"},{default:t(()=>[a(u,{style:{width:"100%"},modelValue:e.dataContainer.form.sort,"onUpdate:modelValue":o[2]||(o[2]=f=>e.dataContainer.form.sort=f),min:1,max:999,"controls-position":"right",disabled:e.configData.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),a(s,{span:12,xs:6},{default:t(()=>[a(p,{label:"状态",prop:"status"},{default:t(()=>[a(n,{modelValue:e.dataContainer.form.status,"onUpdate:modelValue":o[3]||(o[3]=f=>e.dataContainer.form.status=f),disabled:e.configData.isShow,"active-text":"启用","inactive-text":"禁用"},null,8,["modelValue","disabled"])]),_:1})]),_:1}),a(s,{span:24,xs:6},{default:t(()=>[a(p,{label:"角色描述",prop:"content"},{default:t(()=>[a(g,{modelValue:e.dataContainer.form.content,"onUpdate:modelValue":o[4]||(o[4]=f=>e.dataContainer.form.content=f),rows:2,type:"textarea",disabled:e.configData.isShow,placeholder:"请输入"},null,8,["modelValue","disabled"])]),_:1})]),_:1}),a(s,{span:24,xs:6},{default:t(()=>[a(p,{label:"菜单权限",prop:"menu"},{default:t(()=>[a(m,{style:{width:"100%",border:"1px solid var(--el-border-color)","border-radius":"5px"},data:e.dataContainer.treeData,disabled:e.configData.isShow,props:{children:"children",label:"label",disabled:"disabled"},"show-checkbox":""},null,8,["data","disabled"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["title","modelValue","onClose"])}const _e=z(fe,[["render",he],["__scopeId","data-v-b6001961"]]);const be=B({components:{DictTags:ee,EditDataDialog:_e,SvgIcon:K},setup(){const e=I(null);Y();const o=V({loading:!1,showSearch:!0,form:{},params:{pageNum:1,pageSize:10},config:{total:0},list:[],currDataList:[]}),l=ne(function(){o.loading=!0,Promise.resolve(E).then(r=>{o.list=r.rows||[],o.config.total=r.total}).catch(()=>{}).finally(()=>{o.loading=!1})},300);l();function h(r,i,C,y){Z(y.target.innerText),Q("复制成功，内容为："+y.target.innerText)}function D(r,i,C){o.form.orderByColumn=r.prop,o.form.isAsc=r.order,l()}function w(){o.params.pageNum=1,l()}function g(){o.form={},w()}function p(){}function s(){e.value&&e.value.initData(!0,{},{afterTitle:" - 添加"}).then(()=>{}).catch(()=>{})}function u(r,i){e.value&&e.value.initData(!0,{...r},{...i}).then(()=>{}).catch(()=>{})}function n(r,i){e.value&&e.value.initData(!0,{...r},{...i}).then(()=>{}).catch(()=>{})}function m(r){x("确认删除该数据？").then(()=>{Q("删除成功")}).catch(()=>{})}return{dataContainer:o,getDataList:l,handleCopyVale:h,handleSortChange:D,handleQuery:w,resetQuery:g,handleExport:p,handleAdd:s,handleDetails:u,handleEdit:n,handleDelete:m,EditDataDialogRef:e,hasPermi:ae}}}),Ce={class:"page-container main-view"},ve={class:"table-box content-container page-content-box"},we={class:"top-container"},ye={class:"left"},De={class:"right"},Ee={class:"table-container"},ke={class:"pagination-container"};function Ve(e,o,l,h,D,w){const g=U,p=A,s=R,u=K,n=j,m=F,r=q,i=ue,C=me,y=pe,f=oe,M=W("EditDataDialog"),O=te;return _(),X("div",Ce,[k(a(m,{gutter:0,class:"page-query-box"},{default:t(()=>[a(s,{span:24,xs:24},{default:t(()=>[a(r,{model:e.dataContainer.form,ref:"QueryFormRef",inline:!0,"label-width":"110px"},{default:t(()=>[a(m,{gutter:0},{default:t(()=>[a(s,{span:6,xs:6},{default:t(()=>[a(p,{label:"角色名称",prop:"name"},{default:t(()=>[a(g,{modelValue:e.dataContainer.form.name,"onUpdate:modelValue":o[0]||(o[0]=d=>e.dataContainer.form.name=d),placeholder:"请输入",clearable:"",onClear:e.handleQuery,onKeyup:P(e.handleQuery,["enter"])},null,8,["modelValue","onClear","onKeyup"])]),_:1})]),_:1}),a(s,{span:6,xs:6},{default:t(()=>[a(p,{label:"角色标识",prop:"sign"},{default:t(()=>[a(g,{modelValue:e.dataContainer.form.sign,"onUpdate:modelValue":o[1]||(o[1]=d=>e.dataContainer.form.sign=d),placeholder:"请输入",clearable:"",onClear:e.handleQuery,onKeyup:P(e.handleQuery,["enter"])},null,8,["modelValue","onClear","onKeyup"])]),_:1})]),_:1}),a(s,{span:6,xs:6},{default:t(()=>[a(p,{label:" "},{default:t(()=>[a(n,{type:"primary",onClick:e.handleQuery},{default:t(()=>[a(u,{style:"width:15px;height:15px;margin-right:5px;",name:"svg:search-bt.svg"}),c(" 查询 ")]),_:1},8,["onClick"]),a(n,{onClick:e.resetQuery},{default:t(()=>[a(u,{style:"width:15px;height:15px;margin-right:5px;",name:"svg:redo.svg"}),c(" 重置 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1},512),[[L,e.dataContainer.showSearch]]),b("div",ve,[b("div",we,[b("div",ye,[e.hasPermi(["yx:apply:apply"])?(_(),v(n,{key:0,type:"primary",onClick:e.handleAdd},{default:t(()=>[c(" 新增 ")]),_:1},8,["onClick"])):S("",!0),a(n,{plain:"",type:"primary",onClick:e.handleExport},{default:t(()=>[c(" 导出 ")]),_:1},8,["onClick"]),e.dataContainer.currDataList.length>0?(_(),v(n,{key:1,plain:"",type:"danger",onClick:o[2]||(o[2]=d=>e.handleDelete(e.dataContainer.currDataList))},{default:t(()=>[c(" 批量删除 ")]),_:1})):S("",!0)]),b("div",De,[a(n,{circle:"",onClick:e.resetQuery},{default:t(()=>[a(u,{style:"width:15px;height:15px;",name:"svg:redo.svg"})]),_:1},8,["onClick"]),a(n,{circle:"",onClick:o[3]||(o[3]=d=>e.dataContainer.showSearch=!e.dataContainer.showSearch)},{default:t(()=>[a(u,{style:"width:15px;height:15px;",name:"svg:search-bt.svg"})]),_:1})])]),b("div",Ee,[k((_(),v(y,{data:e.dataContainer.list,border:"",onCellDblclick:e.handleCopyVale,onSortChange:e.handleSortChange,height:"100%"},{default:t(()=>[a(i,{type:"index",align:"center",label:"序号",width:"60",fixed:"left"}),a(i,{label:"角色名称","show-overflow-tooltip":"",align:"center","min-width":"170",prop:"name"}),a(i,{label:"角色标识","show-overflow-tooltip":"",align:"center",prop:"sign","min-width":"150"}),a(i,{label:"排序","show-overflow-tooltip":"",align:"center",prop:"sort",width:"100"}),a(i,{label:"角色状态","show-overflow-tooltip":"",align:"center",prop:"status",width:"100"},{default:t(d=>[d.row.status?(_(),v(C,{key:0},{default:t(()=>[c(" 启用 ")]),_:1})):(_(),v(C,{key:1,type:"info"},{default:t(()=>[c(" 禁用 ")]),_:1}))]),_:1}),a(i,{label:"角色描述","show-overflow-tooltip":"",align:"center",prop:"content","min-width":"150"}),a(i,{label:"创建时间","show-overflow-tooltip":"",align:"center",prop:"createTime","min-width":"220"}),a(i,{label:"操作",width:"200",fixed:"right","class-name":"small-padding fixed-width"},{default:t(d=>[a(n,{text:!0,onClick:T=>e.handleDetails(d.row,{isShow:!0,afterTitle:" - 查看"})},{default:t(()=>[c(" 查看 ")]),_:2},1032,["onClick"]),a(n,{text:!0,onClick:T=>e.handleEdit(d.row,{isShow:!1,afterTitle:" - 编辑"})},{default:t(()=>[c(" 编辑 ")]),_:2},1032,["onClick"]),a(n,{text:!0,type:"danger",onClick:T=>e.handleDelete([d.row])},{default:t(()=>[c(" 删除 ")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data","onCellDblclick","onSortChange"])),[[O,e.dataContainer.loading]])]),b("div",ke,[k(a(f,{total:e.dataContainer.config.total,background:!0,"current-page":e.dataContainer.params.pageNum,"page-size":e.dataContainer.params.pageSize,layout:"total, sizes, prev, pager, next, jumper","page-sizes":[10,20,30,50],"pager-count":7,onSizeChange:o[4]||(o[4]=d=>{e.dataContainer.params.pageSize=d,e.getDataList()}),onCurrentChange:o[5]||(o[5]=d=>{e.dataContainer.params.pageNum=d,e.getDataList()})},null,8,["total","current-page","page-size"]),[[L,!0]])])]),a(M,{ref:"EditDataDialogRef"},null,512)])}const oa=z(be,[["render",Ve],["__scopeId","data-v-92a941b3"]]);export{oa as default};
