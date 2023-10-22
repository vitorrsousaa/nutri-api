import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fruitSeed() {
  const fruitCount = await prisma.food.count({
    where: {
      group: 'FRUIT',
    },
  });

  if (fruitCount > 0) {
    console.log('📦 The seed has already created');
    return;
  }

  await prisma.food.createMany({
    data: [
      {
        name: 'Abacaxi',
        calories: 45.0,
        carb: 11.5,
        protein: 0.8,
        fat: 0.1,
        group: 'FRUIT',
        quantity: 100,
      },
      {
        name: 'Banana prata',
        calories: 45.0,
        carb: 11.9,
        protein: 0.6,
        fat: 0.0,
        group: 'FRUIT',
        quantity: 50,
      },
      {
        name: 'Caju',
        calories: 45.0,
        carb: 10.8,
        protein: 1.0,
        fat: 0.3,
        group: 'FRUIT',
        quantity: 120,
      },
      {
        name: 'Goiaba',
        calories: 45.0,
        carb: 10.7,
        protein: 0.8,
        fat: 0.4,
        group: 'FRUIT',
        quantity: 90,
      },
      {
        name: 'Laranja',
        calories: 45.0,
        carb: 11.3,
        protein: 1.1,
        fat: 0.1,
        group: 'FRUIT',
        quantity: 100,
      },
      {
        name: 'Maçã',
        calories: 45.0,
        carb: 12.2,
        protein: 0.2,
        fat: 0.0,
        group: 'FRUIT',
        quantity: 85,
      },
      {
        name: 'Mamão',
        calories: 45.0,
        carb: 11.7,
        protein: 0.6,
        fat: 0.1,
        group: 'FRUIT',
        quantity: 100,
      },
      {
        name: 'Manga',
        calories: 45.0,
        carb: 12.1,
        protein: 0.3,
        fat: 0.1,
        group: 'FRUIT',
        quantity: 70,
      },
      {
        name: 'Maracujá',
        calories: 45.0,
        carb: 8.1,
        protein: 1.3,
        fat: 1.4,
        group: 'FRUIT',
        quantity: 60,
      },
      {
        name: 'Melancia',
        calories: 45.0,
        carb: 11.0,
        protein: 1.2,
        fat: 0.0,
        group: 'FRUIT',
        quantity: 150,
      },
      {
        name: 'Melão',
        calories: 45.0,
        carb: 11.6,
        protein: 1.1,
        fat: 0.0,
        group: 'FRUIT',
        quantity: 150,
      },
      {
        name: 'Morango',
        calories: 45.0,
        carb: 10.2,
        protein: 1.4,
        fat: 0.5,
        group: 'FRUIT',
        quantity: 150,
      },
      {
        name: 'Pera',
        calories: 45.0,
        carb: 11.9,
        protein: 0.5,
        fat: 0.1,
        group: 'FRUIT',
        quantity: 85,
      },
      {
        name: 'Pêssego',
        calories: 45.0,
        carb: 11.6,
        protein: 1.0,
        fat: 0.0,
        group: 'FRUIT',
        quantity: 100,
      },
      {
        name: 'Uva',
        calories: 45.0,
        carb: 11.5,
        protein: 0.6,
        fat: 0.2,
        group: 'FRUIT',
        quantity: 70,
      },
    ],
  });

  console.log('🍍 Fruit seed was created with successful');
}
