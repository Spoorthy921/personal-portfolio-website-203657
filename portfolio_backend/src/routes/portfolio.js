'use strict';

const express = require('express');
const aboutController = require('../controllers/about');
const projectsController = require('../controllers/projects');
const skillsController = require('../controllers/skills');
const contactController = require('../controllers/contact');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Portfolio
 *     description: Portfolio content APIs
 */

/**
 * @swagger
 * /api/about:
 *   get:
 *     tags: [Portfolio]
 *     summary: Get About information
 *     responses:
 *       200:
 *         description: About payload
 *   put:
 *     tags: [Portfolio]
 *     summary: Update About information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Jane Doe" }
 *               title: { type: string, example: "Full-Stack Developer" }
 *               location: { type: string, example: "Austin, TX" }
 *               summary: { type: string, example: "Short bio..." }
 *               email: { type: string, example: "jane@example.com" }
 *               socials:
 *                 type: object
 *                 properties:
 *                   github: { type: string, example: "https://github.com/jane" }
 *                   linkedin: { type: string, example: "https://linkedin.com/in/jane" }
 *     responses:
 *       200:
 *         description: Updated About payload
 */
router.get('/about', aboutController.get.bind(aboutController));
router.put('/about', aboutController.update.bind(aboutController));

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags: [Portfolio]
 *     summary: List projects
 *     responses:
 *       200:
 *         description: Project list
 *   post:
 *     tags: [Portfolio]
 *     summary: Create a project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name: { type: string, example: "My App" }
 *               description: { type: string, example: "What it does..." }
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *               links:
 *                 type: object
 *                 properties:
 *                   repo: { type: string, example: "https://github.com/user/repo" }
 *                   live: { type: string, example: "https://example.com" }
 *     responses:
 *       201:
 *         description: Created project
 *
 * /api/projects/{id}:
 *   get:
 *     tags: [Portfolio]
 *     summary: Get a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Project
 *       404:
 *         description: Not found
 *   put:
 *     tags: [Portfolio]
 *     summary: Update a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated project
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Portfolio]
 *     summary: Delete a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.get('/projects', projectsController.list.bind(projectsController));
router.post('/projects', projectsController.create.bind(projectsController));
router.get('/projects/:id', projectsController.get.bind(projectsController));
router.put('/projects/:id', projectsController.update.bind(projectsController));
router.delete('/projects/:id', projectsController.remove.bind(projectsController));

/**
 * @swagger
 * /api/skills:
 *   get:
 *     tags: [Portfolio]
 *     summary: List skills
 *     responses:
 *       200:
 *         description: Skill list
 *   post:
 *     tags: [Portfolio]
 *     summary: Create a skill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "React" }
 *               level: { type: string, example: "Intermediate" }
 *     responses:
 *       201:
 *         description: Created skill
 *
 * /api/skills/{id}:
 *   put:
 *     tags: [Portfolio]
 *     summary: Update a skill by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200:
 *         description: Updated skill
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Portfolio]
 *     summary: Delete a skill by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.get('/skills', skillsController.list.bind(skillsController));
router.post('/skills', skillsController.create.bind(skillsController));
router.put('/skills/:id', skillsController.update.bind(skillsController));
router.delete('/skills/:id', skillsController.remove.bind(skillsController));

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Portfolio]
 *     summary: Submit a contact message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string, example: "Jane" }
 *               email: { type: string, example: "jane@example.com" }
 *               message: { type: string, example: "Hello! I'd like to connect..." }
 *     responses:
 *       201:
 *         description: Message accepted
 *       400:
 *         description: Validation error
 */
router.post('/contact', contactController.submit.bind(contactController));

module.exports = router;
