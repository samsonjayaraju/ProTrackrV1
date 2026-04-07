import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

// GET /api/feedback/:projectId
router.get('/:projectId', authenticate, asyncHandler(async (req, res) => {
  const [feedback] = await pool.query(
    `SELECT f.*, u.full_name AS author_name, u.role AS author_role
     FROM feedback f
     JOIN users u ON f.author_id = u.id
     WHERE f.project_id = ?
     ORDER BY f.created_at DESC`,
    [req.params.projectId]
  );
  res.json({ feedback });
}));

// POST /api/feedback/:projectId
router.post('/:projectId', authenticate, asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Feedback text is required.' });
  }

  const [result] = await pool.query(
    'INSERT INTO feedback (project_id, author_id, text) VALUES (?, ?, ?)',
    [projectId, req.user.id, text.trim()]
  );

  const [rows] = await pool.query(
    `SELECT f.*, u.full_name AS author_name, u.role AS author_role
     FROM feedback f
     JOIN users u ON f.author_id = u.id
     WHERE f.id = ?`,
    [result.insertId]
  );

  res.status(201).json({ feedback: rows[0] });
}));

// DELETE /api/feedback/:id
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [existing] = await pool.query('SELECT * FROM feedback WHERE id = ?', [id]);
  if (existing.length === 0) {
    return res.status(404).json({ error: 'Feedback not found.' });
  }

  // Only author or admin can delete
  if (req.user.role !== 'admin' && existing[0].author_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  await pool.query('DELETE FROM feedback WHERE id = ?', [id]);
  res.json({ message: 'Feedback deleted.' });
}));

export default router;
