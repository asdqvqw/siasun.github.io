import{b8 as Ae,c4 as Te,aw as Pe,bL as q,bP as ne,c2 as pe,d as U,ae as W,ao as le,bZ as oe,bN as Y,aV as $,bB as L,aB as ce,c3 as ve,o,c,aC as fe,bl as M,n as Ee,bO as _e,cE as Se,cF as $e,Q as H,aK as ye,aQ as Be,b as n,bQ as j,cD as Oe,b$ as Re,cG as De,bT as Q,cH as Ie,aR as ze,cI as Me,aZ as me,cJ as he,cK as re,c0 as Fe,cL as Le,br as Ve,cM as de,r as Ke,aP as Ge,bH as Ue,by as He,g as O,bR as je,bS as Qe,e as ue,f as h,F as I,aY as z,a as l,bc as g,m as qe}from"./index-86487876.js";import{E as We}from"./el-card-8117d941.js";import{j as Ye}from"./commondata-d819d197.js";import{c as F}from"./strings-d1ce2382.js";const Z=Symbol("tabsRootContextKey"),Ze=(t,d,y)=>Te(t.subTree).filter(s=>{var a;return Pe(s)&&((a=s.type)==null?void 0:a.name)===d&&!!s.component}).map(s=>s.component.uid).map(s=>y[s]).filter(s=>!!s),Je=(t,d)=>{const y={},i=Ae([]);return{children:i,addChild:a=>{y[a.uid]=a,i.value=Ze(t,d,y)},removeChild:a=>{delete y[a],i.value=i.value.filter(P=>P.uid!==a)}}},Xe=q({tabs:{type:ne(Array),default:()=>pe([])}}),ge="ElTabBar",et=U({name:ge}),tt=U({...et,props:Xe,setup(t,{expose:d}){const y=t,i=W(),v=le(Z);v||oe(ge,"<el-tabs><el-tab-bar /></el-tabs>");const s=Y("tabs"),a=$(),P=$(),e=()=>{let x=0,p=0;const _=["top","bottom"].includes(v.props.tabPosition)?"width":"height",m=_==="width"?"x":"y",R=m==="x"?"left":"top";return y.tabs.every(B=>{var V,r;const C=(r=(V=i.parent)==null?void 0:V.refs)==null?void 0:r[`tab-${B.uid}`];if(!C)return!1;if(!B.active)return!0;x=C[`offset${F(R)}`],p=C[`client${F(_)}`];const k=window.getComputedStyle(C);return _==="width"&&(y.tabs.length>1&&(p-=Number.parseFloat(k.paddingLeft)+Number.parseFloat(k.paddingRight)),x+=Number.parseFloat(k.paddingLeft)),!1}),{[_]:`${p}px`,transform:`translate${F(m)}(${x}px)`}},w=()=>P.value=e();return L(()=>y.tabs,async()=>{await ce(),w()},{immediate:!0}),ve(a,()=>w()),d({ref:a,update:w}),(x,p)=>(o(),c("div",{ref_key:"barRef",ref:a,class:fe([M(s).e("active-bar"),M(s).is(M(v).props.tabPosition)]),style:Ee(P.value)},null,6))}});var at=_e(tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const st=q({panes:{type:ne(Array),default:()=>pe([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),nt={tabClick:(t,d,y)=>y instanceof Event,tabRemove:(t,d)=>d instanceof Event},be="ElTabNav",lt=U({name:be,props:st,emits:nt,setup(t,{expose:d,emit:y}){const i=W(),v=le(Z);v||oe(be,"<el-tabs><tab-nav /></el-tabs>");const s=Y("tabs"),a=Se(),P=$e(),e=$(),w=$(),x=$(),p=$(!1),_=$(0),m=$(!1),R=$(!0),B=H(()=>["top","bottom"].includes(v.props.tabPosition)?"width":"height"),V=H(()=>({transform:`translate${B.value==="width"?"X":"Y"}(-${_.value}px)`})),r=()=>{if(!e.value)return;const u=e.value[`offset${F(B.value)}`],f=_.value;if(!f)return;const b=f>u?f-u:0;_.value=b},C=()=>{if(!e.value||!w.value)return;const u=w.value[`offset${F(B.value)}`],f=e.value[`offset${F(B.value)}`],b=_.value;if(u-b<=f)return;const E=u-b>f*2?b+f:u-f;_.value=E},k=async()=>{const u=w.value;if(!p.value||!x.value||!e.value||!u)return;await ce();const f=x.value.querySelector(".is-active");if(!f)return;const b=e.value,E=["top","bottom"].includes(v.props.tabPosition),T=f.getBoundingClientRect(),A=b.getBoundingClientRect(),D=E?u.offsetWidth-A.width:u.offsetHeight-A.height,S=_.value;let N=S;E?(T.left<A.left&&(N=S-(A.left-T.left)),T.right>A.right&&(N=S+T.right-A.right)):(T.top<A.top&&(N=S-(A.top-T.top)),T.bottom>A.bottom&&(N=S+(T.bottom-A.bottom))),N=Math.max(N,0),_.value=Math.min(N,D)},K=()=>{if(!w.value||!e.value)return;const u=w.value[`offset${F(B.value)}`],f=e.value[`offset${F(B.value)}`],b=_.value;if(f<u){const E=_.value;p.value=p.value||{},p.value.prev=E,p.value.next=E+f<u,u-E<f&&(_.value=u-f)}else p.value=!1,b>0&&(_.value=0)},J=u=>{const f=u.code,{up:b,down:E,left:T,right:A}=Q;if(![b,E,T,A].includes(f))return;const D=Array.from(u.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),S=D.indexOf(u.target);let N;f===T||f===b?S===0?N=D.length-1:N=S-1:S<D.length-1?N=S+1:N=0,D[N].focus({preventScroll:!0}),D[N].click(),ie()},ie=()=>{R.value&&(m.value=!0)},X=()=>m.value=!1;return L(a,u=>{u==="hidden"?R.value=!1:u==="visible"&&setTimeout(()=>R.value=!0,50)}),L(P,u=>{u?setTimeout(()=>R.value=!0,50):R.value=!1}),ve(x,K),ye(()=>setTimeout(()=>k(),0)),Be(()=>K()),d({scrollToActiveTab:k,removeFocus:X}),L(()=>t.panes,()=>i.update(),{flush:"post"}),()=>{const u=p.value?[n("span",{class:[s.e("nav-prev"),s.is("disabled",!p.value.prev)],onClick:r},[n(j,null,{default:()=>[n(Oe,null,null)]})]),n("span",{class:[s.e("nav-next"),s.is("disabled",!p.value.next)],onClick:C},[n(j,null,{default:()=>[n(Re,null,null)]})])]:null,f=t.panes.map((b,E)=>{var T,A,D,S;const N=b.uid,ee=b.props.disabled,te=(A=(T=b.props.name)!=null?T:b.index)!=null?A:`${E}`,ae=!ee&&(b.isClosable||t.editable);b.index=`${E}`;const Ce=ae?n(j,{class:"is-icon-close",onClick:G=>y("tabRemove",b,G)},{default:()=>[n(De,null,null)]}):null,we=((S=(D=b.slots).label)==null?void 0:S.call(D))||b.props.label,ke=!ee&&b.active?0:-1;return n("div",{ref:`tab-${N}`,class:[s.e("item"),s.is(v.props.tabPosition),s.is("active",b.active),s.is("disabled",ee),s.is("closable",ae),s.is("focus",m.value)],id:`tab-${te}`,key:`tab-${N}`,"aria-controls":`pane-${te}`,role:"tab","aria-selected":b.active,tabindex:ke,onFocus:()=>ie(),onBlur:()=>X(),onClick:G=>{X(),y("tabClick",b,te,G)},onKeydown:G=>{ae&&(G.code===Q.delete||G.code===Q.backspace)&&y("tabRemove",b,G)}},[we,Ce])});return n("div",{ref:x,class:[s.e("nav-wrap"),s.is("scrollable",!!p.value),s.is(v.props.tabPosition)]},[u,n("div",{class:s.e("nav-scroll"),ref:e},[n("div",{class:[s.e("nav"),s.is(v.props.tabPosition),s.is("stretch",t.stretch&&["top","bottom"].includes(v.props.tabPosition))],ref:w,style:V.value,role:"tablist",onKeydown:J},[t.type?null:n(at,{tabs:[...t.panes]},null),f])])])}}}),ot=q({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:ne(Function),default:()=>!0},stretch:Boolean}),se=t=>Fe(t)||Le(t),ct={[he]:t=>se(t),tabClick:(t,d)=>d instanceof Event,tabChange:t=>se(t),edit:(t,d)=>["remove","add"].includes(d),tabRemove:t=>se(t),tabAdd:()=>!0};var it=U({name:"ElTabs",props:ot,emits:ct,setup(t,{emit:d,slots:y,expose:i}){var v,s;const a=Y("tabs"),{children:P,addChild:e,removeChild:w}=Je(W(),"ElTabPane"),x=$(),p=$((s=(v=t.modelValue)!=null?v:t.activeName)!=null?s:"0"),_=r=>{p.value=r,d(he,r),d("tabChange",r)},m=async r=>{var C,k,K;if(!(p.value===r||re(r)))try{await((C=t.beforeLeave)==null?void 0:C.call(t,r,p.value))!==!1&&(_(r),(K=(k=x.value)==null?void 0:k.removeFocus)==null||K.call(k))}catch{}},R=(r,C,k)=>{r.props.disabled||(m(C),d("tabClick",r,k))},B=(r,C)=>{r.props.disabled||re(r.props.name)||(C.stopPropagation(),d("edit",r.props.name,"remove"),d("tabRemove",r.props.name))},V=()=>{d("edit",void 0,"add"),d("tabAdd")};return Ie({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},H(()=>!!t.activeName)),L(()=>t.activeName,r=>m(r)),L(()=>t.modelValue,r=>m(r)),L(p,async()=>{var r;await ce(),(r=x.value)==null||r.scrollToActiveTab()}),ze(Z,{props:t,currentName:p,registerPane:e,unregisterPane:w}),i({currentName:p}),()=>{const r=t.editable||t.addable?n("span",{class:a.e("new-tab"),tabindex:"0",onClick:V,onKeydown:K=>{K.code===Q.enter&&V()}},[n(j,{class:a.is("icon-plus")},{default:()=>[n(Me,null,null)]})]):null,C=n("div",{class:[a.e("header"),a.is(t.tabPosition)]},[r,n(lt,{ref:x,currentName:p.value,editable:t.editable,type:t.type,panes:P.value,stretch:t.stretch,onTabClick:R,onTabRemove:B},null)]),k=n("div",{class:a.e("content")},[me(y,"default")]);return n("div",{class:[a.b(),a.m(t.tabPosition),{[a.m("card")]:t.type==="card",[a.m("border-card")]:t.type==="border-card"}]},[...t.tabPosition!=="bottom"?[C,k]:[k,C]])}}});const rt=q({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),dt=["id","aria-hidden","aria-labelledby"],xe="ElTabPane",ut=U({name:xe}),bt=U({...ut,props:rt,setup(t){const d=t,y=W(),i=Ve(),v=le(Z);v||oe(xe,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const s=Y("tab-pane"),a=$(),P=H(()=>d.closable||v.props.closable),e=de(()=>{var m;return v.currentName.value===((m=d.name)!=null?m:a.value)}),w=$(e.value),x=H(()=>{var m;return(m=d.name)!=null?m:a.value}),p=de(()=>!d.lazy||w.value||e.value);L(e,m=>{m&&(w.value=!0)});const _=Ke({uid:y.uid,slots:i,props:d,paneName:x,active:e,index:a,isClosable:P});return ye(()=>{v.registerPane(_)}),Ge(()=>{v.unregisterPane(_.uid)}),(m,R)=>M(p)?Ue((o(),c("div",{key:0,id:`pane-${M(x)}`,class:fe(M(s).b()),role:"tabpanel","aria-hidden":!M(e),"aria-labelledby":`tab-${M(x)}`},[me(m.$slots,"default")],10,dt)),[[He,M(e)]]):O("v-if",!0)}});var Ne=_e(bt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const pt=je(it,{TabPane:Ne}),vt=Qe(Ne);const ft={key:0},_t=l("h4",null,"CAN Pos:",-1),yt={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},mt={key:1},ht=l("h4",null,"CAN Open Pos:",-1),gt={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},xt={key:0},Nt={key:1},Ct={key:2},wt={key:3},kt={key:2},At=l("h4",null,"CAN Guide:",-1),Tt={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Pt={key:3},Et=l("h4",null,"CAN Encoder:",-1),St={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},$t={key:4},Bt=l("h4",null,"CAN Battery:",-1),Ot={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Rt={key:5},Dt=l("h4",null,"CAN RFID:",-1),It={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},zt={key:6},Mt=l("h4",null,"CAN Manual Box:",-1),Ft={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Lt={key:7},Vt=l("h4",null,"CAN IO:",-1),Kt={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Gt={key:8},Ut=l("h4",null,"CAN Gyro:",-1),Ht={style:{display:"flex",gap:"20px","flex-wrap":"wrap","margin-top":"2%"}},Yt={__name:"check",setup(t){return(d,y)=>{const i=We,v=vt,s=pt;return o(),ue(s,null,{default:h(()=>[(o(!0),c(I,null,z(M(Ye).CanMan.canport,(a,P)=>(o(),ue(v,{key:P,label:"CAN Port "+(P+1)},{default:h(()=>[a.canpos.length?(o(),c("div",ft,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[_t,l("div",yt,[(o(!0),c(I,null,z(a.canpos,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Pos 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canopenpos.length?(o(),c("div",mt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[ht,l("div",gt,[(o(!0),c(I,null,z(a.canopenpos,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Open Pos 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1),l("p",null,[qe("伺服类型: "),e.servotype===0?(o(),c("span",xt,"Elmo伺服")):e.servotype===1?(o(),c("span",Nt,"步科伺服")):e.servotype===2?(o(),c("span",Ct,"Motec伺服")):e.servotype===3?(o(),c("span",wt,"AMC伺服")):O("",!0)])]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canguide.length?(o(),c("div",kt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[At,l("div",Tt,[(o(!0),c(I,null,z(a.canguide,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Guide 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canencoder.length?(o(),c("div",Pt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Et,l("div",St,[(o(!0),c(I,null,z(a.canencoder,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Encoder 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canbattery.length?(o(),c("div",$t,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Bt,l("div",Ot,[(o(!0),c(I,null,z(a.canbattery,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Battery 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canrfid.length?(o(),c("div",Rt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Dt,l("div",It,[(o(!0),c(I,null,z(a.canrfid,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN RFID 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canmanualbox.length?(o(),c("div",zt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Mt,l("div",Ft,[(o(!0),c(I,null,z(a.canmanualbox,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Manual Box 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.canio.length?(o(),c("div",Lt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Vt,l("div",Kt,[(o(!0),c(I,null,z(a.canio,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN IO 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0),a.cangyro.length?(o(),c("div",Gt,[n(i,{class:"custom-card","body-style":{padding:"20px"}},{default:h(()=>[Ut,l("div",Ht,[(o(!0),c(I,null,z(a.cangyro,e=>(o(),c("div",{key:e.canid},[n(i,{class:"item-card","body-style":{padding:"10px"}},{default:h(()=>[l("p",null,"CAN Gyro 编号: "+g(e.canid),1),l("p",null,"CAN 通讯 ID 号: "+g(e.unitid),1)]),_:2},1024)]))),128))])]),_:2},1024)])):O("",!0)]),_:2},1032,["label"]))),128))]),_:1})}}};export{vt as E,Yt as _,pt as a};