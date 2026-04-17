<template>
  <section class="panel panel--center">
    <div class="section-heading">
      <h1>页面不存在</h1>
    </div>
    <p class="helper-text">当前地址没有对应页面，请返回首页继续浏览。</p>
    <RouterLink class="button" :to="{ name: 'home' }">返回首页</RouterLink>
  </section>
</template>
