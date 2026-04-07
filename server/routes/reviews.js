import { Router } from 'express';
import { validationResult } from 'express-validator';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { reviewValidation } from '../middleware/validate.js';

const router = Router();

// GET /api/reviews/:projectId
router.get('/:projectId', authenticate, asyncHandler(async (req, res) => {
  const [reviews] = await pool.query(
    `SELECT r.*, u.full_name AS reviewer_name
     FROM reviews r
     JOIN users u ON r.reviewer_id = u.id
     WHERE r.project_id = ?
     ORDER BY r.created_at DESC`,
    [req.params.projectId]
  );
  res.json({ review: reviews[0] || null });
}));

// POST /api/reviews/:projectId - Submit or update review (admin only)
router.post('/:projectId', authenticate, requireAdmin, reviewValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { projectId } = req.params;
  const { technical_score, documentation_score, innovation_score, ui_ux_score, comments, status } = req.body;
  const total_score = Math.round((technical_score + documentation_score + innovation_score + ui_ux_score) / 4);

  // Check if review already exists
  const [existing] = await pool.query('SELECT id FROM reviews WHERE project_id = ?', [projectId]);

  if (existing.length > 0) {
    // Update existing
    await pool.query(
      `UPDATE reviews SET technical_score = ?, documentation_score = ?, innovation_score = ?, ui_ux_score = ?, total_score = ?, comments = ?, status = ?, reviewer_id = ? WHERE project_id = ?`,
      [technical_score, documentation_score, innovation_score, ui_ux_score, total_score, comments || null, status, req.user.id, projectId]
    );
  } else {
    // Create new
    await pool.query(
      `INSERT INTO reviews (project_id, reviewer_id, technical_score, documentation_score, innovation_score, ui_ux_score, total_score, comments, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [projectId, req.user.id, technical_score, documentation_score, innovation_score, ui_ux_score, total_score, comments || null, status]
    );
  }

  // Update project status based on review
  const newProjectStatus = status === 'approved' ? 'Completed' : 'In Progress';
  await pool.query('UPDATE projects SET status = ? WHERE id = ?', [newProjectStatus, projectId]);

  const [reviews] = await pool.query(
    `SELECT r.*, u.full_name AS reviewer_name
     FROM reviews r
     JOIN users u ON r.reviewer_id = u.id
     WHERE r.project_id = ?
     ORDER BY r.created_at DESC LIMIT 1`,
    [projectId]
  );

  res.json({ review: reviews[0] });
}));

export default router;
