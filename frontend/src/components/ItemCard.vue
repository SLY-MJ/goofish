<script setup>
import { computed } from "vue";

import { formatItemStatus, formatPrice, resolveImage } from "@/utils/format";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => resolveImage(props.item.coverImage));
</script>

<template>
  <article class="item-card">
    <div class="item-card__image">
      <img v-if="imageUrl" :src="imageUrl" :alt="item.title" />
      <div v-else class="image-placeholder">暂无图片</div>
    </div>

    <div class="item-card__content">
      <div class="item-card__meta">
        <span class="status-tag">{{ formatItemStatus(item.status) }}</span>
      </div>
      <h3 class="item-card__title">{{ item.title }}</h3>
      <p class="item-card__price">{{ formatPrice(item.price) }}</p>
      <slot name="extra" />
      <div class="action-row">
        <RouterLink class="button button--small" :to="{ name: 'item-detail', params: { id: item.id } }">
          查看详情
        </RouterLink>
        <slot name="actions" />
      </div>
    </div>
  </article>
</template>
