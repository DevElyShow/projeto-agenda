const Contato = require('../models/ContatoModel');

// Landing Page
exports.landing = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('landing');
};

// Dashboard (lista contatos)
exports.dashboard = async (req, res) => {
  try {
    const busca = req.query.busca || '';

    const contatos = await Contato.buscaContatos(
      req.session.user._id,
      busca
    );

    res.render('index', { contatos, busca });
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

// Tratamento de POST
exports.trataPost = (req, res) => {
  res.send('Formulário recebido com sucesso 🚀');
};