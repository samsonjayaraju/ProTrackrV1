import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import milestoneRoutes from './routes/milestones.js';
import feedbackRoutes from './routes/feedback.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';
import statRoutes from './routes/stats.js';
import uploadRoutes from './routes/uploads.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directories exist
const uploadsRoot = path.join(process.cwd(), 'server', 'uploads');
const uploadsAvatars = path.join(uploadsRoot, 'avatars');
const uploadsProjects = path.join(uploadsRoot, 'projects');
fs.mkdirSync(uploadsAvatars, { recursive: true });
fs.mkdirSync(uploadsProjects, { recursive: true });

// Serve uploads
app.use('/uploads', express.static(uploadsRoot));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/uploads', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  if (err.code === 'LIMIT_FILE_SIZE') {
    err.status = 400;
    err.message = 'File too large.';
  }
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ProTrackr API server running on port ${PORT}`);
});
