const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.get);

router.get("/:id", userController.getById);

router.post("/login", userController.login);

router.post("/create", userController.create);

router.put("/:id", userController.update);

router.put("/changeStatus/:id", userController.changeStatus);

module.exports = router;
