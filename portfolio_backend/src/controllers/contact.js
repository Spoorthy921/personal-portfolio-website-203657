'use strict';

const contactService = require('../services/contact');

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

class ContactController {
  // PUBLIC_INTERFACE
  submit(req, res) {
    /** Submit a contact message. */
    const payload = req.body || {};
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (name.length < 2) {
      return res.status(400).json({ status: 'error', message: 'Name must be at least 2 characters.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ status: 'error', message: 'A valid email is required.' });
    }
    if (message.length < 10) {
      return res.status(400).json({ status: 'error', message: 'Message must be at least 10 characters.' });
    }

    const created = contactService.submitMessage({ name, email, message });
    return res.status(201).json({
      status: 'ok',
      message: 'Message received. Thank you!',
      data: created
    });
  }
}

module.exports = new ContactController();
