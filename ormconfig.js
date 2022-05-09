const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/data/entities/**/*.js"],
  migrations: ["dist/data/migrations/**/*.js"],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
