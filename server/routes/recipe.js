const  express=require("express"),
        router=express.Router({mergeParams:true}),
        Recipe = require("../models/recipe");


router.get("/",function (req,res) {
    Recipe.find(function (err,recipeall) {
        if(err){
            console.log(err)
        } else {
            res.status(200).json(recipeall)
        }

    })
});

router.get("/:id",function (req,res) {
  Recipe.findById(req.params.id,function (err,recipe) {
    if(err){
      console.log(err)
    } else {
      res.status(200).json(recipe)
    }

  })
});

router.post("/",function (req,res) {
  Recipe.create(req.body,function (err,recipe) {
    if(err){
      console.log(err)
    } else {
      res.status(200).json(recipe)
    }

  })
});

router.delete("/:id",function (req,res) {
  Recipe.findByIdAndRemove(req.params.id,function (err) {
    if(err){
      console.log(err)
    } else {
      res.status(200).json({message: "Delete success"})
    }

  })
});

router.put("/:id",function (req,res) {
  Recipe.findByIdAndUpdate(req.params.id,req.body,function (err,updateRecipe) {
    if(err){
      console.log(err)
    } else {
      res.status(200).json(updateRecipe)
    }

  })
});


module.exports = router
