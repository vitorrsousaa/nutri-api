import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cerealSeed() {
  const cerealCount = await prisma.food.count({
    where: {
      group: 'CEREAL',
    },
  });

  if (cerealCount > 0) {
    console.log('📦 The cereal seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: [
      {
        name: 'Aveia em flocos',
        group: 'CEREAL',
        calories: 80.0,
        carb: 16.9,
        fat: 2.2,
        protein: 3.5,
        quantity: 25,
      },
    ],
  });

  console.log('📦 Cereal seed was created with successful');
}
