<script setup>
import { onMounted, reactive, ref } from "vue";

import { getErrorMessage } from "@/api/http";
import { getFavoriteItems } from "@/api/item";
import { useAuthStore } from "@/stores/auth";
import {
  changePassword,
  getMyFans,
  getMyFollows,
  recharge,
  updateProfile,
} from "@/api/user";
import ItemCard from "@/components/ItemCard.vue";
import UserListPanel from "@/components/UserListPanel.vue";

const authStore = useAuthStore();

const loading = ref(false);
const pageError = ref("");
const successMessage = ref("");
const actionLoading = ref(false);

const favorites = ref([]);
const follows = ref([]);
const fans = ref([]);

const profileForm = reactive({
  username: "",
  information: "",
});

const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
});

const rechargeForm = reactive({
  amount: "",
});

function syncProfileForm() {
  profileForm.username = authStore.user?.username || "";
  profileForm.information = authStore.user?.information || "";
}

function clearFeedback() {
  pageError.value = "";
  successMessage.value = "";
}

async function loadPage() {
  loading.value = true;
  clearFeedback();

  try {
    const user = await authStore.refresh();
    syncProfileForm();

    const [favoriteItems, followUsers, fanUsers] = await Promise.all([
      getFavoriteItems(),
      getMyFollows(),
      getMyFans(),
    ]);

    favorites.value = favoriteItems || [];
    follows.value = followUsers || [];
    fans.value = fanUsers || [];

    if (!user) {
      pageError.value = "当前登录状态已失效";
    }
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载个人中心失败");
  } finally {
    loading.value = false;
  }
}

async function handleSaveProfile() {
  actionLoading.value = true;
  clearFeedback();

  try {
    const nextUser = await updateProfile(profileForm);
    authStore.setUser(nextUser);
    syncProfileForm();
    successMessage.value = "个人资料已更新";
  } catch (error) {
    pageError.value = getErrorMessage(error, "更新个人资料失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleChangePassword() {
  actionLoading.value = true;
  clearFeedback();

  try {
    await changePassword(passwordForm);
    passwordForm.oldPassword = "";
    passwordForm.newPassword = "";
    successMessage.value = "密码修改成功";
  } catch (error) {
    pageError.value = getErrorMessage(error, "修改密码失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleRecharge() {
  actionLoading.value = true;
  clearFeedback();

  try {
    const nextUser = await recharge({ amount: rechargeForm.amount });
    authStore.setUser(nextUser);
    rechargeForm.amount = "";
    successMessage.value = "充值成功";
  } catch (error) {
    pageError.value = getErrorMessage(error, "充值失败");
  } finally {
    actionLoading.value = false;
  }
}

onMounted(loadPage);
</script>

<template>
  <div class="page-grid">
    <section class="hero-card">
      <div class="hero-card__content">
        <span class="hero-card__badge">{{ authStore.isAdmin ? "管理员账号" : "普通账号" }}</span>
        <h1>{{ authStore.user?.username }}</h1>
        <p>{{ authStore.user?.information || "你还没有填写个人简介。" }}</p>
        <div class="detail-stats">
          <span>用户编号：{{ authStore.user?.id }}</span>
          <span>钱包余额：¥{{ Number(authStore.user?.wallet || 0).toFixed(2) }}</span>
        </div>
      </div>
    </section>

    <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
    <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

    <div v-if="loading" class="panel panel--center">正在加载个人中心...</div>
    <template v-else>
      <div class="page-grid page-grid--two-columns">
        <section class="panel">
          <div class="section-heading">
            <h2>编辑资料</h2>
          </div>

          <form class="form-grid" @submit.prevent="handleSaveProfile">
            <label class="field">
              <span class="field__label">用户名</span>
              <input v-model="profileForm.username" class="input" type="text" />
            </label>

            <label class="field">
              <span class="field__label">个人简介</span>
              <textarea v-model="profileForm.information" class="textarea" rows="4" />
            </label>

            <button class="button" type="submit" :disabled="actionLoading">保存资料</button>
          </form>
        </section>

        <section class="panel">
          <div class="section-heading">
            <h2>账户操作</h2>
          </div>

          <div class="stack">
            <form class="form-grid" @submit.prevent="handleRecharge">
              <label class="field">
                <span class="field__label">充值金额</span>
                <input
                  v-model="rechargeForm.amount"
                  class="input"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="请输入充值金额"
                />
              </label>
              <button class="button button--ghost" type="submit" :disabled="actionLoading">
                立即充值
              </button>
            </form>

            <form class="form-grid" @submit.prevent="handleChangePassword">
              <label class="field">
                <span class="field__label">旧密码</span>
                <input v-model="passwordForm.oldPassword" class="input" type="password" />
              </label>

              <label class="field">
                <span class="field__label">新密码</span>
                <input v-model="passwordForm.newPassword" class="input" type="password" />
              </label>

              <button class="button button--ghost" type="submit" :disabled="actionLoading">
                修改密码
              </button>
            </form>
          </div>
        </section>
      </div>

      <section class="panel">
        <div class="section-heading">
          <h2>我的收藏</h2>
        </div>

        <div v-if="favorites.length" class="item-grid">
          <ItemCard v-for="item in favorites" :key="item.id" :item="item" />
        </div>
        <div v-else class="empty-block">你还没有收藏任何商品。</div>
      </section>

      <div class="page-grid page-grid--two-columns">
        <UserListPanel title="我关注的人" :users="follows" empty-text="你还没有关注任何用户。" />
        <UserListPanel title="我的粉丝" :users="fans" empty-text="你暂时还没有粉丝。" />
      </div>
    </template>
  </div>
</template>
