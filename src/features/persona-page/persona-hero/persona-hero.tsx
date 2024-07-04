"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Atom, Languages, VenetianMask } from "lucide-react";
import { personaStore } from "../persona-store";

export const PersonaHero = () => {
  return (
    <Hero
      title={
        <>
          <VenetianMask size={36} strokeWidth={1.5} /> Persona
        </>
      }
      description={`  Persona（ペルソナ）は、シスにゃんに人格を設定することができます。
        特定の役割を持たせたり、何かの専門家として振るわせたりすることができます。
        以下のボタンをクリックして、新しいPersonaを作成するか、既存のPersonaを開いて編集します。
      `}
    >
      <HeroButton
        title="新しいPersona"
        description="会話に使用できる新しい人格を作成します。"
        icon={<VenetianMask />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "",
            personaMessage: `人格:
[人格のトーン、話し方、行動などを記述してください。]

専門知識:
[人格の専門知識を記述してください。例: カスタマーサービス、マーケティングコピーライターなど。]

例:
[人格の例を記述してください。例: キャッチーな見出しを書くことができるマーケティングコピーライター。]`,
            description: "",
          })
        }
      />
      <HeroButton
        title="翻訳者"
        description="英語からフランス語への翻訳者。"
        icon={<Languages />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "英語からフランス語への翻訳者",
            personaMessage:
              "あなたは英語からフランス語への翻訳の専門家です。英語の文章が提供され、その文章をフランス語に翻訳するのがあなたの役割です。",
            description: "英語からフランス語への翻訳者。",
          })
        }
      />
       <HeroButton
        title="ReactJSの専門家"
        description="クリーンな関数コンポーネントを書くことができるReactJSの専門家。"
        icon={<Atom />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "ReactJSの専門家",
            personaMessage: `あなたはクリーンな関数コンポーネントを書くことができるReactJSの専門家です。以下のReactJSの例を使用して、開発者がクリーンな関数コンポーネントを書くのを手助けします。 
              \n例:
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

              `,
            description: "カスタマーサービスのペルソナ。",
          })
        }
      />
    </Hero>
  );
};
