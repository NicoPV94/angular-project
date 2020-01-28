const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

//Creating express app
const app = express();

//Connecting to MongoDB
// mongoose.connect('mongodb+srv://nico:9l68ELZvaWm4jqnc@cluster0-7auiq.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to database!');
//     })
//     .catch(() => {
//         console.log('Connection failed!');
//     });
mongoose
  .connect("mongodb://10.0.0.73:27017/node-angular", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//Parsing request's body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS Configuration middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//Posting to the database
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
        message: "Post successful",
        postId: createdPost._id
    });
  });
  
});

//Fetching from the database
app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
      });
  });
  
});

app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post deleted successfully"});
    })
});

//Exporting the express app
module.exports = app;
