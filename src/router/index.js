import Vue from "vue";
import VueRouter from "vue-router";
import layout from "@views/layout/index"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
    mate: {
      name: '登录'
    }
  }, {

    path: "/reset-password",
    name: "reset-password",
    component: () => import("../views/reset-password/index.vue"),
    mate: {
      name: '重置密码'
    }
  }, {
    path: "/register",
    name: "register",
    component: () => import("../views/register/index.vue"),
    mate: {
      name: '注册'
    }
  }, {
    path: "/403",
    name: "403",
    component: () => import("../views/errorPage/403.vue"),
    mate: {
      name: '无权限'
    }
  }, {
    path: "/404",
    name: "404",
    component: () => import("../views/errorPage/404.vue"),
    mate: {
      name: '页面丢失'
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
