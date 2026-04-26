<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getErrorMessage } from "@/api/http";
import { getCaptcha } from "@/api/user";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
  captchaId: "",
  captchaCode: "",
  isRemember: false,
});

const loading = ref(false);
const errorMessage = ref("");
const captchaImage = ref("");

async function loadCaptcha() {
  const data = await getCaptcha();
  form.captchaId = data.captchaId;
  captchaImage.value = data.imageBase64;
  form.captchaCode = "";
}

async function handleSubmit() {
  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.loginAction({
      username: form.username,
      password: form.password,
      captchaId: form.captchaId,
      captchaCode: form.captchaCode,
      isRemember: form.isRemember,
    });
    router.push(String(route.query.redirect || "/"));
  } catch (error) {
    errorMessage.value = getErrorMessage(error, "登录失败");
    await loadCaptcha();
  } finally {
    loading.value = false;
  }
}

loadCaptcha().catch((error) => {
  errorMessage.value = getErrorMessage(error, "验证码加载失败");
});
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

        <label class="field">
          <span class="field__label">图形验证码</span>
          <div class="action-row">
            <input
              v-model="form.captchaCode"
              class="input"
              type="text"
              maxlength="8"
              placeholder="请输入验证码"
            />
            <img
              v-if="captchaImage"
              :src="captchaImage"
              alt="captcha"
              style="height: 40px; border-radius: 8px; cursor: pointer;"
              title="点击刷新验证码"
              @click="loadCaptcha"
            />
          </div>
        </label>

        <label class="field" style="display: flex; align-items: center; gap: 8px;">
          <input v-model="form.isRemember" type="checkbox" />
          <span class="field__label" style="margin: 0;">7天内自动登录</span>
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
      <p class="helper-text">
        忘记密码？
        <RouterLink :to="{ name: 'forgot-password' }">找回密码</RouterLink>
      </p>
    </article>
  </section>
</template>
