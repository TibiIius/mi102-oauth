import { PrismaClient } from "@prisma/client";

export const getUser = async (userEmail: string) => {
  const prisma = new PrismaClient();

  const { id: userId } = await prisma.user.findFirstOrThrow({
    where: {
      email: userEmail,
    },
  });

  return await prisma.account.findFirst({
    where: {
      userId,
    },
  });
};
