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

//Obtener por Id de producto
module.exports.getByProductId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const comments = await prisma.comment.findMany({
    where: { id_product: id },
    include: {
      answers: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });
  response.json(comments);
};

//Crear un comentario
module.exports.create = async (request, response, next) => {
  const newComment = await prisma.comment.create({
    data: {
      id_product: request.body.id_product,
      id_user: request.body.id_user,
      text: request.body.text,
      created_at: new Date(),
    },
  });
  response.json(newComment);
};
