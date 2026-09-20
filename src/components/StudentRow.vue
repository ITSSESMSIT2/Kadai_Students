<script setup lang="ts">
import type { Student } from '@/data/students'
import { formatDate } from '@/utils/format'

defineProps<{ student: Student }>()
</script>

<template>
  <tr class="row">
    <td class="sub">{{ student.id }}</td>
    <td class="name">{{ student.name }}</td>
    <td class="sub">
      <span v-if="student.kana">{{ student.kana }}</span>
      <span v-else class="empty">（未登録）</span>
    </td>
    <td>{{ student.school.name }}</td>
    <td class="nowrap">{{ student.grade.name }}</td>
    <td class="nowrap">{{ student.class?.name ?? '—' }}</td>
    <td class="nowrap">{{ student.attendanceNumber }}</td>
    <td>
      <span v-if="student.needsFollow" class="chip">要フォロー</span>
      <span v-else class="empty">—</span>
    </td>
    <td class="sub nowrap">{{ formatDate(student.updatedAt) }}</td>
  </tr>
</template>

<style scoped>
.row td {
  padding: var(--space-md) var(--space-sm);
  border-top: 1px solid var(--border);
  vertical-align: middle;
}

.name {
  font-size: 13px;
}

.sub {
  color: var(--text-sub);
  font-size: 12px;
}

.empty {
  color: var(--text-sub);
  font-style: italic;
}

.nowrap {
  white-space: nowrap;
}

.chip {
  display: inline-block;
  padding: 0 var(--space-sm);
  color: var(--danger);
  background: rgb(from var(--danger) r g b / 8%);
  border: 1px solid var(--danger);
  border-radius: var(--radius-sm);
  font-size: 11px;
  white-space: nowrap;
}
</style>
