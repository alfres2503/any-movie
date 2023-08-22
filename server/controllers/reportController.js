const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

//REPORTS FOR ADMIN
module.exports.getSalesPerDay = async (request, response, next) => {
  let date = new Date();
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT CAST(th.total AS CHAR) AS purchase_total, COUNT(td.id) AS purchase_count, GROUP_CONCAT(p.name ORDER BY td.id_product ASC) AS sold_product FROM anymovie.transaction_header th JOIN anymovie.transaction_detail td ON th.id = td.id_header JOIN anymovie.product p ON td.id_product = p.id WHERE DAY(th.created_at) = ${date.getDate()+1} && MONTH(th.created_at) = ${date.getMonth()+1} && YEAR(th.created_at) = ${date.getFullYear()} && th.payed=true GROUP BY th.created_at;`
    );

    // Convert BigInt values to strings in the result
    const convertedResult = result.map(row => ({
      ...row,
      purchase_total: row.purchase_total.toString(),
      purchase_count: row.purchase_count.toString(),
    }));

    response.json(convertedResult);
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Error: " + error,
      data: error,
    });
  }
};

module.exports.getTop5BestProductsByMonth = async (request, response, next) => {
  let month = parseInt(request.params.month);
  let year = new Date();
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT p.id AS product_id, p.name AS product_name, SUM(td.quantity) AS total_quantity FROM anymovie.product AS p JOIN anymovie.transaction_detail AS td ON p.id = td.id_product JOIN anymovie.transaction_header AS th ON td.id_header = th.id WHERE MONTH(th.created_at) = ${month} AND YEAR(th.created_at) = ${year.getFullYear()} GROUP BY p.id ORDER BY total_quantity DESC LIMIT 5;`
  );
  response.json(result);
};

module.exports.getTop5BestSellers = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.id AS seller_id, u.name AS seller_name, AVG(td.seller_rating) AS average_seller_rating FROM anymovie.user u JOIN anymovie.product p ON u.id = p.id_user JOIN anymovie.transaction_detail td ON p.id = td.id_product WHERE td.seller_rating IS NOT NULL GROUP BY u.id, u.name ORDER BY average_seller_rating DESC LIMIT 5;`
  );
  response.json(result);
};

module.exports.getTop3WorstProducts = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT p.id AS seller_id, p.name AS product_name, AVG(td.seller_rating) AS avg_product_rating FROM anymovie.user u JOIN anymovie.product p ON u.id = p.id_user JOIN anymovie.transaction_detail td ON p.id = td.id_product WHERE td.seller_rating IS NOT NULL GROUP BY p.id, p.name ORDER BY avg_product_rating ASC LIMIT 3;`
  );
  response.json(result);
};

//REPORTS FOR SELLER
module.exports.getMostSoldProduct = async (request, response, next) => {
  let seller_id = parseInt(request.params.seller_id);
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT td.id_product, p.name AS prod_name,  SUM(td.quantity) AS total_quantity FROM anymovie.transaction_detail AS td
    JOIN anymovie.transaction_header AS th ON td.id_header = th.id JOIN anymovie.product AS p ON td.id_product = p.id WHERE th.payed = true && p.id_user = ${seller_id} GROUP BY td.id_product ORDER BY total_quantity DESC LIMIT 1;`
  );
  response.json(result);
};

module.exports.getClientWithMostSales = async (request, response, next) => {
  let seller_id = parseInt(request.params.seller_id);
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.id,u.name, SUM(td.quantity) AS total_quantity FROM anymovie.user u JOIN anymovie.transaction_header th ON u.id = th.id_user JOIN anymovie.transaction_detail td ON th.id = td.id_header JOIN anymovie.product p ON td.id_product = p.id JOIN anymovie.user seller ON p.id_user = seller.id WHERE p.id_user = ${seller_id} GROUP BY u.id, u.name ORDER BY total_quantity DESC LIMIT 1;`
  );
  response.json(result);
};

module.exports.getRatingBySeller = async (request, response, next) => {
  let seller_id = parseInt(request.params.seller_id);
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT td.id_product, t.id_user AS client_id, SUM(CASE WHEN td.seller_rating = 5 THEN 1 ELSE 0 END) AS rating_5, SUM(CASE WHEN td.seller_rating = 4 THEN 1 ELSE 0 END) AS rating_4, SUM(CASE WHEN td.seller_rating = 3 THEN 1 ELSE 0 END) AS rating_3, SUM(CASE WHEN td.seller_rating = 2 THEN 1 ELSE 0 END) AS rating_2, SUM(CASE WHEN td.seller_rating = 1 THEN 1 ELSE 0 END) AS rating_1, p.id_user AS seller_id2 FROM anymovie.transaction_detail td JOIN anymovie.transaction_header t ON td.id_header = t.id JOIN anymovie.product p ON td.id_product = p.id WHERE p.id_user = ${seller_id} GROUP BY td.id_product, t.id_user;`
  );
  response.json(result);
};
