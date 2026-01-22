'use strict';

const store = require('../data/portfolioStore');

class AboutService {
  // PUBLIC_INTERFACE
  getAbout() {
    /** Get the current About payload. */
    return store.about;
  }

  // PUBLIC_INTERFACE
  updateAbout(payload) {
    /** Replace About payload (basic merge to keep fields not provided). */
    store.about = {
      ...store.about,
      ...payload,
      socials: {
        ...(store.about.socials || {}),
        ...(payload.socials || {})
      }
    };
    return store.about;
  }
}

module.exports = new AboutService();
