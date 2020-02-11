const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostController = require("../controllers/posts");

const router = express.Router();

//Posting to the database
router.post("", checkAuth, extractFile, PostController.createPost);

//Updating post
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

//Getting posts from the database
router.get("", PostController.getPosts);

//Getting a specific post
router.get("/:id", PostController.getPost);

//Deleting a post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
