const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  try {
    const roles = await prisma.role.findMany();
    const rolesFiltered = roles.filter((role) => role.id !== 1);
    response.json(rolesFiltered);
  } catch (error) {
    console.error("Error fetching roles:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};
