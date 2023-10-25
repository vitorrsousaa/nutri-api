import { PrismaClient } from '@prisma/client';

import { carbSeed } from './seeders/carbo.seed';
import { cerealSeed } from './seeders/cereal.seed';
import { fruitSeed } from './seeders/fruit.seed';
import { milkSeed } from './seeders/milk.seed';
import { othersSeed } from './seeders/other.seed';
import { proteinSeed } from './seeders/protein.seed';

const prisma = new PrismaClient();

async function main() {
  //
  await proteinSeed();
  await fruitSeed();
  await carbSeed();
  await cerealSeed();
  await milkSeed();
  await othersSeed();
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
