'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action_type: {
        type: Sequelize.STRING
      },
      session: {
        type: Sequelize.STRING
      },
      device_id: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      tor_account: {
        type: Sequelize.STRING
      },
      shared_account: {
        type: Sequelize.STRING
      },
      multi_geo_account: {
        type: Sequelize.STRING
      },
      lost_account: {
        type: Sequelize.STRING
      },
      inactive_account: {
        type: Sequelize.STRING
      },
      visited_before_account: {
        type: Sequelize.STRING
      },
      seen_once_account: {
        type: Sequelize.STRING
      },
      sqreen_score: {
        type: Sequelize.STRING
      },
      point_lat: {
        type: Sequelize.STRING
      },
      point_lon: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Logins');
  }
};