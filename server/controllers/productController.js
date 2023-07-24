const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  response.json(products);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const products = await prisma.product.findUnique({
    where: { id: id },
    include: {
      images: true,
      categories: {
        select: {
          category:true,
        },
      },
      type:true,
      user: {
        include:{
          address:true,
        },
      },
      transactions: {
        select: {
          client_feedback: true,
          header: {
            select: {
              user: true,
            },
          },
        },
      },
    },
  });
  response.json(products);
};

module.exports.getBySellerId = async (request, response, next) => {
  let seller_id = parseInt(request.params.id);
  const products = await prisma.product.findMany({
    // orderby:{
    //   name: 'asc',
    // },
    where: { id_user: seller_id },
    include: {
      images: true,
    },
  });
  response.json(products);
};
