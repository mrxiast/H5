import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import Cookies from 'js-cookie'
import { fetchPermission } from "./api";

const state = {
  get UserToken () {
    return localStorage.getItem("token");
  },
  set UserToken (value) {
    localStorage.setItem("token", value);
  },
  active: 0
};
/* 准备动态添加的路由 */
const DynamicRoutes = [

  {
    path: "/receiveCoupon",
    component: () => import("@/views/receive-coupon/index.vue"),
    name: "receiveCoupon",
    meta: {
      requiresAuth: true,
      name: "领券",
    }
  },
  {
    path: "/search",
    component: () => import("@/views/search/index.vue"),
    name: "search",
    meta: {
      requiresAuth: true,
      name: "搜索",
    }
  }, {
    path: "/goodsDetail",
    component: () => import("@/views/goods-detail/index.vue"),
    name: "goodsDetail",
    meta: {
      requiresAuth: true,
      name: "商品详情",
    }
  }, {
    path: "/searchResult",
    component: () => import("@/views/search-result/index.vue"),
    name: "searchResult",
    meta: {
      requiresAuth: true,
      name: "搜索结果",
    }
  }, {
    path: "/roatCostly",
    component: () => import("@/views/roat-costly/index.vue"),
    name: "roatCostly",
    meta: {
      requiresAuth: true,
      name: "街区珍品",
    }
  }, {
    path: "/",
    component: () => import("@/views/layout/index"),
    name: "container",
    redirect: "home",
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
      },
      {
        path: "/my",
        component: () => import("@/views/my/index.vue"),
        name: "my",
        meta: {
          requiresAuth: true,
          name: "我的",
        }
      }, {
        path: "/classification",
        component: () => import("@/views/classification/index.vue"),
        name: "classification",
        meta: {
          requiresAuth: true,
          name: "分类",
        }
      }
    ]
  }, {
    path: "*",
    redirect: "/404"
  }
];

const actions = {
  //permission的文件
  async FETCH_PERMISSION ({ commit, state }) {
    //模拟从后台拿到的路由
    // let permissionList = adminRoutes;
    let permissionList = await fetchPermission()
    let webRouter = permissionList.result

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
    Cookies.remove('token')
    state.UserToken = "";
    state.permissionList = ''
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
  },
  //设置当前所在的页面的active
  SET_ACTIVE (state, active) {
    state.active = active
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
