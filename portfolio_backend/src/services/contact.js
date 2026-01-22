'use strict';

const store = require('../data/portfolioStore');
const { randomUUID } = require('crypto');

class ContactService {
  // PUBLIC_INTERFACE
  submitMessage(payload) {
    /** Store a contact message and return the created record. */
    const message = {
      id: randomUUID(),
      name: String(payload.name || '').trim(),
      email: String(payload.email || '').trim(),
      message: String(payload.message || '').trim(),
      createdAt: new Date().toISOString()
    };
    store.contactMessages.unshift(message);
    return message;
  }
}

module.exports = new ContactService();
