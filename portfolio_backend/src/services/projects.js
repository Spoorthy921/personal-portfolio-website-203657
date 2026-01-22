'use strict';

const store = require('../data/portfolioStore');
const { randomUUID } = require('crypto');

class ProjectsService {
  // PUBLIC_INTERFACE
  list() {
    /** List all projects. */
    return store.projects;
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Get one project by id. */
    return store.projects.find((p) => p.id === id) || null;
  }

  // PUBLIC_INTERFACE
  create(payload) {
    /** Create a project. */
    const project = {
      id: randomUUID(),
      name: String(payload.name || '').trim(),
      description: String(payload.description || '').trim(),
      tags: Array.isArray(payload.tags) ? payload.tags.map(String) : [],
      links: {
        repo: payload.links?.repo ? String(payload.links.repo) : '',
        live: payload.links?.live ? String(payload.links.live) : ''
      }
    };

    store.projects.unshift(project);
    return project;
  }

  // PUBLIC_INTERFACE
  update(id, payload) {
    /** Update a project by id. */
    const idx = store.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const existing = store.projects[idx];
    const updated = {
      ...existing,
      ...payload,
      id: existing.id,
      tags: Array.isArray(payload.tags) ? payload.tags.map(String) : existing.tags,
      links: {
        ...(existing.links || {}),
        ...(payload.links || {})
      }
    };

    store.projects[idx] = updated;
    return updated;
  }

  // PUBLIC_INTERFACE
  remove(id) {
    /** Delete a project by id. Returns true if removed. */
    const before = store.projects.length;
    store.projects = store.projects.filter((p) => p.id !== id);
    return store.projects.length !== before;
  }
}

module.exports = new ProjectsService();
