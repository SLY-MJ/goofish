<script setup>
import { RouterView } from "vue-router";

import AppNav from "@/components/AppNav.vue";
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="page-shell">
      <RouterView />
    </main>
  </div>
</template>
