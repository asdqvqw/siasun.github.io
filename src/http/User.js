/*jshint esversion: 9 */
import { service } from "./Request";
import qs from "qs";

/** 公用接口 */
const allApi = {
  login() {
    // return service({
    //     url:"/public/captcha",
    //     method:'get',
    // });
    return Promise.resolve({
      msg: "操作成功",
      code: 200,
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImJmMmYyMWRlLTUwNzctNDUxNy1hYmRlLTA0NGE4NzNhMzE0ZSJ9.DOnUxWppbtKyJGlvSBZqdExf5hrt0EdWalanz_op7rvyc9v-itJJZXbW0xn_yS5SZfXLYn1BRMlTdxadUmRmAg",
    });
  },
  getUserInfo() {
    return Promise.resolve({
      msg: "操作成功",
      code: 200,
      data: {
        userName: "admin",
        nickName: "管理员",
        avatar: "https://s11.ax1x.com/2023/12/15/pihx4js.jpg",
      },
    });
  },
  getMenuList() {
    let menuList = [
      {
        name: "main-index",
        title: "仪表盘",
        content: "",
        isCache: true,
        fixed: true,
        iconName: "svg:all-fill.svg",
      },
      {
        title: "test",
        iconName: "svg:laptop-check.svg",
        content: "可删",
        childs: [
          // {
          //   name: "whwtestread",
          //   title: "测试",
          //   isCache: true,
          //   content: "",
          //   iconName: "svg:laptop-check.svg",
          //   showTagIcon: true,
          // },
          {
            name: "whwtestone",
            title: "one",
            isCache: true,
            content: "",
            iconName: "svg:laptop-check.svg",
            showTagIcon: true,
          },
          {
            name: "whwtesttwo",
            title: "two",
            isCache: true,
            content: "",
            iconName: "svg:laptop-check.svg",
            showTagIcon: true,
          },
          {
            name: "whwtestfour",
            title: "four",
            isCache: true,
            content: "",
            iconName: "svg:laptop-check.svg",
            showTagIcon: true,
          },

          {
            name: "bbb_Aqw",
            title: "统计",
            isCache: true,
            hidden: true,
          },
        ],
      },
      {
        name: "new-tag-page",
        title: "新标签页",
        isCache: true,
        hidden: true,
      },
      {
        name: "main-401",
        title: "401页面",
        isCache: true,
        hidden: true,
      },
      {
        name: "main-404",
        title: "404页面",
        isCache: true,
        hidden: true,
      },
      {
        name: "main-mine-info",
        title: "个人中心",
        isCache: true,
        hidden: true,
      },
      {
        name: "main-mine-info-update",
        title: "个人信息修改",
        isCache: true,
        hidden: true,
      },
      {
        name: "main-mine-info-password",
        title: "修改密码",
        isCache: true,
        hidden: true,
      },
      {
        title: "监测",
        iconName: "svg:cog-fill.svg",
        childs: [
          {
            name: "form",
            title: "上装",
            isCache: true,
            content: "",
            iconName: "svg:all.svg",
            showTagIcon: true,
          },
          {
            name: "motion",
            title: "电气",
            isCache: true,
            content: "",
            iconName: "svg:poweroff.svg",
            showTagIcon: true,
          },
          {
            name: "nav",
            title: "导航",
            isCache: true,
            content: "",
            iconName: "svg:paper-plane.svg",
            showTagIcon: true,
          },
          {
            name: "servo",
            title: "控制台",
            isCache: true,
            content: "",
            iconName: "svg:user-group-fill.svg",
            showTagIcon: true,
          },
          // {
          //   name: "log",
          //   title: "日志",
          //   isCache: true,
          //   content: "",
          //   iconName: "svg:fankui.svg",
          //   showTagIcon: true,
          // },
          {
            name: "bbb_Aqw",
            title: "统计",
            isCache: true,
            hidden: true,
          },
        ],
      },
      {
        title: "控制",
        iconName: "svg:flag.svg",
        childs: [
          {
            name: "manual",
            title: "手控",
            isCache: true,
            content: "",
            iconName: "svg:user-fill.svg",
            showTagIcon: true,
          },
          {
            name: "auto",
            title: "离线任务",
            isCache: true,
            content: "",
            iconName: "svg:user-group-fill.svg",
            showTagIcon: true,
          },

        ],
      },
      {
        title: "配置",
        iconName: "svg:cat-code.svg",
        content: "",
        childs: [
          {
            name: "task",
            title: "任务",
            isCache: true,
            content: "",
            iconName: "svg:laptop.svg",
            showTagIcon: true,
          },
          {
            name: "param",
            title: "配置参数",
            isCache: true,
            content: "",
            iconName: "svg:sort-line.svg",
            showTagIcon: true,
          },
          {
            name: "test",
            title: "测试",
            isCache: true,
            content: "",
            iconName: "svg:cat-code.svg",
            showTagIcon: true,
          },
        ],
      },
      {
        name: "whwtest",
        title: "回放",
        isCache: true,
        content: "",
        iconName: "svg:laptop-check.svg",
        showTagIcon: true,
      },
      {
        title: "平台文档",
        iconName: "svg:aligncenter-fill.svg",
        childs: [
          // {
          //   name: "errorlist",
          //   title: "故障列表提交",
          //   isCache: true,
          //   content: "",
          //   iconName: "svg:user-group-fill.svg",
          //   showTagIcon: true,
          // },
          {
            path: `/main/iframe/shuoming?src=${encodeURIComponent(
              "https://asdqvqw.github.io/whwtest.github.io/"
            )}`,
            title: "说明",
            content: "",
            iconName: "svg:laptop-check.svg",
            showTagIcon: true,
            isCache: true,
          },
          {
            title: "VUE3文档(外联)",
            iconName: "svg:friendship.svg",
            isLink: true,
            path: "https://cn.vuejs.org/guide/introduction.html",
          },
          {
            path: `/main/iframe/vue?src=${encodeURIComponent(
              "https://cn.vuejs.org/guide/introduction.html"
            )}`,
            title: "VUE3文档(内嵌)",
            content: "",
            iconName: "img:vue.svg",
            showTagIcon: true,
            isCache: true,
          },


        ],
      },
      // {
      //     name:"show-list",
      //     title:'展示列表',
      //     iconName:"svg:laptop-check.svg",
      //     number:4,
      // },
      // {
      //     name:"merge-table",
      //     title:'合并表格展示列表',
      //     iconName:"svg:laptop-check.svg",
      // },
      // {
      //     name:"other-view",
      //     title:'其他功能展示',
      //     iconName:"svg:map-fill.svg",
      //     isCache:true,
      // },
      {
        title: "大屏展示",
        content: "多种方式",
        iconName: "svg:laptop.svg",
        childs: [
          // {
          //   title: "示例1",
          //   isCache: true,
          //   content: "使用缩放",
          //   iconName: "svg:laptop.svg",
          //   isLink: true,
          //   path: "/big-screen/show_1",
          // },
          // {
          //   title: "示例2",
          //   isCache: false,
          //   content: "使用Rem",
          //   iconName: "svg:laptop.svg",
          //   isLink: true,
          //   path: "/big-screen/show_2",
          // },
          // {
          //   title: "示例3",
          //   isCache: true,
          //   content: "固定宽高",
          //   iconName: "svg:laptop.svg",
          //   isLink: true,
          //   path: "/big-screen/show_3",
          // },
          // {
          //   title: "示例4(推荐)",
          //   isCache: true,
          //   content: "宽高缩放",
          //   iconName: "svg:laptop.svg",
          //   isLink: true,
          //   path: "/big-screen/show_4",
          // },
          {
            title: "示例1(测试)",
            isCache: true,
            content: "内容全屏",
            iconName: "svg:laptop.svg",
            isLink: false,
            path: "/main/big-screen/show_1",
            viewFullScreen: true,
            hiddenViewFullScreenBt: true,
          },
        ],
      },
      {
        title: "系统管理",
        iconName: "svg:cog-fill.svg",
        childs: [
          {
            name: "caidan",
            title: "菜单管理",
            isCache: true,
            content: "用户目录配置",
            iconName: "svg:alignleft-fill.svg",
            showTagIcon: true,
          },
          {
            name: "setup-menu",
            title: "目录信息",
            isCache: true,
            content: "",
            hidden: false,
            iconName: "svg:Directory-tree.svg",
          },
          {
            name: "bt-permission",
            title: "按钮权限管理",
            isCache: true,
            content: "与菜单分开",
            iconName: "svg:borderverticle-fill.svg",
            showTagIcon: true,
          },
        //   {
        //     name: "user-list",
        //     title: "用户管理",
        //     isCache: true,
        //     content: "",
        //     iconName: "svg:user-fill.svg",
        //     showTagIcon: true,
        //   },
        //   {
        //     name: "role-list",
        //     title: "角色列表",
        //     isCache: true,
        //     content: "",
        //     iconName: "svg:user-group-fill.svg",
        //     showTagIcon: true,
        //   },
        ],
      },
      {
        name: "show-list-info",
        title: "数据详情",
        hidden: true,
        iconName: "svg:all-fill.svg",
      },
      {
        name: "show-list-add",
        title: "数据添加",
        hidden: true,
        iconName: "svg:Navbar-full.svg",
      },
      {
        name: "show-list-update",
        title: "数据编辑",
        hidden: true,
        isCache: true,
        content: "(有缓存)",
        iconName: "svg:Navbar-full.svg",
      },
      // {
      //     title:'多级菜单',
      //     iconName:"svg:alignleft-fill.svg",
      //     childs:[
      //         {
      //             title:'可点击父级',
      //             path:'/main/show-list/update/erterter',
      //             iconName:"svg:aligncenter-fill.svg",
      //             childs:[
      //                 {
      //                     name:"show-list-update",
      //                     path:'/main/show-list/update/123123',
      //                     title:'可点击父级',
      //                     iconName:"svg:aligncenter-fill.svg",
      //                     childs:[
      //                         {
      //                             name:"show-list-update",
      //                             path:'/main/show-list/update/1231233',
      //                             title:'数据编辑 - 测试',
      //                             iconName:"svg:test-1.svg",
      //                             showTagIcon:true,
      //                         },
      //                     ],
      //                 },
      //                 {
      //                     title:'父级',
      //                     iconName:"svg:aligncenter-fill.svg",
      //                     childs:[
      //                         {
      //                             name:"show-list-update",
      //                             path:'/main/show-list/update/1235123',
      //                             title:'数据编辑 - 测试1',
      //                             iconName:"svg:plus-square-fill.svg",
      //                         },
      //                     ],
      //                 },
      //             ],
      //         },
      //     ],
      // },
      {
        name: "icon-list",
        title: "svg展示",
        isCache: true,
        content: "",
        // iconName:"svg:collection-fill.svg",
        iconName: "img:logo.png",
        showTagIcon: true,
        number: 20,
      },
      {
        name: "mine",
        title: "个人中心",
        isCache: true,
        content: "(有缓存)",
        hidden: true,
        iconName: "svg:Navbar-full.svg",
      },
      // {
      //     name:"setup-tag",
      //     title:'设置标签页',
      //     isCache:true,
      //     content:'(有缓存)',
      //     hidden:false,
      //     iconName:"svg:tag.svg",
      // },
      // {
      //     title:'开源地址',
      //     iconName:"svg:git-hub.svg",
      //     isLink:true,
      //     path:'https://github.com/wurencaideli/dumogu-admin',
      // },
    ];
    return Promise.resolve({
      msg: "操作成功",
      code: 200,
      data: menuList,
    });
  },
};

export default allApi;
