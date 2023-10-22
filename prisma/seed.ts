import { PrismaClient } from '@prisma/client';

import { carbSeed } from './seeders/carbo.seed';
import { fruitSeed } from './seeders/fruit.seed';
import { proteinSeed } from './seeders/protein.seed';

const prisma = new PrismaClient();

async function main() {
  //
  await proteinSeed();
  await fruitSeed();
  await carbSeed();
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
