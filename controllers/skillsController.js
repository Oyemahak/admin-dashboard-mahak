// controllers/skillsController.js

import Skill from '../models/skills.js';

// GET all skills (for API or dashboard)
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving skills', error });
  }
};

// CREATE a new skill (now includes icon)
export const createSkill = async (req, res) => {
  const { name, category, icon } = req.body;
  try {
    const newSkill = new Skill({ name, category, icon });
    await newSkill.save();
    res.status(201).json({ message: 'Skill created', skill: newSkill });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create skill', error });
  }
};

// DELETE a skill by ID
export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error });
  }
};