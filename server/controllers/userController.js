const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// //Obtener listado
// module.exports.get = async (request, response, next) => {
//   let listRoles = [];

//   for (let element in Role) {
//     switch (element) {
//       case Role.ADMIN:
//         listRoles.unshift({
//           ["id"]: element,
//           ["name"]: "Administrador",
//         });
//         break;
//       case Role.USER:
//         listRoles.unshift({
//           ["id"]: element,
//           ["nombre"]: "Usuario",
//         });
//         break;
//       default:
//         listRoles.unshift({ ["id"]: Role.USER, ["nombre"]: "Usuario" });
//         break;
//     }
//   }

//   response.json(listRoles);
// };

// //Obtener por Id
// module.exports.getById = async (request, response, next) => {
//   let id = request.params.id;

//   let nombre = "";

//   switch (Role[id]) {
//     case Role.ADMIN:
//       nombre = "Administrador";
//       break;
//     case Role.USER:
//       nombre = "Usuario";
//       break;
//     default:
//       nombre = "Usuario";
//       break;
//   }

//   let rol = { ["id"]: Role[id], ["nombre"]: nombre };
//   response.json(rol);
// };

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
