const { DATE } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Recipe = sequelize.define("Recipe", {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type:DataTypes.STRING,
      
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  Recipe.associate = function (models) {
    // We're saying that a Recipe should belong to an Author
    // A Recipe can't be created without an Author due to the foreign key constraint
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Recipe;
};
