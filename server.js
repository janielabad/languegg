const dotenv = require('dotenv');
const db = require('./db');

dotenv.config({ path: './config.env' });
const app = require('./app');

db.sequelize
  .sync()
  .then(() => {
    console.log('DB synced!');
  })
  .catch((err) => {
    console.log('Error syncing DB!', err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

// global handler for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection found! Farewell...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
