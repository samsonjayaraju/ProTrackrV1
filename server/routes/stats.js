import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

// GET /api/stats/student - Student dashboard stats
router.get('/student', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [totalProjects] = await pool.query(
    'SELECT COUNT(*) AS count FROM projects WHERE user_id = ?', [userId]
  );
  const [completed] = await pool.query(
    "SELECT COUNT(*) AS count FROM projects WHERE user_id = ? AND status = 'Completed'", [userId]
  );
  const [inProgress] = await pool.query(
    "SELECT COUNT(*) AS count FROM projects WHERE user_id = ? AND status = 'In Progress'", [userId]
  );

  // Recent activity (last 5 projects updated)
  const [recentActivity] = await pool.query(
    'SELECT id, title, status, updated_at FROM projects WHERE user_id = ? ORDER BY updated_at DESC LIMIT 5',
    [userId]
  );

  // Skill distribution from project categories
  const [skillDistribution] = await pool.query(
    `SELECT category, COUNT(*) AS count FROM projects WHERE user_id = ? GROUP BY category`,
    [userId]
  );

  res.json({
    stats: {
      totalProjects: totalProjects[0].count,
      completed: completed[0].count,
      inProgress: inProgress[0].count,
    },
    recentActivity,
    skillDistribution,
  });
}));

// GET /api/stats/admin - Admin dashboard stats
router.get('/admin', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const [totalStudents] = await pool.query(
    "SELECT COUNT(*) AS count FROM users WHERE role = 'student'"
  );
  const [totalProjects] = await pool.query(
    'SELECT COUNT(*) AS count FROM projects'
  );
  const [pendingReviews] = await pool.query(
    "SELECT COUNT(*) AS count FROM projects WHERE status = 'Submitted'"
  );
  const [completedProjects] = await pool.query(
    "SELECT COUNT(*) AS count FROM projects WHERE status = 'Completed'"
  );

  // Recent submissions for review
  const [recentSubmissions] = await pool.query(
    `SELECT p.id, p.title, p.updated_at, u.full_name AS student_name, u.roll_number, u.avatar_url
     FROM projects p
     JOIN users u ON p.user_id = u.id
     WHERE p.status = 'Submitted'
     ORDER BY p.updated_at DESC LIMIT 10`
  );

  // Project status overview
  const [statusOverview] = await pool.query(
    `SELECT status, COUNT(*) AS count FROM projects GROUP BY status`
  );

  res.json({
    stats: {
      totalStudents: totalStudents[0].count,
      totalProjects: totalProjects[0].count,
      pendingReviews: pendingReviews[0].count,
      completed: completedProjects[0].count,
    },
    recentSubmissions,
    statusOverview,
  });
}));

// GET /api/stats/reports - Admin reports data
router.get('/reports', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  // Projects by department
  const [byDepartment] = await pool.query(
    `SELECT u.department AS name,
       SUM(CASE WHEN p.status = 'Completed' THEN 1 ELSE 0 END) AS completed,
       SUM(CASE WHEN p.status != 'Completed' THEN 1 ELSE 0 END) AS inProgress
     FROM projects p
     JOIN users u ON p.user_id = u.id
     GROUP BY u.department`
  );

  // Submission trend (last 6 weeks placeholder — group by week)
  const [trend] = await pool.query(
    `SELECT WEEK(created_at) AS week_num, COUNT(*) AS projects
     FROM projects
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 WEEK)
     GROUP BY WEEK(created_at)
     ORDER BY week_num`
  );

  // Average completion rate
  const [avgCompletion] = await pool.query(
    'SELECT AVG(progress) AS avg_progress FROM projects'
  );

  // Average review time (days between submission and review)
  const [avgReviewTime] = await pool.query(
    `SELECT AVG(DATEDIFF(r.created_at, p.updated_at)) AS avg_days
     FROM reviews r
     JOIN projects p ON r.project_id = p.id`
  );

  res.json({
    byDepartment,
    trend: trend.map((t, i) => ({ name: `Week ${i + 1}`, projects: t.projects })),
    avgCompletion: Math.round(avgCompletion[0].avg_progress || 0),
    avgReviewTime: avgReviewTime[0].avg_days ? parseFloat(avgReviewTime[0].avg_days).toFixed(1) : '0',
    totalSubmitted: byDepartment.reduce((acc, d) => acc + d.completed + d.inProgress, 0),
  });
}));

export default router;
