# Tabela Cliente API

API REST para gerenciar clientes, produtos, pedidos e itens de pedido.

## Tecnologias

- Node.js e Express
- Sequelize e MySQL
- Docker Compose
- Redis e BullMQ
- Joi
- Swagger

## Pré-requisitos

- Node.js
- Docker Desktop em execução

## Serviços

O Docker Compose inicia os seguintes serviços:

| Serviço | Porta | Descrição |
| --- | --- | --- |
| API | 3003 | API Express |
| MySQL | 3308 | Banco de dados |
| Redis | 6379 | Fila usada pelo BullMQ |

## Como iniciar

1. Instale as dependências com `npm install`.
2. Inicie o Docker Desktop.
3. Suba os containers com `npm run docker-start`.
4. Execute as migrations com `npm run migration`.

Para acompanhar os logs dos containers, use `npm run docker-logs`.

## Documentação da API

Com a API em execução, acesse a documentação Swagger em:

`http://localhost:3003/api-docs`

## Rotas

- `/cliente`
- `/produto`
- `/pedido`
- `/itempedido`

## Estrutura do projeto

- `src/controllers`: recebe requisições HTTP e envia respostas.
- `src/services`: contém regras de negócio.
- `src/models`: representa as tabelas com Sequelize.
- `src/routes`: registra as rotas da API.
- `src/validations`: valida os dados recebidos com Joi.
- `migrations`: controla as alterações no banco de dados.

## Estoque

Produtos possuem o campo `estoque`. Ele deve ser um número inteiro maior ou igual a zero. A coluna é criada por migration e os dados são validados antes do cadastro de produtos.

## Worker de vendas

Redis e BullMQ estão configurados para processar jobs em segundo plano. No momento, o worker recebe jobs de teste enviados após a criação de um pedido.

A próxima etapa é fazer o job receber o identificador de um pedido confirmado, buscar seus itens e reduzir o estoque dos produtos em uma transação, sem permitir saldo negativo ou desconto duplicado.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia a API com Nodemon. |
| `npm start` | Inicia a API. |
| `npm run migration` | Executa as migrations. |
| `npm run migration-undo` | Desfaz a última migration. |
| `npm run docker-start` | Inicia os containers. |
| `npm run docker-stop` | Para os containers e remove os volumes. |
| `npm run docker-build` | Reconstrói as imagens Docker. |
| `npm run docker-logs` | Exibe os logs dos containers. |

## Referências

- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/docs/v6/)
- [BullMQ](https://docs.bullmq.io/)
- [Docker Compose](https://docs.docker.com/compose/)
