const  express=require("express"),
        router=express.Router({mergeParams:true}),
        Recipe = require("../models/recipe");


router.get("/",function (req,res) {
    Recipe.find(function (err,recipeall) {
        if(err){
            console.log(err)
        } else {
            res.send(recipeall)
        }

    })
});

router.post("/",function (req,res) {
    for (let recipe of req.body){
      var id=recipe._id
      // var eachRecipe = new Recipe(recipe);
      Recipe.findByIdAndUpdate(id,recipe,function (err,updateres) {
        if(err){

        } else {
          console.log(updateres)
        }
        
      })
      // eachRecipe.save();
      res.json({status:"success"}).end()
    }

});

module.exports = router
