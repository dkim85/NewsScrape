// global
$(document).ready(function () {
  // setting reference article-container div
  // adding "scrape new article" buttons
  const articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // once the page is ready, run initpage function
  initPage();

  function initPage() {
    // empty article container, run ajax request for unsaved headlines
    articleContainer.empty();
    $.get("/api/headline?saved=false")
      .then(function (data) {
        // render headlines if it's available
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          // otherwise render a messager if articles are not found
          renderEmpty();
        }
      });
  }

  function renderArticles(articles) {
    const articlePanels = [];
    for (let i = 0; 1 < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // once we have all the HTML for the articles stores in the array, append them ti the articlePanels container
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    // this functin takes a single JSON object for an article/headline
    // it constructs a Jquery element contianing all formated HTML
    // article panel
    let panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-sucesss save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class= 'panel-body'>",
        article.summary,
        "</div>",
        "</div>",
      ].join(""));
    // attaching article's id to the Jquery element
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    let emptyAlert = 
    $(["<div class='alert alert-warning text-center'>",
      "<h4> Oups, we're out of articles.</h4>",
      "</div>",
      "<div class='panel panel-default'>",
      "<div class='panel-heading text-center'>",
      "<h3> What do oyu like to do?</h3>",
      "</div>",
      "<div class='panel-body text-center'>",
      "<h4><a class='scrape-new'>Try to scrape new articles</a></h4>",
      "</div>",
      "</div>"
    ].join(""));
    // appending the the page
    articleContainer.appen(emptyAlert);
  }

  function handleArticleSave() {
    let articleToSave = $(this).parents(".panel").data();
    articleToSave.save = true;
    $.ajax({
      method: "PATCH",
      url: "/api/Headlines",
      data: articleToSave
    })
    .then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }
  function handleArticleScrape(){
    $.get("/api/fetch")
      .then(function(data) {
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
    });
  }
});