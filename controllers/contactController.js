// controllers/contactController.js

import Contact from '../models/contact.js';

// GET all messages (for admin viewing)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
};

// CREATE a new message (from contact form)
export const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message received!', data: newMessage });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit message', error });
  }
};

// DELETE a message by ID
export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
};