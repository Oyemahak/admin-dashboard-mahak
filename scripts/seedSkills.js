// scripts/seedSkills.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from '../models/skills.js';

dotenv.config();

const skills = [
  // Development
  { name: 'JavaScript', category: 'Development', icon: 'javascript-plain' },
  { name: 'TypeScript', category: 'Development', icon: 'typescript-plain' },
  { name: 'React', category: 'Development', icon: 'react-original' },
  { name: 'Node.js', category: 'Development', icon: 'nodejs-plain' },
  { name: 'Python', category: 'Development', icon: 'python-plain' },
  { name: 'HTML5', category: 'Development', icon: 'html5-plain' },
  { name: 'CSS3', category: 'Development', icon: 'css3-plain' },
  { name: 'Tailwind', category: 'Development', icon: 'tailwindcss-plain' },

  // Design & Tools
  { name: 'Figma', category: 'Design & Tools', icon: 'figma-plain' },
  { name: 'Adobe XD', category: 'Design & Tools', icon: 'xd-plain' },
  { name: 'Photoshop', category: 'Design & Tools', icon: 'photoshop-plain' },
  { name: 'Illustrator', category: 'Design & Tools', icon: 'illustrator-plain' },
  { name: 'VS Code', category: 'Design & Tools', icon: 'vscode-plain' },
  { name: 'Git', category: 'Design & Tools', icon: 'git-plain' },
  { name: 'GitHub', category: 'Design & Tools', icon: 'github-original' },
  { name: 'Jira', category: 'Design & Tools', icon: 'jira-plain' },

  // Cloud & Databases
  { name: 'AWS', category: 'Cloud & Databases', icon: 'amazonwebservices-plain' },
  { name: 'GCP', category: 'Cloud & Databases', icon: 'googlecloud-plain' },
  { name: 'Firebase', category: 'Cloud & Databases', icon: 'firebase-plain' },
  { name: 'MongoDB', category: 'Cloud & Databases', icon: 'mongodb-plain' },
  { name: 'PostgreSQL', category: 'Cloud & Databases', icon: 'postgresql-plain' },
  { name: 'MySQL', category: 'Cloud & Databases', icon: 'mysql-plain' },
  { name: 'Docker', category: 'Cloud & Databases', icon: 'docker-plain' },
  { name: 'Kubernetes', category: 'Cloud & Databases', icon: 'kubernetes-plain' },
];

const seedSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Skill.deleteMany(); // Optional: remove existing
    await Skill.insertMany(skills);
    console.log('✅ Skills seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding skills:', error);
    process.exit(1);
  }
};

seedSkills();