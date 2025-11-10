import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import heroRoutes from './routes/heroRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connexion à MongoDB
connectDB();

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('✅ Serveur SuperHero Manager API - Opérationnel');
});

app.use('/api/heroes', heroRoutes);
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📂 URL: http://localhost:${PORT}`);
});