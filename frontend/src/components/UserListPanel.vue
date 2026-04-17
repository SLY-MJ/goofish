<script setup>
import UserLink from "@/components/UserLink.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    default: () => [],
  },
  emptyText: {
    type: String,
    default: "暂无数据",
  },
});
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <h2>{{ title }}</h2>
    </div>

    <div v-if="users.length" class="simple-list">
      <article v-for="user in users" :key="user.id" class="simple-list__item">
        <div class="simple-list__main">
          <UserLink :user-id="user.id" :username="user.username" />
          <p class="muted-text">{{ user.information || "这个用户暂时还没有填写个人简介。" }}</p>
        </div>
        <div class="simple-list__aside">
          <span class="status-tag">{{ user.role === "ADMIN" ? "管理员" : "用户" }}</span>
        </div>
      </article>
    </div>
    <div v-else class="empty-block">{{ emptyText }}</div>
  </section>
</template>
