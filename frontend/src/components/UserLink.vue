<script setup>
defineProps({
  userId: {
    type: [Number, String],
    required: true,
  },
  username: {
    type: String,
    default: "未知用户",
  },
  compact: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <RouterLink
    class="user-link"
    :class="{ 'user-link--compact': compact }"
    :to="{ name: 'user-detail', params: { id: userId } }"
  >
    {{ username }}
  </RouterLink>
</template>
