import type { Grade } from '@/types/school'

/**
 * 学年。アプリ内で固定の選択肢として持つ。
 * id は 小学1〜6年 = 1〜6、中学1〜3年 = 7〜9 の通し番号で、並び替えにはこの id を使う
 */
export const GRADES: Grade[] = [
  { id: 1, name: '小学1年' },
  { id: 2, name: '小学2年' },
  { id: 3, name: '小学3年' },
  { id: 4, name: '小学4年' },
  { id: 5, name: '小学5年' },
  { id: 6, name: '小学6年' },
  { id: 7, name: '中学1年' },
  { id: 8, name: '中学2年' },
  { id: 9, name: '中学3年' },
]
