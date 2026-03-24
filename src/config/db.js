const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT,
        logging: false,
        retry: {
            max: 10, // tenta 10 vezes
            match: [
                /ECONNREFUSED/,
                /ETIMEDOUT/,
                /SequelizeConnectionError/
            ]
        }
    }
);

module.exports = sequelize;
