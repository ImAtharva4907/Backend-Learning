const express = require("express");
const app = express();
const  path = require("path");
const fs = require('fs');
const { log, error } = require("console");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
   fs.readdir(`./files`,function(err,files){
      // log(files); 
      res.render("index",{files:files});
   })
})
app.get('/file/:filename',function(req,res){
      fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,fileData){
         if(err) error(err);
         res.render("show",{filename:req.params.filename,filedata:fileData});
      });
})
app.get('/edit/:filename',function(req,res){
   res.render("edit",{filename : req.params.filename});
})
app.post('/edit',function(req,res){
   fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
      res.redirect("/");
   });
})

app.post('/create',function(req,res){
   log(req.body);
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
      if(err) error(err);
      else res.redirect("/");
      
   });
   
})

app.listen(3000);