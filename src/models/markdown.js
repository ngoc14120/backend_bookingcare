"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
      Markdown.belongsTo(models.Service, { foreignKey: "serviceId" });
    }
  }
  Markdown.init(
    {
      contentHTML: DataTypes.TEXT("LONG"),
      contentMarkdown: DataTypes.TEXT("LONG"),
      description: DataTypes.TEXT("LONG"),
      doctorId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Markdown",
    }
  );
  return Markdown;
};
