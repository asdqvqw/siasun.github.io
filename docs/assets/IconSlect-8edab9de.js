import{_ as u,d as _,r as g,bg as m,Q as h,o as f,e as S,f as p,b as r,a as b,m as v,bc as I}from"./index-927e7ec9.js";import{E as w}from"./el-autocomplete-6f0098f7.js";import"./el-scrollbar-1b1a2b97.js";import"./el-popper-03facfeb.js";import{S as d,i as y}from"./index-d2f38102.js";const x=_({name:"IconSelect",components:{SvgIcon:d},props:{name:{type:String,default:""},isShow:{type:Boolean,default:!1}},emits:["change"],setup(e,{emit:t}){const n=g({isShow:m(e,"isShow"),name:m(e,"name")}),c=h({get(){return n.name},set(s){t("change",s)}});function l(s,o){o(y.map(i=>({value:i.name})))}return{dataContainer:n,iconName:c,getIconDataList:l}}}),N={class:"item"};function V(e,t,n,c,l,s){const o=d,i=w;return f(),S(i,{modelValue:e.iconName,"onUpdate:modelValue":t[0]||(t[0]=a=>e.iconName=a),"fetch-suggestions":e.getIconDataList,style:{width:"100%"},disabled:e.dataContainer.isShow,"hide-loading":!0,"popper-class":"icon-select-cp-item",placeholder:""},{suffix:p(()=>[r(o,{style:"width:20px;height:20px;",name:e.iconName},null,8,["name"])]),default:p(a=>[b("div",N,[r(o,{style:"width:15px;height:15px;margin-right:10px;",name:a.item.value},null,8,["name"]),v(" "+I(a.item.value),1)])]),_:1},8,["modelValue","fetch-suggestions","disabled"])}const D=u(x,[["render",V],["__scopeId","data-v-3681bcbb"]]);export{D as I};