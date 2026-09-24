<script setup lang="ts">
import { computed, ref } from 'vue'
import StudentFilter from '@/components/StudentFilter.vue'
import StudentList from '@/components/StudentList.vue'
import { getStudents } from '@/api/studentApi'
import type { SortKey, SortOrder } from '@/constants/sort'
import type { Student } from '@/types/student'

const students = getStudents()

const sortKey = ref<SortKey>('kana')
const sortOrder = ref<SortOrder>('asc')

/** 選択された並び替えキーでの比較。昇順のときに a を先へ置くなら負の数を返す */
const compareBySortKey = (a: Student, b: Student, key: SortKey): number => {
  switch (key) {
    case 'kana':
      return a.kana.localeCompare(b.kana, 'ja')
    case 'grade':
      // 表示名ではなく id で比較する（name の辞書順だと小学と中学が混ざる）
      return a.grade.id - b.grade.id
    case 'updatedAt':
      // ISO文字列は辞書順がそのまま時系列順になる
      return a.updatedAt.localeCompare(b.updatedAt)
  }
}

/** ふりがな未登録は、昇順・降順のどちらでも末尾に置いている */
const compareMissingKana = (a: Student, b: Student, key: SortKey): number => {
  if (key !== 'kana' || (!a.kana && !b.kana)) return 0
  if (!a.kana) return 1
  if (!b.kana) return -1
  return 0
}

/** 組の未所属（null）は、同じ学年の中では末尾に置いている */
const classIdOf = (student: Student): number => student.class?.id ?? Number.MAX_SAFE_INTEGER

/**
 * 並び替えキーが同値だったときの並び。
 * この実装では名簿順（学校 → 学年 → 組 → 出席番号）にし、
 * それでも決まらない場合に ID で確定させている。
 */
const compareByRoster = (a: Student, b: Student): number =>
  a.school.id - b.school.id ||
  a.grade.id - b.grade.id ||
  classIdOf(a) - classIdOf(b) ||
  a.attendanceNumber - b.attendanceNumber ||
  a.id.localeCompare(b.id)

/**
 * 並び替えた一覧。元の配列は書き換えずコピーしてから sort する。
 * 降順にするのは並び替えキーだけで、同値のときの並びは向きを変えていない。
 */
const sortedStudents = computed(() => {
  const direction = sortOrder.value === 'asc' ? 1 : -1
  return [...students].sort(
    (a, b) =>
      compareMissingKana(a, b, sortKey.value) ||
      compareBySortKey(a, b, sortKey.value) * direction ||
      compareByRoster(a, b),
  )
})
</script>

<template>
  <section class="page">
    <StudentFilter v-model:sort-key="sortKey" v-model:sort-order="sortOrder" />

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">児童生徒一覧</h2>
        <p class="count">全 {{ students.length }} 件</p>
      </div>

      <StudentList :students="sortedStudents" />
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
