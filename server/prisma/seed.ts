import { PrismaClient } from "@prisma/client";
import { roles } from "./seeds/roles";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.user.create({
    data: {
      id: 118710756,
      name: "Alfredo Suárez",
      phone: 85713150,
      email: "lusuarezag@est.utn.ac.cr",
      password: "123456",
      roles: {
        createMany: {
          data: [{ id_role: 1 }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 118310145,
      name: "Paula López",
      phone: 62515242,
      email: "malopezsa@est.utn.ac.cr",
      password: "123456",
      roles: {
        createMany: {
          data: [{ id_role: 2 }, { id_role: 3 }],
        },
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
