'use strict';

/**
 * Simple in-memory store for portfolio content.
 * NOTE: This intentionally avoids a database to keep the project beginner-friendly.
 * Data resets when the server restarts.
 */

const { randomUUID } = require('crypto');

// Seed data (safe defaults)
const store = {
  about: {
    name: 'Your Name',
    title: 'Full-Stack Developer',
    location: 'City, Country',
    summary:
      'I build clean, responsive web apps and enjoy working across frontend and backend. Replace this text with your own bio.',
    email: 'you@example.com',
    socials: {
      github: 'https://github.com/your-handle',
      linkedin: 'https://www.linkedin.com/in/your-handle',
      website: ''
    }
  },
  projects: [
    {
      id: randomUUID(),
      name: 'Portfolio Website',
      description: 'A simple full-stack portfolio site built with React and Express.',
      tags: ['React', 'Express', 'REST'],
      links: {
        repo: '',
        live: ''
      }
    }
  ],
  skills: [
    { id: randomUUID(), name: 'JavaScript', level: 'Advanced' },
    { id: randomUUID(), name: 'React', level: 'Intermediate' },
    { id: randomUUID(), name: 'Node.js', level: 'Intermediate' }
  ],
  contactMessages: []
};

module.exports = store;
