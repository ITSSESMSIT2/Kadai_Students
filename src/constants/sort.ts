/** 並び替えのキー */
export type SortKey = 'kana' | 'grade' | 'updatedAt'

/** 並び順 */
export type SortOrder = 'asc' | 'desc'

/** 並び替えの選択肢 */
export const SORT_KEYS: { value: SortKey; label: string }[] = [
  { value: 'kana', label: 'ふりがな' },
  { value: 'grade', label: '学年' },
  { value: 'updatedAt', label: '更新日' },
]
