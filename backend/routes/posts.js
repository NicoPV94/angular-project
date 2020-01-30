const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg"
};

//Configuring multer to store files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIME type');
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images"); //Path is relative to the 'server.js' file.
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//Posting to the database
router.post("", multer({storage: storage}).single('image'),(req, res, next) => {
  const url = req.protocol + "://" + req.get('host');
  console.log(url);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post successful",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
    });
  });
});

//Updating post
router.put("/:id", (req, res) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Post updated successfully!" });
  });
});

//Getting posts from the database
router.get("", (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts
    });
  });
});

//Getting a specific post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

//Deleting a post
router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted successfully" });
  });
});

module.exports = router;
