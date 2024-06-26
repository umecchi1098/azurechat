import { DefaultSession } from "next-auth";

// https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: boolean;
      isPromptAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface Token {
    isAdmin: boolean;
    isPromptAdmin: boolean;
  }

  interface User {
    isAdmin: boolean;
    isPromptAdmin: boolean;
  }
}
