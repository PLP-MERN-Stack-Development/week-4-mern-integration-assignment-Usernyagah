const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');



router.get('/', getPosts);                          // GET /api/posts
router.get('/:slug', getPostBySlug);                // GET /api/posts/:slug
router.post('/', /* protect, */ createPost);        // POST /api/posts
router.put('/:id', /* protect, */ updatePost);      // PUT /api/posts/:id
router.delete('/:id', /* protect, */ deletePost);   // DELETE /api/posts/:id
router.post('/:id/comments', addComment);           // POST /api/posts/:id/comments

module.exports = router;
