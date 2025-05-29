import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createNote = async (req, res) => {
  try {
    const newNote = new Note({ ...req.body, user: req.userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedNote) return res.status(404).json({ error: 'Note not found or unauthorized' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete note' });
  }
};
