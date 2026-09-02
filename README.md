# Kadai_Students（提出課題③ 児童生徒 検索アプリ）

学校・学年・組・氏名・要フォローの条件で児童生徒を絞り込んで探すアプリ。
APIは使わず、データは `src/data/students.ts` の配列（架空データ40件）を使う。

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
.github/workflows/deploy.yml  main へのpushでビルドしGitHub Pagesへ公開
src/
  assets/styles/tokens.css    デザイントークン（色・余白・角丸・影）
  assets/main.css             トークンの読み込みと最小限のベーススタイル
  components/                 コンポーネント
  data/masters.ts             学校・学年・クラスのマスタ（絞り込みの選択肢）
  data/students.ts            児童生徒データ（架空・40件）
  router/index.ts             ルーティング
  views/                      ページ
```

## スタイルの決まり

- 色・余白・角丸・影は `src/assets/styles/tokens.css` のCSS変数を `var(--…)` で参照する。値を直書きしない
- コンポーネントのスタイルは `<style scoped>` に閉じる

## 公開フロー

main にマージされると `.github/workflows/deploy.yml` が動き、ビルド結果が GitHub Pages に公開される。
サブパス配信のため `vite.config.ts` でビルド時のみ `base` を設定し、直リンクで404にならないよう `404.html` を生成している。

## 機能概要

<!-- TODO: 何ができるアプリか、画面と操作を書く -->

## 工夫した点

<!-- TODO: 設計上の判断や、なぜその書き方にしたかを書く -->

## 詰まった点・調べたこと

<!-- TODO: つまずいた箇所と、どう調べて解決したかを書く -->
