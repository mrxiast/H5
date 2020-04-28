/* 需要权限判断的路由,本地写好了 */
const adminRoutes = [
  {
    path: "/shopCar",
    component: () => import("@views/shopCar/index.vue"),
    name: "shopCar",
    meta: {
      name: "shopCar",
    },
    children: [
      {
        path: "/shopCar1",
        component: () => import("@views/shopCar/index.vue"),
        name: "shopCar1",
        meta: {
          name: "shopCar1",
        }
      }
    ]
  },
  {
    path: "/shopClass",
    component: () => import("@views/shopClass/index.vue"),
    name: "shopClass",
    meta: {
      name: "shopCar2",
    }
  },

];

export default adminRoutes;
