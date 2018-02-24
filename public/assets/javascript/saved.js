$(document).ready(function() {
  const articleContainer = $(".article-container");

  $(document).on("click", "btn.delete", handleArticleDelete);
  $(document).on("click", "btn.notes", handleArticleNotes);
  $(document).on("click", "btn.save", handleNoteSave);
  $(document).on("click", "btn.note-delete", handleNoteDelete);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/healdines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      }else {
        renderEmpty();
      }
    });
  }
  function renderArticles(articles) {
    let articlesPanels = [];
    for (let i=0; i < articles.lengtj; i++) {
      articlesPanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlesPanels);
  } 

  function createPanel(article) {
    let panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-danger delete'>",
        "Delete form Saved",
        "</a>",
        "<a class='btn btn-info notes'>Article Notes</a>",
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
        "<h4> Oups, it looks like we don't have any saved articles</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3> Would you like to browse available articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='Browse Articles'></a></h4>",
        "</div>",
        "</div>"
      ].join(""));
    // appending the the page
    articleContainer.append(emptyAlert);
  }

  function handleArticleDelete() {
    let articleToDelete = $(this).parents(".panel").data();
    $ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then (function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }

  function handleArticleNotes() {
    let currentArticle = $(this).parents(".panel").data();
    $.get("/api/notes" + currentArticle._id).then(function(data) {
      let modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes for Article: ",
        currentArticle._id,
        "</h4>"
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save note</button>",
        "</div>"
      ].join("");
      bootox.dialog({
        message: modalText,
        closeButton: true
      });
      let noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      $(".btn.save").data("article", noteData);
      renderNotesList(noteData);
    });
  }
})