const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/libmodel');
mongoose.connect('mongodb+srv://archana:archana@library.f2gvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

var NewAuthorSchema = new Schema({
    
    author:String,
    about:String,
    image:String


});

var authordata = mongoose.model('author',NewAuthorSchema);
module.exports = authordata;