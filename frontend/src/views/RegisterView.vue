<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { getErrorMessage } from "@/api/http";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const errorMessage = ref("");

async function handleSubmit() {
  if (form.password !== form.confirmPassword) {
    errorMessage.value = "两次输入的密码不一致";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.registerAction({
      username: form.username,
      password: form.password,
    });
    router.push({ name: "home" });
  } catch (error) {
    errorMessage.value = getErrorMessage(error, "注册失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-layout">
    <article class="auth-card">
      <div class="section-heading">
        <h1>注册账号</h1>
      </div>

      <form class="form-grid" @submit.prevent="handleSubmit">
        <label class="field">
          <span class="field__label">用户名</span>
          <input v-model="form.username" class="input" type="text" placeholder="用户名长度 1 - 40" />
        </label>

        <label class="field">
          <span class="field__label">密码</span>
          <input v-model="form.password" class="input" type="password" placeholder="密码长度至少 6 位" />
        </label>

        <label class="field">
          <span class="field__label">确认密码</span>
          <input
            v-model="form.confirmPassword"
            class="input"
            type="password"
            placeholder="请再次输入密码"
          />
        </label>

        <div v-if="errorMessage" class="notice notice--error">{{ errorMessage }}</div>

        <button class="button button--block" type="submit" :disabled="loading">
          {{ loading ? "注册中..." : "注册" }}
        </button>
      </form>

      <p class="helper-text">
        已有账号？
        <RouterLink :to="{ name: 'login' }">前往登录</RouterLink>
      </p>
    </article>
  </section>
</template>
