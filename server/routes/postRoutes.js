let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); // index.js

// http://localhost:8080/api/posts/   Adds a GET route to return all posts
router.get("/", (req, res) => {
    console.log("GET /api/posts/ - Fetching all posts");
    Controllers.postController.getPosts(res);
  });

// http://localhost:8080/api/posts/create   Adds a POST route to create a new post
router.post("/create", (req, res) => {
    console.log(
      "POST /api/posts/create - Creating a new post with data:",
      req.body
    );
    Controllers.postController.createPost(req.body, res);
  });

  // http://localhost:8080/api/posts/<id>   Adds a PUT route to update a post
router.put("/:id", (req, res) => {
    console.log(
      `PUT /api/posts/${req.params.id} - Updating post with data:`,
      req.body
    );
    Controllers.postController.updatePost(req, res);
  });

  // http://localhost:8080/api/posts/<id>   Adds a DELETE route to delete a post
router.delete("/:id", (req, res) => {
    console.log(`DELETE /api/posts/${req.params.id} - Deleting post`);
    Controllers.postController.deletePost(req, res);
  });

  // http://localhost:8080/api/posts/byUser/<id>   Adds a GET route to get all posts by a user
router.get("/byUser/:id", (req, res) => {
    console.log(`Getting all posts by user`);
    Controllers.postController.getPostsByUser(req, res);
  });



  module.exports = router;