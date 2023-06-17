const express = require("express");
const router = express.Router();

//Controlador
const typeController = require("../controllers/typeController");

//Rutas
//locahost:3000/orden/

router.get("/", typeController.get);

router.get("/:id", typeController.getById);

module.exports = router;
