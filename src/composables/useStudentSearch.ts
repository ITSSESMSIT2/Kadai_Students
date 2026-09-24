import { computed, ref, watch } from 'vue'
import { getClasses, getGrades } from '@/api/schoolApi'
import { getStudents } from '@/api/studentApi'
import type { SortKey, SortOrder } from '@/constants/sort'
import type { StudentFilters } from '@/types/filter'
import type { Student } from '@/types/student'

/** 絞り込み条件の初期値。クリアでもこれに戻す */
const emptyFilters = (): StudentFilters => ({
  schoolIds: [],
  gradeId: null,
  classId: null,
  keyword: '',
  needsFollowOnly: false,
})

/** 氏名・ふりがなの部分一致。前後の空白と大文字小文字は無視する */
const matchesKeyword = (student: Student, keyword: string): boolean => {
  const needle = keyword.trim().toLowerCase()
  return student.name.toLowerCase().includes(needle) || student.kana.toLowerCase().includes(needle)
}

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
 * 児童生徒の絞り込みと並び替えをまとめた composable。
 */
export const useStudentSearch = () => {
  const students = getStudents()

  const filters = ref<StudentFilters>(emptyFilters())
  const sortKey = ref<SortKey>('kana')
  const sortOrder = ref<SortOrder>('asc')

  /**
   * 絞り込んだ一覧。条件どうしはANDで、学校の複数選択だけ選んだ中でORになる。
   * 未選択・未入力・OFFの条件は絞り込みに使わない。
   */
  const filteredStudents = computed(() =>
    students.filter((student) => {
      const { schoolIds, gradeId, classId, keyword, needsFollowOnly } = filters.value
      if (schoolIds.length > 0 && !schoolIds.includes(student.school.id)) return false
      if (gradeId !== null && student.grade.id !== gradeId) return false
      if (classId !== null && student.class?.id !== classId) return false
      if (needsFollowOnly && !student.needsFollow) return false
      if (keyword.trim() !== '' && !matchesKeyword(student, keyword)) return false
      return true
    }),
  )

  /**
   * 絞り込んだ結果を並び替えた一覧。元の配列は書き換えずコピーしてから sort する。
   * 降順にするのは並び替えキーだけで、同値のときの並びは向きを変えていない。
   */
  const sortedStudents = computed(() => {
    const direction = sortOrder.value === 'asc' ? 1 : -1
    return [...filteredStudents.value].sort(
      (a, b) =>
        compareMissingKana(a, b, sortKey.value) ||
        compareBySortKey(a, b, sortKey.value) * direction ||
        compareByRoster(a, b),
    )
  })

  /** 学年の選択肢。選択中の学校に設置されている学年（複数選択なら和集合） */
  const availableGrades = computed(() => getGrades(filters.value.schoolIds))

  /** 組の選択肢。選択中の学校に設置されている組 */
  const availableClasses = computed(() => getClasses(filters.value.schoolIds, filters.value.gradeId))

  // 選択肢から外れた値だけを解除する（候補に残っていれば選択は維持する）。
  // 状態を書き換える副作用なので computed では書けず、watch を使う場面にあたる。
  watch(availableGrades, (grades) => {
    const { gradeId } = filters.value
    if (gradeId !== null && !grades.some((grade) => grade.id === gradeId)) {
      filters.value.gradeId = null
    }
  })
  watch(availableClasses, (classes) => {
    const { classId } = filters.value
    if (classId !== null && !classes.some((classRoom) => classRoom.id === classId)) {
      filters.value.classId = null
    }
  })

  /** 絞り込み条件だけを初期値に戻す（並び替えは保持する） */
  const clearFilters = () => {
    filters.value = emptyFilters()
  }

  return {
    students,
    filters,
    sortKey,
    sortOrder,
    availableGrades,
    availableClasses,
    filteredStudents,
    sortedStudents,
    clearFilters,
  }
}
