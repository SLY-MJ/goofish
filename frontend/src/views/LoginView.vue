<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getErrorMessage } from "@/api/http";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.loginAction(form);
    router.push(String(route.query.redirect || "/"));
  } catch (error) {
    errorMessage.value = getErrorMessage(error, "登录失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-layout">
    <article class="auth-card">
      <div class="section-heading">
        <h1>登录账号</h1>
      </div>

      <form class="form-grid" @submit.prevent="handleSubmit">
        <label class="field">
          <span class="field__label">用户名</span>
          <input v-model="form.username" class="input" type="text" placeholder="请输入用户名" />
        </label>

        <label class="field">
          <span class="field__label">密码</span>
          <input v-model="form.password" class="input" type="password" placeholder="请输入密码" />
        </label>

        <div v-if="errorMessage" class="notice notice--error">{{ errorMessage }}</div>

        <button class="button button--block" type="submit" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </form>

      <p class="helper-text">
        没有账号？
        <RouterLink :to="{ name: 'register' }">前往注册</RouterLink>
      </p>
    </article>
  </section>
</template>
