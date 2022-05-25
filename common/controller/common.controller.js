exports.getBlogPage = (req,res)=>{
  res.render('blog', {
    pageTitle: 'Blog | Utopia',
    path: "blog",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}

exports.getAboutPage = (req,res)=>{
  res.render('about', {
    pageTitle: 'About | Utopia',
    path: "about",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}

exports.getContactPage = (req,res)=>{
  res.render('contact', {
    pageTitle: 'Contact | Utopia',
    path: "contact",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}