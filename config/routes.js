// bring the scrape function from scripts directory
const scrape = require("../scripts/scrape");

// bring headlines and notes form the controller 
const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

module.exports = function(router) {
  // this route is taking me to homepage
  router.get("/", function(req, res) {
    res.render("home");
  });
  // this route is taking me to the saved or like homepage
  router.get("/saved", function (req, res) {
    res.render("saved");
  });
  // create a fetch function to fetch articles on the web
  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles now!. Check again later"
        });
      }
      else {
        res.json({
          meesage: "Added" + docs.insertedCount + " mew articles!"
        });
      }
    });
  });
  router.get("/api/headlines", function(req, res) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });
  // delete an article ~ source stackflow.com
  router.delete("/api/headlines/:id", function(req, res){
    let query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function(err, data){
      res.json(data);
    });
  });
  // update router 
  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data){
      res.json(data);
    });
  });
  router.get("api/notes/:hedline_id?", function(req, res){
    let query = {};
      if (req.params.headline_id) {
        query._id = req.params.headline_id;
    }
    notesController.get(query, function(err, data) {
      res.json(data);
    });
  });
  router.delete("/api.notes/:id", function(req, res) {
    let query = {};
    query._id= req.params.id;
    notesController.delete(query, function(err, data){
      res.json(data);
    });
  });
}