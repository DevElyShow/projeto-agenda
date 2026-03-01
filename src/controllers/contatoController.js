const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('/contato'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    req.session.save(() => res.redirect('/contato'));
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  try {
    if (!req.params.id) return res.render('404');

    await Contato.deleteOne({ _id: req.params.id });

    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(() => res.redirect('/'));
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};