const mongoose = require('mongoose');

//schema

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});



module.exports = mongoose.model("Comment", commentSchema);
