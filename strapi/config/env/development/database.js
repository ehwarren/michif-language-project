const path = require("path");

module.exports = ({ env }) => {
  return {
    connection: {
      client: "postgres",
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME_DEV", ""),
        user: env("DATABASE_USERNAME_DEV", ""),
        password: env("DATABASE_PASSWORD_DEV", ""),
      },
      useNullAsDefault: true,
    },
  };
};
