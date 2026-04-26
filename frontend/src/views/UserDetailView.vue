<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { adminDeleteUser } from "@/api/admin";
import { getErrorMessage } from "@/api/http";
import { getSellerItems } from "@/api/item";
import { followUser, getMyFollows, getUserDetail, unfollowUser } from "@/api/user";
import ItemCard from "@/components/ItemCard.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const profile = ref(null);
const items = ref([]);
const followIds = ref([]);
const loading = ref(false);
const pageError = ref("");
const actionError = ref("");
const successMessage = ref("");
const actionLoading = ref(false);

const isSelf = computed(() => Number(authStore.user?.id) === Number(profile.value?.id));
const isFollowing = computed(() => followIds.value.includes(Number(profile.value?.id)));
const canFollow = computed(() => authStore.isLoggedIn && profile.value && !isSelf.value);

function clearFeedback() {
  actionError.value = "";
  successMessage.value = "";
}

async function loadFollowState() {
  if (!authStore.isLoggedIn) {
    followIds.value = [];
    return;
  }

  try {
    const users = await getMyFollows();
    followIds.value = (users || []).map((entry) => Number(entry.id));
  } catch {
    followIds.value = [];
  }
}

async function loadPage() {
  loading.value = true;
  pageError.value = "";
  clearFeedback();

  try {
    await authStore.ensureInitialized();
    const userId = Number(route.params.id);

    const [userResult, itemResult] = await Promise.allSettled([
      getUserDetail(userId),
      getSellerItems(userId),
    ]);

    if (userResult.status !== "fulfilled") {
      throw userResult.reason;
    }
    profile.value = userResult.value;

    if (itemResult.status === "fulfilled") {
      items.value = itemResult.value || [];
    } else {
      const error = itemResult.reason;
      const statusCode = error?.code ?? error?.response?.status ?? error?.payload?.code;
      if (statusCode === 404) {
        items.value = [];
      } else {
        throw error;
      }
    }

    await loadFollowState();
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载用户主页失败");
  } finally {
    loading.value = false;
  }
}

async function handleFollowToggle() {
  actionLoading.value = true;
  clearFeedback();

  try {
    if (isFollowing.value) {
      await unfollowUser(profile.value.id);
      followIds.value = followIds.value.filter((id) => id !== Number(profile.value.id));
      successMessage.value = "已取消关注";
    } else {
      await followUser(profile.value.id);
      followIds.value = [...followIds.value, Number(profile.value.id)];
      successMessage.value = "关注成功";
    }
  } catch (error) {
    actionError.value = getErrorMessage(error, "操作关注失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleDeleteUser() {
  if (!window.confirm("确定删除这个用户吗？")) {
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    await adminDeleteUser(profile.value.id);
    router.push({ name: "home" });
  } catch (error) {
    actionError.value = getErrorMessage(error, "删除用户失败");
  } finally {
    actionLoading.value = false;
  }
}

watch(
  () => route.params.id,
  () => {
    loadPage();
  },
  { immediate: true },
);
</script>

<template>
  <div class="page-grid">
    <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
    <div v-else-if="loading && !profile" class="panel panel--center">正在加载用户主页...</div>
    <template v-else-if="profile">
      <section class="hero-card">
        <div class="hero-card__content">
          <span class="hero-card__badge">
            {{ profile.role === "ADMIN" ? "管理员" : "普通用户" }}
          </span>
          <h1>{{ profile.username }}</h1>
          <p>{{ profile.information || "这个用户暂时还没有填写个人简介。" }}</p>
          <div class="detail-stats">
            <span>用户编号：{{ profile.id }}</span>
            <span>在售与历史商品：{{ items.length }}</span>
          </div>
        </div>

        <div class="hero-card__actions">
          <div v-if="actionError" class="notice notice--error">{{ actionError }}</div>
          <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

          <div class="action-row">
            <button
              v-if="canFollow"
              class="button"
              type="button"
              :disabled="actionLoading"
              @click="handleFollowToggle"
            >
              {{ isFollowing ? "取消关注" : "关注" }}
            </button>
            <button
              v-if="authStore.isAdmin && !isSelf"
              class="button button--danger"
              type="button"
              :disabled="actionLoading"
              @click="handleDeleteUser"
            >
              删除用户
            </button>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="section-heading">
          <h2>他的商品</h2>
        </div>

        <div v-if="items.length" class="item-grid">
          <ItemCard v-for="entry in items" :key="entry.id" :item="entry" />
        </div>
        <div v-else class="empty-block">这个用户暂时还没有发布商品。</div>
      </section>
    </template>
  </div>
</template>
