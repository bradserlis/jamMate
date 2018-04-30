const mongoose = require('mongoose');

//schema

const commentSchema = mongoose.Schema({
   message: String,
   author: String
});



module.exports = mongoose.model("Comment", commentSchema);
