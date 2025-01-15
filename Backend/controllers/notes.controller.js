const Note = require('../models/notes.model');

module.exports.createNote = async (req, res) => {
    try {
        const newNote = await Note.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllNotes = async (req, res) => {
    try {
      const notes = await Note.find()
        .populate('categories') 
        .exec();
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id });
        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }
        res.status(204).json({ message: "Note successfully deleted." });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.getNoteById = (req, res) => {
    Note.findById(req.params.id)
        .then((note) => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(200).json(note);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json(error.message);
        });
};

module.exports.updateNote = async (req, res) => {
    try {
      const { title, content, categories } = req.body;
      const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content, categories },
        { new: true }
      );
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  