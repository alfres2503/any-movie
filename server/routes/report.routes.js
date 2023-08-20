const express = require("express");
const router = express.Router();

//Controlador
const reportController = require("../controllers/reportController");

//Rutas
//locahost:3000/reports/

//REPORTS FOR ADMIN
router.get("/admin/salesPerDay/:date", reportController.getSalesPerDay);

router.get("/admin/top5Products/:month/:year", reportController.getTop5BestProductsByMonth);

router.get("/admin/top5Seller", reportController.getTop5BestSellers);

router.get("/admin/top3Products", reportController.getTop3WorstProducts);

//REPORTS FOR SELLER
router.get("/seller/mostSoldProduct/:seller_id", reportController.getMostSoldProduct);

router.get("/seller/clientWithMostSales/:seller_id", reportController.getClientWithMostSales);

router.get("/seller/ratingBySeller/:seller_id", reportController.getRatingBySeller);

module.exports = router;