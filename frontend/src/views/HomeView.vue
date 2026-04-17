<script setup>
import { onMounted, ref } from "vue";

import { getErrorMessage } from "@/api/http";
import { getRecommendItems, searchItems } from "@/api/item";
import ItemCard from "@/components/ItemCard.vue";

const keyword = ref("");
const items = ref([]);
const loading = ref(false);
const sectionTitle = ref("推荐商品");
const pageError = ref("");

async function loadRecommend() {
  loading.value = true;
  pageError.value = "";

  try {
    items.value = await getRecommendItems();
    sectionTitle.value = "推荐商品";
  } catch (error) {
    pageError.value = getErrorMessage(error, "加载推荐商品失败");
  } finally {
    loading.value = false;
  }
}

async function handleSearch() {
  if (!keyword.value.trim()) {
    await loadRecommend();
    return;
  }

  loading.value = true;
  pageError.value = "";

  try {
    items.value = await searchItems(keyword.value.trim());
    sectionTitle.value = `搜索结果：${keyword.value.trim()}`;
  } catch (error) {
    pageError.value = getErrorMessage(error, "搜索商品失败");
  } finally {
    loading.value = false;
  }
}

onMounted(loadRecommend);
</script>

<template>
  <div class="page-grid">
    <section class="hero-card">
      <div class="hero-card__content">
        <span class="hero-card__badge">校园二手交易</span>
        <h1>用标准 Vue 开发结构管理你的闲置交易前端</h1>
        <p>
          现在首页、商品详情、用户主页、订单、个人中心都已经拆成独立页面，开发时直接使用
          <code>npm run dev</code> 即可。
        </p>
      </div>

      <form class="search-panel" @submit.prevent="handleSearch">
        <label class="field">
          <span class="field__label">搜索商品</span>
          <input v-model="keyword" class="input" type="text" placeholder="输入商品标题关键词" />
        </label>
        <div class="action-row">
          <button class="button" type="submit">开始搜索</button>
          <button class="button button--ghost" type="button" @click="loadRecommend">恢复推荐</button>
        </div>
      </form>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>{{ sectionTitle }}</h2>
      </div>

      <div v-if="pageError" class="notice notice--error">{{ pageError }}</div>
      <div v-else-if="loading" class="empty-block">正在加载商品...</div>
      <div v-else-if="items.length" class="item-grid">
        <ItemCard v-for="item in items" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-block">没有找到符合条件的商品。</div>
    </section>
  </div>
</template>
