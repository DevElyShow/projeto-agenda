const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const loginController = require('./src/controllers/loginController');

// Home
route.get('/', homeController.index);
route.post('/', homeController.trataPost);

// Contato
route.get('/contato', contatoController.index);

// Página login/cadastro
route.get('/login', loginController.index);

// Cadastro
route.post('/login/register', loginController.register);

// Login
route.post('/login/login', loginController.login);

module.exports = route;