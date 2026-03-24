const sequelize = require('./src/config/db');
const app = require('./src/app');
const db = require('./src/models');

const PORT = 3003;
const RETRY_INTERVAL = 5000; // 5 segundos

async function connectWithRetry() {
  while (true) {
    try {
      console.log('⏳ Tentando conectar ao banco...');
      await sequelize.authenticate();
      console.log('✅ Conectado ao banco com sucesso');
      break;
    } catch (error) {
      console.error(
        '❌ Banco indisponível. Tentando novamente em 5s...',
        error.original?.code || error.message
      );
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

async function startServer() {
  try {
    await connectWithRetry();

    await db.sequelize.sync();
    console.log('✅ Modelos sincronizados com o banco');

    app.listen(PORT, () => {
      console.log(`🚀 Server rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('🔥 Erro fatal ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();

/*Anotações:
----------------------------------------------------------------------------------------------------
para roda o migration use: docker compose exec api npm run migration
instalar docker e docker compose
criar container mysql
criar container para a aplicação nodejs
configurar o arquivo docker compose.yml
configurar o arquivo .dockerfile para a aplicação nodejs
mudar o delete para o metodo patch no pedidos
criar rotas para atualizar o status do pedido
criar rotas para atualizar o estoque do produto
criar rotas para atualizar os dados do cliente
estudar sobre variaveis de ambiente
estudar sobre o uso do nodemon para reiniciar o servidor automaticamente durante o desenvolvimento
*/