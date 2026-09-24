import { schools } from '@/data/schools'
import type { School } from '@/types/school'

/**
 * 学校の一覧を取得する。
 *
 * 実際の案件では `GET /api/v1/schools` のレスポンスを返す関数にあたる。
 * この課題ではAPIを使わないため、コード内の配列をそのまま返している。
 * 学年・組は増減しない固定の選択肢なので、APIではなく src/constants/ に置いている。
 */
export const getSchools = (): School[] => schools
