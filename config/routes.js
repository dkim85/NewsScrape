module.exports = function(router) {
  // this route is taking me to homepage
  router.get("/", function(req, res) {
    res.render("home");
  });
  // this route is taking me to the saved or like homepage
  router.get("/saved", function (req, res) {
    res.render("saved");
  });
}