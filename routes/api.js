// routes/api.js
import express from 'express';
import Skill from '../models/skills.js';
import Contact from '../models/contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ✅ GET visible skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ visible: true });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills.' });
  }
});

// 📩 Submit contact message + save to DB + send email
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // Save to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Create Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    // Styled HTML Email
    const htmlContent = `
      <div style="font-family: 'Segoe UI', sans-serif; color: #1f2937; padding: 20px;">
        <h2 style="color: #7F5AF0; margin-bottom: 12px;">📬 New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f3f4f6; padding: 12px 16px; border-left: 4px solid #7F5AF0; margin: 8px 0;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
        <hr style="margin-top: 24px;"/>
        <p style="font-size: 0.9em; color: #6b7280;">Sent from your portfolio contact form.</p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Message from ${name} via Portfolio`,
      html: htmlContent,
    });

    // Respond
    res.status(201).json({ success: true, message: 'Thanks for contacting me!' });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

export default router;