import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { asyncHandler, formatUser } from '../utils/helpers.js';
import { profileValidation, passwordValidation } from '../middleware/validate.js';

const router = Router();

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticate, asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: formatUser(rows[0]) });
}));

// PUT /api/users/profile - Update profile
router.put('/profile', authenticate, profileValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { full_name, bio, location, department, year, roll_number, github_url, portfolio_public } = req.body;

  await pool.query(
    `UPDATE users SET full_name = COALESCE(?, full_name), bio = COALESCE(?, bio), location = COALESCE(?, location),
     department = COALESCE(?, department), year = COALESCE(?, year), roll_number = COALESCE(?, roll_number),
     github_url = COALESCE(?, github_url), portfolio_public = COALESCE(?, portfolio_public) WHERE id = ?`,
    [full_name, bio, location, department, year, roll_number, github_url, portfolio_public, req.user.id]
  );

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  res.json({ user: formatUser(rows[0]) });
}));

// PUT /api/users/password - Change password
router.put('/password', authenticate, passwordValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { current_password, new_password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  const user = rows[0];

  const isMatch = await bcrypt.compare(current_password, user.password_hash);
  if (!isMatch) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(new_password, salt);

  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [password_hash, req.user.id]);
  res.json({ message: 'Password updated successfully.' });
}));

// GET /api/users/all - Admin: get all students
router.get('/all', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.*, COUNT(p.id) AS project_count
     FROM users u
     LEFT JOIN projects p ON u.id = p.user_id
     WHERE u.role = 'student'
     GROUP BY u.id
     ORDER BY u.full_name`,
  );

  const students = rows.map(s => ({
    ...formatUser(s),
    project_count: s.project_count
  }));

  res.json({ students });
}));

// GET /api/users/:id - Admin or self: get user profile by id
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin' && req.user.id !== parseInt(id, 10)) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });

  res.json({ user: formatUser(rows[0]) });
}));

export default router;
