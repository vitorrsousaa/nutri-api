import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function proteinSeed() {
  const proteinCount = await prisma.food.count({
    where: {
      group: 'PROTEIN',
    },
  });

  if (proteinCount > 0) {
    console.log('📦 The protein seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: [
      {
        name: 'Alcatra grelhada sem gordura',
        calories: 160.0,
        carb: 0,
        protein: 21.2,
        fat: 7.7,
        group: 'PROTEIN',
        quantity: 70,
      },
      {
        name: 'Atum',
        calories: 160.0,
        carb: 0,
        protein: 34.8,
        fat: 1.2,
        group: 'PROTEIN',
        quantity: 150,
      },
      {
        name: 'Atum enlatado',
        calories: 160.0,
        carb: 0,
        protein: 25.3,
        fat: 5.8,
        group: 'PROTEIN',
        quantity: 95,
      },
      {
        name: 'Ovo de galinha cozido',
        calories: 160.0,
        carb: 0.6,
        protein: 13.3,
        fat: 9.5,
        group: 'PROTEIN',
        quantity: 1,
      },
      {
        name: 'Bacalhau',
        calories: 160.0,
        carb: 1.5,
        protein: 28,
        fat: 4.1,
        group: 'PROTEIN',
        quantity: 115,
      },
      {
        name: 'Contra filé grealhado sem gordura',
        calories: 160.0,
        carb: 0,
        protein: 29.6,
        fat: 3.7,
        group: 'PROTEIN',
        quantity: 85,
      },
      {
        name: 'Coxão mole grelhado sem gordura',
        calories: 160.0,
        carb: 0,
        protein: 23.7,
        fat: 6.5,
        group: 'PROTEIN',
        quantity: 60,
      },
      {
        name: 'Fígado bovino grelhado',
        calories: 160.0,
        carb: 3,
        protein: 21.5,
        fat: 6.4,
        group: 'PROTEIN',
        quantity: 75,
      },
      {
        name: 'Lagarto cozido',
        calories: 160.0,
        carb: 0,
        protein: 23.7,
        fat: 6.6,
        group: 'PROTEIN',
        quantity: 75,
      },
      {
        name: 'Maminha grelhada sem gordura',
        calories: 160.0,
        carb: 0,
        protein: 32.1,
        fat: 2.5,
        group: 'PROTEIN',
        quantity: 100,
      },
      {
        name: 'Patinho cru',
        calories: 160.0,
        carb: 0,
        protein: 26.1,
        fat: 5.4,
        group: 'PROTEIN',
        quantity: 120,
      },
      {
        name: 'Patinho moído cozido',
        calories: 160.0,
        carb: 0,
        protein: 26.2,
        fat: 5.3,
        group: 'PROTEIN',
        quantity: 75,
      },
      {
        name: 'Peito de frango cozido/grelhado',
        calories: 160.0,
        carb: 0,
        protein: 32.2,
        fat: 2.5,
        group: 'PROTEIN',
        quantity: 100,
      },
      {
        name: 'Peito de frango cru',
        calories: 160.0,
        carb: 0,
        protein: 28.9,
        fat: 4,
        group: 'PROTEIN',
        quantity: 140,
      },
    ],
  });

  console.log('🥩 Protein seed was created with successful');
}
