const db = require('../db');
const User = db.users;
// const Op = db.Sequelize.op; // for operators

const catchAsyncErr = require('../utils/catchAsyncErr');

exports.getAllUsers = catchAsyncErr(async (req, res, next) => {
  const users = await User.findAll();

  console.log(users);
  res.status(200).json({
    status: 'success',
  });
});
