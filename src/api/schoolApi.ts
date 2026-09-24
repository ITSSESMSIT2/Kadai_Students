import { CLASSES } from '@/constants/classes'
import { GRADES } from '@/constants/grades'
import { schoolGradeClasses } from '@/data/schoolGradeClasses'
import { schoolGrades } from '@/data/schoolGrades'
import { schools } from '@/data/schools'
import type { Grade, School, SchoolClass } from '@/types/school'

/**
 * 学校の一覧を取得する。
 *
 * 実際の案件では `GET /api/v1/schools` のレスポンスを返す関数にあたる。
 * この課題ではAPIを使わないため、コード内の配列をそのまま返している。
 */
export const getSchools = (): School[] => schools

/** 学校を指定していないときは全校を対象にする */
const matchesSchool = (schoolIds: number[], schoolId: number): boolean =>
  schoolIds.length === 0 || schoolIds.includes(schoolId)

/**
 * 学校に設置されている学年の一覧を取得する（`GET /api/v1/grades?school_id=…` 相当）。
 *
 * 学校を複数指定したときは和集合を返す。絞り込みで学校をORで結合しているため、
 * 学年の候補もどれかの学校に設置されていれば残す。
 */
export const getGrades = (schoolIds: number[] = []): Grade[] => {
  const installed = new Set(
    schoolGrades.filter((row) => matchesSchool(schoolIds, row.schoolId)).map((row) => row.gradeId),
  )
  return GRADES.filter((grade) => installed.has(grade.id))
}

/**
 * 学校の学年に編成されている組の一覧を取得する
 * （`GET /api/v1/classes?school_id=…&grade_id=…` 相当）。
 *
 * 学年を指定しないときは、その学校の全学年に編成されている組の和集合を返す。
 */
export const getClasses = (schoolIds: number[] = [], gradeId: number | null = null): SchoolClass[] => {
  const organized = new Set(
    schoolGradeClasses
      .filter((row) => matchesSchool(schoolIds, row.schoolId))
      .filter((row) => gradeId === null || row.gradeId === gradeId)
      .map((row) => row.classId),
  )
  return CLASSES.filter((classRoom) => organized.has(classRoom.id))
}
