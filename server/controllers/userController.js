const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const users = await prisma.user.findMany();

  response.json(users);
};
