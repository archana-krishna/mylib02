const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/libmodel');

const Schema = mongoose.Schema;

var NewLibrarySchema = new Schema({
    
    title:String,
    author:String,
    genre:String,
    image:String


});

var bookdata = mongoose.model('lib',NewLibrarySchema);
module.exports = bookdata;