/** ISO文字列を日付だけに整形する（例 2026-09-30T12:00:00+09:00 → 2026/09/30） */
export const formatDate = (iso: string): string => {
  const date = new Date(iso)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}/${month}/${day}`
}
