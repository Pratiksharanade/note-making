import express from 'express';
import upload from '../middleware/upload.js';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Upload a note
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const newNote = new Note({
      title,
      subject,
      description,
      file: req.file?.filename,
      userId: req.user.id
    });

    await newNote.save();
    res.status(201).json({ message: 'Note uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to upload note.' });
  }
});

// ✅ Get notes for logged-in user (PLACE THIS ABOVE /:id!)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
});

// ✅ Get all notes (public route)
router.get('/all', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// ✅ Get a single note by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
});

// ✅ Delete note
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

// ✅ Update note
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to edit this note' });
    }

    note.title = title;
    note.subject = subject;
    note.description = description;

    await note.save();
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' });
  }
});

export default router;
