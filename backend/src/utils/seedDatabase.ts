const mongooseDb = require("mongoose");
const dotenvSeed = require("dotenv");
const HeroSeed = require("../models/Hero");

const fs = require("fs");

dotenvSeed.config();

mongooseDb
	.connect(process.env.MONGO_URI)
	.then(async () => {
		console.log("MongoDB connecté");
		const data = JSON.parse(
			fs.readFileSync("./src/SuperHerosComplet.json", "utf-8")
		);
		await HeroSeed.deleteMany({});
		await HeroSeed.insertMany(data);
		console.log("Données importées !");
		process.exit(0);
	})
	.catch((err: unknown) => {
		console.error(err);
		process.exit(1);
	});
