module.exports = function loginRequired(req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => {
      return res.redirect('/login');
    });
    return;
  }

  return next();
};
