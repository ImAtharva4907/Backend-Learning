const  express  = require("express");
const app = express()


app.use(function(req,res,next){
    console.log("Middleware");
    next();
})
app.use(function(req,res,next){
    console.log("Middleware2");
    next();
})
app.get("/",function(req,res){
    res.send("Hello World!")
})
app.get("/profile",function(req,res,next){
    // res.send("This is Profile Page")
    return next(new Error("Something went wrong"))
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something broke!")
    
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});