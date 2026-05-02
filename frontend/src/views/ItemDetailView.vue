<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { adminDeleteComment, adminDeleteItem } from "@/api/admin";
import { getErrorMessage } from "@/api/http";
import {
  addComment,
  deleteComment as deleteOwnComment,
  deleteItem as deleteOwnItem,
  favoriteItem,
  getFavoriteItems,
  getItemComments,
  getItemDetail,
  unfavoriteItem,
} from "@/api/item";
import { createOrder } from "@/api/order";
import { followUser, getMyFollows, unfollowUser } from "@/api/user";
import UserLink from "@/components/UserLink.vue";
import { useAuthStore } from "@/stores/auth";
import { formatItemStatus, formatPrice, resolveImage } from "@/utils/format";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const item = ref(null);
const comments = ref([]);
const favoriteIds = ref([]);
const followIds = ref([]);

const loading = ref(false);
const actionLoading = ref(false);
const pageError = ref("");
const actionError = ref("");
const successMessage = ref("");
const commentText = ref("");

const imageList = computed(() => {
  const images = (item.value?.images || [])
    .map((entry) => resolveImage(entry.imageUrl))
    .filter(Boolean);
  if (images.length) {
    return images;
  }
  const cover = resolveImage(item.value?.coverImage);
  return cover ? [cover] : [];
});
const imageUrl = computed(() => imageList.value[0] || "");
const isOwner = computed(() => Number(authStore.user?.id) === Number(item.value?.sellerId));
const isFavorite = computed(() => favoriteIds.value.includes(Number(item.value?.id)));
const isFollowingSeller = computed(() => followIds.value.includes(Number(item.value?.sellerId)));
const canBuy = computed(
  () =>
    authStore.isLoggedIn &&
    item.value &&
    !isOwner.value &&
    item.value.status === "ON_SALE",
);
const canToggleFollow = computed(
  () => authStore.isLoggedIn && item.value && !isOwner.value,
);
const canManageItem = computed(() => authStore.isAdmin || isOwner.value);

function clearFeedback() {
  actionError.value = "";
  successMessage.value = "";
}

function rememberFavoriteState(items) {
  favoriteIds.value = (items || []).map((entry) => Number(entry.id));
}

function rememberFollowState(users) {
  followIds.value = (users || []).map((entry) => Number(entry.id));
}

async function loadRelationState() {
  if (!authStore.isLoggedIn) {
    favoriteIds.value = [];
    followIds.value = [];
    return;
  }

  const [favoriteResult, followResult] = await Promise.allSettled([
    getFavoriteItems(),
    getMyFollows(),
  ]);

  if (favoriteResult.status === "fulfilled") {
    rememberFavoriteState(favoriteResult.value);
  }

  if (followResult.status === "fulfilled") {
    rememberFollowState(followResult.value);
  }
}

async function loadPage() {
  loading.value = true;
  pageError.value = "";
  clearFeedback();

  try {
    await authStore.ensureInitialized();
    const itemId = Number(route.params.id);
    const [detail, commentList] = await Promise.all([
      getItemDetail(itemId),
      getItemComments(itemId),
    ]);

    item.value = detail;
    comments.value = commentList || [];
    await loadRelationState();
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载商品详情失败");
  } finally {
    loading.value = false;
  }
}

function redirectToLogin() {
  router.push({
    name: "login",
    query: { redirect: route.fullPath },
  });
}

