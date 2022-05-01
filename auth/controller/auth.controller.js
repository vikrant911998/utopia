
exports.getRegisterPage = (req, res, next) => {
  res.render('auth/register',{
    pageTitle: 'Register | Utopia',
  });
};