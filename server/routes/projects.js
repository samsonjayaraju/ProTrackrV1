import { Router } from 'express';
import { validationResult } from 'express-validator';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { projectValidation } from '../middleware/validate.js';

const router = Router();

// GET /api/projects - Get projects (students: own, admins: all)
router.get('/', authenticate, asyncHandler(async (req, res) => {
  let query, params;

  if (req.user.role === 'admin') {
    query = `
      SELECT p.*, u.full_name AS owner_name, u.roll_number AS owner_roll
      FROM projects p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.updated_at DESC
    `;
    params = [];
  } else {
    query = `
      SELECT p.*, u.full_name AS owner_name
      FROM projects p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.updated_at DESC
    `;
    params = [req.user.id];
  }

  const [rows] = await pool.query(query, params);

  // Parse tech_stack JSON
  const projects = rows.map(p => ({
    ...p,
    tech_stack: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : (p.tech_stack || [])
  }));

  res.json({ projects });
}));

// GET /api/projects/:id - Get single project with milestones, feedback, team, review
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [rows] = await pool.query(
    `SELECT p.*, u.full_name AS owner_name, u.roll_number AS owner_roll, u.email AS owner_email
     FROM projects p
     JOIN users u ON p.user_id = u.id
     WHERE p.id = ?`,
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const project = rows[0];
  project.tech_stack = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []);

  // Check access: student can only see own project
  if (req.user.role !== 'admin' && project.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  // Get milestones
  const [milestones] = await pool.query(
    'SELECT * FROM milestones WHERE project_id = ? ORDER BY sort_order',
    [id]
  );

  // Get feedback with author info
  const [feedback] = await pool.query(
    `SELECT f.*, u.full_name AS author_name, u.role AS author_role
     FROM feedback f
     JOIN users u ON f.author_id = u.id
     WHERE f.project_id = ?
     ORDER BY f.created_at DESC`,
    [id]
  );

  // Get team members
  const [team] = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.avatar_url
     FROM project_team pt
     JOIN users u ON pt.user_id = u.id
     WHERE pt.project_id = ?`,
    [id]
  );

  // Get review (if exists)
  const [reviews] = await pool.query(
    `SELECT r.*, u.full_name AS reviewer_name
     FROM reviews r
     JOIN users u ON r.reviewer_id = u.id
     WHERE r.project_id = ?
     ORDER BY r.created_at DESC LIMIT 1`,
    [id]
  );

  // Get media uploads
  const [media] = await pool.query(
    `SELECT id, file_url, file_name, file_type, created_at
     FROM project_media
     WHERE project_id = ?
     ORDER BY created_at DESC`,
    [id]
  );

  res.json({
    project: {
      ...project,
      milestones,
      feedback,
      team,
      review: reviews[0] || null,
      media
    }
  });
}));

// POST /api/projects - Create new project
router.post('/', authenticate, projectValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, category, status, progress, due_date, tech_stack, source_url, demo_url } = req.body;

  const [result] = await pool.query(
    `INSERT INTO projects (user_id, title, description, category, status, progress, due_date, tech_stack, source_url, demo_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, title, description || null, category || 'Other', status || 'Draft', progress || 0, due_date || null, JSON.stringify(tech_stack || []), source_url || null, demo_url || null]
  );

  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [result.insertId]);
  const project = rows[0];
  project.tech_stack = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []);

  // Add creator to project team
  await pool.query('INSERT INTO project_team (project_id, user_id) VALUES (?, ?)', [result.insertId, req.user.id]);

  res.status(201).json({ project });
}));

// PUT /api/projects/:id - Update project
router.put('/:id', authenticate, projectValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  // Verify ownership
  const [existing] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  if (req.user.role !== 'admin' && existing[0].user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  const { title, description, category, status, progress, due_date, tech_stack, source_url, demo_url } = req.body;

  await pool.query(
    `UPDATE projects SET title = ?, description = ?, category = ?, status = ?, progress = ?, due_date = ?, tech_stack = ?, source_url = ?, demo_url = ? WHERE id = ?`,
    [title, description || null, category || 'Other', status || existing[0].status, progress ?? existing[0].progress, due_date || null, JSON.stringify(tech_stack || []), source_url || null, demo_url || null, id]
  );

  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  const project = rows[0];
  project.tech_stack = typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || []);

  res.json({ project });
}));

// DELETE /api/projects/:id
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [existing] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  if (req.user.role !== 'admin' && existing[0].user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  res.json({ message: 'Project deleted successfully.' });
}));

export default router;
