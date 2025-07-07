const Post = require('../models/Post');
const Category = require('../models/Category');

// GET /api/posts - Get all published posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .populate('author', 'name')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:slug - Get single post by slug and increment view count
exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name')
      .populate('category', 'name slug');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.incrementViewCount();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// POST /api/posts - Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/:id - Update an existing post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id - Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// POST /api/posts/:id/comments - Add a comment to a post
exports.addComment = async (req, res, next) => {
  try {
    const { userId, content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.addComment(userId, content);

    res.status(201).json(post.comments);
  } catch (error) {
    next(error);
  }
};
