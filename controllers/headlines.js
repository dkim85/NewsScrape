// Bring scrape script and create scripts
const scrape = require("../scripts/scrape");
const createDate = require ("../scripts/date");

// bring headline and mongoose models
const Headline = require("../models/Headline");

module.exports = {
  fetch: function(cb) {
    scrape(function(data) {
      let articles = data;
      for (let i=0; i < articles.length; i++) {
        articles[i].date = createDate();
        articles[i].saved = false;
      }
      Headline.collection.insertMany(articles, {ordered:false}, function(err,docs) {
        cb(err,docs);
      });
    });
  },
  // delete an article funcrion
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query)
    .sort({
      _id: -1
    })
    .exec(function(err, doc) {
      cb(doc);
    });
  },
  update: function(query, cb) {
    Headline.update({_id: query._id}, {
      $set: query
    }, {}, cb);
  }
}