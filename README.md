# Tabela Cliente

API RESTful Node.js + Express + Sequelize para gerenciar clientes, produtos, pedidos e itens de pedido.

## Visão geral

Este projeto oferece um CRUD básico para:
- `Cliente`
- `Produto`
- `Pedido`
- `ItemPedido`

A aplicação usa MySQL como banco de dados e suporta execução local ou via Docker.

## Tecnologias

- Node.js
- Express
- Sequelize
- MySQL
- Joi (validação)
- dotenv
- nodemon
- Docker / docker-compose

## Estrutura do projeto

- `server.js`: ponto de entrada da aplicação
- `src/app.js`: configuração do Express e rotas
- `src/config/db.js`: conexão Sequelize com MySQL
- `src/config/config.js`: configuração do Sequelize CLI
- `src/models/`: definição dos models Sequelize
- `src/controllers/`: controladores de rota
- `src/routes/`: roteamento de endpoints
- `src/services/`: lógica de negócio e regras de validação de duplicidade
- `src/validations/`: schemas Joi para validação de payloads
- `migrations/`: scripts de criação de tabelas
- `docker-compose.yml`: definição de serviço MySQL + API
- `Dockerfile`: imagem do container Node.js

## Configuração de ambiente

Crie um arquivo `.env` na raiz com as variáveis abaixo:

```env
DB_USER=<seu-usuario>
DB_PASSWORD=<sua-senha>
DB_NAME=<nome-do-banco>
DB_HOST=<host-do-banco>
DB_PORT=<porta-do-banco>
DB_DIALECT=mysql
```

> O `docker-compose.yml` já define um banco MySQL local com usuário `dani_user`, senha `Dani04096524` e banco `crud`.

## Scripts principais

- `npm run dev`: executa o servidor com `nodemon`
- `npm start`: executa o servidor com `node server.js`
- `npm run migration`: aplica as migrations
- `npm run migration-undo`: reverte a última migration
- `npm run docker-start`: sobe containers com Docker Compose
- `npm run docker-stop`: derruba containers e volumes
- `npm run docker-build`: rebuild da imagem sem cache
- `npm run docker-logs`: exibe logs dos containers

## Fluxo de inicialização

1. `server.js` importa `src/config/db.js` e `src/app.js`.
2. O servidor tenta conectar ao banco com retry a cada 5 segundos.
3. Se a conexão for bem-sucedida, o `db.sequelize.sync()` sincroniza os modelos com o banco.
4. O Express escuta na porta `3003`.

## Configuração do Sequelize CLI

O arquivo `.sequelizerc` aponta:

- `src/config/config.js`
- `src/models`
- `migrations`
- `seeders`

Isso permite rodar `npx sequelize-cli db:migrate` usando a configuração do projeto.

## Models e tabelas

### Cliente (`cliente`)

Atributos principais:
- `id` (PK, auto-increment)
- `nome`
- `email` (único, obrigatório)
- `telefone`
- `cpf` (único, obrigatório)
- `ativo` (booleano)
- `createdAt`, `updatedAt`

### Produto (`produto`)

Atributos principais:
- `id` (PK, auto-increment)
- `nome`
- `descricao`
- `preco`
- `ativo` (booleano)
- `createdAt`, `updatedAt`

### Pedido (`pedido`)

Atributos principais:
- `id` (PK, auto-increment)
- `clienteId` (FK para `cliente.id`)
- `data`
- `valorTotal`
- `deletedAt`
- `createdAt`, `updatedAt`

### ItemPedido (`itemPedido`)

Atributos principais:
- `id` (PK, auto-increment)
- `pedidoId` (FK para `pedido.id`)
- `produtoId` (FK para `produto.id`)
- `quantidade`
- `precoUnitario`
- `deletedAt`
- `createdAt`, `updatedAt`

## Endpoints disponíveis

### Cliente

- `POST /cliente` - criar cliente
- `GET /cliente` - listar clientes ativos
- `GET /cliente/:id` - obter cliente por ID
- `PUT /cliente/:id` - atualizar cliente
- `DELETE /cliente/:id` - desativar cliente (`ativo = false`)

### Produto

- `POST /produto` - criar produto
- `GET /produto` - listar produtos ativos
- `GET /produto/:id` - obter produto por ID
- `PUT /produto/:id` - atualizar produto
- `DELETE /produto/:id` - desativar produto (`ativo = false`)

### Pedido

- `POST /pedido` - criar pedido
- `GET /pedido` - listar pedidos não deletados
- `GET /pedido/:id` - obter pedido por ID
- `PUT /pedido/:id` - atualizar pedido
- `DELETE /pedido/:id` - marcar `deletedAt`

### ItemPedido

- `POST /itempedido` - criar item de pedido
- `GET /itempedido` - listar itens de pedido
- `GET /itempedido/:id` - obter item por ID
- `PUT /itempedido/:id` - atualizar item de pedido
- `DELETE /itempedido/:id` - deletar item de pedido

## Exemplos de payloads

### Cliente

`POST /cliente`
```json
{
  "nome": "João Silva",
  "email": "joao.silva@example.com",
  "telefone": "11999998888",
  "cpf": "12345678900"
}
```

