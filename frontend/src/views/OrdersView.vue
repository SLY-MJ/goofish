<script setup>
import { computed, onMounted, ref } from "vue";

import { getErrorMessage } from "@/api/http";
import {
  cancelOrder,
  deleteOrder as requestDeleteOrder,
  getBuyOrders,
  getSellOrders,
  payOrder,
} from "@/api/order";
import UserLink from "@/components/UserLink.vue";
import { formatOrderStatus, formatPrice, resolveImage } from "@/utils/format";

const activeTab = ref("buy");
const buyOrders = ref([]);
const sellOrders = ref([]);
const loading = ref(false);
const actionLoading = ref(false);
const pageError = ref("");
const successMessage = ref("");

const currentOrders = computed(() =>
  activeTab.value === "buy" ? buyOrders.value : sellOrders.value,
);

function clearFeedback() {
  pageError.value = "";
  successMessage.value = "";
}

async function loadOrders() {
  loading.value = true;
  clearFeedback();

  try {
    const [buyList, sellList] = await Promise.all([getBuyOrders(), getSellOrders()]);
    buyOrders.value = buyList || [];
    sellOrders.value = sellList || [];
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载订单失败");
  } finally {
    loading.value = false;
  }
}

async function handlePay(orderId) {
  actionLoading.value = true;
  clearFeedback();

  try {
    await payOrder(orderId);
    successMessage.value = "付款成功";
    await loadOrders();
  } catch (error) {
    pageError.value = getErrorMessage(error, "付款失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleCancel(orderId) {
  actionLoading.value = true;
  clearFeedback();

  try {
    await cancelOrder(orderId);
    successMessage.value = "订单已取消";
    await loadOrders();
  } catch (error) {
    pageError.value = getErrorMessage(error, "取消订单失败");
  } finally {
    actionLoading.value = false;
  }
}

async function handleDelete(orderId) {
  if (!window.confirm("确定删除这个订单吗？")) {
    return;
  }

  actionLoading.value = true;
  clearFeedback();

  try {
    await requestDeleteOrder(orderId);
    successMessage.value = "订单已删除";
    await loadOrders();
  } catch (error) {
    pageError.value = getErrorMessage(error, "删除订单失败");
  } finally {
    actionLoading.value = false;
  }
}

onMounted(loadOrders);
</script>

<template>
  <div class="page-grid">
    <section class="panel">
      <div class="section-heading">
        <h1>我的订单</h1>
      </div>

      <div class="tabs">
        <button
          class="tab-button"
          :class="{ 'tab-button--active': activeTab === 'buy' }"
          type="button"
          @click="activeTab = 'buy'"
        >
          我购买的订单
        </button>
        <button
          class="tab-button"
          :class="{ 'tab-button--active': activeTab === 'sell' }"
          type="button"
          @click="activeTab = 'sell'"
        >
          我卖出的订单
        </button>
      </div>

      <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
      <div v-if="successMessage" class="notice notice--success">{{ successMessage }}</div>

      <div v-if="loading" class="empty-block">正在加载订单...</div>
      <div v-else-if="currentOrders.length" class="order-list">
        <article v-for="order in currentOrders" :key="order.id" class="order-card">
          <div class="order-card__image">
            <img
              v-if="resolveImage(order.coverImage)"
              :src="resolveImage(order.coverImage)"
              :alt="order.itemTitle"
            />
            <div v-else class="image-placeholder">暂无图片</div>
          </div>

          <div class="order-card__content">
            <div class="section-heading">
              <h2>{{ order.itemTitle || "商品已删除" }}</h2>
              <span class="status-tag">{{ formatOrderStatus(order.status) }}</span>
            </div>

            <div class="detail-stats">
              <span>订单号：{{ order.id }}</span>
              <span>金额：{{ formatPrice(order.amount) }}</span>
              <span>创建时间：{{ order.createTime }}</span>
            </div>

            <div class="info-list">
              <p>
                买家：
                <UserLink :user-id="order.buyerId" :username="order.buyerName || '未知用户'" compact />
              </p>
              <p>
                卖家：
                <UserLink :user-id="order.sellerId" :username="order.sellerName || '未知用户'" compact />
              </p>
            </div>

            <div class="action-row">
              <RouterLink
                v-if="order.itemId"
                class="button button--ghost button--small"
                :to="{ name: 'item-detail', params: { id: order.itemId } }"
              >
                查看商品
              </RouterLink>
              <button
                v-if="activeTab === 'buy' && order.status === 'CREATED'"
                class="button button--small"
                type="button"
                :disabled="actionLoading"
                @click="handlePay(order.id)"
              >
                立即付款
              </button>
              <button
                v-if="activeTab === 'buy' && order.status === 'CREATED'"
                class="button button--ghost button--small"
                type="button"
                :disabled="actionLoading"
                @click="handleCancel(order.id)"
              >
                取消订单
              </button>
              <button
                class="button button--danger button--small"
                type="button"
                :disabled="actionLoading"
                @click="handleDelete(order.id)"
              >
                删除订单
              </button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty-block">当前标签下还没有订单记录。</div>
    </section>
  </div>
</template>
