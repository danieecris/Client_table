const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud', 'root', 'Dani04096524', {
    host: '127.0.0.1',
    port: 3308,
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao MySQL via Docker!');
    } catch (error) {
        console.error('❌ Erro ao conectar:', error);
    }
})();

