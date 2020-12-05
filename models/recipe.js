const { DATE } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define("Recipe", {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return Recipe;
};
