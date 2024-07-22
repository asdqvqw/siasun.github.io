/** 引入帧动画函数（防止部分浏览器不支持） */
import "@/common/RequestAnimationFrameExpand";
/** 引入 rem计算 */
import "@/common/Rem";
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index';
/** 注册路由许可验证 */
import "./permission";
/** 打印完整路由表 */
import {sysMeluList} from "./router/Common";
console.log(
    "系统完整路由表，router挂载全局window.router",
    router,
    sysMeluList,
);
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  messages: {
    en: {
      quit: 'Log Out',
      Language: 'English',
      Viewfull_screen:'View full screen(ESC Quit)',
      home:'Home',
      search:'Search'
    },
    zh: {
        quit: '退出登录',
        Language:'中文',
        Viewfull_screen:'视图全屏(ESC退出)',
        home:'首页',
        search:'搜索目录'
    }
  }
})

/** 提示重复菜单 */
sysMeluList.reduce((c,i)=>{
    if(c[i.name]){
        console.log('重复菜单 name',i);
    }
    c[i.name] = true;
    return c;
},{});
/** 挂载到全局方便操作 */
window.router = router;

/** 添加公共样式 */
import "@/style/index.scss";

const pinia = createPinia();

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(pinia);
app.mount('#app');
