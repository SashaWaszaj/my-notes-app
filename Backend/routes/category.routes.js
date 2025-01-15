const express = require('express');
const categoryRouter = express.Router();
const categoryControllers = require ('../controllers/category.controllers');

categoryRouter.post('/new', categoryControllers.createCategory);
categoryRouter.put('/add-category-to-note', categoryControllers.addCategoryToNote);
categoryRouter.put('/remove-category-from-note', categoryControllers.removeCategoryFromNote);
categoryRouter.get('/notes-by/:category', categoryControllers.getNotesByCategory); 
categoryRouter.get('/categories-all', categoryControllers.getAllCategories);
categoryRouter.delete('/delete/:id', categoryControllers.deleteCategory);

module.exports = categoryRouter;