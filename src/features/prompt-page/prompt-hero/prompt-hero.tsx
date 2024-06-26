"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Book, BookImage, NotebookPen } from "lucide-react";
import { promptStore } from "../prompt-store";

export const PromptHero = () => {
  return (
    <Hero
      title={
        <>
          <Book size={36} strokeWidth={1.5} /> Prompt Library
        </>
      }
      description={
        `プロンプトテンプレートは、ユーザーが新しいアイデアを生み出す際に役立つヒントや質問です。
プロンプトテンプレートの追加は管理者のみが行えます。
        `
      }
    >
      <HeroButton
        title="新しいプロンプトを追加"
        description="独自のプロンプトテンプレートを作成する"
        icon={<Book />}
        onClick={() => promptStore.newPrompt()}
      />
      <HeroButton
        title="夢幻的な街"
        description="ミニチュアでカラフルな街の画像"
        icon={<BookImage />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: "夢幻的な街",
            description:
              "カラフルな建物と緑の木々があるミニチュアの街を作成します。画像の中心には[iconic building]があり、周囲にはぼやけた背景と多くの[Native tree name]の木があります。画像は夢幻的で夢のような雰囲気があり、浅い被写界深度と高い視点で撮影されています。街はおもちゃやモデルのように見え、さまざまなスタイルと形の建物があります。",
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
      <HeroButton
        title="問題の構成"
        description="新製品の問題の構成"
        icon={<NotebookPen />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: "問題の構成",
            description: `
以下の問題文を考慮してください：
[問題文]

次のポイントを含む応答を生成してください：
1. 問題の構成
2. 解決策の概要と推奨事項
3. 推奨されるMVPの範囲をリストアップ
4. ユーザーの採用を確実にする方法
5. 成功を測定する方法
8. 類似製品をリストアップ
9. 潜在的なスポンサーの質問（5つの質問）
              `,
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
    </Hero>
  );
};
