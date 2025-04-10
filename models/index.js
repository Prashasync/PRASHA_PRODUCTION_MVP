const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const logger = require("../utils/logger");
const db = {};

// Custom logger for Sequelize
config.logging = (msg) => logger.info(`[Sequelize] ${msg}`);
console.log("config==", config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

db.User = require("./user")(sequelize, Sequelize);
db.Patient = require("./patient")(sequelize, Sequelize);
db.Mood = require("./mood")(sequelize, Sequelize);
db.Health = require("./health")(sequelize, Sequelize);
db.Notification = require("./notification")(sequelize, Sequelize);
db.Appointment = require("./appointment")(sequelize, Sequelize);
db.Medication = require("./medication")(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Sync models to database (add this)
sequelize
  .sync({ alter: true }) // ✅ This will create tables if not exist or update structure
  .then(() => {
    logger.info("✅ All models were synchronized successfully.");
  })
  .catch((err) => {
    logger.error(`❌ Error synchronizing models: ${err.message}`);
  });

// Test DB connection
sequelize
  .authenticate()
  .then(() => logger.info("✅ Database connected successfully"))
  .catch((err) =>
    logger.error(`❌ Unable to connect to the database: ${err.message}`)
  );

module.exports = db;



// const { Sequelize } = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const logger = require("../utils/logger");
// const db = {};

// // Custom logger for Sequelize
// config.logging = (msg) => logger.info(`[Sequelize] ${msg}`);
// console.log("config==", config);

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     port: config.port,
//     dialect: config.dialect,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

// db.User = require("./user")(sequelize, Sequelize);
// db.Patient = require("./patient")(sequelize, Sequelize);

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.Mood = require("./mood")(sequelize, Sequelize);
// db.Health = require("./health")(sequelize, Sequelize);
// db.Notification = require("./notification")(sequelize, Sequelize);
// db.Appointment = require("./appointment")(sequelize, Sequelize);
// db.Medication = require("./medication")(sequelize, Sequelize);

// sequelize
//   .authenticate()
//   .then(() => logger.info("✅ Database connected successfully"))
//   .catch((err) =>
//     logger.error(`❌ Unable to connect to the database: ${err.message}`)
//   );

// module.exports = db;
