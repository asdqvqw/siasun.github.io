import{r as C,aV as T,ck as k,o as E,e as x,f as o,d as $,a as y,b as e,m as _,g as L,_ as j,aB as O,t as R,E as B,l as Q,p as A,q as K,a_ as M,c as H,bH as V,by as z,j as G,w as J,cg as W,cl as X,x as I,c8 as Y}from"./index-cd06ea62.js";import{v as Z}from"./el-loading-fcc20a13.js";import{a as ee,E as te}from"./el-table-column-37e6d5bd.js";import"./el-tag-ba6d9db4.js";import"./el-tooltip-4ed993c7.js";import"./el-popper-779202cb.js";import"./el-scrollbar-1cd9d3fa.js";/* empty css                */import{E as F,a as N}from"./el-col-7eca9ce7.js";import{S}from"./index-ecd7ae19.js";import{E as U,a as q}from"./el-form-item-96b60ebe.js";import{_ as ae,h as oe}from"./PowerTools-cec9b64c.js";import{d as ne}from"./DebounceAndThrottle-5b857d59.js";import{E as le}from"./el-dialog-b77e89db.js";import{E as se}from"./el-input-number-a6980c95.js";import{v as re}from"./VerifiedTools-314f4468.js";import{I as ie}from"./IconSlect-f8ef7da4.js";import"./index-00d55270.js";import"./debounce-d657c2ef.js";import"./index-8c9f00b4.js";let de={rows:[{name:"菜单修改",content:"yx:clue:wf"},{name:"菜单添加",content:"yx:clue:wf"},{name:"菜单查看",content:"yx:clue:wf"},{name:"菜单删除",content:"yx:clue:wf"},{name:"用户修改",content:"yx:clue:wf"}],code:200,msg:"查询成功"};const ce=t=>(A("data-v-7f9b6f20"),t=t(),K(),t),fe={class:"dialog-container"},ue=ce(()=>y("p",{style:{opacity:"0.8"}}," 按钮可以是任何地方，不一定必须跟页面挂钩，而且菜单配置也只是配置菜单而已，权限可以控制跳转到那个页面也可以控制有那些按钮。 ",-1)),me={class:"dialog-footer"},P={open:{default:!1},title:{default:"按钮权限数据"},afterTitle:{default:""},isShow:{default:!1}},pe=$({name:"EditDataDialog",components:{SvgIcon:S,IconSlect:ie},setup(){const t=C({}),i=T(null),a=C({loading:!1,closeType:"close",resolve:void 0,reject:void 0,form:{},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},menuList:[]}),f={castParams:{}};k(t,{},P);function s(){a.closeType=="confirm"?a.resolve(f.castParams):a.reject(a.closeType,f.castParams)}function p(n=!0,l={},c={}){return k(t,c,P),a.closeType="close",a.loading=!1,a.form={},f.castParams={},t.open=n,O(()=>{a.form=l}),new Promise((r,d)=>{a.resolve=r,a.reject=d})}function b(){a.form={}}function g(){i.value&&i.value.validate((n,l)=>{if(l){let c=l[Object.keys(l)[0]][0].message;R(c)}n&&(a.loading=!0,setTimeout(()=>{f.castParams=a.form,a.closeType="confirm",t.open=!1,a.loading=!1},100))})}function u(n){return re(n,{name:{msg:"名称 不能为空",validate(c,r){return!(!c&&c!==0)}}})}return{configData:t,initData:p,dataContainer:a,handleClose:s,getDataInfo:b,handleSubmit:g,FormElRef:i,validData:u}}}),_e=Object.assign(pe,{setup(t){const i={open:{default:!1},title:{default:"按钮权限数据"},afterTitle:{default:""},isShow:{default:!1}},a=C({}),f=T(null),s=C({loading:!1,closeType:"close",resolve:void 0,reject:void 0,form:{},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},menuList:[]}),p={castParams:{}};k(a,{},i);function b(){s.closeType=="confirm"?s.resolve(p.castParams):s.reject(s.closeType,p.castParams)}function g(){f.value&&f.value.validate((u,n)=>{if(n){let l=n[Object.keys(n)[0]][0].message;R(l)}u&&(s.loading=!0,setTimeout(()=>{p.castParams=s.form,s.closeType="confirm",a.open=!1,s.loading=!1},100))})}return(u,n)=>{const l=U,c=F,r=B,d=se,v=N,w=q,D=Q,h=le;return E(),x(h,{title:a.title+a.afterTitle,modelValue:a.open,"onUpdate:modelValue":n[4]||(n[4]=m=>a.open=m),width:"800px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClose:b,class:"edit-data-dialog"},{footer:o(()=>[y("div",me,[e(D,{onClick:n[3]||(n[3]=()=>{s.closeType="cancel",a.open=!1})},{default:o(()=>[_(" 取消 ")]),_:1}),a.isShow?L("",!0):(E(),x(D,{key:0,type:"primary",loading:s.loading,onClick:g},{default:o(()=>[_(" 提交 ")]),_:1},8,["loading"]))])]),default:o(()=>[y("div",fe,[e(w,{model:s.form,ref_key:"FormElRef",ref:f,inline:!0,rules:s.rules,"label-width":"150px"},{default:o(()=>[e(v,{gutter:0},{default:o(()=>[e(c,{span:24},{default:o(()=>[e(l,{label:"提示"},{default:o(()=>[ue]),_:1})]),_:1}),e(c,{span:12,xs:6},{default:o(()=>[e(l,{label:"权限按钮名称",prop:"name"},{default:o(()=>[e(r,{modelValue:s.form.name,"onUpdate:modelValue":n[0]||(n[0]=m=>s.form.name=m),placeholder:"请输入",disabled:a.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),e(c,{span:12,xs:6},{default:o(()=>[e(l,{label:"权限字符",prop:"content"},{default:o(()=>[e(r,{modelValue:s.form.content,"onUpdate:modelValue":n[1]||(n[1]=m=>s.form.content=m),placeholder:"请输入",disabled:a.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1}),e(c,{span:12,xs:6},{default:o(()=>[e(l,{label:"排序",prop:"sort"},{default:o(()=>[e(d,{style:{width:"100%"},modelValue:s.form.sort,"onUpdate:modelValue":n[2]||(n[2]=m=>s.form.sort=m),min:1,max:999,"controls-position":"right",disabled:a.isShow,clearable:""},null,8,["modelValue","disabled"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["title","modelValue"])}}}),ge=j(_e,[["__scopeId","data-v-7f9b6f20"]]);const he=$({components:{DictTags:ae,EditDataDialog:ge,SvgIcon:S},setup(){const t=T(null);G();const i=C({loading:!1,showSearch:!0,form:{},params:{},list:[]}),a=ne(function(){i.loading=!0,Promise.resolve(de).then(r=>{let d=W(r.rows||[]);i.list=d}).catch(()=>{}).finally(()=>{i.loading=!1})},300);a();function f(r,d,v,w){X(w.target.innerText),I("复制成功，内容为："+w.target.innerText)}function s(r,d,v){i.form.orderByColumn=r.prop,i.form.isAsc=r.order,a()}function p(){i.params.pageNum=1,a()}function b(){i.form={},p()}function g(){}function u(r){t.value&&t.value.initData(!0,{...r},{afterTitle:" - 添加"}).then(d=>{}).catch(()=>{})}function n(r,d){t.value&&t.value.initData(!0,{...r},{...d}).then(()=>{}).catch(()=>{})}function l(r,d){t.value&&t.value.initData(!0,{...r},{...d}).then(v=>{}).catch(()=>{})}function c(r){Y("确认删除该数据？","提示").then(()=>{I("删除成功")}).catch(()=>{})}return{dataContainer:i,getDataList:a,handleCopyVale:f,handleSortChange:s,handleQuery:p,resetQuery:b,handleExport:g,handleAdd:u,handleDetails:n,handleEdit:l,handleDelete:c,EditDataDialogRef:t,hasPermi:oe}}}),ye={class:"page-container main-view"},be={class:"table-box content-container page-content-box"},ve={class:"top-container"},we={class:"left"},Ce={class:"right"},De={class:"table-container"};function Ee(t,i,a,f,s,p){const b=B,g=U,u=F,n=S,l=Q,c=N,r=q,d=te,v=ee,w=M("EditDataDialog"),D=Z;return E(),H("div",ye,[V(e(c,{gutter:0,class:"page-query-box"},{default:o(()=>[e(u,{span:24,xs:24},{default:o(()=>[e(r,{model:t.dataContainer.form,ref:"QueryFormRef",inline:!0,"label-width":"110px"},{default:o(()=>[e(c,{gutter:0},{default:o(()=>[e(u,{span:8,xs:8},{default:o(()=>[e(g,{label:"名称",prop:"name"},{default:o(()=>[e(b,{modelValue:t.dataContainer.form.name,"onUpdate:modelValue":i[0]||(i[0]=h=>t.dataContainer.form.name=h),placeholder:"请输入",clearable:"",onClear:t.handleQuery,onKeyup:J(t.handleQuery,["enter"])},null,8,["modelValue","onClear","onKeyup"])]),_:1})]),_:1}),e(u,{span:8,xs:8},{default:o(()=>[e(g,{label:" "},{default:o(()=>[e(l,{type:"primary",onClick:t.handleQuery},{default:o(()=>[e(n,{style:"width:15px;height:15px;margin-right:5px;",name:"svg:search-bt.svg"}),_(" 查询 ")]),_:1},8,["onClick"]),e(l,{onClick:t.resetQuery},{default:o(()=>[e(n,{style:"width:15px;height:15px;margin-right:5px;",name:"svg:redo.svg"}),_(" 重置 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1},512),[[z,t.dataContainer.showSearch]]),y("div",be,[y("div",ve,[y("div",we,[e(l,{type:"primary",onClick:t.handleAdd},{default:o(()=>[_(" 新增 ")]),_:1},8,["onClick"]),e(l,{plain:"",type:"primary",onClick:t.handleExport},{default:o(()=>[_(" 导出 ")]),_:1},8,["onClick"])]),y("div",Ce,[e(l,{circle:"",onClick:t.resetQuery},{default:o(()=>[e(n,{style:"width:15px;height:15px;",name:"svg:redo.svg"})]),_:1},8,["onClick"]),e(l,{circle:"",onClick:i[1]||(i[1]=h=>t.dataContainer.showSearch=!t.dataContainer.showSearch)},{default:o(()=>[e(n,{style:"width:15px;height:15px;",name:"svg:search-bt.svg"})]),_:1})])]),y("div",De,[V((E(),x(v,{ref:"ElTableRef",data:t.dataContainer.list,onCellDblclick:t.handleCopyVale,border:"","row-key":"id","tree-props":{children:"childs"},height:"100%"},{default:o(()=>[e(d,{type:"index",align:"left",label:"序号",width:"60",fixed:"left"}),e(d,{label:"权限按钮名称","show-overflow-tooltip":"",align:"left","min-width":"170",prop:"name"}),e(d,{label:"权限字符","show-overflow-tooltip":"",align:"left","min-width":"170",prop:"content"}),e(d,{label:"排序","show-overflow-tooltip":"",align:"left",prop:"sort","min-width":"150"}),e(d,{label:"操作",width:"200",fixed:"right","class-name":"small-padding fixed-width"},{default:o(h=>[e(l,{text:!0,onClick:m=>t.handleDetails(h.row,{isShow:!0,afterTitle:" - 查看"})},{default:o(()=>[_(" 查看 ")]),_:2},1032,["onClick"]),e(l,{text:!0,onClick:m=>t.handleEdit(h.row,{isShow:!1,afterTitle:" - 编辑"})},{default:o(()=>[_(" 编辑 ")]),_:2},1032,["onClick"]),e(l,{text:!0,type:"danger",onClick:m=>t.handleDelete(h.row)},{default:o(()=>[_(" 删除 ")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data","onCellDblclick"])),[[D,t.dataContainer.loading]])])]),e(w,{ref:"EditDataDialogRef"},null,512)])}const Me=j(he,[["render",Ee],["__scopeId","data-v-7b28b382"]]);export{Me as default};