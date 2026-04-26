import { computed, ref } from "vue";
import { defineStore } from "pinia";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/api/user";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/api/http";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const initialized = ref(false);
  let initPromise = null;

  const isLoggedIn = computed(() => Boolean(user.value));
  const isAdmin = computed(() => user.value?.role === "ADMIN");

  async function ensureInitialized() {
    if (initialized.value) {
      return;
    }

    if (!initPromise) {
      initPromise = (async () => {
        try {
          if (!getAccessToken() && !getRefreshToken()) {
            user.value = null;
            return;
          }
          user.value = await getCurrentUser();
        } catch (error) {
          if (error?.code !== 401) {
            console.error(error);
          }
          clearAuthTokens();
          user.value = null;
        } finally {
          initialized.value = true;
          initPromise = null;
        }
      })();
    }

    await initPromise;
  }

  async function refresh() {
    user.value = await getCurrentUser();
    initialized.value = true;
    return user.value;
  }

  async function loginAction(payload) {
    const result = await login(payload);
    setAccessToken(result?.accessToken);
    setRefreshToken(result?.refreshToken);
    user.value = result?.user || null;
    initialized.value = true;
    return user.value;
  }

  async function registerAction(payload) {
    const result = await register(payload);
    setAccessToken(result?.accessToken);
    setRefreshToken(result?.refreshToken);
    user.value = result?.user || null;
    initialized.value = true;
    return user.value;
  }

  async function logoutAction() {
    try {
      await logout(getRefreshToken());
    } finally {
      clearAuthTokens();
    }
    user.value = null;
    initialized.value = true;
  }

  function setUser(nextUser) {
    user.value = nextUser;
    initialized.value = true;
  }

  return {
    user,
    initialized,
    isLoggedIn,
    isAdmin,
    ensureInitialized,
    refresh,
    loginAction,
    registerAction,
    logoutAction,
    setUser,
  };
});
