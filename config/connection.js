const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.DB_SERVER,
      dialect: "mysql",
    }
    // {
    //   host: "mysql-1nj8",
    //   dialect: "mysql",
    //   port: 3306,
    // }
  );
}

module.exports = sequelize;
