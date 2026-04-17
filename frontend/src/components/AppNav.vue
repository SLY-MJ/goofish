<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const currentUserName = computed(() => authStore.user?.username || "");
const currentRoleText = computed(() => {
  if (!authStore.user) {
    return "";
  }

  return authStore.isAdmin ? "管理员" : "普通用户";
});

async function handleLogout() {
  await authStore.logoutAction();
  router.push({ name: "home" });
}
</script>

<template>
  <header class="topbar">
    <div class="topbar__inner">
      <RouterLink class="brand" :to="{ name: 'home' }">闲鱼交易平台</RouterLink>

      <nav class="nav-links">
        <RouterLink class="nav-link" :to="{ name: 'home' }">首页</RouterLink>
        <RouterLink v-if="authStore.isLoggedIn" class="nav-link" :to="{ name: 'my-items' }">
          我的商品
        </RouterLink>
        <RouterLink v-if="authStore.isLoggedIn" class="nav-link" :to="{ name: 'orders' }">
          我的订单
        </RouterLink>
        <RouterLink v-if="authStore.isLoggedIn" class="nav-link" :to="{ name: 'profile' }">
          个人中心
        </RouterLink>
        <RouterLink v-if="authStore.isAdmin" class="nav-link" :to="{ name: 'admin' }">
          管理员
        </RouterLink>
      </nav>

      <div class="topbar__actions">
        <div v-if="authStore.isLoggedIn" class="current-user">
          <span class="current-user__name">{{ currentUserName }}</span>
          <span class="current-user__role">{{ currentRoleText }}</span>
        </div>

        <template v-if="authStore.isLoggedIn">
          <button class="button button--ghost" type="button" @click="handleLogout">
            退出登录
          </button>
        </template>
        <template v-else>
          <RouterLink class="button button--ghost" :to="{ name: 'login' }">登录</RouterLink>
          <RouterLink class="button" :to="{ name: 'register' }">注册</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>
