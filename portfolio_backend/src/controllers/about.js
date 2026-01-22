'use strict';

const aboutService = require('../services/about');

class AboutController {
  // PUBLIC_INTERFACE
  get(req, res) {
    /** Return About information. */
    return res.status(200).json({ status: 'ok', data: aboutService.getAbout() });
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update About information. */
    const payload = req.body || {};
    if (payload.name !== undefined && String(payload.name).trim().length < 2) {
      return res.status(400).json({ status: 'error', message: 'Name must be at least 2 characters.' });
    }
    const updated = aboutService.updateAbout(payload);
    return res.status(200).json({ status: 'ok', data: updated });
  }
}

module.exports = new AboutController();
