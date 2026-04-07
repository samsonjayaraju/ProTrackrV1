import { body } from 'express-validator';

export const loginValidation = [
  body('email')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const registerValidation = [
  body('full_name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['student', 'admin']).withMessage('Role must be student or admin'),
];

export const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
  body('description')
    .optional()
    .trim(),
  body('category')
    .optional()
    .isIn(['Design', 'Development', 'Branding', 'Research', 'Other']).withMessage('Invalid category'),
  body('status')
    .optional()
    .isIn(['Draft', 'In Progress', 'Submitted', 'Completed']).withMessage('Invalid status'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
];

export const reviewValidation = [
  body('technical_score')
    .isInt({ min: 0, max: 100 }).withMessage('Technical score must be 0-100'),
  body('documentation_score')
    .isInt({ min: 0, max: 100 }).withMessage('Documentation score must be 0-100'),
  body('innovation_score')
    .isInt({ min: 0, max: 100 }).withMessage('Innovation score must be 0-100'),
  body('ui_ux_score')
    .isInt({ min: 0, max: 100 }).withMessage('UI/UX score must be 0-100'),
  body('comments')
    .optional()
    .trim(),
  body('status')
    .isIn(['approved', 'changes_requested']).withMessage('Status must be approved or changes_requested'),
];

export const profileValidation = [
  body('full_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('bio')
    .optional()
    .trim(),
  body('location')
    .optional()
    .trim(),
  body('department')
    .optional()
    .trim(),
  body('github_url')
    .optional()
    .trim(),
];

export const passwordValidation = [
  body('current_password')
    .notEmpty().withMessage('Current password is required'),
  body('new_password')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];
