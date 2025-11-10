import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image?: string;
  origine?: string;
  premiereApparition?: string;
  createdAt?: Date;
}

const heroSchema = new Schema<IHero>({
  nom: { type: String, required: true },
  alias: { type: String, required: true },
  univers: { type: String, required: true },
  pouvoirs: { type: [String], default: [] },
  description: { type: String, required: true },
  image: { type: String },
  origine: { type: String },
  premiereApparition: { type: String },
}, {
  timestamps: true  // Ajoute automatiquement createdAt et updatedAt
});

export default mongoose.model<IHero>('Hero', heroSchema);