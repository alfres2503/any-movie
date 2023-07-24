const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const transactions = await prisma.transaction_header.findMany({
    include: {
      details: true,
    },
  });

  response.json(transactions);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const transaction = await prisma.transaction_header.findUnique({
    where: { id: id },
    include: {
      payment_method: true,
      address: true,
      details: {
        include: {
          product: true,
        },
      },
    },
  });
  response.json(transaction);
};

module.exports.getByUserId = async (request, response, next) => {
  let id_user = parseInt(request.params.id);
  const transaction = await prisma.transaction_header.findMany({
    where: { id_user: id_user },
    include: {
      details: true,
    },
  });
  const transactionWithDetailsLength = transaction.map((t) => ({
    ...t,
    detailsLength: t.details.length,
  }));
  response.json(transactionWithDetailsLength);
};

module.exports.getBySellerId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const transaction = await prisma.transaction_detail.findMany({
    include: {
      product: true,
      header: true,
    },
    where: {
      product: {
        id_user: id,
      },
    },
  });

  response.json(transaction);
};
