const mongoose = require('mongoose');

var postModel = mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    imageURL : {
        type : String,
        required : true
    },

    content : {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('posts', postModel);