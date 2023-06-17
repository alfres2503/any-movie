const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const comments = await prisma.comment.findMany();
  response.json(comments);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const comments = await prisma.comment.findUnique({
    where: { id: id },
  });
  response.json(comments);
};
