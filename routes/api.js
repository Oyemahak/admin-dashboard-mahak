// routes/api.js
import express from 'express';
import Skill from '../models/skills.js';
import Contact from '../models/contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ✅ Get only visible skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ visible: true });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills.' });
  }
});

// 📩 Submit a contact message + save to DB + send pretty email
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // ✅ Save to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // ✅ Send HTML Email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `📬 New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #7F5AF0;">You've received a new contact form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
          <hr/>
          <p style="font-size: 0.85em; color: #888;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Thanks for contacting me!' });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

export default router;