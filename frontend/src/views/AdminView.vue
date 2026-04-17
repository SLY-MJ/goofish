<script setup>
import { reactive, ref } from "vue";

import { registerAdmin } from "@/api/admin";
import { getErrorMessage } from "@/api/http";

const form = reactive({
  username: "",
  password: "",
});

const loading = ref(false);
const pageError = ref("");
const successMessage = ref("");

async function handleSubmit() {
  loading.value = true;
  pageError.value = "";
  successMessage.value = "";

  try {
    await registerAdmin(form);
    form.username = "";
    form.password = "";
    successMessage.value = "新管理员创建成功";
  } catch (error) {
    pageError.value = getErrorMessage(error, "创建管理员失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="page-grid">
    <section class="panel">
      <div class="section-heading">
        <h1>管理员面板</h1>
      </div>

      <p class="helper-text">
        管理员删除入口已经分布在商品详情、评论区和用户主页中。这里保留新增管理员的能力。
      </p>

      <form class="form-grid" @submit.prevent="handleSubmit">
        <label class="field">
          <span class="field__label">新管理员用户名</span>
          <input v-model="form.username" class="input" type="text" placeholder="请输入用户名" />
        </label>

        <label class="field">
          <span class="field__label">密码</span>
          <input v-model="form.password" class="input" type="password" placeholder="至少 6 位" />
        </label>

        <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
        <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

        <button class="button" type="submit" :disabled="loading">
          {{ loading ? "创建中..." : "创建管理员" }}
        </button>
      </form>
    </section>
  </div>
</template>
