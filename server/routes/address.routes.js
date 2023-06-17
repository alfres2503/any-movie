const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

router.get("/", addressController.get);

router.get("/:id", addressController.getById);

module.exports = router;
