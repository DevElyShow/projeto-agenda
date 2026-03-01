const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da Home
route.get('/', homeController.index);
route.post('/', homeController.trataPost);

// Rotas de Contato
route.get('/contato', contatoController.index);

module.exports = route;