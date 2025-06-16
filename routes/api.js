// routes/api.js
import express from 'express';
import Skill from '../models/skills.js';
import Contact from '../models/contact.js';

const router = express.Router();

// ✅ Get only visible skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ visible: true }); // ⬅️ Only visible skills
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills.' });
  }
});

// 📩 Submit a contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Thanks for contacting me!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
});

export default router;