import{_ as P,aV as p,aK as U,o as q,c as J,a as m,b as _,f as S,m as h,bc as E,bl as K,cn as R,l as X,E as Y,p as F,q as G}from"./index-df7e4a51.js";import{g as H,i as Q}from"./index-c13506ae.js";import{b as W}from"./timer-badddbae.js";const v=g=>(F("data-v-7dd2f311"),g=g(),G(),g),tt={class:"page-container main-view"},et={class:"table-box content-container page-content-box"},at=v(()=>m("h3",{style:{"margin-top":"1%","margin-left":"1%"}},"统计分析",-1)),ot=v(()=>m("div",{class:"hengxian"},null,-1)),nt=v(()=>m("br",null,null,-1)),st={style:{"margin-left":"5%"}},lt=v(()=>m("br",null,null,-1)),it=v(()=>m("div",{id:"chart-container"},null,-1)),ct={__name:"index",setup(g){let V=p(""),d=0,u=null;const M=p(""),Z=p("");let f=p([]);const D=p(0),b=p(100),A=()=>{d>0&&(d--,w())},O=()=>{d<f.value[0].StatisticsData.length-1&&(d++,w())},N=()=>{const c=H(document.getElementById("chart-container")),n=Math.max(0,Math.min(D.value,100)),e=Math.max(0,Math.min(b.value,100)),i={dataZoom:[{show:!1,type:"slider",start:n,end:e}]};c.setOption(i)},w=()=>{u&&u.dispose();const c=document.getElementById("chart-container");u=Q(c);const n=new Date(M.value),e=new Date(Z.value);V.value=f.value[0].StatisticsData[d].name,n&&e&&!isNaN(n.getTime())&&isNaN(e.getTime());let i;i=f.value;const t=i.map(a=>a.logDateTime),s=[];for(let a=0;a<i.length;a++){const r=i[a].StatisticsData[d].value.map(o=>o.value);for(let o=0;o<r.length;o++)s[o]||(s[o]=[]),s[o].push(r[o])}const l={xAxis:{type:"category",data:t},yAxis:{type:"value"},series:s.map((a,r)=>({type:"line",name:i[0].StatisticsData[d].value[r].name,data:a})),tooltip:{trigger:"axis",formatter:a=>{let r=`时间: ${a[0].name}<br/>`;for(let o=0;o<a.length;o++){const{seriesName:x,value:I}=a[o];r+=`${x}: ${I}<br/>`}return r}},dataZoom:[{show:!1,type:"slider"}]};u.on("dataZoom",({start:a,end:r})=>{const o=Math.round(a*(t.length-1)),x=Math.round(r*(t.length-1)),I=t.slice(o,x+1),L=s.map(B=>B.slice(o,x+1));u.setOption({xAxis:{data:I},series:s.map((B,z)=>({data:L[z]}))})}),u.setOption(l),u.setOption({toolbox:{show:!0,feature:{saveAsImage:{name:"chartInstance",title:"保存图表",pixelRatio:2},magicType:{type:["bar","line","stack","tiled"]}}}})},y=p(!1),$=()=>{y.value=!y.value},j=()=>{let c;c=f.value;const n=c.map(t=>t.logDateTime),e=[];for(let t=0;t<c.length;t++){const s=c[t].StatisticsData[d].value.map(l=>l.value);for(let l=0;l<s.length;l++)e[l]||(e[l]=[]),e[l].push(s[l])}const i={xAxis:{type:"category",data:n},yAxis:{type:"value"},series:e.map((t,s)=>({type:"line",name:c[0].StatisticsData[d].value[s].name,data:t})),tooltip:{trigger:"axis",formatter:t=>{let s=`时间: ${t[0].name}<br/>`;for(let l=0;l<t.length;l++){const{seriesName:a,value:r}=t[l];s+=`${a}: ${r}<br/>`}return s}},dataZoom:[{show:!1,type:"slider"}]};u.setOption(i)};let T=0;const C=p(null),k=()=>{R({method:"post",url:"/api/data/cout",data:JSON.stringify({group:"siasun",account:"test",password:"123456"})}).then(n=>{C.value=n.data;const e=new Date;f.value.push({logDateTime:e.toLocaleString(),StatisticsData:C.value}),T===0?(w(),T=1):y.value||j()}).catch(n=>{}).finally(()=>{}),W.value=setTimeout(k,500)};return U(()=>{k()}),(c,n)=>{const e=X,i=Y;return q(),J("div",tt,[m("div",et,[at,ot,m("div",null,[_(e,{onClick:A,type:"primary",style:{width:"30%","margin-left":"5%"}},{default:S(()=>[h("＜")]),_:1}),h("  "+E("表名："+K(V)+"🎈")+" ",1),_(e,{onClick:O,type:"primary",style:{width:"30%","margin-left":"1%"}},{default:S(()=>[h("＞")]),_:1}),_(e,{onClick:$,type:"success",style:{width:"15%"}},{default:S(()=>[h(E(y.value?"继续":"暂停"),1)]),_:1})]),nt,m("div",st,[h(" 范围：    "),_(i,{type:"number",modelValue:D.value,"onUpdate:modelValue":n[0]||(n[0]=t=>D.value=t),onInput:N,min:0,style:{width:"30%"}},null,8,["modelValue"]),h("    一   "),_(i,{type:"number",modelValue:b.value,"onUpdate:modelValue":n[1]||(n[1]=t=>b.value=t),onInput:N,max:100,style:{width:"30%"}},null,8,["modelValue"]),lt]),it])])}}},pt=P(ct,[["__scopeId","data-v-7dd2f311"]]);export{pt as default};