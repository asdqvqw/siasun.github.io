import{J as n,d as a}from"./jszip.min-17f81b07.js";import{_ as c,o as i,c as r,a as o}from"./index-02639357.js";window.JSZip=n;const d={mounted(){this.preview()},methods:{async preview(){const e=await(await fetch("./main/huojia.docx")).blob();await a.exports.renderAsync(e,this.$refs.preview)}}},_={class:"page-container main-view"},p={class:"table-box content-container page-content-box"},l={ref:"preview"};function x(t,s,e,f,v,h){return i(),r("div",_,[o("div",p,[o("div",l,null,512)])])}const u=c(d,[["render",x],["__scopeId","data-v-92937eef"]]);export{u as default};