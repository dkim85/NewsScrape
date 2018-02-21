// require request and cheerio to make screpes possible

const request = require("request");
const cheerio = require("cheerio");

const scrape = function (cb) {
  request("http://www.bbc.com/", function(err, res, body){
        const $ = cheerio.load(body);
        const articles = [];
        $(".article-info").each(function(i, element){

          let head = $(this).children(".article-title").text().trim();
          let sum = $(this).children(".excerpt").text().trim();
          // source bookmarked on chrome tsk
          if (head && sum) {
            let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            let sumneat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            let dataToAdd ={
              headline: headNeat,
              summary: sumneat
            };

            articles.push(dataToAdd);
          }
        });
        cb(articles);
      });
};

module.exports = scrape;