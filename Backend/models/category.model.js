const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name.'],
        unique: true, 
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long.']
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
