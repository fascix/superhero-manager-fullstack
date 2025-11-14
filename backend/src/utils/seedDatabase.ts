import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface SuperheroData {
  id: number;
  name: string;
  slug: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

const transformHeroData = (superhero: SuperheroData) => {
  // Extraire les pouvoirs depuis powerstats
  const pouvoirs: string[] = [];
  if (superhero.powerstats.intelligence > 70) pouvoirs.push('Intelligence supérieure');
  if (superhero.powerstats.strength > 70) pouvoirs.push('Super force');
  if (superhero.powerstats.speed > 70) pouvoirs.push('Super vitesse');
  if (superhero.powerstats.durability > 70) pouvoirs.push('Résistance exceptionnelle');
  if (superhero.powerstats.power > 70) pouvoirs.push('Puissance énergétique');
  if (superhero.powerstats.combat > 70) pouvoirs.push('Maître du combat');
  
  // Si pas de pouvoirs identifiés, utiliser les stats générales
  if (pouvoirs.length === 0) {
    pouvoirs.push('Force', 'Combat', 'Intelligence');
  }

  // Déterminer l'univers
  let univers = 'Autre';
  if (superhero.biography.publisher) {
    if (superhero.biography.publisher.includes('Marvel')) univers = 'Marvel';
    else if (superhero.biography.publisher.includes('DC')) univers = 'DC';
  }

  // Créer la description
  const description = `${superhero.biography.fullName || superhero.name} est un ${superhero.appearance.gender === 'Male' ? 'héros' : superhero.appearance.gender === 'Female' ? 'héroïne' : 'personnage'} ${superhero.biography.alignment === 'good' ? 'du bien' : superhero.biography.alignment === 'bad' ? 'maléfique' : 'neutre'} de l'univers ${superhero.biography.publisher || 'des comics'}. ${superhero.work.occupation ? `Occupation: ${superhero.work.occupation}.` : ''}`;

  return {
    nom: superhero.name,
    alias: superhero.biography.fullName || superhero.name,
    univers: univers,
    pouvoirs: pouvoirs,
    description: description.substring(0, 500), // Limiter la longueur
    image: superhero.images.md || superhero.images.sm || '',
    origine: superhero.biography.placeOfBirth || 'Inconnu',
    premiereApparition: superhero.biography.firstAppearance || 'Inconnue',
  };
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB connecté');

    // Lire le fichier JSON
    const jsonPath = path.join(__dirname, '../SuperHerosComplet.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const parsedData = JSON.parse(rawData);
    
    // Transformer les données
    const heroes = parsedData.superheros.map(transformHeroData);
    
    // Supprimer les données existantes
    await Hero.deleteMany({});
    console.log('🗑️  Anciennes données supprimées');
    
    // Insérer les nouvelles données
    await Hero.insertMany(heroes);
    console.log(`✅ ${heroes.length} héros importés avec succès !`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    process.exit(1);
  }
};

seedDatabase();
