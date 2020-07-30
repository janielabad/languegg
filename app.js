const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

dotenv.config({ path: './config.env' });

const authRouter = require('./routes/authRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// session configuration
const sessionConfig = {
  secret: 'runnyyolksaretheBEST',
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

// passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/callback',
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ROUTES
app.use('/', viewRouter);
app.use('/', authRouter);

module.exports = app;
