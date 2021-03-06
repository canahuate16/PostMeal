
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Recipes
  app.get("/my-recipes", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Recipe.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbRecipe) {
      console.log ('ABOVE OR BELOW PROB')
      console.log(dbRecipe);
      // We have access to the Recipes as an argument inside of the callback function
      res.render("index", {recipes:dbRecipe, author:req.user.username});
    });
  });


  app.get("/api/all/recipes", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Recipe.findAll({
     
    }).then(function(dbRecipe) {
      // We have access to the Recipes as an argument inside of the callback function
      res.json(dbRecipe); 
    });
  });

  // POST route for saving a new Recipe
  app.post("/api/recipes", function(req, res) {
    console.log (req.user)
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a recipe
    // and body property (req.body)
    db.Recipe.create({
      author: req.user.username,
      recipe: req.body.recipe,
      ingredients: req.body.ingredients,
      image_url: req.body.image_url,
      body: req.body.body,
      UserId: req.user.id
    }).then(function(dbRecipe) {
      // We have access to the new Recipe as an argument inside of the callback function
      res.json(dbRecipe);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting Recipes. We can get the id of the Recipe to be deleted from
  // req.params.id
  app.delete("/api/recipes/:id", function(req, res) {
    // We just have to specify which Recipe we want to destroy with "where"
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });

  });

  // PUT route for updating Recipes. We can get the updated Recipe data from req.body
  app.put("/api/recipes", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Recipe.update({
      author: req.body.author,
      recipe: req.body.recipe,
      ingredients: req.body.ingredients,
      body: req.body.body
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};