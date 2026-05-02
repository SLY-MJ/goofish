<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getUnreadNotificationCount } from "@/api/notification";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const unreadCount = ref(0);
let timerId = null;
const NOTIFICATION_REFRESH_EVENT = "notification-unread-refresh";

const currentUserName = computed(() => authStore.user?.username || "");
const currentRoleText = computed(() => {
  if (!authStore.user) {
    return "";
  }
  return authStore.isAdmin ? "管理员" : "普通用户";
});

async function refreshUnreadCount() {
  if (!authStore.isLoggedIn) {
    unreadCount.value = 0;
    return;
  }
  try {
    const result = await getUnreadNotificationCount();
    unreadCount.value = Number(result?.count || 0);
  } catch {
    // keep UI stable if request fails
  }
}

function startPolling() {
  stopPolling();
  timerId = window.setInterval(refreshUnreadCount, 30000);
}

function stopPolling() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

async function handleLogout() {
  await authStore.logoutAction();
  unreadCount.value = 0;
  router.push({ name: "home" });
}

watch(
  () => authStore.isLoggedIn,
  async (loggedIn) => {
    if (loggedIn) {
      await refreshUnreadCount();
      startPolling();
    } else {
      unreadCount.value = 0;
      stopPolling();
    }
  },
  { immediate: true },
);

watch(
  () => route.fullPath,
  () => {
    if (authStore.isLoggedIn) {
      refreshUnreadCount();
    }
  },
);

onMounted(() => {
  if (authStore.isLoggedIn) {
    refreshUnreadCount();
    startPolling();
  }
  window.addEventListener(NOTIFICATION_REFRESH_EVENT, refreshUnreadCount);
});

onBeforeUnmount(() => {
  stopPolling();
  window.removeEventListener(NOTIFICATION_REFRESH_EVENT, refreshUnreadCount);
});
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
        <RouterLink
          v-if="authStore.isLoggedIn"
          class="nav-link nav-link--with-badge"
          :to="{ name: 'notifications' }"
        >
          <span>系统通知</span>
          <span v-if="unreadCount > 0" class="nav-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
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
