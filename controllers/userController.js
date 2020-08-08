const db = require('../db');
const User = db.users;
const Op = db.Sequelize.op; // for operators

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll();

  console.log(users);
  res.status(200).json({
    status: 'success',
  });
};
