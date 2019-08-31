const notesController = {};

const Note = require('../models/Note');

notesController.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesController.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
};

notesController.createNote = async (req, res) => {
  const { title, info, author } = req.body;
  const newNote = new Note({
    title,
    info,
    author
  });
  await newNote.save();

  res.json({ message: 'note Saved' });
};

notesController.updateNote = async (req, res) => {
  const { title, info, author } = req.body;
  await Note.findOneAndUpdate({_id: req.params.id },req.params.id, {
    title,
    info,
    author
  });
  res.json({ message: 'Note updated' });
};

notesController.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
};

module.exports = notesController;
