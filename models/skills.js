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
  },
  icon: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true, // 👁 visible by default
  }
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;