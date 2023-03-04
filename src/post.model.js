const mongoose = require('mongoose');

const { Schema } = mongoose;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const PostSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
    },
    imagePath: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    relatedPosts: [],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', PostSchema);
