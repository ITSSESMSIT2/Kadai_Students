import type { CodeName } from '@/types/common'
import type { Grade, SchoolClass } from '@/types/school'

/** 児童生徒 */
export interface Student {
  /** ログインID。名.姓のローマ字（例 hina.sato）。一覧の先頭列に出し、v-for の :key にも使う */
  id: string
  name: string
  /** ふりがな。未登録のレコードがある（空文字） */
  kana: string
  /** 一覧のレスポンスに入るのは id と名前だけ。設置学年などは学校マスタが持つ */
  school: CodeName
  grade: Grade
  /** 未所属のレコードがある（null） */
  class: SchoolClass | null
  attendanceNumber: number
  /** 要フォロー */
  needsFollow: boolean
  /** ISO文字列。表示するときは日付だけに整形する */
  updatedAt: string
}
