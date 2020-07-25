const passport = require('passport');
const util = require('util');
const queryString = require('querystring');

(exports.login = passport.authenticate('auth0', {
  scope: 'openid email profile',
})),
  (req, res) => {
    res.redirect('/');
  };

exports.callback = (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (err) return next(err);

    // if authentication fails, go back to login page
    if (!user) return res.redirect('/login');

    // establish login session
    req.logIn(user, (err) => {
      if (err) return next(err);

      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logOut();

  let returnTo = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo =
      process.env.NODE_ENV === 'production'
        ? `${returnTo}/`
        : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(
    util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
  );

  logoutURL.search = queryString.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo,
  });

  res.redirect(logoutURL);
};
