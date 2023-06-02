// Imports

const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

// Import Routes
const userRoutes = require("./routes/user.routes");

// Config

const port = process.env.PORT || 3000;

dotEnv.config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/users", userRoutes);

// Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});
