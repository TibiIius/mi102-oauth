import KeycloakProvider from "next-auth/providers/keycloak";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { PrimaryKey } from "@mikro-orm/core";
import { prisma } from "~/server/utils/db/prismaClient";
import { NuxtAuthHandler } from "#auth";

const runtimeConfig = useRuntimeConfig();

export const nuxtAuthOptions: AuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  secret: runtimeConfig.auth.secret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: runtimeConfig.keycloak.clientId,
      clientSecret: runtimeConfig.keycloak.clientSecret,
      issuer: runtimeConfig.keycloak.issuer,
      wellKnown: `${runtimeConfig.keycloak.issuer}/.well-known/openid-configuration`,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      let errorMessage;
      // This needs to be wrapped in a try-catch, because if it throws, the app's main loop hangs and the app never loads
      try {
        const userAccount = await getUserAccount(user.id);

        const tokens = await refreshTokens(userAccount!);

        await prisma.account.update({
          where: {
            id: userAccount!.id,
          },
          data: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            id_token: tokens.id_token,
            expires_at: tokens.atExpiresAt as number,
            refresh_expires_in: tokens.rtExpiresIn as number,
          },
        });

        // return session;
      } catch (error) {
        errorMessage = error;

        if ((error as any).message) {
          errorMessage = (error as any).message;
        }

        // return {
        //   ...session,
        //   error: errorMessage,
        //   user: {
        //     ...session.user,
        //     id: user.id,
        //   },
        // };
      } finally {
        return {
          ...session,
          error: errorMessage,
          user: {
            ...session.user,
            id: user.id,
          },
        };
      }
    },
  },
  events: {
    // Update the user's account data saved in the DB when they sign in
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signIn: async ({ user, account }) => {
      if (!account) return;
      // workaround for bug in adapters
      delete account["not-before-policy"];
      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: account.provider!,
            providerAccountId: account.providerAccountId!,
          },
        },
        data: {
          ...account,
          not_before_policy: account?.notBeforePolicy as number,
        },
      });
    },
  },
};

export default NuxtAuthHandler(nuxtAuthOptions);
