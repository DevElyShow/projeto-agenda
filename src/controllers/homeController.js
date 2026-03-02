const Contato = require('../models/ContatoModel');

// Página inicial
exports.index = async (req, res) => {
  try {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

// Tratamento de POST
exports.trataPost = (req, res) => {
  res.send('Formulário recebido com sucesso 🚀');
};

// Pagina inicial nova 
exports.home = (req, res) => {
  res.render('home', {
    user: req.session.user
  });
};
