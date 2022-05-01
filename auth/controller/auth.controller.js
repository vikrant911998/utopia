
exports.getAuthenticationPage = (req, res, next) => {
  res.render('auth/auth',{
    pageTitle: 'Authentication | Utopia',
  });
};