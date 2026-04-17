import { computed, ref } from "vue";
import { defineStore } from "pinia";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/api/user";

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
          user.value = await getCurrentUser();
        } catch (error) {
          if (error?.code !== 401) {
            console.error(error);
          }
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
    user.value = await login(payload);
    initialized.value = true;
    return user.value;
  }

  async function registerAction(payload) {
    user.value = await register(payload);
    initialized.value = true;
    return user.value;
  }

  async function logoutAction() {
    await logout();
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
