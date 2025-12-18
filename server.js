const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");


const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


// app.listen(process.env.PORT, () =>
//   console.log("Server running on port", process.env.PORT)
// );
module.exports = app;