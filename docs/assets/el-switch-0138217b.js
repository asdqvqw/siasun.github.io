import{bL as X,bM as K,bP as Y,cu as $,cH as E,cM as k,c0 as C,cr as V,cI as P,dV as _,d as U,ae as x,cB as ee,cF as ae,bN as te,dB as ie,Q as u,cP as ne,cN as oe,aV as I,dh as se,bB as S,cG as le,aK as ce,o,c as d,a as N,bl as a,aC as c,w as re,e as v,f as y,b0 as T,bQ as g,g as r,bc as B,b as ue,dw as de,n as A,bJ as ve,bO as fe,aB as pe,dW as F,bZ as he,bR as me}from"./index-caff8e60.js";const be=X({modelValue:{type:[Boolean,String,Number],default:!1},value:{type:[Boolean,String,Number],default:!1},disabled:{type:Boolean,default:!1},width:{type:[String,Number],default:""},inlinePrompt:{type:Boolean,default:!1},activeIcon:{type:K},inactiveIcon:{type:K},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeColor:{type:String,default:""},inactiveColor:{type:String,default:""},borderColor:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},id:String,loading:{type:Boolean,default:!1},beforeChange:{type:Y(Function)},size:{type:String,validator:$},tabindex:{type:[String,Number]}}),ye={[E]:s=>k(s)||C(s)||V(s),[P]:s=>k(s)||C(s)||V(s),[_]:s=>k(s)||C(s)||V(s)},ge=["onClick"],ke=["id","aria-checked","aria-disabled","name","true-value","false-value","disabled","tabindex","onKeydown"],we=["aria-hidden"],Ce=["aria-hidden"],Ve=["aria-hidden"],D="ElSwitch",Ie=U({name:D}),Se=U({...Ie,props:be,emits:ye,setup(s,{expose:G,emit:f}){const t=s,H=x(),{formItem:h}=ee(),L=ae(),i=te("switch");ie({from:'"value"',replacement:'"model-value" or "v-model"',scope:D,version:"2.3.0",ref:"https://element-plus.org/en-US/component/switch.html#attributes",type:"Attribute"},u(()=>{var e;return!!((e=H.vnode.props)!=null&&e.value)}));const{inputId:Q}=ne(t,{formItemContext:h}),m=oe(u(()=>t.loading)),w=I(t.modelValue!==!1),p=I(),W=I(),J=u(()=>[i.b(),i.m(L.value),i.is("disabled",m.value),i.is("checked",n.value)]),R=u(()=>({width:se(t.width)}));S(()=>t.modelValue,()=>{w.value=!0}),S(()=>t.value,()=>{w.value=!1});const M=u(()=>w.value?t.modelValue:t.value),n=u(()=>M.value===t.activeValue);[t.activeValue,t.inactiveValue].includes(M.value)||(f(E,t.inactiveValue),f(P,t.inactiveValue),f(_,t.inactiveValue)),S(n,e=>{var l;p.value.checked=e,t.validateEvent&&((l=h==null?void 0:h.validate)==null||l.call(h,"change").catch(q=>le()))});const b=()=>{const e=n.value?t.inactiveValue:t.activeValue;f(E,e),f(P,e),f(_,e),pe(()=>{p.value.checked=n.value})},z=()=>{if(m.value)return;const{beforeChange:e}=t;if(!e){b();return}const l=e();[F(l),k(l)].includes(!0)||he(D,"beforeChange must return type `Promise<boolean>` or `boolean`"),F(l)?l.then(O=>{O&&b()}).catch(O=>{}):l&&b()},Z=u(()=>i.cssVarBlock({...t.activeColor?{"on-color":t.activeColor}:null,...t.inactiveColor?{"off-color":t.inactiveColor}:null,...t.borderColor?{"border-color":t.borderColor}:null})),j=()=>{var e,l;(l=(e=p.value)==null?void 0:e.focus)==null||l.call(e)};return ce(()=>{p.value.checked=n.value}),G({focus:j,checked:n}),(e,l)=>(o(),d("div",{class:c(a(J)),style:A(a(Z)),onClick:ve(z,["prevent"])},[N("input",{id:a(Q),ref_key:"input",ref:p,class:c(a(i).e("input")),type:"checkbox",role:"switch","aria-checked":a(n),"aria-disabled":a(m),name:e.name,"true-value":e.activeValue,"false-value":e.inactiveValue,disabled:a(m),tabindex:e.tabindex,onChange:b,onKeydown:re(z,["enter"])},null,42,ke),!e.inlinePrompt&&(e.inactiveIcon||e.inactiveText)?(o(),d("span",{key:0,class:c([a(i).e("label"),a(i).em("label","left"),a(i).is("active",!a(n))])},[e.inactiveIcon?(o(),v(a(g),{key:0},{default:y(()=>[(o(),v(T(e.inactiveIcon)))]),_:1})):r("v-if",!0),!e.inactiveIcon&&e.inactiveText?(o(),d("span",{key:1,"aria-hidden":a(n)},B(e.inactiveText),9,we)):r("v-if",!0)],2)):r("v-if",!0),N("span",{ref_key:"core",ref:W,class:c(a(i).e("core")),style:A(a(R))},[e.inlinePrompt?(o(),d("div",{key:0,class:c(a(i).e("inner"))},[e.activeIcon||e.inactiveIcon?(o(),v(a(g),{key:0,class:c(a(i).is("icon"))},{default:y(()=>[(o(),v(T(a(n)?e.activeIcon:e.inactiveIcon)))]),_:1},8,["class"])):e.activeText||e.inactiveText?(o(),d("span",{key:1,class:c(a(i).is("text")),"aria-hidden":!a(n)},B(a(n)?e.activeText:e.inactiveText),11,Ce)):r("v-if",!0)],2)):r("v-if",!0),N("div",{class:c(a(i).e("action"))},[e.loading?(o(),v(a(g),{key:0,class:c(a(i).is("loading"))},{default:y(()=>[ue(a(de))]),_:1},8,["class"])):r("v-if",!0)],2)],6),!e.inlinePrompt&&(e.activeIcon||e.activeText)?(o(),d("span",{key:1,class:c([a(i).e("label"),a(i).em("label","right"),a(i).is("active",a(n))])},[e.activeIcon?(o(),v(a(g),{key:0},{default:y(()=>[(o(),v(T(e.activeIcon)))]),_:1})):r("v-if",!0),!e.activeIcon&&e.activeText?(o(),d("span",{key:1,"aria-hidden":!a(n)},B(e.activeText),9,Ve)):r("v-if",!0)],2)):r("v-if",!0)],14,ge))}});var Ne=fe(Se,[["__file","/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);const Be=me(Ne);export{Be as E};