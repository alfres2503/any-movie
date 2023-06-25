import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { categories } from "./seeds/categories";
import { images } from "./seeds/images";
import { payment_methods } from "./seeds/payment_methods";
import { roles } from "./seeds/roles";
import { types } from "./seeds/types";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.role.createMany({
    data: roles,
  });

  // USER

  await prisma.user.create({
    data: {
      id: 118710756,
      name: "Alfredo Suárez",
      phone: 85713150,
      email: "lusuarezag@est.utn.ac.cr",
      password: "123456",
      image: fs.readFileSync("IMAGES/Naruto_Partie_I.jpg"),
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
      image: fs.readFileSync("IMAGES/bella.jpg"),
      company_name: "Netflix",
      roles: {
        createMany: {
          data: [{ id_role: 2 }, { id_role: 3 }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 604780838,
      name: "Carlo Bonilla",
      phone: 82345678,
      email: "cabonillamo@est.utn.ac.cr",
      image: fs.readFileSync("IMAGES/potato.jpg"),
      password: "123456",
      roles: {
        createMany: {
          data: [{ id_role: 2 }],
        },
      },
    },
  });

  // ADDRESS

  await prisma.address.create({
    data: {
      id_user: 118310145,
      province: "San José",
      canton: "Central",
      district: "Central",
      direction: "1st Street, 2nd Avenue, 3rd House",
      postal_code: "20101",
      phone: 62515242,
    },
  });

  await prisma.address.create({
    data: {
      id_user: 604780838,
      province: "Alajuela",
      canton: "Alajuela",
      district: "Villa Bonita",
      direction: "2nd Street, 3rd Avenue, 4th House",
      postal_code: "20101",
      phone: 82345678,
    },
  });

  await prisma.address.create({
    data: {
      id_user: 604780838,
      province: "Puntarenas",
      canton: "San Vito",
      district: "San Vito Centro",
      direction: "3rd Street, 2nd Avenue, 1st House",
      postal_code: "20501",
      phone: 82345678,
    },
  });

  // PAYMENT METHOD
  await prisma.payment_method.createMany({
    data: payment_methods,
  });

  // PRODUCT TYPES
  await prisma.type.createMany({
    data: types,
  });

  // PRODUCT CATEGORIES
  await prisma.category.createMany({
    data: categories,
  });

  // PRODUCT
  await prisma.product.create({
    data: {
      id_user: 118310145,
      id_type: 1,
      name: "Twilight (Includes book)",
      description:
        "Bella Swan goes to live with her father, in the town of Forks, where she meets Edward, an attractive and mysterious boy with a big secret: he is a vampire. But the boy's family keeps a peculiarity: it does not feed on human blood.",
      quantity: 1,
      price: 150,
      categories: {
        createMany: {
          data: [{ id_category: 3 }, { id_category: 4 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 118310145,
      id_type: 2,
      name: "Breaking Bad Collection",
      description:
        "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
      quantity: 1,
      price: 900,
      categories: {
        createMany: {
          data: [{ id_category: 1 }, { id_category: 3 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 118310145,
      id_type: 3,
      name: "Quincy (Special Edition)",
      description:
        "An intimate look at Quincy Jones over his six-decade career in the entertainment business. The film seamlessly threads personal vérité moments with private archival footage to reveal a legendary life like no other.",
      quantity: 3,
      price: 850,
      categories: {
        createMany: {
          data: [{ id_category: 7 }, { id_category: 3 }],
        },
      },
    },
  });

  // IMAGES
  await prisma.image.createMany({
    data: images,
  });

  // TRANSACTION HEADER
  await prisma.transaction_header.create({
    data: {
      id_user: 604780838,
      id_payment_method: 2,
      id_address: 2,
      total: 1017,
      created_at: new Date(),
      payed: true,
    },
  });

  await prisma.transaction_header.create({
    data: {
      id_user: 118310145,
      id_payment_method: 1,
      id_address: 1,
      total: 159.5,
      created_at: new Date(),
      payed: false,
    },
  });

  await prisma.transaction_header.create({
    data: {
      id_user: 604780838,
      id_payment_method: 3,
      id_address: 3,
      total: 1130,
      created_at: new Date(),
      payed: true,
    },
  });

  // TRANSACTION DETAIL
  await prisma.transaction_detail.create({
    data: {
      id_header: 1,
      id_product: 2,
      quantity: 1,
      subtotal: 900,
      arrivalDate: new Date(),
      client_rating: 5,
      client_feedback: "Excelent service",
    },
  });

  await prisma.transaction_detail.create({
    data: {
      id_header: 2,
      id_product: 1,
      quantity: 1,
      subtotal: 150,
    },
  });

  await prisma.transaction_detail.create({
    data: {
      id_header: 3,
      id_product: 1,
      quantity: 1,
      subtotal: 150,
    },
  });

  await prisma.transaction_detail.create({
    data: {
      id_header: 3,
      id_product: 3,
      quantity: 1,
      subtotal: 850,
      client_rating: 4,
      client_feedback: "Good service, but the product was a little bit late",
      seller_rating: 5,
      seller_feedback: "Excelent client, we hope to see you soon",
    },
  });

  // COMMENTS
  await prisma.comment.create({
    data: {
      id_user: 604780838,
      id_product: 1,
      text: "I love this book, I hope to buy the rest of the saga",
      created_at: new Date(),
    },
  });

  await prisma.comment.create({
    data: {
      id_user: 604780838,
      id_product: 2,
      text: "Does it include the movie?",
      created_at: new Date("2023-03-01 11:00:00"),
    },
  });

  await prisma.comment.create({
    data: {
      id_user: 604780838,
      id_product: 2,
      text: "Is it good? I want to buy it",
      created_at: new Date("2023-03-02 14:30:00"),
    },
  });

  // ANSWERS
  await prisma.answer.create({
    data: {
      id_comment: 2,
      id_user: 118310145,
      text: "No, El Camino is not included",
      created_at: new Date("2023-03-01 12:00:00"),
    },
  });

  await prisma.answer.create({
    data: {
      id_comment: 3,
      id_user: 118710756,
      text: "Higly recommended",
      created_at: new Date("2023-03-02 17:00:00"),
    },
  });

  await prisma.answer.create({
    data: {
      id_comment: 1,
      id_user: 118310145,
      text: "I love it too!",
      created_at: new Date(),
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
