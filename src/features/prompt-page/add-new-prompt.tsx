"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/ui/sheet";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ServerActionResponse } from "../common/server-action-response";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoadingIndicator } from "../ui/loading";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { addOrUpdatePrompt, promptStore, usePromptState } from "./prompt-store";

interface SliderProps {}

export const AddPromptSlider: FC<SliderProps> = (props) => {
  const initialState: ServerActionResponse | undefined = undefined;

  const { isOpened, prompt } = usePromptState();

  const [formState, formAction] = useFormState(addOrUpdatePrompt, initialState);

  const { data } = useSession();

  const PublicSwitch = () => {
    if (data === undefined || data === null) return null;

    // Prompt管理者にのみPublishスイッチを表示する
    if (data?.user?.isAdmin || data?.user?.isPromptAdmin) {
      return (
      <div className="flex items-center space-x-2">
        <Switch name="isPublished" defaultChecked={prompt.isPublished} />
        <Label htmlFor="description">Publish</Label>
      </div>
      );
    }
  };

  return (
    <Sheet
      open={isOpened}
      onOpenChange={(value) => {
        promptStore.updateOpened(value);
      }}
    >
      <SheetContent className="min-w-[480px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Prompt</SheetTitle>
        </SheetHeader>
        <form action={formAction} className="flex-1 flex flex-col">
          <ScrollArea
            className="flex-1 -mx-6 flex max-h-[calc(100vh-140px)]"
            type="always"
          >
            <div className="pb-6 px-6 flex gap-8 flex-col  flex-1">
              <input type="hidden" name="id" defaultValue={prompt.id} />
              {formState && formState.status === "OK" ? null : (
                <>
                  {formState &&
                    formState.errors.map((error, index) => (
                      <div key={index} className="text-red-500">
                        {error.message}
                      </div>
                    ))}
                </>
              )}
              <div className="grid gap-2">
                <Label>名前</Label>
                <Input
                  type="text"
                  required
                  name="name"
                  defaultValue={prompt.name}
                  placeholder="プロンプトの名前"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">プロンプト本文</Label>
                <Textarea
                  required
                  defaultValue={prompt.description}
                  name="description"
                  className="h-96"
                  placeholder="例：5歳の子供が理解できる面白いジョークを考えてください"
                />
              </div>
            </div>
          </ScrollArea>
          <SheetFooter className="py-2 flex sm:justify-between flex-row">
            <PublicSwitch /> <Submit />
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

function Submit() {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending} className="gap-2">
      <LoadingIndicator isLoading={status.pending} />
      保存
    </Button>
  );
}
