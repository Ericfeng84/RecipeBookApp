const express=require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

const recipeRouter=require("./routes/recipe");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
});

//database
mongoose.connect("mongodb://localhost/recipebookpp");

// Route
app.use("/recipes",recipeRouter);

app.listen(8000, () => {
  console.log('Server started')
});
