const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const answers = await prisma.answer.findMany();

  response.json(answers);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const answer = await prisma.answer.findUnique({
    where: { id: id },
  });
  response.json(answer);
};

//Crear un comentario
module.exports.create = async (request, response, next) => {
  const newAnswer = await prisma.answer.create({
    data: {
      id_comment: request.body.id_comment,
      id_user: request.body.id_user,
      text: request.body.text,
      created_at: new Date(),
    },
  });
  response.json(newAnswer);
};
