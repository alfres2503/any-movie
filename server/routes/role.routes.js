const express = require("express");
const router = express.Router();

//Controlador
const roleController = require("../controllers/roleController");

//Rutas
//locahost:3000/orden/

router.get("/", roleController.get);

module.exports = router;
