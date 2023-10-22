import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function carbSeed() {
  const carbCount = await prisma.food.count({
    where: {
      group: 'CARB',
    },
  });

  if (carbCount > 0) {
    console.log('📦 The seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: [
      {
        name: 'Abóbora cabotian cozida',
        calories: 128.0,
        carb: 28.8,
        protein: 3.7,
        fat: 1.9,
        group: 'CARB',
        quantity: 250,
      },
      {
        name: 'Abóbora cabotian crua',
        calories: 128.0,
        carb: 27.6,
        protein: 5.6,
        fat: 1.6,
        group: 'CARB',
        quantity: 320,
      },
      {
        name: 'Arroz branco cozido',
        calories: 128.0,
        carb: 27.8,
        protein: 2.6,
        fat: 0.4,
        group: 'CARB',
        quantity: 100,
      },
      {
        name: 'Arroz branco cru',
        calories: 128.0,
        carb: 28.2,
        protein: 2.6,
        fat: 0.1,
        group: 'CARB',
        quantity: 35,
      },
      {
        name: 'Batata doce cozida',
        quantity: 150,
        calories: 128.0,
        carb: 30.6,
        protein: 1.0,
        fat: 0.2,
        group: 'CARB',
      },
      {
        name: 'Batata doce crua',
        quantity: 100,
        calories: 128.0,
        carb: 30.6,
        protein: 1.4,
        fat: 0.1,
        group: 'CARB',
      },
      {
        name: 'Batata inglesa cozida',
        quantity: 250,
        calories: 128.0,
        carb: 29.3,
        protein: 1.0,
        fat: 0.0,
        group: 'CARB',
      },
      {
        name: 'Batata inglesa crua',
        quantity: 200,
        calories: 128.0,
        carb: 29.4,
        protein: 3.6,
        fat: 0.2,
        group: 'CARB',
      },
      {
        name: 'Farofa de mandioca temperada',
        quantity: 30,
        calories: 128.0,
        carb: 25.3,
        protein: 0.7,
        fat: 2.87,
        group: 'CARB',
      },
      {
        name: 'Macarrão cozido',
        quantity: 150,
        calories: 128.0,
        carb: 25.0,
        protein: 4.7,
        fat: 0.81,
        group: 'CARB',
      },
      {
        name: 'Macarrão cru',
        quantity: 30,
        calories: 128.0,
        carb: 26.4,
        protein: 3.6,
        fat: 0.7,
        group: 'CARB',
      },
      {
        name: 'Mandioca cozida',
        quantity: 150,
        calories: 128.0,
        carb: 30.8,
        protein: 0.6,
        fat: 0.31,
        group: 'CARB',
      },
      {
        name: 'Mandioca crua',
        quantity: 120,
        calories: 128.0,
        carb: 30.7,
        protein: 0.9,
        fat: 0.25,
        group: 'CARB',
      },
      {
        name: 'Milho verde cru',
        quantity: 120,
        calories: 128.0,
        carb: 30.6,
        protein: 1.0,
        fat: 0.2,
        group: 'CARB',
      },
      {
        name: 'Pão de forma integral',
        quantity: 50,
        calories: 128.0,
        carb: 25.2,
        protein: 4.8,
        fat: 1.87,
        group: 'CARB',
      },
      {
        name: 'Tapioca',
        quantity: 50,
        calories: 128.0,
        carb: 23.4,
        protein: 0.4,
        fat: 4.1,
        group: 'CARB',
      },
    ],
  });

  console.log('🍚 Carb seed was created with successful');
}
