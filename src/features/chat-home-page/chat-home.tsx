// ホーム画面のコンポーネント
// ホーム画面には、AIの説明、拡張機能、ペルソナの一覧が表示される
import { AddExtension } from "@/features/extensions-page/add-extension/add-new-extension";
import { ExtensionCard } from "@/features/extensions-page/extension-card/extension-card";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { PersonaCard } from "@/features/persona-page/persona-card/persona-card";
import { PersonaModel } from "@/features/persona-page/persona-services/models";
import { AI_DESCRIPTION, AI_NAME } from "@/features/theme/theme-config";
import { Hero } from "@/features/ui/hero";
import { ScrollArea } from "@/features/ui/scroll-area";
import Image from "next/image";
import { FC } from "react";
import { MessageCircle, PocketKnife, VenetianMask } from "lucide-react";
import { CreateChatAndRedirect } from "../chat-page/chat-services/chat-thread-service";
import { NewChat } from "../chat-page/chat-menu/new-chat";

interface ChatPersonaProps {
  personas: PersonaModel[];
  extensions: ExtensionModel[];
}

export const ChatHome: FC<ChatPersonaProps> = (props) => {
  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col gap-6 pb-6">
        <Hero
          title={
            <>
              <Image
                src={"/ai-icon.png"}
                width={60}
                height={60}
                quality={100}
                alt="ai-icon"
              />{" "}
              {AI_NAME}
              <span className="text-muted-foreground text-sm">Powered by GPT-4o</span>
            </>
          }
          description={AI_DESCRIPTION}
        ></Hero>

        <div className="container max-w-4xl flex gap-20 flex-col">

          <div>
            <h2 className="flex flex-row text-2xl font-bold mb-3">
              <MessageCircle className="mr-2" />New Chat
              <span className="flex items-end text-muted-foreground text-sm ml-2">新規チャットをはじめる</span>
            </h2>
            <h3 className="text-muted-foreground text-sm my-2">拡張機能やペルソナを使用しない標準のチャットです。</h3>
              <form action={CreateChatAndRedirect} className="flex gap-2 pr-3">
                <NewChat />
              </form>
          </div>

          <div>
            <h2 className="flex flex-row text-2xl font-bold mb-3">
              <PocketKnife className="mr-2" />Extentions
              <span className="flex items-end text-muted-foreground text-sm ml-2">拡張機能からチャットをはじめる</span>
            </h2>
            <h3 className="text-muted-foreground text-sm my-2">拡張機能を使うと、機能を追加したAIとチャットができます。</h3>
            {props.extensions && props.extensions.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {props.extensions.map((extension) => {
                  return (
                    <ExtensionCard
                      extension={extension}
                      key={extension.id}
                      showContextMenu={false}
                    />
                  );
                })}
              </div>
            ) :
              <p className="text-muted-foreground max-w-xl">No extentions created</p>
            }

          </div>

          <div>
            <h2 className="flex flex-row text-2xl font-bold mb-3 ">
              <VenetianMask className="mr-2" />Personas
              <span className="flex items-end text-muted-foreground text-sm ml-2">ペルソナからチャットをはじめる</span>
            </h2>
            <h3 className="flex text-muted-foreground text-sm my-2">ペルソナを使うと、AIに役割や人格を与えることができます。</h3>

            {props.personas && props.personas.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {props.personas.map((persona) => {
                  return (
                    <PersonaCard
                      persona={persona}
                      key={persona.id}
                      showContextMenu={false}
                    />
                  );
                })}
              </div>
            ) :
              <p className="text-muted-foreground max-w-xl">No personas created</p>
            }
          </div>
        </div>
        <AddExtension />
      </main>
    </ScrollArea>
  );
};
