import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import adminRoutes from "./adminRoutes";
import { fetchPermission } from "./api";

const state = {
  get UserToken () {
    return localStorage.getItem("token");
  },
  set UserToken (value) {
    localStorage.setItem("token", value);
  },
};
/* 准备动态添加的路由 */
const DynamicRoutes = [
  {
    path: "/",
    component: () => import("@/views/layout/index"),
    name: "container",
    redirect: "layout",
    meta: {
      requiresAuth: true,
      name: "首页"
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: {
          requiresAuth: true,
          name: "首页",
        }
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/errorPage/403")
  },
  {
    path: "*",
    component: () => import("@/views/errorPage/404")
  }
];

const actions = {
  //permission的文件
  async FETCH_PERMISSION ({ commit, state }) {
    //模拟从后台拿到的路由
    let permissionList = adminRoutes;
    //默认本地的路由  有404 403 注册等等
    let initialRoutes = router.options.routes;

    /*  动态添加路由 */
    router.addRoutes(DynamicRoutes);
    /* 本地存储完整的路由表 */
    commit("SET_PERMISSION", [...initialRoutes, ...DynamicRoutes]);
  }
};
const mutations = {
  //登录 设置roken
  LOGIN_IN (state, token) {
    state.UserToken = token;
  },
  //登出 清除token
  LOGIN_OUT (state) {
    state.UserToken = "";
  },

  //登录时设置 permission文件
  SET_PERMISSION (state, routes) {
    state.permissionList = routes;
  },
  //登出时清空
  CLEAR_PERMISSION (state) {
    state.permissionList = null;
  },
  //设置当前的路由
  SET_CURRENT_MENU (state, currentMenu) {
    state.currentMenu = currentMenu;
  }
};



Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions
});

// //路由拼接的函数
function recursionRouter (userRouter = [], allRouter = []) {
  var realRoutes = [];
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.name === v.meta.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children);
        }
        realRoutes.push(v);
      }
    });
  });
  return realRoutes;
}

/**
 *
 * 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
function setDefaultRoute (routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name };
      setDefaultRoute(v.children);
    }
  });
}
