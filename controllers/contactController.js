// controllers/contactController.js
import Contact from '../models/contact.js';
import nodemailer from 'nodemailer';

// ✅ Email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_PASS
  }
});

// GET all messages for admin
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ timestamp: -1 });
    res.render('messages', { messages });
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
};

// POST - Submit contact form
export const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Send email notification to you
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `📩 New Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (error) {
    res.status(500).json({ error: 'Message failed. Try again later.' });
  }
};

// DELETE a message
export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/admin/messages');
  } catch (error) {
    res.status(500).send('Error deleting message');
  }
};