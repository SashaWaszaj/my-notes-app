const express = require('express');
const noteRouter = express.Router();
const noteControllers = require ('../controllers/notes.controller');

noteRouter.post('/new', noteControllers.createNote);
noteRouter.get('/', noteControllers.getAllNotes);
noteRouter.get('/:id', noteControllers.getNoteById);
noteRouter.put('/:id/edit', noteControllers.updateNote); 
noteRouter.delete('/:id/delete', noteControllers.deleteNote);

module.exports = noteRouter;