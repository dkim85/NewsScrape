// controller for notes

const Note = require("../models.Note");
let createDate = require("../scripts/date");

module.exports = {
  get: function(data, cd) {
    Note.find({
      _headlineId: data._id
    }, cb);
  },
  save: function(data,cb) {
    let newNote = {
      _headlineId: data._id,
      data: createDate(),
      noteText: data.noteText
    };
    Note.create(newNOte, function (err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(doc);
        cb(doc);
      }
    });
  },
}