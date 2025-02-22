const { error } = require('console');
const fs = require('fs');

// fs.writeFile("hello.txt","Hello World!",function(err){
    //     if(err) console.error(err);
    //     else console.log("Done");
    
    // })
    
    // fs.appendFile("hello.txt"," Hello World! again",function(err){
        //     if(err) console.error(err);
        //     else console.log("Done");
        
        // })
        
        // fs.rename("hello.txt","main.cpp",function(err){
            //     if(err) console.error(err);
            //     else console.log("File Renamed");
            // })
            
            // fs.copyFile("main.cpp","./copy/hello.txt",function(err){
                //     if(err) console.error(err.message);
                //     else console.log("File Copied");
// })

// fs.unlink("main.cpp",function(err){
    //     if(err) console.error(err);
    //     else console.log("File Removed");
    // })
    
    // fs.rm("./copy",{recursive:true},function(err){
        //     if(err) console.error(err);
        //     else console.log("Directory removed");
        // })
        
const http = require('http');

const server =  http.createServer(function(req,res){
    res.end("Hello world");
})
server.listen(3000);