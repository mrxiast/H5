import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Button,
  Toast,
  Form,
  Field,
  Col,
  Row,
  NavBar,
  Tabbar,
  TabbarItem,
  Icon
} from "vant";
Vue.use(Button)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(Col)
  .use(Row)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)

import "vant/lib/index.css";
import "lib-flexible";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
    if (
      to.matched.length > 0 &&
      !to.matched.some(record => record.meta.requiresAuth)
    ) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    if (!store.state.permissionList) {
      store.dispatch("FETCH_PERMISSION").then(() => {
        next({ path: to.path });
      });
    } else {
      if (to.path !== "/login") {
        next();
      } else {
        next(from.fullPath);
      }
    }
  }
});

router.afterEach((to, from, next) => {
  var routerList = to.matched;
  store.commit("SET_CURRENT_MENU", to.name);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
