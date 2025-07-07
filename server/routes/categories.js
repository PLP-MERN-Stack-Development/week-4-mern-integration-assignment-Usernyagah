const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');



router.get('/', getCategories);                        // GET /api/categories
router.get('/:slug', getCategoryBySlug);               // GET /api/categories/:slug
router.post('/', /* protect, */ createCategory);       // POST /api/categories
router.put('/:id', /* protect, */ updateCategory);     // PUT /api/categories/:id
router.delete('/:id', /* protect, */ deleteCategory);  // DELETE /api/categories/:id

module.exports = router;
