const express = require("express");
// Setting up PORT~ Heroku's port , or local 3000
const PORT = process.env.PORT || 3000;

// Initiate our Express App
const app = express();

// Setting up Express Router
const router = express.Router();

// Asssigning public folder as a static directory
app.use(express.static(__dirname + "/public"));

//setting up a every router request
app.use(router);

// Liste port ~ Emojis 
app.listen(PORT, function() {
  console.log("Launching port:  🚀  👽  " + PORT);
});