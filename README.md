# 🦸 SuperHero Manager - Full Stack Application

Application complète de gestion de super-héros avec authentification, recherche en temps réel, et interface Bootstrap.

## 📋 Fonctionnalités

### 1. 🔐 Authentification
- Inscription et connexion utilisateur (admin / éditeur)
- Stockage sécurisé des mots de passe (bcrypt)
- Authentification par token JWT
- Protection des routes sensibles selon le rôle

### 2. 🦸‍♀️ Gestion des héros (CRUD complet)
- **Lire**: Lister tous les héros avec recherche et filtres
- **Créer**: Ajouter un nouveau héros via un formulaire React
- **Mettre à jour**: Modifier les informations d'un héros
- **Supprimer**: Retirer un héros de la base (admin uniquement)
- **Afficher**: Détails d'un héros (image, statistiques, univers, etc.)

### 3. 📊 Statistiques de pouvoir
- Le système de "pouvoirs" a été remplacé par un système de **statistiques prédéfinies**.
- Formulaire de création/modification avec 6 sliders (0-100) pour :
  - Intelligence
  - Force (Strength)
  - Vitesse (Speed)
  - Résistance (Durability)
  - Puissance (Power)
  - Combat
- Affichage des statistiques sous forme de **barres de progression** dans la page de détails.

### 4. 🖼️ Gestion des images
- Upload d'image lors de la création ou de la modification d'un héros.
- Affichage des images sur la page d'accueil et la fiche détaillée.
- Suppression automatique de l'image lors de la suppression du héros.

### 5. 🔎 Filtres et tri
- Filtrer par univers (Marvel, DC, Autre).
- **Rechercher par nom ou alias (en temps réel)**.
- **Normalisation des caractères**: ignore les accents, tirets, espaces.
- Recherche instantanée sans bouton.

### 6. 👥 Rôles utilisateurs
- **Admin**: accès total à toutes les fonctionnalités.
- **Éditeur**: peut créer et modifier mais pas supprimer.
- **Visiteur**: accès uniquement en lecture.

### 7. 🎨 Interface utilisateur
- Interface moderne avec **Bootstrap 5**.
- Design responsive (mobile, tablette, desktop).
- Cartes pour afficher les héros.
- Navbar avec état d'authentification.
- Formulaires stylisés avec validation.

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend

```bash
cd backend
npm install

# Créer un fichier .env avec:
# MONGO_URI=mongodb://localhost:27017/superheroes
# JWT_SECRET=votre_secret_jwt_ici
# PORT=5001

# Lancer le serveur de développement
npm run dev
```

### Frontend

```bash
cd frontend
npm install

# Lancer le serveur de développement
npm run dev
```

## 👤 Comptes de test

Par défaut 3 comptes existe (admin, editor, visitor : leurs mots sont noms d'utilisateur + 123 ; exemple editor123), un admin doit ajouter lui même les nouveaux comptes pour plus de sécurité

## 🔍 Utilisation de la recherche

La recherche en temps réel offre plusieurs avantages:

1. **Pas de bouton**: La recherche s'active automatiquement en tapant.
2. **Normalisation des caractères**: 
   - Ignore les accents (é → e, à → a).
   - Ignore les tirets et espaces (Spider-Man = Spiderman = Spider Man).
3. **Recherche multi-champs**: Cherche dans le nom ET l'alias.
4. **Filtre par univers**: Dropdown pour Marvel, DC, ou Autre.

### Exemples de recherche

- Tapez `spider` → trouve "Spider-Man"
- Tapez `flash` → trouve "Flash" et "Barry Allen"
- Tapez `batman` → trouve "Batman" et "Bruce Wayne"
- La recherche ignore majuscules/minuscules.

## 📁 Structure du projet

```
superhero-manager-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── models/          # Modèles MongoDB
│   │   ├── routes/          # Routes API
│   │   ├── middleware/      # Auth, upload, etc.
│   │   └── index.ts         # Point d'entrée
│   └── uploads/             # Images uploadées
│
└── frontend/
    ├── src/
    │   ├── api/             # Appels API
    │   ├── components/      # Composants React
    │   ├── pages/           # Pages de l'application
    │   ├── hooks/           # Hooks personnalisés
    │   ├── types/           # Types TypeScript
    │   └── utils/           # Utilitaires (normalisation)
    └── public/              # Fichiers statiques
```

## 🛠️ Technologies utilisées

### Backend
- **Express.js**: Framework web
- **MongoDB + Mongoose**: Base de données
- **JWT**: Authentification
- **bcryptjs**: Hashage de mots de passe
- **Multer**: Upload de fichiers
- **TypeScript**: Typage statique

### Frontend
- **React 19**: Framework UI
- **TypeScript**: Typage statique
- **React Router**: Navigation
- **Axios**: Requêtes HTTP
- **Bootstrap 5**: Framework CSS
- **Vite**: Build tool

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt (10 rounds)
- Tokens JWT avec expiration (7 jours)
- Routes protégées par middleware d'authentification
- Validation côté client et serveur
- Protection CORS configurée
- Pas de secrets dans le code (variables d'environnement)

## 📝 Scripts disponibles

### Backend
```bash
npm run dev          # Serveur de développement
npm run build        # Compilation TypeScript
npm run start        # Serveur de production
```

### Frontend
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
```

## 🐛 Débogage

### Problème de connexion backend
- Vérifiez que MongoDB est démarré.
- Vérifiez le fichier `.env` avec MONGO_URI et JWT_SECRET.
- Port par défaut: 5001.

### Images ne s'affichent pas
- Vérifiez que le dossier `backend/uploads/` existe.
- Vérifiez que les permissions d'écriture sont correctes.

## 📄 License

MIT