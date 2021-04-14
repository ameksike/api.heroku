'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Login.init({
    action_type: DataTypes.STRING,
    session: DataTypes.STRING,
    device_id: DataTypes.STRING,
    ip: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_id: DataTypes.STRING,
    tor_account: DataTypes.STRING,
    shared_account: DataTypes.STRING,
    multi_geo_account: DataTypes.STRING,
    lost_account: DataTypes.STRING,
    inactive_account: DataTypes.STRING,
    visited_before_account: DataTypes.STRING,
    seen_once_account: DataTypes.STRING,
    sqreen_score: DataTypes.STRING,
    point_lat: DataTypes.STRING,
    point_lon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};