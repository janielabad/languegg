exports.base = (req, res, next) => {
  if (res.locals.authenticated) {
    res.render('base', {
      user: req.user,
    });
  } else {
    res.render('base');
  }
};

exports.profile = (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    user: req.user,
  });
};
