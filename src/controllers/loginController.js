const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  return res.render('login');
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => res.redirect('back'));
    }

    req.flash('success', 'Usuário criado com sucesso. Faça login para continuar.');
    return req.session.save(() => res.redirect('/login'));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => res.redirect('back'));
    }

    // Cria sessão
    req.session.user = login.user;

    // Mensagem personalizada
    req.flash('success', `Bem-vindo à Agenda, ${login.user.email}!`);

    return req.session.save(() => res.redirect('/dashboard'));

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};