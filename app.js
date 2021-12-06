
var express = require('express');
var app = new express(); 

const bookdata = require('./src/model/libmodel');
const authordata = require('./src/model/authormodel');

const cors = require('cors');
const path = require('path');
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());
app.use(express.static('./dist/Library'));

// insert

app.post('/api/book/insert',function(req,res){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
   
    console.log(req.body);
   
    var book = {       
        title: req.body.book.title,
        author : req.body.book.author,
        genre : req.body.book.genre,
        image : req.body.book.image,
   }       
   var book= new bookdata(book);
   book.save();
});

app.post('/api/author/insert',function(req,res){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
   
    console.log(req.body);
   
    var authors = {       
        
        author : req.body.authors.author,
        about: req.body.authors.about,
        image : req.body.authors.image,
   }       
   var author= new authordata(authors);
   author.save();
});

// display

app.get('/api/libs',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    bookdata.find()
                .then(function(products){
                    res.send(products);
                });
});


app.get('/api/authors',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    authordata.find()
                .then(function(products){
                    res.send(products);
                });
});

//individual


app.get('/api/book/:id',  (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  
    const id = req.params.id;
      bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  });

  app.get('/api/author/:id',  (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  
    const id = req.params.id;
      authordata.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  });

  //edit

    app.put('/api/book/update',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body)
    id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    genre = req.body.genre,
    image = req.body.image
   bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "genre":genre,
                                "image":image}})
   .then(function(){
       res.send();
   });
 });

 app.put('/api/author/update',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body)
    id=req.body._id,
    author = req.body.author,
    about = req.body.about,
    image = req.body.image
   authordata.findByIdAndUpdate({"_id":id},
                                {$set:{"author":author,
                                "about":about,
                                "image":image}})
   .then(function(){
       res.send();
   });
 });


 //delete

 app.delete('/api/book/remove/:id',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
   
    id = req.params.id;
    bookata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    });
  });

  app.delete('/api/author/remove/:id',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
   
    id = req.params.id;
    authordata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    });
  });




  app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist//Library/index.html'));
   });



app.listen(port,()=>{console.log("server Ready at"+port)});

