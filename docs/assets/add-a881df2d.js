import{_ as V,d as E,o as h,e as v,f as o,da as w,aV as k,j as S,k as y,r as T,a as d,bc as p,b as a,m as _,t as I,l as D,E as R,p as B,q as F}from"./index-9f797bf0.js";import{E as U}from"./el-scrollbar-66453ff3.js";/* empty css                */import{a as $,E as N}from"./el-col-0ab0e281.js";import"./el-form-item-4ed993c7.js";import{S as j}from"./index-73fbd370.js";import{k as q,u as O}from"./TagListTools-9ea0c63b.js";import{E as z,a as A}from"./index-86da33f8.js";import"./Uint8Array-675b278d.js";import"./initCloneObject-6edd3849.js";const G=E({components:{SvgIcon:j,Delete:w},setup(){const e=k(null);S();const l=y(),m=T({loading:!1,form:{},nowTime:new Date,nowTime_1:new Date().getTime(),rules:{name:[{required:!0,message:"请输入数据",trigger:"blur"}]}});function u(){let t=l.params;t.sign&&(m.form={id:t.sign})}u();function f(){e.value&&e.value.validate((t,n)=>{if(n){let s=n[Object.keys(n)[0]][0].message;I(s)}})}function c(){let t=q();t&&O({...t,title:t.title+"-1",isCache:!t.isCache})}return{dataContainer:m,initData:u,FormElRef:e,handleSubmit:f,handleClick_2:c}}}),H=e=>(B("data-v-e6530f14"),e=e(),F(),e),J={class:"page-container main-view"},K={class:"container"},L=H(()=>d("h3",null," 数据编辑页面 ",-1));function M(e,l,m,u,f,c){const t=D,n=R,s=z,i=$,C=N,g=A,b=U;return h(),v(b,{height:"100%"},{default:o(()=>[d("div",J,[d("div",K,[L,d("p",null," 当前加载时间："+p(e.dataContainer.nowTime),1),d("p",null," 当前加载时间戳："+p(e.dataContainer.nowTime_1),1),d("p",null," 数据唯一标识："+p(e.dataContainer.form.id),1),d("p",null,[a(t,{onClick:e.handleClick_2,type:"primary"},{default:o(()=>[_(" 更新标签信息（修改标题，切换缓存状态），不会更改目录配置，就是说重新重目录配置处创建该标签会使用目录的配置 ")]),_:1},8,["onClick"])]),a(g,{model:e.dataContainer.form,ref:"FormElRef",inline:!0,rules:e.dataContainer.rules,"label-width":"120px"},{default:o(()=>[a(C,{gutter:0},{default:o(()=>[a(i,{span:8,xs:6},{default:o(()=>[a(s,{label:"修改数据名称",prop:"name"},{default:o(()=>[a(n,{modelValue:e.dataContainer.form.name,"onUpdate:modelValue":l[0]||(l[0]=r=>e.dataContainer.form.name=r),placeholder:"请输入",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),a(i,{span:8,xs:6},{default:o(()=>[a(s,{label:"修改数据code",prop:"code"},{default:o(()=>[a(n,{modelValue:e.dataContainer.form.code,"onUpdate:modelValue":l[1]||(l[1]=r=>e.dataContainer.form.code=r),placeholder:"请输入",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),a(i,{span:8,xs:6},{default:o(()=>[a(s,{label:"修改数据id",prop:"id"},{default:o(()=>[a(n,{modelValue:e.dataContainer.form.id,"onUpdate:modelValue":l[2]||(l[2]=r=>e.dataContainer.form.id=r),placeholder:"请输入",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),a(i,{span:8,xs:6},{default:o(()=>[a(s,{label:"修改数据id",prop:"id"},{default:o(()=>[a(n,{modelValue:e.dataContainer.form.id,"onUpdate:modelValue":l[3]||(l[3]=r=>e.dataContainer.form.id=r),placeholder:"请输入",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"]),a(t,{type:"primary",onClick:e.handleSubmit},{default:o(()=>[_(" 提交 ")]),_:1},8,["onClick"])])])]),_:1})}const te=V(G,[["render",M],["__scopeId","data-v-e6530f14"]]);export{te as default};