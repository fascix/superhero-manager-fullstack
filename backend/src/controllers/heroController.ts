import { Request, Response } from 'express';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

// GET /api/heroes - Récupérer tous les héros
export const getAllHeroes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, univers, sort } = req.query;
    let query: any = {};

    // Filtre par recherche (nom ou alias)
    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { alias: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtre par univers
    if (univers) {
      query.univers = univers;
    }

    // Tri
    let sortOption: any = {};
    if (sort === 'nom') sortOption.nom = 1;
    else if (sort === 'recent') sortOption.createdAt = -1;
    else sortOption.nom = 1;

    const heroes = await Hero.find(query).sort(sortOption);
    res.json(heroes);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// GET /api/heroes/:id - Récupérer un héros par ID
export const getHeroById = async (req: Request, res: Response): Promise<void> => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      res.status(404).json({ message: 'Héros non trouvé' });
      return;
    }
    res.json(hero);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// POST /api/heroes - Créer un nouveau héros
export const createHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const heroData = req.body;
    
    // Ajouter l'image si uploadée
    if (req.file) {
      heroData.image = `/uploads/${req.file.filename}`;
    }

    const newHero = new Hero(heroData);
    await newHero.save();
    
    res.status(201).json({ 
      message: 'Héros créé avec succès', 
      hero: newHero 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// PUT /api/heroes/:id - Mettre à jour un héros
export const updateHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const heroData = req.body;
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      res.status(404).json({ message: 'Héros non trouvé' });
      return;
    }

    // Gérer le remplacement d'image
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      if (hero.image) {
        const oldImagePath = path.join(__dirname, '../../', hero.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      heroData.image = `/uploads/${req.file.filename}`;
    }

    const updatedHero = await Hero.findByIdAndUpdate(
      req.params.id, 
      heroData, 
      { new: true, runValidators: true }
    );

    res.json({ 
      message: 'Héros mis à jour avec succès', 
      hero: updatedHero 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// DELETE /api/heroes/:id - Supprimer un héros
export const deleteHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      res.status(404).json({ message: 'Héros non trouvé' });
      return;
    }

    // Supprimer l'image associée
    if (hero.image) {
      const imagePath = path.join(__dirname, '../../', hero.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: 'Héros supprimé avec succès' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};