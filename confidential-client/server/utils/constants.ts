export const constants = {
  KEYCLOAK_TOKEN_PATH: async (): Promise<string> => {
    const runtimeConfig = useRuntimeConfig();

    // Get token URL from well-known path
    const res = await fetch(
      `${runtimeConfig.keycloak.issuer}/.well-known/openid-configuration`
    );

    const tokenEndpoint = (await res.json()).token_endpoint;

    return tokenEndpoint;
  },
};
