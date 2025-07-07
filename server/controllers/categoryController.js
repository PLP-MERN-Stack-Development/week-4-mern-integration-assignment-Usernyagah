const Category = require('../models/Category');

// GET /api/categories - Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:slug - Get category and its posts
exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).populate('posts');
    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// POST /api/categories - Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// PUT /api/categories/:id - Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id - Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
