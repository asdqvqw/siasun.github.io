import{cX as Q,bL as se,d4 as oe,cL as p,d3 as j,ef as k,c_ as y,cJ as h,d as q,cY as ie,bN as ce,aV as de,r as me,cZ as pe,Q as V,cK as A,d1 as be,d6 as fe,bB as ve,aK as Ne,aQ as Ie,o as v,c as L,bH as G,bl as t,aC as M,w as P,b as z,f as H,e as T,b_ as Ve,ep as he,bQ as J,g as W,c$ as ye,cI as Ee,bJ as O,E as _e,bO as ge,c0 as we,d2 as X,bR as Se}from"./index-86487876.js";const Ae=100,Pe=600,Z={beforeMount(l,N){const o=N.value,{interval:a=Ae,delay:E=Pe}=Q(o)?{}:o;let c,m;const u=()=>Q(o)?o():o.handler(),b=()=>{m&&(clearTimeout(m),m=void 0),c&&(clearInterval(c),c=void 0)};l.addEventListener("mousedown",_=>{_.button===0&&(b(),u(),document.addEventListener("mouseup",()=>b(),{once:!0}),m=setTimeout(()=>{c=setInterval(()=>{u()},a)},E))})}},Te=se({id:{type:String,default:void 0},step:{type:Number,default:1},stepStrictly:Boolean,max:{type:Number,default:Number.POSITIVE_INFINITY},min:{type:Number,default:Number.NEGATIVE_INFINITY},modelValue:Number,readonly:Boolean,disabled:Boolean,size:oe,controls:{type:Boolean,default:!0},controlsPosition:{type:String,default:"",values:["","right"]},valueOnClear:{type:[String,Number,null],validator:l=>l===null||p(l)||["min","max"].includes(l),default:null},name:String,label:String,placeholder:String,precision:{type:Number,validator:l=>l>=0&&l===Number.parseInt(`${l}`,10)},validateEvent:{type:Boolean,default:!0}}),ke={[j]:(l,N)=>N!==l,blur:l=>l instanceof FocusEvent,focus:l=>l instanceof FocusEvent,[k]:l=>p(l)||y(l),[h]:l=>p(l)||y(l)},Fe=["aria-label","onKeydown"],Ce=["aria-label","onKeydown"],Be=q({name:"ElInputNumber"}),xe=q({...Be,props:Te,emits:ke,setup(l,{expose:N,emit:o}){const a=l,{t:E}=ie(),c=ce("input-number"),m=de(),u=me({currentValue:a.modelValue,userInput:null}),{formItem:b}=pe(),_=V(()=>p(a.modelValue)&&a.modelValue<=a.min),R=V(()=>p(a.modelValue)&&a.modelValue>=a.max),ee=V(()=>{const e=Y(a.step);return A(a.precision)?Math.max(Y(a.modelValue),e):(e>a.precision,a.precision)}),F=V(()=>a.controls&&a.controlsPosition==="right"),U=be(),I=fe(),C=V(()=>{if(u.userInput!==null)return u.userInput;let e=u.currentValue;if(y(e))return"";if(p(e)){if(Number.isNaN(e))return"";A(a.precision)||(e=e.toFixed(a.precision))}return e}),B=(e,n)=>{if(A(n)&&(n=ee.value),n===0)return Math.round(e);let r=String(e);const i=r.indexOf(".");if(i===-1||!r.replace(".","").split("")[i+n])return e;const w=r.length;return r.charAt(w-1)==="5"&&(r=`${r.slice(0,Math.max(0,w-1))}6`),Number.parseFloat(Number(r).toFixed(n))},Y=e=>{if(y(e))return 0;const n=e.toString(),r=n.indexOf(".");let i=0;return r!==-1&&(i=n.length-r-1),i},$=(e,n=1)=>p(e)?B(e+a.step*n):u.currentValue,x=()=>{if(a.readonly||I.value||R.value)return;const e=Number(C.value)||0,n=$(e);g(n),o(k,u.currentValue)},D=()=>{if(a.readonly||I.value||_.value)return;const e=Number(C.value)||0,n=$(e,-1);g(n),o(k,u.currentValue)},K=(e,n)=>{const{max:r,min:i,step:s,precision:f,stepStrictly:w,valueOnClear:S}=a;let d=Number(e);if(y(e)||Number.isNaN(d))return null;if(e===""){if(S===null)return null;d=we(S)?{min:i,max:r}[S]:S}return w&&(d=B(Math.round(d/s)*s,f)),A(f)||(d=B(d,f)),(d>r||d<i)&&(d=d>r?r:i,n&&o(h,d)),d},g=(e,n=!0)=>{var r;const i=u.currentValue,s=K(e);if(i!==s){if(!n){o(h,s);return}u.userInput=null,o(h,s),o(j,s,i),a.validateEvent&&((r=b==null?void 0:b.validate)==null||r.call(b,"change").catch(f=>X())),u.currentValue=s}},ne=e=>{u.userInput=e;const n=e===""?null:Number(e);o(k,n),g(n,!1)},te=e=>{const n=e!==""?Number(e):"";(p(n)&&!Number.isNaN(n)||e==="")&&g(n),u.userInput=null},ae=()=>{var e,n;(n=(e=m.value)==null?void 0:e.focus)==null||n.call(e)},re=()=>{var e,n;(n=(e=m.value)==null?void 0:e.blur)==null||n.call(e)},le=e=>{o("focus",e)},ue=e=>{var n;o("blur",e),a.validateEvent&&((n=b==null?void 0:b.validate)==null||n.call(b,"blur").catch(r=>X()))};return ve(()=>a.modelValue,e=>{const n=K(u.userInput),r=K(e,!0);!p(n)&&(!n||n!==r)&&(u.currentValue=r,u.userInput=null)},{immediate:!0}),Ne(()=>{var e;const{min:n,max:r,modelValue:i}=a,s=(e=m.value)==null?void 0:e.input;if(s.setAttribute("role","spinbutton"),Number.isFinite(r)?s.setAttribute("aria-valuemax",String(r)):s.removeAttribute("aria-valuemax"),Number.isFinite(n)?s.setAttribute("aria-valuemin",String(n)):s.removeAttribute("aria-valuemin"),s.setAttribute("aria-valuenow",String(u.currentValue)),s.setAttribute("aria-disabled",String(I.value)),!p(i)&&i!=null){let f=Number(i);Number.isNaN(f)&&(f=null),o(h,f)}}),Ie(()=>{var e;const n=(e=m.value)==null?void 0:e.input;n==null||n.setAttribute("aria-valuenow",`${u.currentValue}`)}),N({focus:ae,blur:re}),(e,n)=>(v(),L("div",{class:M([t(c).b(),t(c).m(t(U)),t(c).is("disabled",t(I)),t(c).is("without-controls",!e.controls),t(c).is("controls-right",t(F))]),onDragstart:n[0]||(n[0]=O(()=>{},["prevent"]))},[e.controls?G((v(),L("span",{key:0,role:"button","aria-label":t(E)("el.inputNumber.decrease"),class:M([t(c).e("decrease"),t(c).is("disabled",t(_))]),onKeydown:P(D,["enter"])},[z(t(J),null,{default:H(()=>[t(F)?(v(),T(t(Ve),{key:0})):(v(),T(t(he),{key:1}))]),_:1})],42,Fe)),[[t(Z),D]]):W("v-if",!0),e.controls?G((v(),L("span",{key:1,role:"button","aria-label":t(E)("el.inputNumber.increase"),class:M([t(c).e("increase"),t(c).is("disabled",t(R))]),onKeydown:P(x,["enter"])},[z(t(J),null,{default:H(()=>[t(F)?(v(),T(t(ye),{key:0})):(v(),T(t(Ee),{key:1}))]),_:1})],42,Ce)),[[t(Z),x]]):W("v-if",!0),z(t(_e),{id:e.id,ref_key:"input",ref:m,type:"number",step:e.step,"model-value":t(C),placeholder:e.placeholder,readonly:e.readonly,disabled:t(I),size:t(U),max:e.max,min:e.min,name:e.name,label:e.label,"validate-event":!1,onKeydown:[P(O(x,["prevent"]),["up"]),P(O(D,["prevent"]),["down"])],onBlur:ue,onFocus:le,onInput:ne,onChange:te},null,8,["id","step","model-value","placeholder","readonly","disabled","size","max","min","name","label","onKeydown"])],34))}});var De=ge(xe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);const Le=Se(De);export{Le as E};