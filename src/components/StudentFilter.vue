<script setup lang="ts">
import { getSchools } from '@/api/schoolApi'
import { CLASSES } from '@/constants/classes'
import { GRADES } from '@/constants/grades'
import { SORT_KEYS, type SortKey, type SortOrder } from '@/constants/sort'
import type { StudentFilters } from '@/types/filter'

const schools = getSchools()

const filters = defineModel<StudentFilters>({ required: true })
const sortKey = defineModel<SortKey>('sortKey', { required: true })
const sortOrder = defineModel<SortOrder>('sortOrder', { required: true })

const emit = defineEmits<{ clear: [] }>()

const toggleOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="card">
    <h2 class="card-title">絞り込み条件</h2>

    <fieldset class="schools">
      <legend>学校（複数選択）</legend>
      <div class="checks">
        <label v-for="school in schools" :key="school.id" class="check">
          <input v-model="filters.schoolIds" type="checkbox" :value="school.id" />
          {{ school.name }}
        </label>
      </div>
    </fieldset>

    <div class="fields">
      <div class="field">
        <label for="filter-grade">学年</label>
        <select id="filter-grade" v-model="filters.gradeId">
          <option :value="null">すべて</option>
          <option v-for="grade in GRADES" :key="grade.id" :value="grade.id">
            {{ grade.name }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="filter-class">組</label>
        <select id="filter-class" v-model="filters.classId">
          <option :value="null">すべて</option>
          <option v-for="classRoom in CLASSES" :key="classRoom.id" :value="classRoom.id">
            {{ classRoom.name }}
          </option>
        </select>
      </div>

      <div class="field field-keyword">
        <label for="filter-keyword">フリーワード</label>
        <input
          id="filter-keyword"
          v-model="filters.keyword"
          type="search"
          placeholder="氏名・ふりがなで検索"
        />
      </div>
    </div>

    <div class="actions">
      <label class="toggle">
        <input v-model="filters.needsFollowOnly" type="checkbox" />
        <span class="track"></span>
        要フォローのみ表示
      </label>

      <div class="tools">
        <label for="filter-sort">並び替え</label>
        <select id="filter-sort" v-model="sortKey">
          <option v-for="key in SORT_KEYS" :key="key.value" :value="key.value">
            {{ key.label }}
          </option>
        </select>

        <button class="order" type="button" @click="toggleOrder">
          {{ sortOrder === 'asc' ? '昇順 ↑' : '降順 ↓' }}
        </button>
        <button class="clear" type="button" @click="emit('clear')">絞り込みをクリア</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}

.card-title {
  margin: 0 0 var(--space-md);
  font-size: 14px;
}

.schools {
  margin: 0 0 var(--space-md);
  padding: 0;
  border: none;
}

legend,
label {
  color: var(--text-sub);
  font-size: 12px;
}

legend {
  padding: 0;
  margin-bottom: var(--space-xs);
}

.checks {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}

.check input {
  width: 16px;
  height: 16px;
  accent-color: var(--primary);
  cursor: pointer;
}

.fields {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field-keyword {
  flex: 1 1 240px;
}

select,
input[type='search'] {
  padding: var(--space-sm);
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 13px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-md);
}

/* トグルスイッチ（チェックボックスを見た目だけ切り替える） */
.toggle {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.track {
  position: relative;
  width: 34px;
  height: 14px;
  background: var(--border);
  border-radius: 7px;
  transition: background 0.2s;
}

.track::after {
  position: absolute;
  top: -3px;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 50%;
  box-shadow: var(--elevation-1);
  transition: transform 0.2s;
  content: '';
}

.toggle input:checked + .track {
  background: rgb(from var(--primary) r g b / 50%);
}

.toggle input:checked + .track::after {
  background: var(--primary);
  border-color: var(--primary);
  transform: translateX(16px);
}

.toggle input:focus-visible + .track {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.tools {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.order,
.clear {
  padding: var(--space-sm) var(--space-md);
  color: var(--primary);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
}

.clear {
  border-color: var(--primary);
}
</style>
