import{dZ as M,d_ as U,dS as X,d$ as Y,dQ as ke,dL as ge,dR as pe,e0 as xe,c_ as J,cY as N,c0 as A,cI as K,c$ as F,ao as I,Q as g,cM as G,d0 as Ce,cS as T,ae as _,bB as j,cX as ee,aB as ne,aV as z,cO as E,c6 as ye,bf as H,cW as Q,d2 as ae,d as L,br as le,bN as D,o as C,e as te,f as oe,a as W,aC as x,bl as i,bH as $,c as y,at as w,bt as V,aZ as O,F as Se,m as se,bc as ie,g as P,b0 as ue,bO as R,n as Le,bL as Be,bP as Ee,aR as Ie,bh as $e,bR as we,bS as re}from"./index-927e7ec9.js";import{i as Ve}from"./isEqual-a71e5c8d.js";import{c as de,d as Ne,e as Fe}from"./8Array-2bfcf422.js";function Ge(e){return e}function ze(e,n,l){switch(l.length){case 0:return e.call(n);case 1:return e.call(n,l[0]);case 2:return e.call(n,l[0],l[1]);case 3:return e.call(n,l[0],l[1],l[2])}return e.apply(n,l)}var Pe=800,Te=16,De=Date.now;function Oe(e){var n=0,l=0;return function(){var a=De(),t=Te-(a-l);if(l=a,t>0){if(++n>=Pe)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}function Re(e){return function(){return e}}var Me=M?function(e,n){return M(e,"toString",{configurable:!0,enumerable:!1,value:Re(n),writable:!0})}:Ge;const Ue=Me;var Ae=Oe(Ue);const Ke=Ae;var Z=Math.max;function He(e,n,l){return n=Z(n===void 0?e.length-1:n,0),function(){for(var a=arguments,t=-1,d=Z(a.length-n,0),c=Array(d);++t<d;)c[t]=a[n+t];t=-1;for(var o=Array(n+1);++t<n;)o[t]=a[t];return o[n]=l(c),ze(e,this,o)}}var q=U?U.isConcatSpreadable:void 0;function Qe(e){return X(e)||de(e)||!!(q&&e&&e[q])}function ce(e,n,l,a,t){var d=-1,c=e.length;for(l||(l=Qe),t||(t=[]);++d<c;){var o=e[d];n>0&&l(o)?n>1?ce(o,n-1,l,a,t):Ne(t,o):a||(t[t.length]=o)}return t}function We(e){var n=e==null?0:e.length;return n?ce(e,1):[]}function Ze(e){return Ke(He(e,void 0,We),e+"")}function qe(e,n){return e!=null&&n in Object(e)}function Xe(e,n,l){n=Y(n,e);for(var a=-1,t=n.length,d=!1;++a<t;){var c=ke(n[a]);if(!(d=e!=null&&l(e,c)))break;e=e[c]}return d||++a!=t?d:(t=e==null?0:e.length,!!t&&Fe(t)&&ge(c,t)&&(X(e)||de(e)))}function Ye(e,n){return e!=null&&Xe(e,n,qe)}function Je(e,n,l){for(var a=-1,t=n.length,d={};++a<t;){var c=n[a],o=pe(e,c);l(o,c)&&xe(d,Y(c,e),o)}return d}function _e(e,n){return Je(e,n,function(l,a){return Ye(e,a)})}var je=Ze(function(e,n){return e==null?{}:_e(e,n)});const en=je,B=Symbol("checkboxGroupContextKey"),be={modelValue:{type:[Number,String,Boolean],default:void 0},label:{type:[String,Boolean,Number,Object]},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:{type:String,default:void 0},trueLabel:{type:[String,Number],default:void 0},falseLabel:{type:[String,Number],default:void 0},id:{type:String,default:void 0},controls:{type:String,default:void 0},border:Boolean,size:J,tabindex:[String,Number],validateEvent:{type:Boolean,default:!0}},ve={[N]:e=>A(e)||K(e)||F(e),change:e=>A(e)||K(e)||F(e)},nn=({model:e,isChecked:n})=>{const l=I(B,void 0),a=g(()=>{var d,c;const o=(d=l==null?void 0:l.max)==null?void 0:d.value,m=(c=l==null?void 0:l.min)==null?void 0:c.value;return!G(o)&&e.value.length>=o&&!n.value||!G(m)&&e.value.length<=m&&n.value});return{isDisabled:Ce(g(()=>(l==null?void 0:l.disabled.value)||a.value)),isLimitDisabled:a}},an=(e,{model:n,isLimitExceeded:l,hasOwnLabel:a,isDisabled:t,isLabeledByFormItem:d})=>{const c=I(B,void 0),{formItem:o}=T(),{emit:m}=_();function s(r){var b,v;return r===e.trueLabel||r===!0?(b=e.trueLabel)!=null?b:!0:(v=e.falseLabel)!=null?v:!1}function f(r,b){m("change",s(r),b)}function k(r){if(l.value)return;const b=r.target;m("change",s(b.checked),r)}async function S(r){l.value||!a.value&&!t.value&&d.value&&(r.composedPath().some(h=>h.tagName==="LABEL")||(n.value=s([!1,e.falseLabel].includes(n.value)),await ne(),f(n.value,r)))}const u=g(()=>(c==null?void 0:c.validateEvent)||e.validateEvent);return j(()=>e.modelValue,()=>{u.value&&(o==null||o.validate("change").catch(r=>ee()))}),{handleChange:k,onClickRoot:S}},ln=e=>{const n=z(!1),{emit:l}=_(),a=I(B,void 0),t=g(()=>G(a)===!1),d=z(!1);return{model:g({get(){var o,m;return t.value?(o=a==null?void 0:a.modelValue)==null?void 0:o.value:(m=e.modelValue)!=null?m:n.value},set(o){var m,s;t.value&&E(o)?(d.value=((m=a==null?void 0:a.max)==null?void 0:m.value)!==void 0&&o.length>(a==null?void 0:a.max.value),d.value===!1&&((s=a==null?void 0:a.changeEvent)==null||s.call(a,o))):(l(N,o),n.value=o)}}),isGroup:t,isLimitExceeded:d}},tn=(e,n,{model:l})=>{const a=I(B,void 0),t=z(!1),d=g(()=>{const s=l.value;return F(s)?s:E(s)?ye(e.label)?s.map(H).some(f=>Ve(f,e.label)):s.map(H).includes(e.label):s!=null?s===e.trueLabel:!!s}),c=Q(g(()=>{var s;return(s=a==null?void 0:a.size)==null?void 0:s.value}),{prop:!0}),o=Q(g(()=>{var s;return(s=a==null?void 0:a.size)==null?void 0:s.value})),m=g(()=>!!(n.default||e.label));return{checkboxButtonSize:c,isChecked:d,isFocused:t,checkboxSize:o,hasOwnLabel:m}},on=(e,{model:n})=>{function l(){E(n.value)&&!n.value.includes(e.label)?n.value.push(e.label):n.value=e.trueLabel||!0}e.checked&&l()},me=(e,n)=>{const{formItem:l}=T(),{model:a,isGroup:t,isLimitExceeded:d}=ln(e),{isFocused:c,isChecked:o,checkboxButtonSize:m,checkboxSize:s,hasOwnLabel:f}=tn(e,n,{model:a}),{isDisabled:k}=nn({model:a,isChecked:o}),{inputId:S,isLabeledByFormItem:u}=ae(e,{formItemContext:l,disableIdGeneration:f,disableIdManagement:t}),{handleChange:r,onClickRoot:b}=an(e,{model:a,isLimitExceeded:d,hasOwnLabel:f,isDisabled:k,isLabeledByFormItem:u});return on(e,{model:a}),{inputId:S,isLabeledByFormItem:u,isChecked:o,isDisabled:k,isFocused:c,checkboxButtonSize:m,checkboxSize:s,hasOwnLabel:f,model:a,handleChange:r,onClickRoot:b}},sn=["tabindex","role","aria-checked"],un=["id","aria-hidden","name","tabindex","disabled","true-value","false-value"],rn=["id","aria-hidden","disabled","value","name","tabindex"],dn=L({name:"ElCheckbox"}),cn=L({...dn,props:be,emits:ve,setup(e){const n=e,l=le(),{inputId:a,isLabeledByFormItem:t,isChecked:d,isDisabled:c,isFocused:o,checkboxSize:m,hasOwnLabel:s,model:f,handleChange:k,onClickRoot:S}=me(n,l),u=D("checkbox"),r=g(()=>[u.b(),u.m(m.value),u.is("disabled",c.value),u.is("bordered",n.border),u.is("checked",d.value)]),b=g(()=>[u.e("input"),u.is("disabled",c.value),u.is("checked",d.value),u.is("indeterminate",n.indeterminate),u.is("focus",o.value)]);return(v,h)=>(C(),te(ue(!i(s)&&i(t)?"span":"label"),{class:x(i(r)),"aria-controls":v.indeterminate?v.controls:null,onClick:i(S)},{default:oe(()=>[W("span",{class:x(i(b)),tabindex:v.indeterminate?0:void 0,role:v.indeterminate?"checkbox":void 0,"aria-checked":v.indeterminate?"mixed":void 0},[v.trueLabel||v.falseLabel?$((C(),y("input",{key:0,id:i(a),"onUpdate:modelValue":h[0]||(h[0]=p=>w(f)?f.value=p:null),class:x(i(u).e("original")),type:"checkbox","aria-hidden":v.indeterminate?"true":"false",name:v.name,tabindex:v.tabindex,disabled:i(c),"true-value":v.trueLabel,"false-value":v.falseLabel,onChange:h[1]||(h[1]=(...p)=>i(k)&&i(k)(...p)),onFocus:h[2]||(h[2]=p=>o.value=!0),onBlur:h[3]||(h[3]=p=>o.value=!1)},null,42,un)),[[V,i(f)]]):$((C(),y("input",{key:1,id:i(a),"onUpdate:modelValue":h[4]||(h[4]=p=>w(f)?f.value=p:null),class:x(i(u).e("original")),type:"checkbox","aria-hidden":v.indeterminate?"true":"false",disabled:i(c),value:v.label,name:v.name,tabindex:v.tabindex,onChange:h[5]||(h[5]=(...p)=>i(k)&&i(k)(...p)),onFocus:h[6]||(h[6]=p=>o.value=!0),onBlur:h[7]||(h[7]=p=>o.value=!1)},null,42,rn)),[[V,i(f)]]),W("span",{class:x(i(u).e("inner"))},null,2)],10,sn),i(s)?(C(),y("span",{key:0,class:x(i(u).e("label"))},[O(v.$slots,"default"),v.$slots.default?P("v-if",!0):(C(),y(Se,{key:0},[se(ie(v.label),1)],64))],2)):P("v-if",!0)]),_:3},8,["class","aria-controls","onClick"]))}});var bn=R(cn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);const vn=["name","tabindex","disabled","true-value","false-value"],mn=["name","tabindex","disabled","value"],fn=L({name:"ElCheckboxButton"}),hn=L({...fn,props:be,emits:ve,setup(e){const n=e,l=le(),{isFocused:a,isChecked:t,isDisabled:d,checkboxButtonSize:c,model:o,handleChange:m}=me(n,l),s=I(B,void 0),f=D("checkbox"),k=g(()=>{var u,r,b,v;const h=(r=(u=s==null?void 0:s.fill)==null?void 0:u.value)!=null?r:"";return{backgroundColor:h,borderColor:h,color:(v=(b=s==null?void 0:s.textColor)==null?void 0:b.value)!=null?v:"",boxShadow:h?`-1px 0 0 0 ${h}`:void 0}}),S=g(()=>[f.b("button"),f.bm("button",c.value),f.is("disabled",d.value),f.is("checked",t.value),f.is("focus",a.value)]);return(u,r)=>(C(),y("label",{class:x(i(S))},[u.trueLabel||u.falseLabel?$((C(),y("input",{key:0,"onUpdate:modelValue":r[0]||(r[0]=b=>w(o)?o.value=b:null),class:x(i(f).be("button","original")),type:"checkbox",name:u.name,tabindex:u.tabindex,disabled:i(d),"true-value":u.trueLabel,"false-value":u.falseLabel,onChange:r[1]||(r[1]=(...b)=>i(m)&&i(m)(...b)),onFocus:r[2]||(r[2]=b=>a.value=!0),onBlur:r[3]||(r[3]=b=>a.value=!1)},null,42,vn)),[[V,i(o)]]):$((C(),y("input",{key:1,"onUpdate:modelValue":r[4]||(r[4]=b=>w(o)?o.value=b:null),class:x(i(f).be("button","original")),type:"checkbox",name:u.name,tabindex:u.tabindex,disabled:i(d),value:u.label,onChange:r[5]||(r[5]=(...b)=>i(m)&&i(m)(...b)),onFocus:r[6]||(r[6]=b=>a.value=!0),onBlur:r[7]||(r[7]=b=>a.value=!1)},null,42,mn)),[[V,i(o)]]),u.$slots.default||u.label?(C(),y("span",{key:2,class:x(i(f).be("button","inner")),style:Le(i(t)?i(k):void 0)},[O(u.$slots,"default",{},()=>[se(ie(u.label),1)])],6)):P("v-if",!0)],2))}});var fe=R(hn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);const kn=Be({modelValue:{type:Ee(Array),default:()=>[]},disabled:Boolean,min:Number,max:Number,size:J,label:String,fill:String,textColor:String,tag:{type:String,default:"div"},validateEvent:{type:Boolean,default:!0}}),gn={[N]:e=>E(e),change:e=>E(e)},pn=L({name:"ElCheckboxGroup"}),xn=L({...pn,props:kn,emits:gn,setup(e,{emit:n}){const l=e,a=D("checkbox"),{formItem:t}=T(),{inputId:d,isLabeledByFormItem:c}=ae(l,{formItemContext:t}),o=async s=>{n(N,s),await ne(),n("change",s)},m=g({get(){return l.modelValue},set(s){o(s)}});return Ie(B,{...en($e(l),["size","min","max","disabled","validateEvent","fill","textColor"]),modelValue:m,changeEvent:o}),j(()=>l.modelValue,()=>{l.validateEvent&&(t==null||t.validate("change").catch(s=>ee()))}),(s,f)=>{var k;return C(),te(ue(s.tag),{id:i(d),class:x(i(a).b("group")),role:"group","aria-label":i(c)?void 0:s.label||"checkbox-group","aria-labelledby":i(c)?(k=i(t))==null?void 0:k.labelId:void 0},{default:oe(()=>[O(s.$slots,"default")]),_:3},8,["id","class","aria-label","aria-labelledby"])}}});var he=R(xn,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);const Ln=we(bn,{CheckboxButton:fe,CheckboxGroup:he}),Bn=re(fe),En=re(he);export{Ln as E,Bn as a,En as b,ce as c,Ye as h,Ge as i,He as o,en as p,Ke as s};