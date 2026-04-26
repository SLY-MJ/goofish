<script setup>
import { onMounted, reactive, ref } from "vue";

import { approveItem, getPendingItems, registerAdmin, rejectItem } from "@/api/admin";
import { getErrorMessage } from "@/api/http";
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
    pendingItems.value = await getPendingItems();
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
        管理员删除入口已经分布在商品详情、评论区和用户主页中。这里包含新增管理员和商品审核能力。
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
          </div>

          <img
            v-if="resolveImage(item.coverImage)"
            :src="resolveImage(item.coverImage)"
            alt="cover"
            style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px"
          />

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
