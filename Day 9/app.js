const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const post = require("./models/post");
const crypto = require("crypto");
const path = require("path");
const upload = require("./config/multerconfig");

app.set("view engine", "ejs"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.get("/", function (req, res) {
  res.render("index");
});


app.get("/profile", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/profile/upload", isLoggedIn,function (req, res) {
  res.render("profileupload");
});

app.post("/upload",isLoggedIn, upload.single("image") ,async function (req, res) {
  let user = await userModel
    .findOneAndUpdate(
      { email: req.user.email },
      {profilepic:req.file.filename}
    )

  res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOne({ _id: req.params.id });
  res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

app.get("/delete/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOneAndDelete({ _id: req.params.id });
  await userModel.updateOne(
    { _id: req.user.userid },
    { $pull: { posts: req.params.id } }
  );
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/register", async function (req, res) {
  let { name, username, password, email, age } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, (req, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        name,
        username,
        password: hash,
        email,
        age,
      });

      let token = jwt.sign({ email: email, userid: createdUser._id }, "shhhhh");
      res.cookie("token", token);
      res.redirect("/profile");
    });
  });
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) return res.status(500).send("Something went Wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shhhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhhh");
    req.user = data;
    next();
  }
}

app.listen(3000, (req, res) => {
  console.log("Server is listening on port 3000");
});
