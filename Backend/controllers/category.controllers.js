const Category = require('../models/category.model');
const Note = require('../models/notes.model');

module.exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.addCategoryToNote = async (req, res) => {
    const { noteId, categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const note = await Note.findByIdAndUpdate(
            noteId,
            { $push: { categories: categoryId } },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.removeCategoryFromNote = async (req, res) => {
    const { noteId, categoryId } = req.params;
    try {
        const note = await Note.findByIdAndUpdate(
            noteId,
            { $pull: { categories: categoryId } },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getNotesByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const notes = await Note.find({ categories: categoryId }).populate('categories');
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

