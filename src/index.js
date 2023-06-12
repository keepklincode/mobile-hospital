require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const formData = require("express-form-data");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const { env, swagger, db } = require("./configs");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.use("", routes);

app.use((err, req, res, next) => {
  res.status(500).send({ status: false, message: "Internal server error" });
});

server.listen(port, () => {
  console.log(`node project starter template is running on http://localhost:${port}`);
});

module.exports = app;
