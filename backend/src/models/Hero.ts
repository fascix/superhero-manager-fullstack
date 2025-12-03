import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
	nom: string;
	alias: string;
	univers: string;
	description: string;
	image?: string;
	origine?: string;
	premiereApparition?: string;
	createdAt?: Date;
	stats: {
		intelligence: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
}

const heroSchema = new Schema<IHero>(
	{
		nom: { type: String, required: true },
		alias: { type: String, required: true },
		univers: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String },
		origine: { type: String },
		premiereApparition: { type: String },
		stats: {
			intelligence: { type: Number, min: 0, max: 100, default: 50 },
			strength: { type: Number, min: 0, max: 100, default: 50 },
			speed: { type: Number, min: 0, max: 100, default: 50 },
			durability: { type: Number, min: 0, max: 100, default: 50 },
			power: { type: Number, min: 0, max: 100, default: 50 },
			combat: { type: Number, min: 0, max: 100, default: 50 },
		},
	},
	{
		timestamps: true, // Ajoute automatiquement createdAt et updatedAt
	}
);

export default mongoose.model<IHero>("Hero", heroSchema);
