<script setup lang="ts">
import StudentFilter from '@/components/StudentFilter.vue'
import StudentList from '@/components/StudentList.vue'
import { getStudents } from '@/api/studentApi'

const students = getStudents()
</script>

<template>
  <section class="page">
    <StudentFilter />

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">児童生徒一覧</h2>
        <p class="count">全 {{ students.length }} 件</p>
      </div>

      <StudentList :students="students" />
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.card {
  padding: var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}

.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.card-title {
  margin: 0;
  font-size: 14px;
}

.count {
  margin: 0;
  color: var(--text-sub);
  font-size: 12px;
}
</style>
