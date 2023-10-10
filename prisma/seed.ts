import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //
  await prisma.user.create({
    data: {
      email: 'any_email',
      name: 'any',
      password: 'password',
    },
  });
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
