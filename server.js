const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}...`);
});
