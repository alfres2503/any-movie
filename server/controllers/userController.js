const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports.create = async (request, response, next) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(request.body.password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        id: parseInt(request.body.id),
        name: request.body.name,
        phone: parseInt(request.body.phone),
        email: request.body.email,
        password: hash,
        company_name: request.body.company_name,
        roles: {
          createMany: {
            data: request.body.roles,
          },
        },
      },
    });

    response.status(200).json({
      status: true,
      message: "User registered",
      data: user,
    });
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};

module.exports.update = async (request, response, next) => {
  const Email = request.body.email;

  let salt = bcrypt.genSaltSync(10);
  let hash;

  if (request.body.newPassword)
    hash = bcrypt.hashSync(request.body.newPassword, salt);
  else hash = bcrypt.hashSync(request.body.password, salt);

  const oldUser = await prisma.user.findUnique({
    where: { email: Email },
    include: {
      roles: true,
    },
  });

  const checkPassword = await bcrypt.compare(
    request.body.password,
    oldUser.password
  );

  if (!checkPassword) {
    response.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  } else {
    const newUser = await prisma.user.update({
      where: {
        email: Email,
      },
      data: {
        name: request.body.name,
        phone: request.body.phone,
        email: request.body.email,
        password: hash,
        company_name: request.body.company_name,
        image: request.body.image,
      },
    });
  }
};

module.exports.login = async (request, response, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email,
    },
    include: {
      roles: true,
    },
  });

  if (user == null || !user) {
    response.status(401).send({
      success: false,
      message: "User not found",
    });

    return;
  }

  const checkPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!checkPassword) {
    response.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  } else if (user.active == false) {
    response.status(401).send({
      success: false,
      message: "User is not active, contact the administrator",
    });
  } else {
    const payload = {
      email: user.email,
      roles: user.roles,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    response.json({
      success: true,
      message: "Login successful",
      data: {
        user: user,
        token,
      },
    });
  }
};

//Obtener listado
module.exports.get = async (request, response, next) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      company_name: true,
      active: true,
      roles: {
        select: {
          role: true,
        },
      },
      image: true,
    },
  });

  response.json(users);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const users = await prisma.user.findUnique({
    where: { id: id },
    include: {
      address: true,
      payment_methods: true,
    },
  });
  response.json(users);
};

module.exports.changeStatus = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const oldUser = await prisma.user.findUnique({
    where: { id: id },
  });

  try {
    const newUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        active: oldUser.active ? false : true,
      },
    });

    response.json(newUser);
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};
