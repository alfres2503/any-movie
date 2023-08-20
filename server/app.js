// Imports

const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

// Config
const port = process.env.PORT || 3000;

dotEnv.config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes

app.use("/users", require("./routes/user.routes"));
app.use("/transactions", require("./routes/transaction.routes"));
app.use("/products", require("./routes/product.routes"));
app.use("/address", require("./routes/address.routes"));
app.use("/answers", require("./routes/answer.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/comments", require("./routes/comment.routes"));
app.use("/paymentMethods", require("./routes/paymentMethod.routes"));
app.use("/types", require("./routes/type.routes"));
app.use("/roles", require("./routes/role.routes"));
app.use("/reports", require("./routes/report.routes"));

// Server
app.listen(port, () => {
  console.log(`Server on: http://localhost:${port}`);
  console.log("CTRL-C to stop\n");
});
