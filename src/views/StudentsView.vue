<script setup lang="ts">
import StudentFilter from '@/components/StudentFilter.vue'
import StudentList from '@/components/StudentList.vue'
import { useStudentSearch } from '@/composables/useStudentSearch'

const {
  students,
  filters,
  sortKey,
  sortOrder,
  availableGrades,
  availableClasses,
  filteredStudents,
  sortedStudents,
  clearFilters,
} = useStudentSearch()
</script>

<template>
  <section class="page">
    <StudentFilter
      v-model="filters"
      v-model:sort-key="sortKey"
      v-model:sort-order="sortOrder"
      :available-grades="availableGrades"
      :available-classes="availableClasses"
      @clear="clearFilters"
    />

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">児童生徒一覧</h2>
        <p class="count">該当 {{ filteredStudents.length }} 件 ・ 全 {{ students.length }} 件</p>
      </div>

      <StudentList v-if="sortedStudents.length > 0" :students="sortedStudents" />
      <p v-else class="empty">該当する児童生徒がいません。条件を変更してください。</p>
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

.empty {
  margin: 0;
  padding: var(--space-xl);
  color: var(--text-sub);
  text-align: center;
}
</style>
