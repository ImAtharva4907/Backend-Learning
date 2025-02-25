const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/",(req,res)=>{
    res.send("Hello, World");
})
app.get("/create",async (req,res)=>{
    let createdUser = await userModel.create({
        name:"Atharva2",
        email:"Atharva@gmail.com",
        username:"atharva2",
    })
    res.send(createdUser);
})
app.get("/update",async (req,res)=>{
    let updatedUser = await userModel.findOneAndUpdate({username:"atharva"},{name:"Atharva Chauhan"},{new:true});
    res.send(updatedUser);
})
app.get("/read",async (req,res)=>{
   let users = await userModel.find();
//    let users = await userModel.find({username:"atharva"});
   res.send(users);
})
app.get("/delete",async (req,res)=>{
   let deletedUser = await userModel.findOneAndDelete({username:"atharva2"});
   res.send(deletedUser);
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})