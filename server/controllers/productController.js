const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  response.json(products);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const products = await prisma.product.findUnique({
    where: { id: id },
    include: {
      images: true,
      categories: {
        select: {
          category: true,
        },
      },
      type: true,
      user: {
        include: {
          address: true,
        },
      },
      transactions: {
        select: {
          client_feedback: true,
          header: {
            select: {
              user: true,
            },
          },
        },
      },
    },
  });
  response.json(products);
};

module.exports.getBySellerId = async (request, response, next) => {
  let seller_id = parseInt(request.params.id);
  const products = await prisma.product.findMany({
    // orderby:{
    //   name: 'asc',
    // },
    where: { id_user: seller_id },
    include: {
      images: true,
    },
  });
  response.json(products);
};

//Crear un producto
module.exports.create = async (request, response, next) => {
  const newProduct = await prisma.product.create({
    data: {
      id_type: request.body.id_type,
      id_user: request.body.id_user,
      name: request.body.name,
      description: request.body.description,
      quantity: parseInt(request.body.quantity),
      price: parseFloat(request.body.price),
      categories: {
        createMany: {
          data: request.body.categories,
        },
      },
    },
  });
  response.json(newProduct);

  for (let i = 0; i < request.body.images.length; i++) {
    await prisma.image.create({
      data: {
        id_product: newProduct.id,
        image: request.body.images[i].split(",")[1],
      },
    });
  }
};

//Actualizar un producto
// module.exports.update = async (request, response, next) => {
//   let videojuego = request.body;
//   let idVideojuego = parseInt(request.params.id);

//   const videojuegoViejo = await prisma.videojuego.findUnique({
//     where: { id: idVideojuego },
//     include: {
//       generos: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });

//   const newVideojuego = await prisma.videojuego.update({
//     where: {
//       id: idVideojuego,
//     },
//     data: {
//       nombre: videojuego.nombre,
//       descripcion: videojuego.descripcion,
//       precio: videojuego.precio,
//       publicar: videojuego.publicar,
//       generos: {
//         //Generos tiene que ser {id:valor}
//         disconnect: videojuegoViejo.generos,
//         connect: videojuego.generos,
//       },
//     },
//   });
//   response.json(newVideojuego);
// };
