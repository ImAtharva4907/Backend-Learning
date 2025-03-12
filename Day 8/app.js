const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function (req, res) {
  res.send("Hello from Backend");
});
app.get("/create", async function (req, res) {
  let createdUser = await userModel.create({
    username: "Atharva",
    age: "22",
    email: "Atharva@gmail.com",
  });
  res.send(createdUser);
});
app.get("/post/create", async function (req, res) {
    let createdPost =  await postModel.create({
        postdata: "Hello 1st Post",
        user:"67d0598913034cd6f7dc94e9"
    })
    let user = await userModel.findOne({_id:"67d0598913034cd6f7dc94e9"});
    user.posts.push(createdPost._id);
    await user.save();
    res.send(createdPost);
});

app.listen(3000, function (req, res) {
  console.log("Server is running on 3000");
});
