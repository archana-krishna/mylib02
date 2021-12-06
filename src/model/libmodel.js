const mongoose = require('mongoose');
 //mongoose.connect('mongodb://localhost:27017/libmodel');
//mongoose.connect('mongodb+srv://archana:archana@library.f2gvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://archana:archana@diwali.3xexs.mongodb.net/diwali?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewLibrarySchema = new Schema({
    
    title:String,
    author:String,
    genre:String,
    image:String


});

var bookdata = mongoose.model('lib',NewLibrarySchema);
module.exports = bookdata;