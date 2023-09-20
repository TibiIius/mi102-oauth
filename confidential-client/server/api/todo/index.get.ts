import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);

  const user = await getUser(session?.user);

  return session || "no token present";
});
