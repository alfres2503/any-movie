import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
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

  let salt = bcrypt.genSaltSync(10);

  await prisma.user.create({
    data: {
      id: 118710756,
      name: "Alfredo Suárez",
      phone: 85713150,
      email: "lusuarezag@est.utn.ac.cr",
      password: bcrypt.hashSync("123456", salt),
      active: true,
      image: Buffer.from(
        fs.readFileSync("IMAGES/Naruto_Partie_I.jpg")
      ).toString("base64"),
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
      password: bcrypt.hashSync("123456", salt),
      active: true,
      image: Buffer.from(fs.readFileSync("IMAGES/bella.jpg")).toString(
        "base64"
      ),
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
      active: true,
      image: Buffer.from(fs.readFileSync("IMAGES/potato.jpg")).toString(
        "base64"
      ),
      password: bcrypt.hashSync("123456", salt),
      roles: {
        createMany: {
          data: [{ id_role: 2 }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 208290538,
      name: "Aníbal Alpízar",
      phone: 71699681,
      email: "analpizarca@est.utn.ac.cr",
      active: true,
      image: Buffer.from(fs.readFileSync("IMAGES/anibal.jpg")).toString(
        "base64"
      ),
      password: bcrypt.hashSync("123456", salt),
      company_name: "HBO",
      roles: {
        createMany: {
          data: [{ id_role: 3 }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 110550380,
      name: "Jessica Sanchez",
      phone: 72066590,
      email: "gesssl@hotmail.com",
      active: true,
      image: Buffer.from(fs.readFileSync("IMAGES/jess.jpg")).toString(
        "base64"
      ),
      password: bcrypt.hashSync("123456", salt),
      company_name: "Netflix",
      roles: {
        createMany: {
          data: [{ id_role: 3 }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      id: 712364569,
      name: "Antonio Ramírez",
      phone: 86521476,
      email: "aramirez@est.utn.ac.cr",
      active: false,
      image: Buffer.from(fs.readFileSync("IMAGES/tony.jpg")).toString(
        "base64"
      ),
      password: bcrypt.hashSync("123456", salt),
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

  await prisma.address.create({
    data: {
      id_user: 208290538,
      province: "Alajuela",
      canton: "Alajuela",
      district: "Rio 2",
      direction: "3rd Street, 2nd Avenue, 1st House",
      postal_code: "20501",
      phone: 71699681,
    },
  });

  await prisma.address.create({
    data: {
      id_user: 110550380,
      province: "San José",
      canton: "Goicoechea",
      district: "Guadalupe",
      direction: "75m north from CCG",
      postal_code: "10802",
      phone: 72066590,
    },
  });
  await prisma.address.create({
    data: {
      id_user: 712364569,
      province: "Heredia",
      canton: "Centro",
      district: "Rio 2",
      direction: "3rd Street, 2nd Avenue, 1st House",
      postal_code: "20501",
      phone: 86521476,
    },
  });
  await prisma.address.create({
    data: {
      id_user: 712364569,
      province: "Limón",
      canton: "Centro",
      district: "Rio 2",
      direction: "By the beach",
      postal_code: "20501",
      phone: 86521476,
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
      price: 14.99,
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
      price: 99.99,
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
      price: 16.99,
      categories: {
        createMany: {
          data: [{ id_category: 7 }, { id_category: 3 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 118310145,
      id_type: 1,
      name: "Top Gun: Maverick (Blu-Ray)",
      description:
        "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
      quantity: 5,
      price: 19.99,
      categories: {
        createMany: {
          data: [{ id_category: 1 }, { id_category: 3 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 208290538,
      id_type: 3,
      name: "Oppenheimer: Pre-sell",
      description:
        "A feature documentary exploring how one man's brilliance, hubris and relentless drive changed the nature of war forever, led to the deaths of hundreds of thousands of people and unleashed mass hysteria, and how, subsequently, the same man's attempts to co.",
      quantity: 2,
      price: 29.99,
      categories: {
        createMany: {
          data: [{ id_category: 1 }, { id_category: 3 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 208290538,
      id_type: 1,
      name: "Barbie as the Princess and the Pauper",
      description:
        "In an unnamed kingdom, a blonde princess and a brunette pauper are born at the same time. Several years later, Princess Anneliese is betrothed by her mother, Queen Genevieve, to the wealthy King Dominick to save their nearly bankrupt royal treasury; however, Anneliese is in love with her young tutor Julian.",
      quantity: 200,
      price: 24.99,
      categories: {
        createMany: {
          data: [{ id_category: 5 }, { id_category: 7 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 208290538,
      id_type: 2,
      name: "The Walking Dead Collector",
      description:
        "With the collapse of modern civilization, these survivors must confront other human survivors who have formed groups and communities with their own sets of laws and morals, sometimes leading to open, hostile conflict between them.",
      quantity: 50,
      price: 89.99,
      categories: {
        createMany: {
          data: [{ id_category: 1 }, { id_category: 3 }, { id_category: 6 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 110550380,
      id_type: 1,
      name: "The Saw Collection",
      description:
        "Nine of the films primarily revolve around the fictional serial killer John Jigsaw Kramer, while the ninth movie revolves around a copycat killer. John Kramer was introduced briefly in Saw and developed in more detail in Saw II and the subsequent films. Rather than killing his victims outright, he traps them in life-threatening situations that he calls tests or games to test their will to survive through physical or psychological torture, believing that if they survive, they will be rehabilitated",
      quantity: 85,
      price: 76.99,
      categories: {
        createMany: {
          data: [{ id_category: 2 }],
        },
      },
    },
  });
  
  await prisma.product.create({
    data: {
      id_user: 110550380,
      id_type: 1,
      name: "Grown Ups",
      description:
        "The death of his basketball coach during his childhood causes the meeting of some old friends, who are seen in the place where they held a championship years ago. The partners talk about their wives and children, discovering that age nonetheless goes hand in hand with maturity.",
      quantity: 64,
      price: 14.99,
      categories: {
        createMany: {
          data: [{ id_category: 3 }, { id_category: 4 }, { id_category: 5 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 110550380,
      id_type: 3,
      name: "March of the Penguins",
      description:
        "At the end of each Antarctic summer, South Pole Emperor penguins head to their traditional breeding grounds in a fascinating mating ritual across the frozen tundra.",
      quantity: 22,
      price: 5.99,
      categories: {
        createMany: {
          data: [{ id_category: 4 }],
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      id_user: 208290538,
      id_type: 1,
      name: "Luis Miguel, the series",
      description:
        "The true story of Luis Miguel, the greatest icon of music in Spanish. A complete and authoritative look by the artist into the intimate and professional life of this enigmatic, elusive and at the same time adored singer.",
      quantity: 200,
      price: 24.99,
      categories: {
        createMany: {
          data: [{ id_category: 1 }, { id_category: 3 }],
        },
      },
    },
  });

  // IMAGES
  await prisma.image.createMany({
    data: images,
  });

  await prisma.image.create({
    data: {
      id_product: 5,
      image: Buffer.from(fs.readFileSync("IMAGES/prod5img1.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 6,
      image: Buffer.from(fs.readFileSync("IMAGES/barbieprincessandpauper1.jpg")).toString(
        "base64"
      ),
    },
  });
  await prisma.image.create({
    data: {
      id_product: 6,
      image: Buffer.from(fs.readFileSync("IMAGES/barbieprincessandpauper2.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 7,
      image: Buffer.from(fs.readFileSync("IMAGES/twd1.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 8,
      image: Buffer.from(fs.readFileSync("IMAGES/saw1.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 9,
      image: Buffer.from(fs.readFileSync("IMAGES/Grown_Ups1.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 10,
      image: Buffer.from(fs.readFileSync("IMAGES/marchofpenguins1.jpg")).toString(
        "base64"
      ),
    },
  });
  await prisma.image.create({
    data: {
      id_product: 10,
      image: Buffer.from(fs.readFileSync("IMAGES/marchofpenguins2.jpg")).toString(
        "base64"
      ),
    },
  });

  await prisma.image.create({
    data: {
      id_product: 11,
      image: Buffer.from(fs.readFileSync("IMAGES/luismi1.jpg")).toString(
        "base64"
      ),
    },
  });

  // TRANSACTION HEADER
  await prisma.transaction_header.create({
    data: {
      id_user: 604780838,
      id_payment_method: 2,
      id_address: 2,
      total: 1017,
      created_at: new Date("2023-03-01 11:00:00"),
      payed: true,
    },
  });

  await prisma.transaction_header.create({
    data: {
      id_user: 118310145,
      id_payment_method: 1,
      id_address: 1,
      total: 159.5,
      created_at: new Date("2023-02-01 11:00:00"),
      payed: false,
    },
  });

  await prisma.transaction_header.create({
    data: {
      id_user: 604780838,
      id_payment_method: 3,
      id_address: 3,
      total: 1130,
      created_at: new Date("2023-03-13 11:00:00"),
      payed: true,
    },
  });

  await prisma.transaction_header.create({
    data: {
      id_user: 604780838,
      id_payment_method: 3,
      id_address: 3,
      total: 29.99,
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
      seller_feedback: "Excellent client, we hope to see you soon",
    },
  });

  await prisma.transaction_detail.create({
    data: {
      id_header: 4,
      id_product: 5,
      quantity: 1,
      subtotal: 29.99,
      client_rating: 3,
      client_feedback: "Good service, but the product quality is bad",
      seller_rating: 5,
      seller_feedback: "Excellent client",
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

  await prisma.comment.create({
    data: {
      id_user: 118710756,
      id_product: 5,
      text: "How do you have it before the cinemas?",
      created_at: new Date(),
    },
  });

  await prisma.comment.create({
    data: {
      id_user: 118710756,
      id_product: 6,
      text: "Wow. Very inspiring",
      created_at: new Date(),
    },
  });

  await prisma.comment.create({
    data: {
      id_user: 118310145,
      id_product: 6,
      text: "Really nice movie.",
      created_at: new Date(),
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
