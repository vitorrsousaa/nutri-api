import { PrismaClient } from '@prisma/client';

import { carbSeed } from './seeders/carbo.seed';
import { cerealSeed } from './seeders/cereal.seed';
import { fruitSeed } from './seeders/fruit.seed';
import { proteinSeed } from './seeders/protein.seed';

const prisma = new PrismaClient();

async function main() {
  //
  await proteinSeed();
  await fruitSeed();
  await carbSeed();
  await cerealSeed();
}

main()
  .then(() => {
    console.log('Itens created with successful');
  })
  .catch(async (e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
