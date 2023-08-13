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
module.exports.create = async (request, response, next) => {
  try {
    const paymentMethod = await prisma.payment_method.create({
      data: {
        id_user: request.body.id_user,
        type: request.body.type,
        provider: request.body.provider,
        account_number: request.body.account_number.toString(),
        expiration_date: new Date(request.body.expiration_date),
      },
    });
    response.json(paymentMethod);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};
//Actualizar
module.exports.update = async (request, response, next) => {};
