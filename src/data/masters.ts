/** 学校・学年・クラスなど、id と表示名の組。実際のAPIレスポンスに近い形にしている */
export interface CodeName {
  id: number
  name: string
}

/** 学校（絞り込みの選択肢） */
export const schools: CodeName[] = [
  { id: 101, name: '桜台第一小学校' },
  { id: 102, name: '北浜小学校' },
  { id: 103, name: '緑ヶ丘中学校' },
]

/** 学年（絞り込みの選択肢）。id は 小学1〜6年 = 1〜6、中学1〜3年 = 7〜9 の通し番号 */
export const grades: CodeName[] = [
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

/** クラス（絞り込みの選択肢） */
export const classes: CodeName[] = [
  { id: 201, name: 'Aクラス' },
  { id: 202, name: 'Bクラス' },
  { id: 203, name: 'Cクラス' },
]
