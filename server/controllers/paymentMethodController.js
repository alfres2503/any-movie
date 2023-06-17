const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const paymentMethods = await prisma.payment_method.findMany();
  response.json(paymentMethods);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const paymentMethods = await prisma.paymentMethod.findUnique({
    where: { id: id },
  });
  response.json(paymentMethods);
};
//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
