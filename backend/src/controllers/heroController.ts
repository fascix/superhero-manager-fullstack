import { Request, Response } from "express";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";
import { logInfo, logError, logSuccess, logWarning } from "../utils/logger";

// GET /api/heroes - Récupérer tous les héros
export const getAllHeroes = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { search, univers, sort } = req.query;
		let query: any = {};

		if (search) {
			query.$or = [
				{ nom: { $regex: search, $options: "i" } },
				{ alias: { $regex: search, $options: "i" } },
			];
		}

		if (univers) {
			query.univers = univers;
		}

		let sortOption: any = {};
		if (sort === "nom") sortOption.nom = 1;
		else if (sort === "recent") sortOption.createdAt = -1;
		else sortOption.nom = 1;

		const heroes = await Hero.find(query).sort(sortOption);
		logInfo(`Liste des héros récupérée - ${heroes.length} héros trouvés`, {
			search,
			univers,
			sort,
		});
		res.json(heroes);
	} catch (error: any) {
		logError("Erreur lors de la récupération des héros", {
			error: error.message,
		});
		res.status(500).json({ message: "Erreur serveur", error: error.message });
	}
};

// GET /api/heroes/:id - Récupérer un héros par ID
export const getHeroById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const hero = await Hero.findById(req.params.id);
		if (!hero) {
			logWarning(`Héros non trouvé - ID: ${req.params.id}`);
			res.status(404).json({ message: "Héros non trouvé" });
			return;
		}
		logInfo(`Héros récupéré - ${hero.nom}`, { id: req.params.id });
		res.json(hero);
	} catch (error: any) {
		res.status(500).json({ message: "Erreur serveur", error: error.message });
	}
};

// POST /api/heroes - Créer un nouveau héros
export const createHero = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// Créer une copie propre de l'objet pour éviter les problèmes de prototype avec Multer
		const heroData = { ...req.body };

		if (req.file) {
			heroData.image = `/uploads/${req.file.filename}`;
		}

		if (heroData.stats && typeof heroData.stats === "string") {
			heroData.stats = JSON.parse(heroData.stats);
		}

		const newHero = new Hero(heroData);
		await newHero.save();
		logSuccess(`Nouveau héros créé - ${newHero.nom}`, { id: newHero._id });

		res.status(201).json({
			message: "Héros créé avec succès",
			hero: newHero,
		});
	} catch (error: any) {
		logError("ERREUR FATALE lors de la création d'un héros", {
			errorMessage: error.message,
			stack: error.stack,
			body: req.body,
		});
		res
			.status(500)
			.json({ message: "Erreur lors de la création", error: error.message });
	}
};

// PUT /api/heroes/:id - Mettre à jour un héros
export const updateHero = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// Créer une copie propre de l'objet
		const heroData = { ...req.body };
		const hero = await Hero.findById(req.params.id);

		if (!hero) {
			logWarning(
				`Tentative de mise à jour d'un héros non trouvé - ID: ${req.params.id}`
			);
			res.status(404).json({ message: "Héros non trouvé" });
			return;
		}

		if (heroData.stats && typeof heroData.stats === "string") {
			heroData.stats = JSON.parse(heroData.stats);
		}

		if (req.file) {
			if (hero.image) {
				const oldImagePath = path.join(__dirname, "../../", hero.image);
				if (fs.existsSync(oldImagePath)) {
					fs.unlinkSync(oldImagePath);
				}
			}
			heroData.image = `/uploads/${req.file.filename}`;
		}

		const updatedHero = await Hero.findByIdAndUpdate(req.params.id, heroData, {
			new: true,
			runValidators: true,
		});

		logSuccess(`Héros mis à jour - ${updatedHero?.nom}`, { id: req.params.id });

		res.json({
			message: "Héros mis à jour avec succès",
			hero: updatedHero,
		});
	} catch (error: any) {
		logError("Erreur lors de la mise à jour d'un héros", {
			error: error.message,
			id: req.params.id,
		});
		res
			.status(500)
			.json({ message: "Erreur lors de la mise à jour", error: error.message });
	}
};

// DELETE /api/heroes/:id - Supprimer un héros
export const deleteHero = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const hero = await Hero.findById(req.params.id);

		if (!hero) {
			logWarning(
				`Tentative de suppression d'un héros non trouvé - ID: ${req.params.id}`
			);
			res.status(404).json({ message: "Héros non trouvé" });
			return;
		}

		if (hero.image) {
			const imagePath = path.join(__dirname, "../../", hero.image);
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		}

		await Hero.findByIdAndDelete(req.params.id);
		logSuccess(`Héros supprimé - ${hero.nom}`, { id: req.params.id });
		res.json({ message: "Héros supprimé avec succès" });
	} catch (error: any) {
		logError("Erreur lors de la suppression d'un héros", {
			error: error.message,
			id: req.params.id,
		});
		res
			.status(500)
			.json({ message: "Erreur lors de la suppression", error: error.message });
	}
};
