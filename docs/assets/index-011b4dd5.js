import{_ as K,aV as Q,o as s,c as h,b as l,f as n,m as p,bc as x,a as e,F as y,aY as f,l as W,e as b,E as X,p as Z,q as ee}from"./index-3842b3c8.js";import{E as le,a as te}from"./el-tab-pane-231b9385.js";import{E as ne}from"./el-card-513ad40f.js";import"./strings-5aa74a7f.js";const _=C=>(Z("data-v-3dea8215"),C=C(),ee(),C),ae={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},oe={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},de={class:"button-group"},ie={class:"input-group"},ue=_(()=>e("label",null,"CAN ID通讯号:",-1)),se={class:"input-group"},pe=_(()=>e("label",null,"单元编号:",-1)),ce={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},re={class:"button-group"},me={class:"input-group"},_e=_(()=>e("label",null,"CAN ID通讯号:",-1)),ge={class:"input-group"},he=_(()=>e("label",null,"单元编号:",-1)),ye={class:"input-group"},fe=_(()=>e("label",null,"伺服类型:",-1)),be={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},ve={class:"button-group"},Ve={class:"input-group"},Ce=_(()=>e("label",null,"CAN ID通讯号:",-1)),xe={class:"input-group"},ke=_(()=>e("label",null,"单元编号:",-1)),Ue={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},we={class:"button-group"},Ne={class:"input-group"},Ae=_(()=>e("label",null,"CAN ID通讯号:",-1)),De={class:"input-group"},Me=_(()=>e("label",null,"单元编号:",-1)),$e={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Ee={class:"button-group"},Be={class:"input-group"},Ie=_(()=>e("label",null,"CAN ID通讯号:",-1)),Oe={class:"input-group"},Se=_(()=>e("label",null,"单元编号:",-1)),Fe={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Pe={class:"button-group"},Te={class:"input-group"},Re=_(()=>e("label",null,"CAN ID通讯号:",-1)),qe={class:"input-group"},Ge=_(()=>e("label",null,"单元编号:",-1)),Le={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Ye={class:"button-group"},je={class:"input-group"},ze=_(()=>e("label",null,"CAN ID通讯号:",-1)),He={class:"input-group"},Je=_(()=>e("label",null,"单元编号:",-1)),Ke={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Qe={class:"button-group"},We={class:"input-group"},Xe=_(()=>e("label",null,"CAN ID通讯号:",-1)),Ze={class:"input-group"},el=_(()=>e("label",null,"单元编号:",-1)),ll={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},tl={class:"button-group"},nl={class:"input-group"},al=_(()=>e("label",null,"CAN ID通讯号:",-1)),ol={class:"input-group"},dl=_(()=>e("label",null,"单元编号:",-1)),il={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},ul={class:"button-group"},sl={class:"input-group"},pl=_(()=>e("label",null,"CAN ID通讯号:",-1)),cl={class:"input-group"},rl=_(()=>e("label",null,"单元编号:",-1)),ml={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},_l={class:"button-group"},gl={class:"input-group"},hl=_(()=>e("label",null,"CAN ID通讯号:",-1)),yl={class:"input-group"},fl=_(()=>e("label",null,"单元编号:",-1)),bl={__name:"index",setup(C){const i=Q({canport:[]}),k=()=>{i.value.canport.push({canpos:[],canopenpos:[],canguide:[],canencoder:[],canbattery:[],canbms:[],canrfid:[],canopenencoder:[],cangyro:[],canmanualbox:[],canio:[]})},U=o=>{i.value.canport.splice(o,1)},w=o=>{i.value.canport[o].canpos.push({canid:2,unitid:0})},N=(o,g)=>{i.value.canport[o].canpos.splice(g,1)},A=o=>{i.value.canport[o].canopenpos.push({canid:2,unitid:0,servotype:1})},D=(o,g)=>{i.value.canport[o].canopenpos.splice(g,1)},M=o=>{i.value.canport[o].canguide.push({canid:2,unitid:0})},$=(o,g)=>{i.value.canport[o].canguide.splice(g,1)},E=o=>{i.value.canport[o].canencoder.push({canid:2,unitid:0})},B=(o,g)=>{i.value.canport[o].canencoder.splice(g,1)},I=o=>{i.value.canport[o].canbattery.push({canid:2,unitid:0})},O=(o,g)=>{i.value.canport[o].canbattery.splice(g,1)},S=o=>{i.value.canport[o].canbms.push({canid:2,unitid:0})},F=(o,g)=>{i.value.canport[o].canbms.splice(g,1)},P=o=>{i.value.canport[o].canrfid.push({canid:2,unitid:0})},T=(o,g)=>{i.value.canport[o].canrfid.splice(g,1)},R=o=>{i.value.canport[o].canopenencoder.push({canid:2,unitid:0})},q=(o,g)=>{i.value.canport[o].canopenencoder.splice(g,1)},G=o=>{i.value.canport[o].cangyro.push({canid:2,unitid:0})},L=(o,g)=>{i.value.canport[o].cangyro.splice(g,1)},Y=o=>{i.value.canport[o].canmanualbox.push({canid:2,unitid:0})},j=(o,g)=>{i.value.canport[o].canmanualbox.splice(g,1)},z=o=>{i.value.canport[o].canio.push({canid:2,unitid:0})},H=(o,g)=>{i.value.canport[o].canio.splice(g,1)};return(o,g)=>{const c=W,r=X,m=ne,v=le,J=te;return s(),h(y,null,[l(c,{type:"primary",onClick:k,style:{"margin-left":"1vw"}},{default:n(()=>[p("添加 CAN 端口")]),_:1}),p(" "+x(i.value)+" ",1),e("div",ae,[(s(!0),h(y,null,f(i.value.canport,(V,u)=>(s(),b(m,{key:u,class:"button-card","body-style":{padding:"20px"}},{default:n(()=>[e("div",null,[e("strong",null,"CAN "+x(u+1),1),l(c,{style:{"margin-left":"1vw"},type:"danger",onClick:t=>U(u)},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),l(J,null,{default:n(()=>[l(v,{label:"CAN Pos"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>w(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN Pos")]),_:2},1032,["onClick"]),e("div",oe,[(s(!0),h(y,null,f(V.canpos,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",de,[l(c,{type:"danger",onClick:a=>N(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",ie,[ue,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",se,[pe,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"CAN Open"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>A(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN Open Pos")]),_:2},1032,["onClick"]),e("div",ce,[(s(!0),h(y,null,f(V.canopenpos,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",re,[l(c,{type:"danger",onClick:a=>D(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",me,[_e,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",ge,[he,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",ye,[fe,l(r,{modelValue:t.servotype,"onUpdate:modelValue":a=>t.servotype=a,modelModifiers:{number:!0},type:"number",placeholder:"输入服务类型",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"惯导"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>M(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN Guide")]),_:2},1032,["onClick"]),e("div",be,[(s(!0),h(y,null,f(V.canguide,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",ve,[l(c,{type:"danger",onClick:a=>$(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",Ve,[Ce,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",xe,[ke,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"Canencoder"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>E(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN Canencoder")]),_:2},1032,["onClick"]),e("div",Ue,[(s(!0),h(y,null,f(V.canencoder,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",we,[l(c,{type:"danger",onClick:a=>B(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",Ne,[Ae,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",De,[Me,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"电池"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>I(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN battery")]),_:2},1032,["onClick"]),e("div",$e,[(s(!0),h(y,null,f(V.canbattery,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",Ee,[l(c,{type:"danger",onClick:a=>O(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",Be,[Ie,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Oe,[Se,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"电池指示表"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>S(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN BMS")]),_:2},1032,["onClick"]),e("div",Fe,[(s(!0),h(y,null,f(V.canbms,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",Pe,[l(c,{type:"danger",onClick:a=>F(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",Te,[Re,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",qe,[Ge,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"RFID"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>P(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN RFID")]),_:2},1032,["onClick"]),e("div",Le,[(s(!0),h(y,null,f(V.canrfid,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",Ye,[l(c,{type:"danger",onClick:a=>T(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",je,[ze,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",He,[Je,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"canopenencoder"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>R(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN canopenencoder")]),_:2},1032,["onClick"]),e("div",Ke,[(s(!0),h(y,null,f(V.canopenencoder,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",Qe,[l(c,{type:"danger",onClick:a=>q(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",We,[Xe,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",Ze,[el,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"陀螺仪"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>G(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN cangyro")]),_:2},1032,["onClick"]),e("div",ll,[(s(!0),h(y,null,f(V.cangyro,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",tl,[l(c,{type:"danger",onClick:a=>L(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",nl,[al,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",ol,[dl,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"手控"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>Y(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN canmanualbox")]),_:2},1032,["onClick"]),e("div",il,[(s(!0),h(y,null,f(V.canmanualbox,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",ul,[l(c,{type:"danger",onClick:a=>j(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",sl,[pl,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",cl,[rl,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024),l(v,{label:"IO"},{default:n(()=>[l(m,{class:"input-group"},{default:n(()=>[l(c,{type:"success",onClick:t=>z(u),style:{"margin-bottom":"10px"}},{default:n(()=>[p("添加 CAN io")]),_:2},1032,["onClick"]),e("div",ml,[(s(!0),h(y,null,f(V.canio,(t,d)=>(s(),b(m,{key:d,class:"sensor-input"},{default:n(()=>[e("div",_l,[l(c,{type:"danger",onClick:a=>H(u,d),style:{"margin-left":"10px"}},{default:n(()=>[p("删除")]),_:2},1032,["onClick"])]),e("div",gl,[hl,l(r,{modelValue:t.canid,"onUpdate:modelValue":a=>t.canid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 CAN ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])]),e("div",yl,[fl,l(r,{modelValue:t.unitid,"onUpdate:modelValue":a=>t.unitid=a,modelModifiers:{number:!0},type:"number",placeholder:"输入 Unit ID",style:{width:"100px","margin-right":"10px"}},null,8,["modelValue","onUpdate:modelValue"])])]),_:2},1024))),128))])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))])],64)}}},kl=K(bl,[["__scopeId","data-v-3dea8215"]]);export{kl as default};