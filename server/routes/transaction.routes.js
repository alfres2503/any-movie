const express = require("express");
const router = express.Router();

//Controlador
const transactionController = require("../controllers/transactionController");

//Rutas
//locahost:3000/transactions/

router.get("/", transactionController.get);

router.get("/:id", transactionController.getById);

//get by user id
router.get("/user/:id", transactionController.getByUserId);

//get by seller
router.get("/seller/:id", transactionController.getBySellerId);

router.post("/", transactionController.create);

router.put("/:id", transactionController.markAsDelivered);

module.exports = router;
