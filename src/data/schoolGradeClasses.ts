import type { SchoolGradeClass } from '@/types/school'

/**
 * 学校の学年ごとのクラス編成。
 * GET /api/v1/classes?school_id=…&grade_id=… が参照する想定のデータ。
 * 学年によって組数が違う（例: 桜台第一小学校の1年はA〜C、2年以降はA・B）。
 */
export const schoolGradeClasses: SchoolGradeClass[] = [
  { schoolId: 101, gradeId: 1, classId: 201 },
  { schoolId: 101, gradeId: 1, classId: 202 },
  { schoolId: 101, gradeId: 1, classId: 203 },
  { schoolId: 101, gradeId: 2, classId: 201 },
  { schoolId: 101, gradeId: 2, classId: 202 },
  { schoolId: 101, gradeId: 3, classId: 201 },
  { schoolId: 101, gradeId: 3, classId: 202 },
  { schoolId: 101, gradeId: 4, classId: 201 },
  { schoolId: 101, gradeId: 4, classId: 202 },
  { schoolId: 101, gradeId: 5, classId: 201 },
  { schoolId: 101, gradeId: 5, classId: 202 },
  { schoolId: 101, gradeId: 6, classId: 201 },
  { schoolId: 101, gradeId: 6, classId: 202 },
  { schoolId: 102, gradeId: 1, classId: 201 },
  { schoolId: 102, gradeId: 1, classId: 202 },
  { schoolId: 102, gradeId: 2, classId: 201 },
  { schoolId: 102, gradeId: 2, classId: 202 },
  { schoolId: 102, gradeId: 2, classId: 203 },
  { schoolId: 102, gradeId: 3, classId: 201 },
  { schoolId: 102, gradeId: 3, classId: 202 },
  { schoolId: 102, gradeId: 4, classId: 201 },
  { schoolId: 102, gradeId: 4, classId: 202 },
  { schoolId: 102, gradeId: 5, classId: 201 },
  { schoolId: 102, gradeId: 5, classId: 202 },
  { schoolId: 102, gradeId: 6, classId: 201 },
  { schoolId: 102, gradeId: 6, classId: 202 },
  { schoolId: 103, gradeId: 7, classId: 201 },
  { schoolId: 103, gradeId: 7, classId: 202 },
  { schoolId: 103, gradeId: 7, classId: 203 },
  { schoolId: 103, gradeId: 8, classId: 201 },
  { schoolId: 103, gradeId: 8, classId: 202 },
  { schoolId: 103, gradeId: 8, classId: 203 },
  { schoolId: 103, gradeId: 9, classId: 201 },
  { schoolId: 103, gradeId: 9, classId: 202 },
  { schoolId: 103, gradeId: 9, classId: 203 },
]
