const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const loginController = require('./src/controllers/loginController');

// Rotas da Home
route.get('/', homeController.index);
route.post('/', homeController.trataPost);

// Contato
route.get('/contato', contatoController.index);
route.post('/contato/register', contatoController.register);
route.get('/contato/:id', contatoController.editIndex);
route.post('/contato/edit/:id', contatoController.edit);
route.get('/contato/delete/:id', contatoController.delete);

// Login e Cadastro
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

module.exports = route;