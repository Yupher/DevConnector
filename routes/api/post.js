const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const validatePostInPut = require("../../validation/post");

//GET get all posts
// api/post public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: "no post found" });
      }
      res.json(post);
    })
    .catch(e => res.json(e));
});
//GET get a post by id
// api/post/:id public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: "no post found" });
      }
      res.json(post);
    })
    .catch(e => res.json(e));
});

//POST create a post
// api/post private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInPut(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//DELETE delete a post by id
// api/post/:id private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let user_id = post.user.toString();
      if (user_id !== req.user.id) {
        return res.status(401).json({ auth: "not authorizied" });
      }
      post.remove();
      res.json({ succes: true });
    } catch (error) {
      res.json(error);
    }
  }
);

//PUT update a post by id
// api/post/:id private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let user_id = post.user.toString();
      if (user_id !== req.user.id) {
        return res.status(401).json({ auth: "not authorizied" });
      }
      const updPost = await Post.findOneAndUpdate(
        { user: req.user.id },
        { $set: { text: req.body.text } },
        { new: true }
      );
      try {
        res.json(updPost);
      } catch (error) {
        res.json(error);
      }
    } catch (error) {
      res.json(error);
    }
  }
);

//POST like or remove like to a post
// api/post/like/:id private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let checkIflike = post.likes.filter(
        like => like.user.toString() === req.user.id
      ).length;
      if (checkIflike > 0) {
        let removeIndex = post.likes
          .map(item => {
            item.user.toString();
          })
          .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post);
      } else {
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post);
      }
    } catch (error) {
      res.json(error);
    }
  }
);

//POST add comment to a post
// api/post/comment/:id privat
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePostInPut(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      let post = await Post.findById(req.params.id);
      let newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  }
);

//DELETE comment from a post
// api/post/comment/:id privat
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      let removeIndex = post.comments
        .map(item => item.id)
        .indexOf(req.params.comment_id);
      let isExist = post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length;
      let commentUser = post.comments.filter(
        comment => comment.user.toString() === req.user.id
      ).length;
      if (isExist === 0) res.json({ error: "can not find the comment" });
      if (post.user.toString() === req.user.id || commentUser > 0) {
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post);
      } else {
        res.json({ acces: "unauthorized" });
      }
    } catch (error) {
      res.json(error);
    }
  }
);

//PUT update comment
//api/post/comment/:d/comment_id
router.put(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let post = await Post.findById(req.params.id);
    try {
      let commentUser = post.comments.filter(
        comment => comment.user.toString() === req.user.id
      ).length;
      if (commentUser < 0) return res.json({ access: unauthorized });
      post.comments.map(newComment => {
        newComment.text = req.body.text;
        post.save();
        res.json(post);
      });
    } catch (error) {
      res.json(error);
    }
  }
);

module.exports = router;
