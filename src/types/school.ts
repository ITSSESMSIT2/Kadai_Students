import type { CodeName } from '@/types/common'

/** 学校 */
export type School = CodeName

/** 学年 */
export type Grade = CodeName

/** 組（class は予約語のため型名は SchoolClass） */
export type SchoolClass = CodeName

/** 学校に設置されている学年 */
export interface SchoolGrade {
  schoolId: number
  gradeId: number
}

/** 学校の学年に編成されている組 */
export interface SchoolGradeClass {
  schoolId: number
  gradeId: number
  classId: number
}
