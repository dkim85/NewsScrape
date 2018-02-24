// global
$(document).ready(function() {
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
    .then(function(data) {
      // render headlines if it's available
      if (data && data.length) {
        renderArticles(data);
      }
      else{
      // otherwise render a messager if articles are not found
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    const articlePanels = [];
    for (let i=0; 1 < articles.length; i++) {
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
  }
})