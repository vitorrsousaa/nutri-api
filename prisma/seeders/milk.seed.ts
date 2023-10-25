import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function milkSeed() {
  const milkCount = await prisma.food.count({
    where: {
      group: 'MILK',
    },
  });

  if (milkCount > 0) {
    console.log('📦 The milk seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: [
      {
        name: 'Iogurte natural desnatado',
        group: 'MILK',
        calories: 80.0,
        carb: 11.3,
        fat: 0.6,
        protein: 7.4,
        quantity: 195,
      },
      {
        name: 'Leite em pó desnatado',
        group: 'MILK',
        calories: 80.0,
        carb: 11.3,
        fat: 0.2,
        protein: 7.7,
        quantity: 20,
      },
      {
        name: 'Leite desnatado',
        group: 'MILK',
        calories: 80.0,
        carb: 11.3,
        fat: 0.2,
        protein: 7.7,
        quantity: 200,
      },
      {
        name: 'Leite em pó integral',
        group: 'MILK',
        calories: 80.0,
        carb: 6.3,
        fat: 4.3,
        protein: 4.1,
        quantity: 15,
      },
      {
        name: 'Leite em pó integral',
        group: 'MILK',
        calories: 80.0,
        carb: 6.3,
        fat: 4.3,
        protein: 4.1,
        quantity: 150,
      },
      {
        name: 'Queijo parmesão',
        group: 'MILK',
        calories: 80.0,
        carb: 0.3,
        fat: 5.9,
        protein: 6.3,
        quantity: 15,
      },
      {
        name: 'Queijo prato',
        group: 'MILK',
        calories: 80.0,
        carb: 0.4,
        fat: 6.5,
        protein: 5,
        quantity: 25,
      },
    ],
  });

  console.log('🥛 Milk seed was created with successful');
}
