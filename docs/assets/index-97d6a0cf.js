import{_ as a}from"./DefinScrollbar-4a31cea8.js";import{J as c,d as i}from"./jszip.min-4aaa383c.js";import{_ as r,o as _,c as d,a as t,b as p,f as l}from"./index-5a02a582.js";import"./el-scrollbar-f84df57f.js";/* empty css                                                                       */window.JSZip=c;const m={mounted(){this.preview()},methods:{async preview(){const e=await(await fetch("./main/huojia.docx")).blob();await i.exports.renderAsync(e,this.$refs.preview)}}},h={class:"page-container main-view"},f={class:"table-box content-container page-content-box"},x={ref:"preview"};function u(o,s,e,w,v,b){const n=a;return _(),d("div",h,[t("div",f,[p(n,{height:"100%",showUpBt:!0},{default:l(()=>[t("div",x,null,512)]),_:1})])])}const P=r(m,[["render",u],["__scopeId","data-v-8c45215d"]]);export{P as default};