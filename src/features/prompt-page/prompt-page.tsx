import { FC } from "react";

import { DisplayError } from "../ui/error/display-error";
import { ScrollArea } from "../ui/scroll-area";
import { AddPromptSlider } from "./add-new-prompt";
import { PromptCard } from "./prompt-card";
import { PromptHero } from "./prompt-hero/prompt-hero";
import { FindAllPrompts, FindAllPromptsForCurrentUser } from "./prompt-service";
import { getCurrentUser } from "@/features/auth-page/helpers";

interface ChatSamplePromptProps {}

export const ChatSamplePromptPage: FC<ChatSamplePromptProps> = async (
  props
) => {
  // isAdmin または isPromptAdminの場合、全てのPromptを取得する
  // そうでない場合は、自分のと公開されたPromptのみ取得する
  const user = await getCurrentUser();
  let promptsResponse = null;

  if (user.isAdmin || user.isPromptAdmin) {
    // 全てのPromptを取得する
    promptsResponse = await FindAllPrompts();
  } else {
    // 自分のPromptと公開されたPromptを取得する
    promptsResponse = await FindAllPromptsForCurrentUser();
  }

  if (promptsResponse.status !== "OK") {
    return <DisplayError errors={promptsResponse.errors} />;
  }

  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col">
        <PromptHero />
        <div className="container max-w-4xl py-3">
          <div className="grid grid-cols-3 gap-3">
            {promptsResponse.response.map((prompt) => {
              return (
                <PromptCard prompt={prompt} key={prompt.id} showContextMenu />
              );
            })}
          </div>
        </div>
        <AddPromptSlider />
      </main>
    </ScrollArea>
  );
};
