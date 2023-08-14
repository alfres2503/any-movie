const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const address = await prisma.address.findMany();

  response.json(address);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const address = await prisma.address.findUnique({
    where: { id: id },
  });
  response.json(address);
};

