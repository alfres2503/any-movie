const express = require("express");
const router = express.Router();

//Controlador
const productController = require("../controllers/productController");

//Rutas
//locahost:3000/product/

router.get("/", productController.get);

router.get("/:id", productController.getById);

//get by seller
router.get("/seller/:id", productController.getBySellerId);

router.post("/", productController.create);

router.put("/:id", productController.update);

module.exports = router;
