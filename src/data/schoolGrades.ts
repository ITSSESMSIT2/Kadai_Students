import type { SchoolGrade } from '@/types/school'

/** 学校に設置されている学年。GET /api/v1/grades?school_id=… が参照する想定のデータ */
export const schoolGrades: SchoolGrade[] = [
  { schoolId: 101, gradeId: 1 },
  { schoolId: 101, gradeId: 2 },
  { schoolId: 101, gradeId: 3 },
  { schoolId: 101, gradeId: 4 },
  { schoolId: 101, gradeId: 5 },
  { schoolId: 101, gradeId: 6 },
  { schoolId: 102, gradeId: 1 },
  { schoolId: 102, gradeId: 2 },
  { schoolId: 102, gradeId: 3 },
  { schoolId: 102, gradeId: 4 },
  { schoolId: 102, gradeId: 5 },
  { schoolId: 102, gradeId: 6 },
  { schoolId: 103, gradeId: 7 },
  { schoolId: 103, gradeId: 8 },
  { schoolId: 103, gradeId: 9 },
]
