const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const categories = await prisma.category.findMany();

  response.json(categories);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const category = await prisma.category.findUnique({
    where: { id: id },
  });
  response.json(category);
};
