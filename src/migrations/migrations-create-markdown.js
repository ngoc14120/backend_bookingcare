"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT("LONG"),
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT("LONG"),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT("LONG"),
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      serviceId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Markdowns");
  },
};
