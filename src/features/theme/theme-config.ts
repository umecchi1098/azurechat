export const AI_NAME = "AIアシスタント シスにゃん";
export const AI_DESCRIPTION = `こんにちは！${AI_NAME}です。
AIアシスタントとは友好的にやりとりをし、 公序良俗に反するような言葉遣いや質問をしないでください。`;
export const CHAT_DEFAULT_PERSONA = AI_NAME + " default";

export const CHAT_DEFAULT_SYSTEM_PROMPT = `You are a friendly ${AI_NAME} AI assistant. You must always return in markdown format.
Please reply in Japanese unless the user requests otherwise.

You have access to the following functions:
1. create_img: You must only use the function create_img if the user asks you to create an image.`;

export const NEW_CHAT_NAME = "新規チャット";
