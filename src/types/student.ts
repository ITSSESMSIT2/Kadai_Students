import type { Grade, School, SchoolClass } from '@/types/school'

/** 児童生徒 */
export interface Student {
  /** ログインID。名.姓のローマ字（例 hina.sato） */
  id: string
  name: string
  /** ふりがな。未登録のレコードがある（空文字） */
  kana: string
  school: School
  grade: Grade
  /** 未所属のレコードがある（null） */
  class: SchoolClass | null
  attendanceNumber: number
  /** 要フォロー */
  needsFollow: boolean
  /** ISO文字列。表示するときは日付だけに整形する */
  updatedAt: string
}
