import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { logInfo, logError, logSuccess, logWarning } from "../utils/logger";

// GET /api/users - Récupérer tous les utilisateurs
export const getAllUsers = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = await User.find().select("-passwordHash"); // Ne pas envoyer les mots de passe
		logInfo(`Liste des utilisateurs récupérée - ${users.length} utilisateurs`);
		res.json(users);
	} catch (error: any) {
		logError("Erreur lors de la récupération des utilisateurs", {
			error: error.message,
		});
		res.status(500).json({ message: "Erreur serveur", error: error.message });
	}
};

// GET /api/users/:id - Récupérer un utilisateur par ID
export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await User.findById(req.params.id).select("-passwordHash");
		if (!user) {
			logWarning(`Utilisateur non trouvé - ID: ${req.params.id}`);
			res.status(404).json({ message: "Utilisateur non trouvé" });
			return;
		}
		logInfo(`Utilisateur récupéré - ${user.username}`, { id: req.params.id });
		res.json(user);
	} catch (error: any) {
		logError("Erreur lors de la récupération de l'utilisateur", {
			error: error.message,
		});
		res.status(500).json({ message: "Erreur serveur", error: error.message });
	}
};

// POST /api/users - Créer un nouvel utilisateur
export const createUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { username, password, role } = req.body;

		// Vérifier si l'utilisateur existe déjà
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			logWarning(`Tentative de création d'utilisateur existant: ${username}`);
			res.status(400).json({ message: "Nom d'utilisateur déjà utilisé" });
			return;
		}

		// Hasher le mot de passe
		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			passwordHash,
			role: role || "viewer",
		});
		await newUser.save();

		logSuccess(`Nouvel utilisateur créé - ${newUser.username}`, {
			id: newUser._id,
			role: newUser.role,
		});

		// Retourner l'utilisateur sans le mot de passe
		const userResponse = {
			_id: newUser._id,
			username: newUser.username,
			role: newUser.role,
			createdAt: newUser.createdAt,
		};

		res.status(201).json({
			message: "Utilisateur créé avec succès",
			user: userResponse,
		});
	} catch (error: any) {
		logError("Erreur lors de la création d'un utilisateur", {
			error: error.message,
		});
		res
			.status(500)
			.json({ message: "Erreur lors de la création", error: error.message });
	}
};

// PUT /api/users/:id - Mettre à jour un utilisateur
export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { username, password, role } = req.body;
		const user = await User.findById(req.params.id);

		if (!user) {
			logWarning(
				`Utilisateur non trouvé pour mise à jour - ID: ${req.params.id}`
			);
			res.status(404).json({ message: "Utilisateur non trouvé" });
			return;
		}

		// Mettre à jour les champs
		if (username) user.username = username;
		if (role) user.role = role;
		if (password) {
			user.passwordHash = await bcrypt.hash(password, 10);
		}

		await user.save();

		logSuccess(`Utilisateur mis à jour - ${user.username}`, {
			id: req.params.id,
		});

		const userResponse = {
			_id: user._id,
			username: user.username,
			role: user.role,
			createdAt: user.createdAt,
		};

		res.json({
			message: "Utilisateur mis à jour avec succès",
			user: userResponse,
		});
	} catch (error: any) {
		logError("Erreur lors de la mise à jour d'un utilisateur", {
			error: error.message,
			id: req.params.id,
		});
		res.status(500).json({
			message: "Erreur lors de la mise à jour",
			error: error.message,
		});
	}
};

// DELETE /api/users/:id - Supprimer un utilisateur
export const deleteUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			logWarning(
				`Utilisateur non trouvé pour suppression - ID: ${req.params.id}`
			);
			res.status(404).json({ message: "Utilisateur non trouvé" });
			return;
		}

		await User.findByIdAndDelete(req.params.id);
		logSuccess(`Utilisateur supprimé - ${user.username}`, {
			id: req.params.id,
		});

		res.json({ message: "Utilisateur supprimé avec succès" });
	} catch (error: any) {
		logError("Erreur lors de la suppression d'un utilisateur", {
			error: error.message,
			id: req.params.id,
		});
		res.status(500).json({
			message: "Erreur lors de la suppression",
			error: error.message,
		});
	}
};
