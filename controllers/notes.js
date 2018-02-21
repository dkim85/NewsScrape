// controller for notes

const Note = require("../model.Note");
const createDate = require("../script/date");

module.exports = {
  get: function(data, cd) {
    Note.find({
      _headlineId: data._id
    }, cb);
  },
}