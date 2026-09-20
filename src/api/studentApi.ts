import { students } from '@/data/students'
import type { Student } from '@/data/students'

/**
 * 児童生徒の一覧を取得する。
 *
 * 実際の案件では `GET /api/v1/students` のレスポンスを返す関数にあたる。
 * この課題ではAPIを使わないため、コード内の配列をそのまま返す。
 */
export const getStudents = (): Student[] => students
