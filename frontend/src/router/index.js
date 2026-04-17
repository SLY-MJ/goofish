import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import AdminView from "@/views/AdminView.vue";
import HomeView from "@/views/HomeView.vue";
import ItemDetailView from "@/views/ItemDetailView.vue";
import LoginView from "@/views/LoginView.vue";
import MyItemsView from "@/views/MyItemsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import OrdersView from "@/views/OrdersView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RegisterView from "@/views/RegisterView.vue";
import UserDetailView from "@/views/UserDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "首页" },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: "登录" },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { title: "注册" },
  },
  {
    path: "/items/:id",
    name: "item-detail",
    component: ItemDetailView,
    meta: { title: "商品详情" },
  },
  {
    path: "/users/:id",
    name: "user-detail",
    component: UserDetailView,
    meta: { title: "用户主页" },
  },
  {
    path: "/my-items",
    name: "my-items",
    component: MyItemsView,
    meta: { title: "我的商品", requiresAuth: true },
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersView,
    meta: { title: "我的订单", requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { title: "个人中心", requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { title: "管理员面板", requiresAdmin: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: { title: "页面不存在" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.ensureInitialized();

  if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !authStore.isLoggedIn) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: "home" };
  }

  if (authStore.isLoggedIn && (to.name === "login" || to.name === "register")) {
    return { name: "home" };
  }

  return true;
});

router.afterEach((to) => {
  const title = to.meta?.title ? `${to.meta.title} - 闲鱼交易平台` : "闲鱼交易平台";
  document.title = title;
});

export default router;
