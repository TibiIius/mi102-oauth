import KeycloakProvider from "next-auth/providers/keycloak";
import { MikroOrmAdapter, defaultEntities } from "@auth/mikro-orm-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NuxtAuthHandler } from "#auth";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

const prisma = new PrismaClient({
  log: ["info"],
});

export default NuxtAuthHandler({
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
    }),
  ],
});
