'use strict';

const skillsService = require('../services/skills');

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

class SkillsController {
  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all skills. */
    return res.status(200).json({ status: 'ok', data: skillsService.list() });
  }

  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a skill. */
    const payload = req.body || {};
    if (!isNonEmptyString(payload.name)) {
      return res.status(400).json({ status: 'error', message: 'Skill name is required.' });
    }
    const created = skillsService.create(payload);
    return res.status(201).json({ status: 'ok', data: created });
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update a skill. */
    const payload = req.body || {};
    const updated = skillsService.update(req.params.id, payload);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Skill not found.' });
    return res.status(200).json({ status: 'ok', data: updated });
  }

  // PUBLIC_INTERFACE
  remove(req, res) {
    /** Delete a skill. */
    const removed = skillsService.remove(req.params.id);
    if (!removed) return res.status(404).json({ status: 'error', message: 'Skill not found.' });
    return res.status(200).json({ status: 'ok', data: { deleted: true } });
  }
}

module.exports = new SkillsController();
