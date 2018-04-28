const mongoose = require('mongoose');

//schema

const commentSchema = mongoose.Schema({
    message: String,
});



module.exports = mongoose.model("Comment", commentSchema);
