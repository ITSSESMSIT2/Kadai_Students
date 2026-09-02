<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <h2 class="hero-title">児童生徒を探す</h2>
    <RouterLink class="hero-button" to="/students">検索をはじめる</RouterLink>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  min-height: 320px;
}

.hero-title {
  margin: 0;
  font-size: 28px;
}

.hero-button {
  padding: var(--space-md) var(--space-xl);
  color: var(--surface);
  background: var(--primary);
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-1);
  font-size: 15px;
}

.hero-button:hover {
  box-shadow: var(--elevation-2);
}
</style>