`PUT /cliente/:id`
```json
{
  "nome": "João S. Silva",
  "email": "joao.silva@exemplo.com",
  "telefone": "11999998888"
}
```

### Produto

`POST /produto`
```json
{
  "nome": "Camiseta",
  "descricao": "Camiseta de algodão tamanho M",
  "preco": 59.9
}
```

`PUT /produto/:id`
```json
{
  "nome": "Camiseta Básica",
  "descricao": "Camiseta de algodão tamanho G",
  "preco": 69.9
}
```

### Pedido

`POST /pedido`
```json
{
  "clienteId": 1,
  "data": "2026-04-10",
  "valorTotal": 199.9
}
```

`PUT /pedido/:id`
```json
{
  "valorTotal": 249.9
}
```

### ItemPedido

`POST /itempedido`
```json
{
  "pedidoId": 1,
  "produtoId": 2,
  "quantidade": 3,
  "precoUnitario": 39.9
}
```

`PUT /itempedido/:id`
```json
{
  "quantidade": 4,
  "precoUnitario": 35.0
}
```

## Exemplos de respostas

### Cliente

`POST /cliente`
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@example.com",
  "telefone": "11999998888",
  "cpf": "12345678900",
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "ativo": true
}
```

`GET /cliente/1`
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@example.com",
  "telefone": "11999998888",
  "cpf": "12345678900",
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "ativo": true
}
```

### Produto

`POST /produto`
```json
{
  "id": 1,
  "nome": "Camiseta",
  "descricao": "Camiseta de algodão tamanho M",
  "preco": 59.9,
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "ativo": true
}
```

`GET /produto/1`
```json
{
  "id": 1,
  "nome": "Camiseta",
  "descricao": "Camiseta de algodão tamanho M",
  "preco": 59.9,
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "ativo": true
}
```

### Pedido

`POST /pedido`
```json
"O pedido foi criado com sucesso."
```

`GET /pedido/1`
```json
{
  "id": 1,
  "clienteId": 1,
  "data": "2026-04-10",
  "valorTotal": 199.9,
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "deletedAt": null
}
```

### ItemPedido

`POST /itempedido`
```json
{
  "id": 1,
  "pedidoId": 1,
  "produtoId": 2,
  "quantidade": 3,
  "precoUnitario": 39.9,
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "deletedAt": null
}
```

`GET /itempedido/1`
```json
{
  "id": 1,
  "pedidoId": 1,
  "produtoId": 2,
  "quantidade": 3,
  "precoUnitario": 39.9,
  "createdAt": "2026-04-10T00:00:00.000Z",
  "updatedAt": "2026-04-10T00:00:00.000Z",
  "deletedAt": null
}
```

## Lógica principal e observações técnicas

### Controladores

Os controladores usam os models diretamente para criar, ler, atualizar e excluir dados.

- `controller.cliente.js`: usa `Cliente.create`, `Cliente.findAll`, `Cliente.findByPk`, `Cliente.update`
- `controller.produto.js`: usa `Produto.create`, `Produto.findAll`, `Produto.findByPk`, `Produto.update`
- `controller.pedido.js`: usa `Pedido.create`, `Pedido.findAll`, `Pedido.findByPk`, `Pedido.update`
- `controller.itempedido.js`: usa `ItemPedido.create`, `ItemPedido.findAll`, `ItemPedido.findByPk`, `ItemPedido.update`

### Services

Existem services para validações de duplicidade:

- `src/services/clienteService.js`
- `src/services/pedidoService.js`
- `src/services/itemPedidoservice.js`

No entanto, nem todos os controllers estão usando esses services atualmente.

### Validações

Há schemas Joi definidos para:

- `clienteValidation.js`
- `pedidoValidation.js`
- `itemPedidoValidation.js`

Os schemas não estão sendo aplicados nas rotas, apenas importados nos controllers.

## Observações de qualidade e pontos a corrigir

1. `pedidoService.js` faz verificação apenas por `clienteId`, mas a mensagem de erro indica validação por data também.
2. `controller.itempedido.js` usa `ItemPedido.updateItemPedido` em vez de `ItemPedido.update`.
3. `controller.itempedido.js` chama `ItemPedido.update({ where: { id } })` no delete, o que está incorreto: falta definição do objeto de atualização.
4. As rotas de `itempedido` e `pedido` não usam validação `Joi` antes de persistir os dados.
5. `produtoService.js` e `produtoValidation.js` não existem, apesar de haver controllers e rotas para produto.
6. Em `controller.cliente.js`, `clienteService.criarCliente` é importado mas não utilizado.
7. O erro de mensagem no `createItemPedido` retorna `Este cliente ja existe` mesmo tratando item de pedido.

## Como rodar

### Local

```bash
npm install
npm run dev
```

### Com Docker

```bash
npm run docker-build
npm run docker-start
```

Depois, acesse `http://localhost:3003`.

### Migrations

```bash
npm run migration
```

Se estiver usando Docker:

```bash
docker compose exec api npm run migration
```

## Observação sobre banco de dados

- A conexão usa `process.env.DB_*` em `src/config/db.js`.
- O `docker-compose.yml` define o serviço `mysql` na porta `3308:3306`.
- O container `api` depende do `mysql` saudável.

---

## Contato

Projeto criado por Daniel Cristian de Oliveira.
