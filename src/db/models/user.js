'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: {
      field: 'full_name',
      type: DataTypes.STRING,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Enter correct email',
        },
      },
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    tableName: 'users',
  });
  return User;
};
