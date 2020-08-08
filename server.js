const dotenv = require('dotenv');
const db = require('./db');

dotenv.config({ path: './config.env' });
const app = require('./app');

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB synced!');
  })
  .catch((err) => {
    console.log('Error syncing DB!', err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
