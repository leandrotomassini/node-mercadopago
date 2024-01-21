const express = require('express');
const cors = require('cors');

const Mercado_Pago = require('./router/Mercado_Pago_Router');


const server = express();

server.use(express.json());

server.use(cors())

server.use("/mercadopago", Mercado_Pago);

module.exports = server;