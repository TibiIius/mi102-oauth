import { PrismaClient } from "@prisma/client";
import { prisma } from "./prismaClient";

export const getUserAccount = async (userId: string) => {
  return await prisma.account.findFirst({
    where: {
      userId,
      provider: "keycloak",
    },
  });
};
