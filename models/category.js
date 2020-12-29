const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
    }
)

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
