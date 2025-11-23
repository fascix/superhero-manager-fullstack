import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const seedUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
		console.log("MongoDB connecté");

		// Supprimer tous les utilisateurs existants
		await User.deleteMany({});
		console.log("Utilisateurs existants supprimés");

		// Créer les utilisateurs de test
		const users = [
			{
				username: "admin",
				password: "admin123",
				role: "admin" as const,
			},
			{
				username: "editor",
				password: "editor123",
				role: "editor" as const,
			},
			{
				username: "viewer",
				password: "viewer123",
				role: "viewer" as const,
			},
		];

		for (const userData of users) {
			const passwordHash = await bcrypt.hash(userData.password, 10);
			const user = new User({
				username: userData.username,
				passwordHash,
				role: userData.role,
			});
			await user.save();
			console.log(
				`✅ Utilisateur créé: ${userData.username} (${userData.role})`
			);
		}

		console.log("\n🎉 Utilisateurs de test créés avec succès !");
		console.log("\n📝 Identifiants de connexion:");
		console.log("   Admin: username=admin, password=admin123");
		console.log("   Editor: username=editor, password=editor123");
		console.log("   Viewer: username=viewer, password=viewer123");

		process.exit(0);
	} catch (error) {
		console.error("❌ Erreur lors de la création des utilisateurs:", error);
		process.exit(1);
	}
};

seedUsers();
