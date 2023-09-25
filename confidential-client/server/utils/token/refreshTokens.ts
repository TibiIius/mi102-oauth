import { Account } from "@prisma/client";
import { TokenSet } from "next-auth";
import { ERROR_REFRESH_TOKEN_INVALID } from "~/common/globals";

export const refreshTokens = async (
  userAccount: Account
): Promise<TokenSet> => {
  const runtimeConfig = useRuntimeConfig();
  const secs = Math.abs(Date.now() / 1000);

  // Token is not expired, we just return the original tokens
  // We also give a 5 second buffer here, better to refresh too soon than too late
  if (secs < userAccount.expires_at! + 5) {
    return {
      access_token: userAccount.access_token ?? undefined,
      refresh_token: userAccount.refresh_token ?? undefined,
    };
  }
  const url = await constants.KEYCLOAK_TOKEN_PATH();
  const res = await fetch(url, {
    method: "POST",
    // this is what Keycloak internally expects
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: runtimeConfig.keycloak.clientId,
      client_secret: runtimeConfig.keycloak.clientSecret,
      refresh_token: userAccount.refresh_token!,
    }),
  });

  if (!res.ok) {
    throw new Error(ERROR_REFRESH_TOKEN_INVALID);
  }

  const data: KeycloakTokenSet = await res.json();

  console.log(data);

  return {
    access_token: data.access_token,
    atExpiresAt: parseInt(Math.abs(Date.now() / 1000) + data.expires_in),
    refresh_token: data.refresh_token,
    rtExpiresIn: parseInt(data.refresh_expires_in),
    id_token: data.id_token,
  };
};
