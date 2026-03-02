const { Contato, ContatoModel } = require('../models/ContatoModel');


// ============================
// LISTAR CONTATOS (COM PAGINAÇÃO E BUSCA)
// ============================
exports.index = async function(req, res) {
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


// ============================
// ABRIR FORMULÁRIO DE CADASTRO
// ============================
exports.cadastro = function(req, res) {
  res.render('contato', {
    contato: {},
    user: req.session.user
  });
};


// ============================
// REGISTRAR CONTATO
// ============================
exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body, req.session.user._id);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => res.redirect('/contato'));
    }

    req.flash('success', 'Contato registrado com sucesso.');
    return req.session.save(() => res.redirect('/dashboard'));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};


// ============================
// ABRIR FORMULÁRIO DE EDIÇÃO
// ============================
exports.editIndex = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(
      req.params.id,
      req.session.user._id
    );

    if (!contato) return res.render('404');

    res.render('contato', {
      contato,
      user: req.session.user
    });

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};


// ============================
// EDITAR CONTATO
// ============================
exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = new Contato(req.body, req.session.user._id);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => res.redirect('back'));
    }

    req.flash('success', 'Contato editado com sucesso.');
    return req.session.save(() => res.redirect('/dashboard'));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};


// ============================
// DELETAR CONTATO
// ============================
exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(
      req.params.id,
      req.session.user._id
    );

    if (!contato) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.');
    return req.session.save(() => res.redirect('/dashboard'));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};