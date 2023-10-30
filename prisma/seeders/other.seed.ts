import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function othersSeed() {
  const othersCount = await prisma.food.count({
    where: {
      group: 'OTHERS',
    },
  });

  if (othersCount > 0) {
    console.log('📦 The others seed has already created');
    return;
  }

  console.log('📦 Others seed was created with successful');
}
