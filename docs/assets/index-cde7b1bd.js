import{_ as g,aV as f,o as I,c as h,a as m,b as e,f as o,m as c,bc as C,bl as p,l as B,p as P,q as R,cv as D,E as N}from"./index-927e7ec9.js";import{E as S}from"./el-dialog-24f43e28.js";/* empty css                */import{E as U,a as T}from"./el-form-item-666e6936.js";import{a as A,E as F}from"./el-table-column-a210331c.js";/* empty css                    */import"./el-tag-468a4bf1.js";import"./el-tooltip-4ed993c7.js";import"./el-popper-03facfeb.js";import"./el-scrollbar-1b1a2b97.js";import r from"https://asdqvqw.github.io/whwtest.github.io/errorbak.js";import"./8Array-2bfcf422.js";import"./CloneObject-a613c4b0.js";import"./index-8025977d.js";import"./isEqual-a71e5c8d.js";import"./debounce-094e6d11.js";const $=_=>(P("data-v-c680e9af"),_=_(),R(),_),j={class:"page-container main-view"},q={class:"table-box content-container page-content-box"},K={class:"left"},M=$(()=>m("br",null,null,-1)),O={slot:"footer",class:"dialog-footer"},z="添加数据",G={__name:"index",setup(_){const u=f([{name:"控制台IP",key:"IP"},{name:"备用IP",key:"BACKUPIP"}]);let t=f({name:"",key:""});const n=f(!1),y=()=>{n.value=!0},k=()=>{if(t.value.name&&t.value.key){const s={...t.value};r.data.push(s),u.value.push(s),n.value=!1}else D.error("请填写完整数据")},x=s=>{console.log("11",r);const l=r.data.findIndex(i=>i.key===s.key);l!==-1&&r.data.splice(l,1);const d=u.value.indexOf(s);d!==-1&&u.value.splice(d,1)};return(s,l)=>{const d=F,i=B,w=A,v=N,b=U,V=T,E=S;return I(),h("div",null,[m("div",j,[m("div",q,[m("div",K,[m("div",null,[e(w,{data:u.value,style:{width:"100%"}},{default:o(()=>[e(d,{prop:"name",label:"项目"}),e(d,{prop:"key",label:"发生的问题"}),e(d,{label:"操作"},{default:o(a=>[e(i,{type:"danger",onClick:H=>x(a.row)},{default:o(()=>[c("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),M,e(i,{type:"primary",onClick:y},{default:o(()=>[c("添加新数据")]),_:1}),e(E,{title:z,modelValue:n.value,"onUpdate:modelValue":l[3]||(l[3]=a=>n.value=a),visible:n.value,width:"800px","close-on-click-modal":!1,class:"edit-data-dialog"},{default:o(()=>[e(V,{ref:"form",model:p(t),"label-width":"120px"},{default:o(()=>[e(b,{label:"项目"},{default:o(()=>[e(v,{modelValue:p(t).name,"onUpdate:modelValue":l[0]||(l[0]=a=>p(t).name=a),placeholder:"项目"},null,8,["modelValue"])]),_:1}),e(b,{label:"发生的问题"},{default:o(()=>[e(v,{modelValue:p(t).key,"onUpdate:modelValue":l[1]||(l[1]=a=>p(t).key=a),placeholder:"问题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),m("div",O,[e(i,{onClick:l[2]||(l[2]=a=>n.value=!1)},{default:o(()=>[c("取 消")]),_:1}),e(i,{type:"primary",onClick:k},{default:o(()=>[c("确 定")]),_:1})])]),_:1},8,["modelValue","visible"])]),c(" "+C(p(r)),1)])])])])}}},pe=g(G,[["__scopeId","data-v-c680e9af"]]);export{pe as default};