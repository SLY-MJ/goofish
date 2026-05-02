<script setup>
import { onMounted, reactive, ref } from "vue";

import { approveItem, getPendingItems, registerAdmin, rejectItem } from "@/api/admin";
import { getErrorMessage } from "@/api/http";
import { getItemDetail } from "@/api/item";
import { formatItemStatus, formatPrice, resolveImage } from "@/utils/format";

const form = reactive({
  username: "",
  password: "",
});

const createLoading = ref(false);
const reviewLoading = ref(false);
const pageError = ref("");
const successMessage = ref("");
const pendingItems = ref([]);
const rejectReasonMap = reactive({});
const pendingDetailMap = reactive({});

function clearPendingDetailMap() {
  Object.keys(pendingDetailMap).forEach((key) => {
    delete pendingDetailMap[key];
  });
}

async function loadPendingDetails(items) {
  clearPendingDetailMap();
  if (!items.length) {
    return;
  }

  const results = await Promise.allSettled(items.map((item) => getItemDetail(item.id)));
  results.forEach((result, index) => {
    const itemId = items[index].id;
    pendingDetailMap[itemId] = result.status === "fulfilled" ? result.value : null;
  });
}

function getItemDetailById(itemId) {
  return pendingDetailMap[itemId] || null;
}

function getImages(item) {
  const detail = getItemDetailById(item.id);
  const images = (detail?.images || [])
    .map((entry) => resolveImage(entry.imageUrl))
    .filter(Boolean);
  if (images.length) {
    return images;
  }

  const cover = resolveImage(detail?.coverImage || item.coverImage);
  return cover ? [cover] : [];
}

function getDescription(item) {
  const detail = getItemDetailById(item.id);
  return detail?.description || "暂无商品描述";
}

function getStock(item) {
  const detail = getItemDetailById(item.id);
  return detail?.stock ?? "-";
}

function getViewCount(item) {
  const detail = getItemDetailById(item.id);
  return detail?.viewCount ?? "-";
}

async function handleSubmit() {
  createLoading.value = true;
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
    createLoading.value = false;
  }
}

async function loadPendingItems() {
  reviewLoading.value = true;
  pageError.value = "";
  try {
    const items = await getPendingItems();
    pendingItems.value = items || [];
    await loadPendingDetails(pendingItems.value);
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载待审核商品失败");
  } finally {
    reviewLoading.value = false;
  }
}

async function handleApprove(itemId) {
  reviewLoading.value = true;
  pageError.value = "";
  successMessage.value = "";
  try {
    await approveItem(itemId);
    successMessage.value = "审核通过成功";
    await loadPendingItems();
  } catch (error) {
    pageError.value = getErrorMessage(error, "审核通过失败");
  } finally {
    reviewLoading.value = false;
  }
}

async function handleReject(itemId) {
  const reason = (rejectReasonMap[itemId] || "").trim();
  if (!reason) {
    pageError.value = "请填写驳回原因";
    return;
  }

  reviewLoading.value = true;
  pageError.value = "";
  successMessage.value = "";
  try {
    await rejectItem(itemId, reason);
    successMessage.value = "审核驳回成功";
    delete rejectReasonMap[itemId];
    await loadPendingItems();
  } catch (error) {
    pageError.value = getErrorMessage(error, "审核驳回失败");
  } finally {
    reviewLoading.value = false;
  }
}

onMounted(loadPendingItems);
</script>

<template>
  <div class="page-grid">
    <section class="panel">
      <div class="section-heading">
        <h1>管理员面板</h1>
      </div>

      <p class="helper-text">
        这里支持新增管理员，以及审核待上架商品。
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

        <button class="button" type="submit" :disabled="createLoading">
          {{ createLoading ? "创建中..." : "创建管理员" }}
        </button>
      </form>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>待审核商品</h2>
      </div>

      <div v-if="reviewLoading" class="empty-block">正在加载待审核商品...</div>
      <div v-else-if="pendingItems.length === 0" class="empty-block">暂无待审核商品。</div>
      <div v-else class="stack">
        <article v-for="item in pendingItems" :key="item.id" class="panel">
          <div class="section-heading">
            <h3>#{{ item.id }} {{ item.title }}</h3>
            <span class="status-tag">{{ formatItemStatus(item.status) }}</span>
          </div>

          <div class="detail-stats">
            <span>卖家ID：{{ item.sellerId }}</span>
            <span>价格：{{ formatPrice(item.price) }}</span>
            <span>库存：{{ getStock(item) }}</span>
            <span>浏览：{{ getViewCount(item) }}</span>
          </div>

          <p class="helper-text">{{ getDescription(item) }}</p>

          <div class="admin-review-gallery">
            <img
              v-for="(url, index) in getImages(item)"
              :key="`${item.id}-${index}`"
              :src="url"
              :alt="`${item.title}-${index + 1}`"
              class="admin-review-gallery__item"
            />
          </div>

          <div class="action-row">
            <RouterLink class="button button--ghost" :to="{ name: 'item-detail', params: { id: item.id } }">
              查看完整详情
            </RouterLink>
          </div>

          <label class="field">
            <span class="field__label">驳回原因</span>
            <input
              v-model="rejectReasonMap[item.id]"
              class="input"
              type="text"
              placeholder="请输入驳回原因"
            />
          </label>

          <div class="action-row">
            <button class="button" type="button" :disabled="reviewLoading" @click="handleApprove(item.id)">
              通过
            </button>
            <button class="button button--danger" type="button" :disabled="reviewLoading" @click="handleReject(item.id)">
              驳回
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
