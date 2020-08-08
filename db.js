const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config({ path: './config.env' });

// connect to db
const sequelize = new Sequelize(
  'languegg',
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection: GOOD');
  })
  .catch((err) => {
    console.log('DB connection: NOT GOOD', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.users = require('./models/userModel')(sequelize, Sequelize);

module.exports = db;
