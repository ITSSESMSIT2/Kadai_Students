<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <p class="code">404</p>
    <h2 class="title">ページが見つかりません</h2>
    <RouterLink class="link" to="/">トップへ戻る</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  min-height: 320px;
}

.code {
  margin: 0;
  color: var(--text-sub);
  font-size: 40px;
  font-weight: bold;
  line-height: 1;
}

.title {
  margin: 0;
  font-size: 18px;
}

.link {
  margin-top: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px;
}
</style>
