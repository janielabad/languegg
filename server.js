const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'languegg',
});

db.connect((err) => {
  if (err) {
    return console.log('Error connecting to the database.');
  }

  console.log('Database connection successful!');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
