'use strict';

const store = require('../data/portfolioStore');
const { randomUUID } = require('crypto');

class SkillsService {
  // PUBLIC_INTERFACE
  list() {
    /** List all skills. */
    return store.skills;
  }

  // PUBLIC_INTERFACE
  create(payload) {
    /** Create a new skill. */
    const skill = {
      id: randomUUID(),
      name: String(payload.name || '').trim(),
      level: String(payload.level || 'Intermediate').trim()
    };
    store.skills.unshift(skill);
    return skill;
  }

  // PUBLIC_INTERFACE
  update(id, payload) {
    /** Update a skill by id. */
    const idx = store.skills.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const existing = store.skills[idx];
    const updated = {
      ...existing,
      ...payload,
      id: existing.id
    };
    if (typeof updated.name === 'string') updated.name = updated.name.trim();
    if (typeof updated.level === 'string') updated.level = updated.level.trim();

    store.skills[idx] = updated;
    return updated;
  }

  // PUBLIC_INTERFACE
  remove(id) {
    /** Delete a skill by id. Returns true if removed. */
    const before = store.skills.length;
    store.skills = store.skills.filter((s) => s.id !== id);
    return store.skills.length !== before;
  }
}

module.exports = new SkillsService();
