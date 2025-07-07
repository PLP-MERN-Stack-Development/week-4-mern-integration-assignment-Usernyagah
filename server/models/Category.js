const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name must not exceed 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Pre-save hook to generate slug from name
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }

  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  next();
});

// Virtual for related posts
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
});

// Virtual for URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

module.exports = mongoose.model('Category', CategorySchema);
