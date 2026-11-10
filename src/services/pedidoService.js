const { Op } = require('sequelize');
const db = require('../models');
const { Queue } = require('bullmq');
const Pedido = db.Pedido;
const { Worker } = require('bullmq');
const IORedis = require('ioredis'); 


async function criarPedido(dados) {
    const { clienteId } = dados;

    const pedidoExistente = await Pedido.findOne({
        where: {
            clienteId
        }
    })
    if (pedidoExistente) {
        throw new Error("Pedido ja cadastrado para esse cliente nessa data")
    }
    const pedido = await Pedido.create(dados);
    addJobs();
    async function addJobs() {
        await myQueue.add('myJobName', { foo: 'bar' });
        await myQueue.add('myJobName', { qux: 'baz' });    
    }
    return pedido;
}

const connection = new IORedis({ maxRetriesPerRequest: null, host: "redis" });

const worker = new Worker(
    'myQueue',
    async job => {
        // Will print { foo: 'bar'} for the first job
        // and { qux: 'baz' } for the second.
        console.log(job.data);
    },
    { connection },
);
const myQueue = new Queue('myQueue', { connection });
module.exports = { criarPedido }