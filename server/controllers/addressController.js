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

module.exports.create = async (request, response, next) => {
  try {
    const address = await prisma.address.create({
      data: {
        id_user: request.body.id_user,
        province: request.body.province.name,
        canton: request.body.canton.name,
        district: request.body.district.name,
        direction: request.body.direction,
        postal_code: request.body.postal_code.toString(),
        phone: parseInt(request.body.phone),
      },
    });

    response.json(address);
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};
