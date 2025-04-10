require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes");
const logger = require("./utils/logger");
const requestLogger = require("./middlewares/requestLogger");

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("👋 Welcome to the API — v1 🚀");
});

app.use("/api/v1", routes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    logger.info(`✅ Server running on port ${process.env.PORT}`);
  });
});

























// Drop all tables
// db.sequelize.sync({ force: true }).then(() => {
//   logger.info("✅ All tables dropped and recreated");
//   app.listen(process.env.PORT, () => {
//     logger.info(`🚀 Server running on port ${process.env.PORT}`);
//   });
// });
