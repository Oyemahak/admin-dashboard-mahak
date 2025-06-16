// routes/adminRoutes.js
import express from 'express';
import Skill from '../models/skills.js';
import Contact from '../models/contact.js';

const router = express.Router();

// 🏠 Admin Dashboard (Home)
router.get('/', (req, res) => {
  res.render('dashboard');
});

// 🧠 Skills Management Page (GET)
router.get('/admin/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.render('skills', { skills });
  } catch (err) {
    res.status(500).send('Error loading skills');
  }
});

// ➕ Add Skill (POST)
router.post('/admin/skills', async (req, res) => {
  const { name, category, icon } = req.body;
  try {
    await Skill.create({ name, category, icon }); // 👈 includes icon
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(400).send('Error creating skill');
  }
});

// 🗑️ Delete Skill
router.post('/admin/skills/delete/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error deleting skill');
  }
});

// 📝 Edit Skill (GET form)
router.get('/admin/skills/edit/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).send('Skill not found');
    res.render('editSkill', { skill });
  } catch (err) {
    res.status(500).send('Error loading skill for editing');
  }
});

// 🔄 Update Skill (POST)
router.post('/admin/skills/edit/:id', async (req, res) => {
  const { name, category, icon } = req.body;
  try {
    await Skill.findByIdAndUpdate(req.params.id, { name, category, icon });
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error updating skill');
  }
});

// 👁 Toggle Skill Visibility (Hide/Unhide)
router.post('/admin/skills/toggle/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).send('Skill not found');

    skill.visible = !skill.visible;
    await skill.save();
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error toggling visibility');
  }
});

// 📬 Contact Messages Page (GET)
router.get('/admin/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ timestamp: -1 });
    res.render('messages', { messages });
  } catch (err) {
    res.status(500).send('Error loading messages');
  }
});

// 🗑️ Delete Contact Message
router.post('/admin/messages/delete/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/admin/messages');
  } catch (err) {
    res.status(500).send('Error deleting message');
  }
});

export default router;