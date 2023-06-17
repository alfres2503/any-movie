const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const products = await prisma.product.findMany();
  response.json(products);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const products = await prisma.product.findUnique({
    where: { id: id },
  });
  response.json(products);
};

module.exports.getBySellerId = async (request, response, next) => {
  let seller_id = parseInt(request.params.id);
  const products = await prisma.product.findMany({
    where: { id_user: seller_id },
  });
  response.json(products);
};
