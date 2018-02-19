const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
// Setting up PORT~ Heroku's port , or local 3000
const PORT = process.env.PORT || 3000;

// Initiate our Express App
const app = express();

// Setting up Express Router
const router = express.Router();

// requiring and passing the routes file to router object
require("./config/routes")(router);

// Asssigning public folder as a static directory
app.use(express.static(__dirname + "/public"));

// handblebars => express
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
// body-parser in the app
app.use(bodyParser.urlencoded({
  extended: false
}));

//setting up a every router request
app.use(router);

// Heroku deployed database~ need to test !!
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose connecting to my db
mongoose.connect(db, function(error) {
  // loggin any errors connecting with mongoose
  if(error) {
    console.log(error);
  }
  // showing its working
  else {
    console.log("connected-good job!");
  }
});

// Liste port ~ Emojis 
app.listen(PORT, function() {
  console.log("Launching port:  🚀  👽  " + PORT);
});