import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //
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
