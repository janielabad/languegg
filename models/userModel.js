const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  });
};
