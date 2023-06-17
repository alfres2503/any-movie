const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const types = await prisma.type.findMany();
  response.json(types);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const types = await prisma.type.findUnique({
    where: { id: id },
  });
  response.json(types);
};
