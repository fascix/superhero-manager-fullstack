import mongoose from "mongoose";
import dotenv from "dotenv";
import Hero from "../models/Hero";
import fs from "fs";
import path from "path";

dotenv.config();

// Interface pour le JSON source
interface SourceHero {
	id: number;
	name: string;
	biography: {
		fullName: string;
		aliases: string[];
		placeOfBirth: string;
		firstAppearance: string;
		publisher: string;
		alignment: string;
	};
	powerstats: {
		[key: string]: number;
	};
	work: {
		occupation: string;
	};
	images: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
}

mongoose
	.connect(process.env.MONGO_URI as string)
	.then(async () => {
		console.log("MongoDB connecté");

		const jsonPath = path.join(__dirname, "../SuperHerosComplet.json");
		const rawData = fs.readFileSync(jsonPath, "utf-8");
		const data = JSON.parse(rawData);

		// Accéder au tableau 'superheros' si présent, sinon utiliser data directement
		const sourceHeroes: SourceHero[] = data.superheros || data;

		console.log(`Traitement de ${sourceHeroes.length} héros...`);

		const formattedHeroes = sourceHeroes.map((item) => {
			// Transformation des powerstats en tableau de strings
			const pouvoirs = Object.entries(item.powerstats).map(
				([stat, value]) => `${stat}: ${value}`
			);

			// Nettoyage du nom de l'image (garde seulement le nom de fichier)
			// Ex: "md/1-a-bomb.jpg" -> "1-a-bomb.jpg"
			const imageFilename = item.images.md
				? item.images.md.split("/").pop()
				: undefined;

			return {
				nom: item.name,
				alias:
					item.biography.aliases[0] !== "-"
						? item.biography.aliases[0]
						: item.biography.fullName || item.name,
				univers: item.biography.publisher || "Inconnu",
				pouvoirs: pouvoirs,
				description:
					item.work.occupation !== "-"
						? item.work.occupation
						: `Un héros ${item.biography.alignment} de l'univers ${item.biography.publisher}`,
				image: imageFilename,
				origine:
					item.biography.placeOfBirth !== "-"
						? item.biography.placeOfBirth
						: undefined,
				premiereApparition:
					item.biography.firstAppearance !== "-"
						? item.biography.firstAppearance
						: undefined,
			};
		});

		await Hero.deleteMany({});
		await Hero.insertMany(formattedHeroes);

		console.log("✅ Base de données repeuplée avec succès !");
		console.log(
			"IMPORTANT: Placez vos images dans le dossier backend/uploads/"
		);
		process.exit(0);
	})
	.catch((err) => {
		console.error("Erreur lors du seed:", err);
		process.exit(1);
	});
