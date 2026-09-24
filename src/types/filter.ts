/** 絞り込み条件。未選択・未入力の項目はその条件で絞り込まない */
export interface StudentFilters {
  /** 選択した学校のid。空配列なら学校では絞り込まない（選んだ学校どうしはOR） */
  schoolIds: number[]
  /** 選択した学年のid。null なら絞り込まない */
  gradeId: number | null
  /** 選択した組のid。null なら絞り込まない */
  classId: number | null
  /** 氏名・ふりがなの部分一致。空文字なら絞り込まない */
  keyword: string
  /** true のときだけ要フォローに絞り込む（false は「絞り込まない」） */
  needsFollowOnly: boolean
}
