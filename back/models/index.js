const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, Sequelize);
db.Group = require("./group")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Gallery = require("./gallery")(sequelize, Sequelize);
db.Schedule = require("./schedule")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
