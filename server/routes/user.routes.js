const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.get);

// router.post("/login", userController.login);

// router.post("/registrar", userController.register);

module.exports = router;
