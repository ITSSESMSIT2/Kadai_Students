# Kadai_Students（提出課題③ 児童生徒 検索アプリ）

学校・学年・組・氏名・要フォローの条件で児童生徒を絞り込んで探すアプリ。
通信は行わず、データは `src/data/students.ts` の配列（架空データ40件）を使う。

## 技術スタック

| 種別 | 使用技術 |
| --- | --- |
| フレームワーク | Vue 3（Composition API / `<script setup>`） |
| 言語 | TypeScript |
| ビルド | Vite |
| ルーティング | Vue Router |
| 静的解析 | ESLint / oxlint / Prettier |
| Node | 24.20.0（`.node-version` / `.nvmrc` で固定） |
| 公開 | GitHub Pages（main へのマージで GitHub Actions が自動デプロイ） |

## セットアップ

```bash
nvm use        # .nvmrc の 24.20.0 に切り替える
yarn install
```

## 開発コマンド

| コマンド | 内容 |
| --- | --- |
| `yarn dev` | 開発サーバーを起動する |
| `yarn build` | 本番ビルド（型チェック込み） |
| `yarn preview` | ビルド結果をローカルで確認する |
| `yarn type-check` | 型チェックのみ |
| `yarn lint` | ESLint + oxlint |
| `yarn format` | Prettier で整形する |

## リポジトリ構成

```
.github/workflows/deploy.yml   main へのpushでビルドしGitHub Pagesへ公開
src/
  api/schoolApi.ts             getSchools() / getGrades() / getClasses()
  api/studentApi.ts            getStudents()
  assets/styles/tokens.css     デザイントークン（色・余白・角丸・影）
  assets/main.css              トークンの読み込みと最小限のベーススタイル
  components/AppHeader.vue     共通ヘッダー
  components/StudentFilter.vue 絞り込み条件と並び替えの操作パネル
  components/StudentList.vue   一覧のテーブル
  components/StudentRow.vue    一覧の1行
  composables/useStudentSearch.ts  絞り込み・並び替えのロジック
  constants/classes.ts         組の選択肢（固定値）
  constants/grades.ts          学年の選択肢（固定値）
  constants/sort.ts            並び替えキーの選択肢
  data/schools.ts              学校3件
  data/schoolGrades.ts         学校に設置されている学年（15件）
  data/schoolGradeClasses.ts   学校の学年ごとのクラス編成（35件）
  data/students.ts             児童生徒40件（架空データ）
  router/index.ts              ルーティング
  types/                       common.ts / school.ts / student.ts / filter.ts
  utils/format.ts              日付の整形
  views/HomeView.vue           トップページ
  views/StudentsView.vue       検索ページ
  views/NotFoundView.vue       404ページ
```

## スタイルの決まり

- 色・余白・角丸・影は `src/assets/styles/tokens.css` のCSS変数を `var(--…)` で参照する。値を直書きしない
- コンポーネントのスタイルは `<style scoped>` に閉じる

## 公開フロー

main にマージされると `.github/workflows/deploy.yml` が動き、ビルド結果が GitHub Pages に公開される。
サブパス配信のため `vite.config.ts` でビルド時のみ `base` を設定し、直リンクで404にならないよう `404.html` を生成している。

## 機能概要

2ページ構成のアプリ。

| URL | 画面 | 内容 |
| --- | --- | --- |
| `/` | トップ | 検索ページへの導線のみ |
| `/students` | 検索 | 絞り込み・並び替え・一覧 |
| 上記以外 | 404 | トップへ戻るリンク |

検索ページでできること。

- **絞り込み**：学校（複数選択）／学年／組／フリーワード（氏名・ふりがなの部分一致）／要フォローのみ表示。条件どうしはANDで、学校の複数選択だけ選んだ中でORになる。未選択・未入力・OFFの条件は絞り込みに使わない
- **連動する選択肢**：学年の候補は選んだ学校に設置されている学年、組の候補はその学校・学年に編成されている組に絞られる。学校を複数選んだときは和集合
- **並び替え**：ふりがな／学年／更新日の3キー × 昇順・降順
- **件数表示**：「該当 N 件 ・ 全 M 件」
- **空状態**：該当0件のときはテーブルごと消し、条件を変える案内を出す
- **絞り込みをクリア**：フィルタ条件だけを初期値に戻す（並び替えは保持する）

## 工夫した点

**データの入手経路を画面から隠した。**
`src/api/` に `getStudents()` / `getSchools()` を置き、コンポーネントは `data/` を直接見ない。
いまは配列を同期で返すだけ。通信に差し替えるときは関数の中を変えるほか、呼び出し側で loading / error を持たせ、`await` で待つ形にする必要がある。

