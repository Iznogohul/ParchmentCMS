/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const express = require('express');
const { arrayIsEmpty } = require('../utils');

const router = express.Router();

const Post = require('../post.model');

router.get('/', (req, res, next) => {
  if (req.query.page && req.query.limit) {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    Post.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort('-createdAt')
      .select('-__v -_id')
      .exec((err, posts) => {
        if (err) {
          res.statusCode = 500;
          next(new Error(err));
        }
        res.status(200).json(posts);
      });
  } else if (req.query.slug) {
    Post.findOne({ slug: req.query.slug })
      .select('-__v -_id')
      .exec((err, post) => {
        if (err) {
          res.statusCode = 500;
          next(new Error(err));
        } else if (post) {
          res.status(200).json(post);
        } else {
          res.statusCode = 204;
          next(new Error('Posts with that slug doesnt exist!'));
        }
      });
  } else {
    Post.find()
      .select('-__v -_id')
      .exec((err, posts) => {
        if (err) {
          res.statusCode = 500;
          next(new Error(err));
        } else if (!arrayIsEmpty(posts)) {
          res.status(200).json(posts);
        } else {
          res.statusCode = 204;
          next(new Error('Posts are empty!'));
        }
      });
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Post.findOne({ id })
    .select('-__v -_id')
    .exec((err, post) => {
      if (err) {
        res.statusCode = 500;
        next(new Error(err));
      } else if (post) {
        res.status(200).json(post);
      } else {
        res.statusCode = 204;
        next(new Error(`Post with id ${id} doesn't exist`));
      }
    });
});

router.post('/', (req, res, next) => {
  const post = new Post(req.body);
  post.id = post._id.toString().substring(0, 10).toUpperCase();
  post
    .save()
    .then((data) => {
      res.status(200).json({
        result: 'success',
        name: data.name,
        content: data.content,
        imagePath: data.imagePath,
      });
    })
    .catch(() => {
      res.statusCode = 409;
      next(new Error(`Post with title ${req.body.name} already exists.`));
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Post.deleteOne({ id }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      next(new Error(err));
    } else if (result.deletedCount) {
      res.status(200).json({ result: 'success' });
    } else {
      res.statusCode = 204;
      next(new Error("Post doesn't exist"));
    }
  });
});

router.get('/:id/relations', (req, res, next) => {
  const { id } = req.params;
  Post.findOne({ id }, (err, post) => {
    if (err) {
      res.statusCode = 500;
      next(new Error(err));
    } else if (post) {
      res.status(200).json({ relatedPosts: post.relatedPosts });
    } else {
      res.statusCode = 204;
      next(new Error(`Post with id ${id} doesn't exists.`));
    }
  });
});

router.post('/relation/', async (req, res, next) => {
  const sourceId = req.query.sourcePostId;
  const relationId = req.query.relationPostId;
  if (sourceId === relationId) {
    res.statusCode = 400;
    next(new Error("Can't make a relation using only one post"));
  } else {
    let sourcePost;
    let relationPost;
    try {
      relationPost = await Post.findOne({ id: relationId });
      sourcePost = await Post.findOne({ id: sourceId });
    } catch (err) {
      res.statusCode = 500;
      next(new Error(err));
    }
    if (relationPost === null) {
      res.statusCode = 400;
      next(
        new Error(
          "Relationship Post doesn't exist cant create a relationship with Post",
        ),
      );
    } else if (sourcePost === null) {
      res.statusCode = 400;
      next(
        new Error(
          "Post doesn't exist cant create a relationship with other Post",
        ),
      );
    } else {
      relationPost.relatedPosts = undefined;
      const index = sourcePost.relatedPosts.findIndex(
        (relation) => relation.id === relationId,
      );

      if (index === -1) {
        sourcePost.relatedPosts.push(relationPost);
        sourcePost
          .save()
          .then((post) => {
            res.status(200).json({ result: 'success', data: post });
          })
          .catch((err) => {
            res.statusCode = 500;
            next(new Error(err));
          });
      } else {
        res.statusCode = 409;
        next(new Error('Relationship already exists!'));
      }
    }
  }
});

module.exports = router;
