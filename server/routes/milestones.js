import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

// GET /api/milestones/:projectId
router.get('/:projectId', authenticate, asyncHandler(async (req, res) => {
  const [milestones] = await pool.query(
    'SELECT * FROM milestones WHERE project_id = ? ORDER BY sort_order',
    [req.params.projectId]
  );
  res.json({ milestones });
}));

// POST /api/milestones/:projectId
router.post('/:projectId', authenticate, asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Milestone title is required.' });
  }

  // Get max sort_order
  const [maxOrder] = await pool.query(
    'SELECT COALESCE(MAX(sort_order), 0) AS max_order FROM milestones WHERE project_id = ?',
    [projectId]
  );

  const [result] = await pool.query(
    'INSERT INTO milestones (project_id, title, sort_order) VALUES (?, ?, ?)',
    [projectId, title.trim(), maxOrder[0].max_order + 1]
  );

  const [rows] = await pool.query('SELECT * FROM milestones WHERE id = ?', [result.insertId]);
  res.status(201).json({ milestone: rows[0] });
}));

// PUT /api/milestones/toggle/:id - Toggle completion
router.put('/toggle/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [existing] = await pool.query('SELECT * FROM milestones WHERE id = ?', [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: 'Milestone not found.' });
  }

  const newCompleted = !existing[0].completed;
  await pool.query('UPDATE milestones SET completed = ? WHERE id = ?', [newCompleted, id]);

  // Recalculate project progress
  const projectId = existing[0].project_id;
  const [all] = await pool.query('SELECT * FROM milestones WHERE project_id = ?', [projectId]);
  const completedCount = all.filter(m => m.id === parseInt(id) ? newCompleted : m.completed).length;
  const progress = all.length > 0 ? Math.round((completedCount / all.length) * 100) : 0;

  await pool.query('UPDATE projects SET progress = ? WHERE id = ?', [progress, projectId]);

  res.json({ milestone: { ...existing[0], completed: newCompleted }, progress });
}));

// DELETE /api/milestones/:id
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [existing] = await pool.query('SELECT * FROM milestones WHERE id = ?', [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: 'Milestone not found.' });
  }

  await pool.query('DELETE FROM milestones WHERE id = ?', [id]);

  // Recalculate progress
  const projectId = existing[0].project_id;
  const [all] = await pool.query('SELECT * FROM milestones WHERE project_id = ?', [projectId]);
  const completedCount = all.filter(m => m.completed).length;
  const progress = all.length > 0 ? Math.round((completedCount / all.length) * 100) : 0;
  await pool.query('UPDATE projects SET progress = ? WHERE id = ?', [progress, projectId]);

  res.json({ message: 'Milestone deleted.', progress });
}));

export default router;
