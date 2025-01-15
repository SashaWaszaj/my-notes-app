const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert the name of the note.'],
        minLength: [3, 'Please use at least 3 letters for the note title.']
    },
    content: {
        type: String,
        required: [true, 'Please insert content on the note.'],
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
      
});

const Note = mongoose.model ("Note", noteSchema);

module.exports = Note;