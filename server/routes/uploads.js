import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import pool from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

const uploadsRoot = path.join(process.cwd(), 'server', 'uploads');
const avatarsDir = path.join(uploadsRoot, 'avatars');
const projectsDir = path.join(uploadsRoot, 'projects');

const allowedAvatarMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const allowedProjectMimes = [...allowedAvatarMimes, 'application/pdf'];

const fileFilter = (allowed) => (req, file, cb) => {
  if (allowed.includes(file.mimetype)) return cb(null, true);
  const err = new Error('Invalid file type.');
  err.status = 400;
  return cb(err);
};

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarsDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '').toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectId = String(req.params.projectId || 'unknown');
    const dest = path.join(projectsDir, projectId);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '').toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(allowedAvatarMimes),
});

const projectUpload = multer({
  storage: projectStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: fileFilter(allowedProjectMimes),
});

async function getProject(projectId) {
  const [rows] = await pool.query('SELECT id, user_id FROM projects WHERE id = ?', [projectId]);
  return rows[0];
}

function ensureProjectAccess(project, user) {
  if (!project) return { ok: false, status: 404, error: 'Project not found.' };
  if (user.role === 'admin' || project.user_id === user.id) return { ok: true };
  return { ok: false, status: 403, error: 'Access denied.' };
}

// POST /api/uploads/avatar - Upload profile avatar
router.post('/avatar', authenticate, avatarUpload.single('avatar'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Avatar file is required.' });

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.user.id]);

  res.json({ avatar_url: avatarUrl });
}));

// GET /api/uploads/projects/:projectId - List project media
router.get('/projects/:projectId', authenticate, asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProject(projectId);
  const access = ensureProjectAccess(project, req.user);
  if (!access.ok) return res.status(access.status).json({ error: access.error });

  const [rows] = await pool.query(
    'SELECT id, file_url, file_name, file_type, created_at FROM project_media WHERE project_id = ? ORDER BY created_at DESC',
    [projectId]
  );

  res.json({ media: rows });
}));

// POST /api/uploads/projects/:projectId - Upload project media
router.post('/projects/:projectId', authenticate, projectUpload.array('media', 10), asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProject(projectId);
  const access = ensureProjectAccess(project, req.user);
  if (!access.ok) return res.status(access.status).json({ error: access.error });

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'At least one file is required.' });
  }

  const mediaRows = [];
  for (const file of req.files) {
    const fileUrl = `/uploads/projects/${projectId}/${file.filename}`;
    const [result] = await pool.query(
      'INSERT INTO project_media (project_id, uploader_id, file_url, file_name, file_type) VALUES (?, ?, ?, ?, ?)',
      [projectId, req.user.id, fileUrl, file.originalname, file.mimetype]
    );
    mediaRows.push({
      id: result.insertId,
      file_url: fileUrl,
      file_name: file.originalname,
      file_type: file.mimetype,
    });
  }

  res.status(201).json({ media: mediaRows });
}));

// DELETE /api/uploads/media/:id - Delete media
router.delete('/media/:id', authenticate, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    `SELECT pm.*, p.user_id AS owner_id
     FROM project_media pm
     JOIN projects p ON pm.project_id = p.id
     WHERE pm.id = ?`,
    [id]
  );

  if (rows.length === 0) return res.status(404).json({ error: 'Media not found.' });

  const media = rows[0];
  if (req.user.role !== 'admin' && media.owner_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied.' });
  }

  await pool.query('DELETE FROM project_media WHERE id = ?', [id]);

  const filePath = path.join(process.cwd(), 'server', media.file_url.replace('/uploads/', 'uploads/'));
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.warn('Failed to remove file:', err.message);
  }

  res.json({ message: 'Media deleted.' });
}));

export default router;
