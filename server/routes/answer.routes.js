const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answerController");

router.get("/", answerController.get);

router.get("/:id", answerController.getById);

module.exports = router;
