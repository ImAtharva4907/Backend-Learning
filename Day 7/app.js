const express  = require("express");
const app = express();
const userModel = require("./models/user");

const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",function(req,res){
    res.render("index");
})
app.post("/create", function(req,res){
    let {username,email,password,age} = req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser = await userModel.create({
                username,
                email,
                password:hash,
                age
            })
            let token = jwt.sign({email},"shhhhhhhhhh");
            res.cookie("token",token);
            res.send(createdUser);
        })
    })
})

app.get("/logout",function(req,res){
    res.cookie("token","");
    res.redirect("/");
})

app.get("/login",function(req,res){
    res.render("login");
})
app.post("/login",async function(req,res){
    let user = await userModel.findOne({email: req.body.email});
    if(!user) res.send("Something went wrong");

    bcrypt.compare(req.body.password,user.password,function(req,result){
        if(!result) 
        {
            res.send("Something went wrong");
            return; 
        }
        else
        {
            let token = jwt.sign({email:user.email},"shhhhhhhhhh");
            res.cookie("token",token);
            res.send("Login Successful");
        }

    
    })



})

app.listen(3000,function(req,res){
    console.log("Server is Running on 3000");
})