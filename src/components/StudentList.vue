<script setup lang="ts">
import type { Student } from '@/data/students'
import StudentRow from '@/components/StudentRow.vue'

defineProps<{ students: Student[] }>()
</script>

<template>
  <table class="list">
    <thead>
      <tr>
        <th>ID</th>
        <th>氏名</th>
        <th>ふりがな</th>
        <th>学校</th>
        <th>学年</th>
        <th>組</th>
        <th>出席番号</th>
        <th>要フォロー</th>
        <th>更新日</th>
      </tr>
    </thead>
    <tbody>
      <StudentRow v-for="student in students" :key="student.id" :student="student" />
    </tbody>
  </table>
</template>

<style scoped>
.list {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: var(--space-md) var(--space-sm);
  color: var(--text-sub);
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
}
</style>
