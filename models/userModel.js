const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    user_id: {
      primaryKey: true,
      type: DataTypes.STRING(35),
      unique: true,
    },
    known_language: DataTypes.STRING(5),
    nickname: {
      type: DataTypes.STRING(15),
      isAlphanumeric: true,
    },
  });
};
