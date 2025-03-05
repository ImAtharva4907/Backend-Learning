const express =  require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// app.get("/",function(req,res){
//     res.cookie("name","atharva chauhan");
//     res.send("Hello World!!");
// })
// app.get("/read",function(req,res){
//     console.log(req.cookies);
//     res.send("read Page");
// })

// const bcrypt = require("bcrypt");
// app.get("/",function(req,res){
//     bcrypt.genSalt(10, function(err, salt) {
//         // console.log(salt);
//         bcrypt.hash("@1234", salt, function(err, hash) {
//             // Store hash in your password DB.
//             // console.log(hash);
//         });
//     });
// })
// app.get("/check",function(req,res){
//     res.send("Read PAge");
//     bcrypt.compare("@1234", "$2b$10$Rjy/KiIXOoYceqFNbvoi1OAaYQurWBJygTTCigXFkp8LmnJs4HMWG", function(err, result) {
//         // result == true
//         console.log(result);
//     });
// })


const jwt = require("jsonwebtoken");

app.get("/",function(req,res){
    let token =  jwt.sign({email:"atharva@gmail.com"},"secret");
    console.log(token);
    res.cookie("token",token);
    res.send("Done");
})

app.get("/read",function(req,res){
    res.send("Read Page");
    // console.log(req.cookies.token);

    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
})





app.listen(3000,()=>{
    console.log("Server is listening 3000")
});