import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from 'js-cookie'
// import AMap from 'vue-amap';
// Vue.use(AMap);
// AMap.initAMapApiLoader({
//   // 高德key
//   key: 'd60f917b96c86e57f01c75a4d3b19e38',
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Geolocation']
// });
//添加ie兼容 性能可能没那么好可选用，也可删除删除需要在babel.config.js里面也要删除
import 'core-js/stable'
import 'regenerator-runtime/runtime'

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
  Icon,
  Notify,
  Dialog,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image as VanImage,
  PullRefresh,
  List,
  Sidebar,
  SidebarItem,
  Search,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  ShareSheet,
  Stepper,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Loading
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
  .use(Notify)
  .use(Dialog)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(VanImage)
  .use(PullRefresh)
  .use(List)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Search)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(CellGroup)
  .use(ShareSheet)
  .use(Stepper)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Loading)


import "vant/lib/index.css";
import "lib-flexible";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {

  if (!Cookies.get('token')) {
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
