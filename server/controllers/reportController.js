const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

//REPORTS FOR ADMIN
module.exports.getSalesPerDay = async (request, response, next) => {
    let date = parseInt(request.params.date); 
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT th.created_at AS purchase_date, COUNT(td.id) AS purchase_count, GROUP_CONCAT(p.name ORDER BY td.id_product ASC) AS sold_products FROM anymovie.transaction_header th JOIN anymovie.transaction_detail td ON th.id = td.id_header JOIN anymovie.product p ON td.id_product = p.id WHERE DATE(th.created_at) = '${date}' GROUP BY th.created_at;`
    )
    response.json(result)
  };
  
  module.exports.getTop5BestProductsByMonth = async (request, response, next) => {
    let month = parseInt(request.params.month); 
    let year = parseInt(request.params.year); 
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT p.id AS product_id, p.name AS product_name, SUM(td.quantity) AS total_quantity FROM anymovie.product AS p JOIN anymovie.transaction_detail AS td ON p.id = td.id_product JOIN anymovie.transaction_header AS th ON td.id_header = th.id WHERE MONTH(th.created_at) = ${month} AND YEAR(th.created_at) = ${year} GROUP BY p.id ORDER BY total_quantity DESC LIMIT 5;`
    )
    response.json(result)
  };
  
  module.exports.getTop5BestSellers = async (request, response, next) => {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT u.id AS seller_id, u.name AS seller_name, AVG(td.seller_rating) AS average_seller_rating FROM anymovie.user u JOIN anymovie.product p ON u.id = p.id_user JOIN anymovie.transaction_detail td ON p.id = td.id_product WHERE td.seller_rating IS NOT NULL GROUP BY u.id, u.name ORDER BY average_seller_rating DESC LIMIT 5;`
    )
    response.json(result)
  };
  
  module.exports.getTop3WorstProducts = async (request, response, next) => {
    const result =await prisma.$queryRaw(
      Prisma.sql`SELECT u.id AS seller_id, u.name AS seller_name, AVG(td.seller_rating) AS avg_seller_rating FROM anymovie.user u JOIN anymovie.transaction_header th ON u.id = th.id_user JOIN anymovie.transaction_detail td ON th.id = td.id_header WHERE u.id = td.id_product GROUP BY u.id, u.name HAVING COUNT(td.seller_rating) >= 3 ORDER BY avg_seller_rating ASC LIMIT 3;`
    )
    response.json(result)
  };
  
  //REPORTS FOR SELLER
  module.exports.getMostSoldProduct = async (request, response, next) => {
    let seller_id = parseInt(request.params.seller_id);
    const result =await prisma.$queryRaw(
      Prisma.sql`SELECT p.* FROM anymovie.product AS p JOIN ( SELECT td.id_product, SUM(td.quantity) AS total_quantity FROM anymovie.transaction_detail AS td JOIN anymovie.transaction_header AS th ON td.id_header = th.id WHERE th.payed = true GROUP BY td.id_product ORDER BY total_quantity DESC LIMIT 1 ) AS best_selling ON p.id = best_selling.id_product WHERE id_user=${seller_id};`
    )
    response.json(result)
  };
  
  module.exports.getClientWithMostSales = async (request, response, next) => {
    let seller_id = parseInt(request.params.seller_id); 
    const result =await prisma.$queryRaw(
      Prisma.sql`SELECT u.id,u.name, SUM(td.quantity) AS total_quantity FROM anymovie.user u JOIN anymovie.transaction_header th ON u.id = th.id_user JOIN anymovie.transaction_detail td ON th.id = td.id_header JOIN anymovie.product p ON td.id_product = p.id JOIN anymovie.user seller ON p.id_user = seller.id WHERE p.id_user = ${seller_id} GROUP BY u.id, u.name ORDER BY total_quantity DESC LIMIT 1;`
    )
    response.json(result)
  };
  
  module.exports.getRatingBySeller = async (request, response, next) => {
    let seller_id = parseInt(request.params.seller_id); 
    const result =await prisma.$queryRaw(
      Prisma.sql`SELECT td.id_product, t.id_user AS client_id, SUM(CASE WHEN td.seller_rating = 5 THEN 1 ELSE 0 END) AS rating_5, SUM(CASE WHEN td.seller_rating = 4 THEN 1 ELSE 0 END) AS rating_4, SUM(CASE WHEN td.seller_rating = 3 THEN 1 ELSE 0 END) AS rating_3, SUM(CASE WHEN td.seller_rating = 2 THEN 1 ELSE 0 END) AS rating_2, SUM(CASE WHEN td.seller_rating = 1 THEN 1 ELSE 0 END) AS rating_1, p.id_user AS seller_id2 FROM anymovie.transaction_detail td JOIN anymovie.transaction_header t ON td.id_header = t.id JOIN anymovie.product p ON td.id_product = p.id WHERE p.id_user = ${seller_id} GROUP BY td.id_product, t.id_user;`
    )
    response.json(result)
  };