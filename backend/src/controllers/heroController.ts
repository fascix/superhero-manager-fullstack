const HeroController = require("../models/Hero");

const getHeroes = async (
	req: import("express").Request,
	res: import("express").Response
) => {
	try {
		const heroes = await HeroController.find();
		res.json(heroes);
	} catch (err) {
		res.status(500).json({ message: "Erreur serveur" });
	}
};

const getHeroById = async (
	req: import("express").Request,
	res: import("express").Response
) => {
	try {
		const hero = await HeroController.findById(req.params.id);
		if (!hero) return res.status(404).json({ message: "Héros introuvable" });
		res.json(hero);
	} catch (err) {
		res.status(500).json({ message: "Erreur serveur" });
	}
};

const addHero = async (
	req: import("express").Request,
	res: import("express").Response
) => {
	try {
		const hero = new HeroController(req.body);
		await hero.save();
		res.status(201).json(hero);
	} catch (err) {
		res.status(400).json({ message: "Erreur lors de l'ajout", err });
	}
};

const updateHero = async (
	req: import("express").Request,
	res: import("express").Response
) => {
	try {
		const hero = await HeroController.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		if (!hero) return res.status(404).json({ message: "Héros introuvable" });
		res.json(hero);
	} catch (err) {
		res.status(400).json({ message: "Erreur lors de la modification", err });
	}
};

const deleteHero = async (
	req: import("express").Request,
	res: import("express").Response
) => {
	try {
		const hero = await HeroController.findByIdAndDelete(req.params.id);
		if (!hero) return res.status(404).json({ message: "Héros introuvable" });
		res.json({ message: "Héros supprimé" });
	} catch (err) {
		res.status(500).json({ message: "Erreur serveur" });
	}
};

module.exports = { getHeroes, getHeroById, addHero, updateHero, deleteHero };
