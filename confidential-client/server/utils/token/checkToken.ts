import { Session } from "next-auth";
import { constants } from "../constants";

export const checkToken = async (session: Session) => {
  const runtimeConfig = useRuntimeConfig();

  const user = session.user!;

  const userDb = await getUser(user.email!);

  const secs = new Date().getUTCSeconds();

  // Token is expired
  if (secs >= userDb.expires_at + 5) {
    const url = await constants.KEYCLOAK_TOKEN_PATH();
    const res = fetch(url, {
      method: "POST",
    });
  }
};