**選択肢の候補は、在籍者から逆引きしていない。**
学年の候補は `schoolGrades`（学校に設置されている学年）、組の候補は `schoolGradeClasses`（学校の学年ごとのクラス編成）から決まる。
一覧に出ている40人から学年名・組名を集める作りにすると、「在籍者がいない学年は選べない」という別物になってしまう。
実際のAPI（`GET /api/v1/grades?school_id=…`）が答えているのは設置学年なので、データもその形で持たせた。
桜台第一小学校の1年C組は在籍者ゼロだが、設置されているので候補に出る。

**増減するものと、しないものを分けた。**
学校は施設なので増減する想定で `api/`。学年（小学1年〜中学3年）と組（A〜C）は増減しない選択肢なので `constants/`。
「マスタ」という曖昧な箱にまとめず、性質で置き場所を決めた。

**絞り込みと並び替えを2段の `computed` にした。**
`filteredStudents` → `sortedStudents` の順で派生させ、元の配列は `[...filteredStudents.value]` とコピーしてから `sort` する。
元配列を直接 `sort` すると並び替えるたびに元の順序が失われる。

**同値のときの並びを自分で決めた。**
並び替えキーが同値になったら、名簿順（学校 → 学年 → 組 → 出席番号）で並べ、それでも決まらなければ ID で確定させている。
降順にするのは並び替えキーだけで、名簿順は常に同じ向き。「更新日が新しい順、同じ日なら名簿順」と読める並びにしたかったため。

**比較は id、表示は name に統一した。**
学年を `name` で比較すると「中学1年」と「小学1年」が辞書順に並び、学齢順にならない。
学年IDを 小学1〜6年＝1〜6、中学1〜3年＝7〜9 の通し番号にしてあるので、`grade.id` で比較すれば学齢順になる。

**欠損データを表示と並びの両方でガードした。**
ふりがな未登録は「（未登録）」、組の未所属（`null`）は「—」と表示する。
並び替えでも、ふりがな未登録は昇順・降順のどちらでも末尾に、組の未所属は同じ学年の中で末尾に置いている。

**絞り込み条件を1つのオブジェクトにまとめた。**
`StudentFilters` 型に5項目を持たせたので、クリアは `filters.value = emptyFilters()` の1行で済む。
個別の `ref` に散らすと、条件が増えるたびにクリア処理の修正漏れが起きる。

**ロジックを composable に切り出した。**
`useStudentSearch()` に状態と絞り込み・並び替えを閉じ込め、`StudentsView.vue` の `<script setup>` は7行になった。
比較関数は状態に依存しない純粋な関数なので、composable の外（モジュールのトップレベル）に置いて呼び出しごとの再生成を避けている。

## 詰まった点・調べたこと

**学年で並べたら、同じ学年の中が Bクラス → Aクラス → Cクラス になった。**
ランダムに見えたが、`src/data/students.ts` の記載順と完全に一致していた。
ES2019以降 `Array.prototype.sort` は安定ソートであることが仕様で保証されており、比較関数が `0` を返したペアは元の配列の順序が保たれる。
第2ソートを書いていなかったので、**データファイルの行順がそのまま画面に出ていた**。名簿順を定義して解決した。

**組の未所属を末尾へ送るのに `Infinity` を使ったら並びが壊れた。**
両方とも未所属のとき `Infinity - Infinity` が `NaN` になり、比較関数が `NaN` を返すと並び順が不定になる。
`Number.MAX_SAFE_INTEGER` に変えて解決した（同値なら `0` になる）。

**`interface School extends CodeName {}` が lint エラーになった。**
`@typescript-eslint/no-empty-object-type`（中身のないinterfaceはsupertypeと同じ）。
型エイリアス `export type School = CodeName` に変更した。将来フィールドが増えたら interface に戻すか、交差型で足す。

**`defineModel` でオブジェクトを受けたとき、ネストしたプロパティの変更は `update:modelValue` を発火しない。**
親と同じオブジェクトを共有しているため画面は更新されるが、親が `computed` で値を渡している場合は動かない。
親が `ref` で持っている前提の書き方であることを理解して使っている。

**GitHub Pages はサブパス配信なので、そのままではJS/CSSが404になる。**
`vite.config.ts` でビルド時のみ `base: '/Kadai_Students/'` を設定した。
加えて、`/students` に直接アクセスすると Pages 側にファイルが無いため404になるので、ビルド後に `index.html` を `404.html` としてコピーし、どのURLでもアプリが起動するようにしている。
