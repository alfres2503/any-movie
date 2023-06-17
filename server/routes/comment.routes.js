const express = require("express");
const router = express.Router();

//Controlador
const commentController = require("../controllers/commentController");

//Rutas
//locahost:3000/orden/

router.get("/", commentController.get);

router.get("/:id", commentController.getById);

module.exports = router;
