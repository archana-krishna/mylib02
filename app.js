
const express = require('express');
const bookdata = require('./src/model/libmodel');
const cors = require('cors');
const path = require('path');
var port - process.env.PORT||3000;
var app = new express();
app.use(cors());
app.use(express.json());
app.use(express.static(`./dist/<Library>`));


app.get(`/*`, function(req, res) {
    res.sendFile(path.join(__dirname + '/dist//Library/index.html'));
   });

app.post('/api/insert',function(req,res){
   
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



app.get('/api/libs',function(req,res){
    
    bookdata.find()
                .then(function(products){
                    res.send(products);
                });
});

app.get('/api/:id',  (req, res) => {
  
    const id = req.params.id;
      bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })


  app.put('/api/update',(req,res)=>{
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
   })
 })


 app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    bookata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })


app.listen(port,()=>{console.log("server Ready at"+port)});
    //console.log('/api/');
});