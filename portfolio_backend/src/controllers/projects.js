'use strict';

const projectsService = require('../services/projects');

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

class ProjectsController {
  // PUBLIC_INTERFACE
  list(req, res) {
    /** List all projects. */
    return res.status(200).json({ status: 'ok', data: projectsService.list() });
  }

  // PUBLIC_INTERFACE
  get(req, res) {
    /** Get one project. */
    const project = projectsService.getById(req.params.id);
    if (!project) return res.status(404).json({ status: 'error', message: 'Project not found.' });
    return res.status(200).json({ status: 'ok', data: project });
  }

  // PUBLIC_INTERFACE
  create(req, res) {
    /** Create a project. */
    const payload = req.body || {};
    if (!isNonEmptyString(payload.name)) {
      return res.status(400).json({ status: 'error', message: 'Project name is required.' });
    }
    if (!isNonEmptyString(payload.description)) {
      return res.status(400).json({ status: 'error', message: 'Project description is required.' });
    }
    const created = projectsService.create(payload);
    return res.status(201).json({ status: 'ok', data: created });
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /** Update a project by id. */
    const payload = req.body || {};
    const updated = projectsService.update(req.params.id, payload);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Project not found.' });
    return res.status(200).json({ status: 'ok', data: updated });
  }

  // PUBLIC_INTERFACE
  remove(req, res) {
    /** Delete a project by id. */
    const removed = projectsService.remove(req.params.id);
    if (!removed) return res.status(404).json({ status: 'error', message: 'Project not found.' });
    return res.status(200).json({ status: 'ok', data: { deleted: true } });
  }
}

module.exports = new ProjectsController();
