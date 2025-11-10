import express from 'express';
import { 
  getAllHeroes, 
  getHeroById, 
  createHero, 
  updateHero, 
  deleteHero 
} from '../controllers/heroController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Routes publiques (lecture)
router.get('/', getAllHeroes);
router.get('/:id', getHeroById);

// Routes protégées (modification)
router.post('/', authMiddleware, roleMiddleware(['admin', 'editor']), upload.single('image'), createHero);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'editor']), upload.single('image'), updateHero);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteHero);

export default router;