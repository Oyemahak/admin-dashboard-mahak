// models/skills.js
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Development', 'Design & Tools', 'Cloud & Databases'],
    required: true,
  }
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;