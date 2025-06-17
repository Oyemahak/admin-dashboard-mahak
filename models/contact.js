import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
  },
  adminComment: {
    type: String,
    default: ''
  },
  isTrashed: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;