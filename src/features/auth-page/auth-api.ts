import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { Provider } from "next-auth/providers/index";
import { hashValue } from "./helpers";

const configureIdentityProvider = () => {
  const providers: Array<Provider> = [];

  const adminEmails = process.env.ADMIN_EMAIL_ADDRESS?.split(",").map((email: string) =>
    email.toLowerCase().trim()
  );

  // プロンプト管理者のメールアドレスは、ユーザーが自分のメールアドレスでサインインし、
  // メールアドレスがプロンプト管理者のメールアドレスと一致する場合に自動的に管理者アクセスが付与されるように使用されます
  const promptAdminEmails = process.env.PROMPT_ADMIN_EMAIL_ADDRESS?.split(",").map((email: string) =>
    email.toLowerCase().trim()
  );


  // GitHub認証を選択した場合、環境変数に設定されたクライアントIDとクライアントシークレットを使用してプロバイダーを構成します
  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
        async profile(profile: any) {
          const image = await fetchProfilePicture(profile.avatar_url, null);
          const newProfile: any = {
            ...profile,
            isAdmin:
              adminEmails?.includes(profile.email?.toLowerCase?.() ?? ""),
            isPromptAdmin:
              promptAdminEmails?.includes(profile.email?.toLowerCase?.() ?? ""),
            image,
          };
          return newProfile;
        },
      })
    );
  }

  // Azure AD認証を選択した場合、環境変数に設定されたクライアントID、クライアントシークレット、テナントIDを使用してプロバイダーを構成します
  if (
    process.env.AZURE_AD_CLIENT_ID &&
    process.env.AZURE_AD_CLIENT_SECRET &&
    process.env.AZURE_AD_TENANT_ID
  ) {
    providers.push(
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID!,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
        tenantId: process.env.AZURE_AD_TENANT_ID!,
        authorization: {
          params: {
            scope: "openid profile User.Read",
          },
        },
        async profile(profile: any, tokens: any) {
          const email = profile.email || profile.preferred_username || "";
          const image = await fetchProfilePicture(
            `https://graph.microsoft.com/v1.0/me/photos/48x48/$value`,
            tokens?.access_token
          );
          const newProfile: any = {
            ...profile,
            email,
            id: profile.sub,
            isAdmin:
              adminEmails?.includes(profile.email?.toLowerCase?.() ?? "") ||
              adminEmails?.includes(profile.preferred_username?.toLowerCase?.() ?? ""),
            isPromptAdmin:
              promptAdminEmails?.includes(profile.email?.toLowerCase?.() ?? "") ||
              promptAdminEmails?.includes(profile.preferred_username?.toLowerCase?.() ?? ""),
            image,
          };
          return newProfile;
        },
      })
    );
  }

  // If we're in local dev, add a basic credential provider option as well
  // (Useful when a dev doesn't have access to create app registration in their tenant)
  // This currently takes any username and makes a user with it, ignores password
  // Refer to: https://next-auth.js.org/configuration/providers/credentials
  if (process.env.NODE_ENV === "development") {
    providers.push(
      CredentialsProvider({
        name: "localdev",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "dev" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req): Promise<any> {
            // 資格情報を検証し、ユーザーを返すためのロジックをここに記述できます。
            // ここでは、任意のユーザー名を使用して新しいユーザーを作成します。
            // ユーザーのIDは、ユーザーのメールアドレスのハッシュ値として作成します（helpers.tsのuserHashedIdを参照）
          const username = credentials?.username || "dev";
          const email = username + "@localhost";
          const user = {
            id: hashValue(email),
            name: username,
            email: email,
            isAdmin: adminEmails?.includes(email.toLowerCase()),
            isPromptAdmin: promptAdminEmails?.includes(email.toLowerCase()),
            image: "",
          };
          console.log(
            "=== DEV USER LOGGED IN:\n",
            JSON.stringify(user, null, 2,
            )
          );
          return user;
        },
      })
    );
  }

  return providers;
};

export const fetchProfilePicture = async (
  profilePictureUrl: string,
  accessToken: string | null
): Promise<string | null> => {
  try {
    const res = await fetch(
      profilePictureUrl,
      accessToken
        ? {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        : undefined
    );
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return null;
  }
};


export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [...configureIdentityProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin;
      }
      if (user?.isPromptAdmin) {
        token.isPromptAdmin = user.isPromptAdmin;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.isAdmin = token.isAdmin as boolean;
      session.user.isPromptAdmin = token.isPromptAdmin as boolean;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const handlers = NextAuth(options);
