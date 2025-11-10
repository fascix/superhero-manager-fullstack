import express from 'express';
import { register, login, verifyToken } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/auth/register - Inscription
router.post('/register', register);

// POST /api/auth/login - Connexion
router.post('/login', login);

// GET /api/auth/verify - Vérifier le token (protégé)
router.get('/verify', authMiddleware, verifyToken);

export default router;