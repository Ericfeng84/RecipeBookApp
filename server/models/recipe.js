const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
});

const recipeSchema = new mongoose.Schema({
      name: String,
      description: String,
      imagePath: String,
      recipeIngredients: [ingredientSchema]
});

module.exports = mongoose.model("recipe",recipeSchema);
