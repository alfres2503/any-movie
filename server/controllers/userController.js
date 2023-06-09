const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const users = await prisma.user.findMany();

  response.json(users);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const users = await prisma.user.findUnique({
    where: { id: id },
  });
  response.json(users);
};
