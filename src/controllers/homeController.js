const { ContatoModel } = require('../models/ContatoModel');


// LANDING PAGE

exports.landing = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('landing');
};

// DASHBOARD (LISTA CONTATOS)

exports.dashboard = async (req, res) => {
  try {
    const busca = req.query.busca || '';
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const filtro = {
      user: req.session.user._id
    };

    if (busca) {
      filtro.nome = { $regex: busca, $options: 'i' };
    }

    const contatos = await ContatoModel.find(filtro)
      .limit(limit)
      .skip(skip)
      .sort({ criadoEm: -1 });

    const total = await ContatoModel.countDocuments(filtro);
    const totalPages = Math.ceil(total / limit);

    res.render('index', {
      contatos,
      busca,
      currentPage: page,
      totalPages,
      user: req.session.user
    });

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};



// TRATAMENTO DE POST 

exports.trataPost = (req, res) => {
  res.send('Formulário recebido com sucesso 🚀');
};
