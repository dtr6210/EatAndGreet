"use strict";

let Models = require("../models"); // matches index.js

const createPost = (data, res) => {
  // creates a new post using JSON data POSTed in request body
  console.log(data);
  new Models.Post(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getPosts = (res) => {
  // finds all posts
  Models.Post.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// to get post by id
const getPostById = (req, res) => {
  const postId = req.params.id;

  Models.Post.findById(postId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ result: 404, message: "Post not found" });
      }
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updatePost = (req, res) => {
  // updates the post matching the ID from the param using JSON data POSTed in request body
  console.log(req.body);
  Models.Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// to like a post
const likePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  Models.Post.findById(postId)
    .then((post) => {
      if (!post.likes.includes(userId)) {
        return Models.Post.findByIdAndUpdate(
          postId,
          { $push: { likes: userId } },
          { new: true }
        );
      } else {
        return Models.Post.findByIdAndUpdate(
          postId,
          { $pull: { likes: userId } },
          { new: true }
        );
      }
    })
    .then((updatedPost) =>
      res.status(200).send({ result: 200, data: updatedPost })
    )
    .catch((err) => res.status(500).send({ result: 500, error: err.message }));
};

const deletePost = (req, res) => {
  // deletes the post matching the ID from the param
  Models.Post.findByIdAndDelete(req.params.id)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

const getPostsByUser = (req, res) => {
  //gets all posts by a specific user
  const userId = req.params.id;

  Models.Post.find({ author: userId })
    .then((posts) => res.status(200).send({ result: 200, data: posts }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// to add a comment to a post
const addComment = (req, res) => {
  const postId = req.params.id;
  const commentData = {
    text: req.body.text,
    postBy: req.body.userId,
    createdAt: new Date(),
  };
  Models.Post.findByIdAndUpdate(
    postId,
    { $push: { comments: commentData } },
    { new: true }
  )
    .then((updatedPost) => res.status(200).json(updatedPost))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsByUser,
  getPostById,
  likePost,
  addComment,
};
