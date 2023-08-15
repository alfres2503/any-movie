const express = require("express");
const router = express.Router();

//Controlador
const paymentMethodController = require("../controllers/paymentMethodController");

//Rutas
//locahost:3000/orden/

router.get("/", paymentMethodController.get);

router.get("/:id", paymentMethodController.getById);

router.post("/", paymentMethodController.create);

module.exports = router;
