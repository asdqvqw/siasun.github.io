import{_ as s}from"./DefinScrollbar-c9a189f1.js";import{J as i,d as c}from"./jszip.min-dd326ceb.js";import{_ as r,o as _,c as p,a as t,b as d,f as l}from"./index-3842b3c8.js";import"./el-scrollbar-fde17889.js";/* empty css                                                                       */window.JSZip=i;const m={mounted(){this.preview()},methods:{async preview(){const e=await(await fetch("./main/pingtaiwai.docx")).blob();await c.exports.renderAsync(e,this.$refs.preview)}}},f={class:"page-container main-view"},h={class:"table-box content-container page-content-box"},w={ref:"preview"};function x(o,a,e,u,v,b){const n=s;return _(),p("div",f,[t("div",h,[d(n,{height:"100%",showUpBt:!0},{default:l(()=>[t("div",w,null,512)]),_:1})])])}const P=r(m,[["render",x],["__scopeId","data-v-6b36abac"]]);export{P as default};