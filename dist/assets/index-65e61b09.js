import{_ as P,aV as p,aK as R,o as U,c as q,a as m,b as v,f as S,m as h,bc as B,bl as J,ck as K,l as X,E as Y,p as F,q as G}from"./index-75fe45e9.js";import{g as H,i as Q}from"./index-c13506ae.js";import{b as W}from"./timer-83df5d57.js";const _=g=>(F("data-v-85d1c7f6"),g=g(),G(),g),tt={class:"page-container main-view"},et={class:"table-box content-container page-content-box"},at=_(()=>m("h3",{style:{"margin-top":"1%","margin-left":"1%"}},"统计分析",-1)),ot=_(()=>m("div",{class:"hengxian"},null,-1)),nt=_(()=>m("br",null,null,-1)),st={style:{"margin-left":"5%"}},lt=_(()=>m("br",null,null,-1)),it=_(()=>m("div",{id:"chart-container"},null,-1)),ct={__name:"index",setup(g){let T=p(""),d=0,u=null;const E=p(""),M=p("");let f=p([]);const D=p(0),b=p(100),O=()=>{d>0&&(d--,I())},Z=()=>{d<f.value[0].StatisticsData.length-1&&(d++,I())},V=()=>{const c=H(document.getElementById("chart-container")),n=Math.max(0,Math.min(D.value,100)),e=Math.max(0,Math.min(b.value,100)),i={dataZoom:[{show:!1,type:"slider",start:n,end:e}]};c.setOption(i)},I=()=>{u&&u.dispose();const c=document.getElementById("chart-container");u=Q(c);const n=new Date(E.value),e=new Date(M.value);T.value=f.value[0].StatisticsData[d].name,n&&e&&!isNaN(n.getTime())&&isNaN(e.getTime());let i;i=f.value;const t=i.map(a=>a.logDateTime),s=[];for(let a=0;a<i.length;a++){const r=i[a].StatisticsData[d].value.map(o=>o.value);for(let o=0;o<r.length;o++)s[o]||(s[o]=[]),s[o].push(r[o])}const l={xAxis:{type:"category",data:t},yAxis:{type:"value"},series:s.map((a,r)=>({type:"line",name:i[0].StatisticsData[d].value[r].name,data:a})),tooltip:{trigger:"axis",formatter:a=>{let r=`时间: ${a[0].name}<br/>`;for(let o=0;o<a.length;o++){const{seriesName:x,value:w}=a[o];r+=`${x}: ${w}<br/>`}return r}},dataZoom:[{show:!1,type:"slider"}]};u.on("dataZoom",({start:a,end:r})=>{const o=Math.round(a*(t.length-1)),x=Math.round(r*(t.length-1)),w=t.slice(o,x+1),L=s.map(A=>A.slice(o,x+1));u.setOption({xAxis:{data:w},series:s.map((A,z)=>({data:L[z]}))})}),u.setOption(l),u.setOption({toolbox:{show:!0,feature:{saveAsImage:{name:"chartInstance",title:"保存图表",pixelRatio:2},magicType:{type:["bar","line","stack","tiled"]}}}})},y=p(!1),$=()=>{y.value=!y.value},j=()=>{let c;c=f.value;const n=c.map(t=>t.logDateTime),e=[];for(let t=0;t<c.length;t++){const s=c[t].StatisticsData[d].value.map(l=>l.value);for(let l=0;l<s.length;l++)e[l]||(e[l]=[]),e[l].push(s[l])}const i={xAxis:{type:"category",data:n},yAxis:{type:"value"},series:e.map((t,s)=>({type:"line",name:c[0].StatisticsData[d].value[s].name,data:t})),tooltip:{trigger:"axis",formatter:t=>{let s=`时间: ${t[0].name}<br/>`;for(let l=0;l<t.length;l++){const{seriesName:a,value:r}=t[l];s+=`${a}: ${r}<br/>`}return s}},dataZoom:[{show:!1,type:"slider"}]};u.setOption(i),u.setOption({toolbox:{show:!0,feature:{saveAsImage:{name:"chartInstance",title:"保存图表",pixelRatio:2},magicType:{type:["bar","line","stack","tiled"]}}}})};let N=0;const k=p(null),C=()=>{K({method:"post",url:"/api/data/cout",data:JSON.stringify({group:"siasun",account:"test",password:"123456"})}).then(n=>{k.value=n.data;const e=new Date;f.value.push({logDateTime:e.toLocaleString(),StatisticsData:k.value}),N===0?(I(),N=1):y.value||j()}).catch(n=>{}).finally(()=>{}),W.value=setTimeout(C,500)};return R(()=>{C()}),(c,n)=>{const e=X,i=Y;return U(),q("div",tt,[m("div",et,[at,ot,m("div",null,[v(e,{onClick:O,type:"primary",style:{width:"30%","margin-left":"5%"}},{default:S(()=>[h("＜")]),_:1}),h("  "+B("表名："+J(T)+"🎈")+" ",1),v(e,{onClick:Z,type:"primary",style:{width:"30%","margin-left":"1%"}},{default:S(()=>[h("＞")]),_:1}),v(e,{onClick:$,type:"success",style:{width:"15%"}},{default:S(()=>[h(B(y.value?"继续":"暂停"),1)]),_:1})]),nt,m("div",st,[h(" 范围：    "),v(i,{type:"number",modelValue:D.value,"onUpdate:modelValue":n[0]||(n[0]=t=>D.value=t),onInput:V,min:0,style:{width:"30%"}},null,8,["modelValue"]),h("    一   "),v(i,{type:"number",modelValue:b.value,"onUpdate:modelValue":n[1]||(n[1]=t=>b.value=t),onInput:V,max:100,style:{width:"30%"}},null,8,["modelValue"]),lt]),it])])}}},pt=P(ct,[["__scopeId","data-v-85d1c7f6"]]);export{pt as default};