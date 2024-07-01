import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PromptModel } from "./models";
import { PromptCardContextMenu } from "./prompt-card-context-menu";
import { GlobeIcon, UserIcon } from "lucide-react";

interface Props {
  prompt: PromptModel;
  showContextMenu: boolean;
}

export const PromptCard: FC<Props> = (props) => {
  const { prompt } = props;
  return (
    <Card key={prompt.id} className="flex flex-col">
      <CardHeader className="flex flex-row items-center">
        {prompt.isPublished
          ? <GlobeIcon size={20} className="mr-2" />
          : <UserIcon size={20} className="mr-2" />
        }
        <CardTitle className="flex-1 flex item-center">{prompt.name}</CardTitle>

        {props.showContextMenu && (
          <div>
            <PromptCardContextMenu prompt={prompt} />
          </div>
        )}
      
      </CardHeader>
      <CardContent className="text-muted-foreground flex-1">
        {prompt.description.length > 100
          ? prompt.description.slice(0, 100).concat("...")
          : prompt.description}
      </CardContent>
    </Card>
  );
};