async function handleFavoriteToggle() {
  if (!authStore.isLoggedIn) {
    redirectToLogin();
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    if (isFavorite.value) {
      await unfavoriteItem(item.value.id);
      favoriteIds.value = favoriteIds.value.filter((id) => id !== Number(item.value.id));
      successMessage.value = "已取消收藏";
    } else {
      await favoriteItem(item.value.id);
      favoriteIds.value = [...favoriteIds.value, Number(item.value.id)];
      successMessage.value = "收藏成功";
    }
  } catch (error) {
    actionError.value = getErrorMessage(error, "操作收藏失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleFollowToggle() {
  if (!authStore.isLoggedIn) {
    redirectToLogin();
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    if (isFollowingSeller.value) {
      await unfollowUser(item.value.sellerId);
      followIds.value = followIds.value.filter((id) => id !== Number(item.value.sellerId));
      successMessage.value = "已取消关注";
    } else {
      await followUser(item.value.sellerId);
      followIds.value = [...followIds.value, Number(item.value.sellerId)];
      successMessage.value = "关注成功";
    }
  } catch (error) {
    actionError.value = getErrorMessage(error, "操作关注失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleCreateOrder() {
  if (!authStore.isLoggedIn) {
    redirectToLogin();
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    await createOrder({
      itemId: item.value.id,
      sellerId: item.value.sellerId,
    });
    successMessage.value = "下单成功，请前往我的订单完成付款";
  } catch (error) {
    actionError.value = getErrorMessage(error, "下单失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleDeleteItem() {
  if (!window.confirm("确定删除这个商品吗？")) {
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    if (authStore.isAdmin) {
      await adminDeleteItem(item.value.id);
    } else {
      await deleteOwnItem(item.value.id);
    }

    router.push({ name: authStore.isLoggedIn ? "my-items" : "home" });
  } catch (error) {
    actionError.value = getErrorMessage(error, "删除商品失败");
  } finally {
    actionLoading.value = false;
  }
}

function canDeleteComment(comment) {
  if (!authStore.isLoggedIn) {
    return false;
  }

  return authStore.isAdmin || String(authStore.user.id) === String(comment.userId);
}

async function handleDeleteComment(comment) {
  if (!window.confirm("确定删除这条评论吗？")) {
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    if (authStore.isAdmin && String(authStore.user.id) !== String(comment.userId)) {
      await adminDeleteComment(comment.id);
    } else {
      await deleteOwnComment(comment.id);
    }

    comments.value = comments.value.filter((entry) => entry.id !== comment.id);
    successMessage.value = "评论已删除";
  } catch (error) {
    actionError.value = getErrorMessage(error, "删除评论失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleAddComment() {
  if (!authStore.isLoggedIn) {
    redirectToLogin();
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    await addComment(item.value.id, commentText.value);
    commentText.value = "";
    comments.value = await getItemComments(item.value.id);
    successMessage.value = "评论发布成功";
  } catch (error) {
    actionError.value = getErrorMessage(error, "发表评论失败");
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
    <div v-else-if="loading" class="panel panel--center">正在加载商品详情...</div>
    <template v-else-if="item">
      <section class="detail-layout">
        <article class="detail-layout__media panel">
          <div class="detail-image">
            <img v-if="imageUrl" :src="imageUrl" :alt="item.title" />
            <div v-else class="image-placeholder image-placeholder--large">暂无图片</div>
          </div>
          <div v-if="imageList.length > 1" class="detail-thumbs">
            <img
              v-for="(url, index) in imageList"
              :key="`${item.id}-${index}`"
              :src="url"
              :alt="`${item.title}-${index + 1}`"
              class="detail-thumbs__item"
            />
          </div>
        </article>

        <article class="detail-layout__content panel">
          <div class="section-heading">
            <h1>{{ item.title }}</h1>
            <span class="status-tag">{{ formatItemStatus(item.status) }}</span>
          </div>

          <p class="detail-price">{{ formatPrice(item.price) }}</p>
          <p class="detail-description">{{ item.description || "卖家暂时没有填写商品描述。" }}</p>

          <div class="detail-stats">
            <span>库存：{{ item.stock }}</span>
            <span>浏览：{{ item.viewCount }}</span>
          </div>

          <div class="seller-box">
            <span class="seller-box__label">卖家</span>
            <UserLink :user-id="item.sellerId" :username="item.sellerUsername || '未知卖家'" />
          </div>

          <div v-if="actionError" class="notice notice--error">{{ actionError }}</div>
          <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

          <div class="action-row">
            <button
              v-if="authStore.isLoggedIn"
              class="button"
              type="button"
              :disabled="actionLoading"
              @click="handleFavoriteToggle"
            >
              {{ isFavorite ? "取消收藏" : "收藏" }}
            </button>

            <button
              v-if="canToggleFollow"
              class="button button--ghost"
              type="button"
              :disabled="actionLoading"
              @click="handleFollowToggle"
            >
              {{ isFollowingSeller ? "取消关注" : "关注" }}
            </button>

            <button
              v-if="canBuy"
              class="button button--warn"
              type="button"
              :disabled="actionLoading"
              @click="handleCreateOrder"
            >
              立即下单
            </button>

            <RouterLink
              v-if="isOwner"
              class="button button--ghost"
              :to="{ name: 'my-items' }"
            >
              回到我的商品管理
            </RouterLink>

            <button
              v-if="canManageItem"
              class="button button--danger"
              type="button"
              :disabled="actionLoading"
              @click="handleDeleteItem"
            >
              删除商品
            </button>
          </div>
        </article>
      </section>

      <section class="panel">
        <div class="section-heading">
          <h2>评论区</h2>
        </div>

        <form class="comment-editor" @submit.prevent="handleAddComment">
          <textarea
            v-model="commentText"
            class="textarea"
            rows="4"
            placeholder="输入你的评论内容"
          />
          <div class="action-row">
            <button class="button" type="submit" :disabled="actionLoading">发表评论</button>
          </div>
        </form>

        <div v-if="comments.length" class="comment-list">
          <article v-for="comment in comments" :key="comment.id" class="comment-card">
            <div class="comment-card__header">
              <UserLink
                :user-id="comment.userId"
                :username="comment.username || '未知用户'"
                compact
              />
              <button
                v-if="canDeleteComment(comment)"
                class="button button--ghost button--small"
                type="button"
                :disabled="actionLoading"
                @click="handleDeleteComment(comment)"
              >
                删除评论
              </button>
            </div>
            <p class="comment-card__content">{{ comment.comment }}</p>
          </article>
        </div>
        <div v-else class="empty-block">还没有评论，欢迎发表第一条评论。</div>
      </section>
    </template>
  </div>
</template>
