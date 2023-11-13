import { PrismaClient } from '@prisma/client';

import foodList from '../data/foodList.json';

const prisma = new PrismaClient();

export async function foodSeed() {
  const foodCount = await prisma.food.count();

  if (foodCount > 0) {
    console.log('📦 The protein seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: foodList,
  });

  console.log('🥩 Food seed was created with successful');
}
