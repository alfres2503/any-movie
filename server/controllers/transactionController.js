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

module.exports.markAsDelivered = async (request, response, next) => {
  let id = parseInt(request.params.id);
  try {
    const transaction = await prisma.transaction_detail.update({
      where: { id: id },
      data: {
        arrivalDate: request.body.arrivalDate,
        seller_feedback: request.body.seller_feedback,
        seller_rating: request.body.seller_rating,
      },
    });

    response.json(transaction);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};

module.exports.create = async (request, response, next) => {
  try {
    const transaction = await prisma.transaction_header.create({
      data: {
        id_user: request.body.id_user,
        id_payment_method: request.body.id_payment_method,
        id_address: request.body.id_address,
        total: request.body.total,
        created_at: new Date(),
        payed: request.body.payed,
        // details: {
        //   createMany: {
        //     data: request.body.details,
        //   },
        // },
      },
    });

    for (let i = 0; i < request.body.details.length; i++) {
      await prisma.transaction_detail.create({
        data: {
          id_product: request.body.details[i].id_product,
          id_header: transaction.id,
          quantity: request.body.details[i].quantity,
          subtotal: request.body.details[i].subtotal,
        },
      });

      await prisma.product.update({
        where: {
          id: request.body.details[i].id_product,
        },
        data: {
          quantity: {
            decrement: request.body.details[i].quantity,
          },
        },
      });
    }

    response.json(transaction);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};
