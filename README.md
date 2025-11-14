# 🦸 SuperHero Manager - Full Stack Application

Application web complète de gestion de super-héros développée avec React, TypeScript, Node.js, Express et MongoDB.

## 📋 Fonctionnalités

- ✅ **Authentification JWT** - Connexion sécurisée avec gestion des rôles (admin/editor)
- ✅ **CRUD complet** - Créer, lire, modifier et supprimer des héros
- ✅ **Upload d'images** - Gestion des images de héros avec Multer
- ✅ **Recherche et filtres** - Recherche par nom/alias et filtrage par univers (Marvel/DC/Autre)
- ✅ **Gestion des rôles** - Permissions différenciées selon le rôle utilisateur
- ✅ **Interface responsive** - Design moderne et adaptatif

## 🛠️ Technologies utilisées

### Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT (JSON Web Token) pour l'authentification
- Bcrypt pour le hashage des mots de passe
- Multer pour l'upload de fichiers
- CORS pour la communication cross-origin

### Frontend
- React + TypeScript + Vite
- React Router DOM pour la navigation
- Axios pour les appels API
- CSS moderne avec variables et responsive design

## 📁 Structure du projet

```
superhero-manager-fullstack/
├── backend/                    # Serveur Node.js + Express
│   ├── src/
│   │   ├── config/            # Configuration MongoDB
│   │   ├── models/            # Schémas Mongoose (Hero, User)
│   │   ├── controllers/       # Logique métier (auth, heroes)
│   │   ├── routes/            # Routes Express
│   │   ├── middleware/        # Middlewares (auth, upload, roles)
│   │   ├── utils/             # Utilitaires (seed database)
│   │   ├── SuperHerosComplet.json  # Données initiales
│   │   └── index.ts           # Point d'entrée
│   ├── uploads/               # Dossier des images uploadées
│   └── .env                   # Variables d'environnement
│
└── frontend/                  # Application React
    ├── src/
    │   ├── api/              # Appels API (heroApi, authApi)
    │   ├── components/       # Composants réutilisables
    │   ├── pages/            # Pages de l'application
    │   ├── context/          # Context API (AuthContext)
    │   ├── hooks/            # Custom hooks (useAuth)
    │   ├── types/            # Types TypeScript
    │   └── App.tsx           # Composant racine
    └── public/               # Fichiers statiques
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- MongoDB installé localement ou compte MongoDB Atlas
- npm ou yarn

### 1. Cloner le repository

```bash
git clone https://github.com/fascix/superhero-manager-fullstack.git
cd superhero-manager-fullstack
```

### 2. Configuration du Backend

```bash
cd backend
npm install
```

Le fichier `.env` est déjà créé avec les configurations par défaut :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/superheroes
JWT_SECRET=supersecretkey_change_in_production_12345
```

**⚠️ Important :** Modifiez `JWT_SECRET` en production avec une clé sécurisée !

### 3. Démarrer MongoDB

**Option A - MongoDB local :**
```bash
# Sur Linux/Mac
sudo systemctl start mongod
# ou
mongod

# Sur Windows
net start MongoDB
```

**Option B - MongoDB Atlas :**
Modifiez `MONGO_URI` dans `.env` avec votre URL de connexion Atlas.

### 4. Importer les données initiales

```bash
# Dans le dossier backend
npm run build
node dist/utils/seedDatabase.js
```

Vous devriez voir :
```
✅ MongoDB connecté
🗑️  Anciennes données supprimées
✅ 563 héros importés avec succès !
```

### 5. Démarrer le serveur backend

```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm run build
npm start
```

Le serveur démarre sur `http://localhost:5000`

### 6. Configuration du Frontend

Ouvrez un nouveau terminal :

```bash
cd frontend
npm install
```

### 7. Démarrer l'application frontend

```bash
# Mode développement
npm run dev
```

L'application démarre sur `http://localhost:5173`

## 👤 Créer un utilisateur admin

Utilisez un outil comme Postman ou curl pour créer un compte administrateur :

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }'
```

Ou créez un éditeur :

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "editor",
    "password": "editor123",
    "role": "editor"
  }'
```

## 🔐 Connexion à l'application

1. Ouvrez `http://localhost:5173`
2. Connectez-vous avec les identifiants créés
3. Explorez le tableau de bord et gérez vos super-héros !

## 📡 Routes API

### Authentification (`/api/auth`)

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/verify` - Vérifier le token (protégé)

### Héros (`/api/heroes`)

- `GET /api/heroes` - Liste tous les héros (public)
- `GET /api/heroes/:id` - Détails d'un héros (public)
- `POST /api/heroes` - Créer un héros (admin/editor)
- `PUT /api/heroes/:id` - Modifier un héros (admin/editor)
- `DELETE /api/heroes/:id` - Supprimer un héros (admin uniquement)

### Paramètres de recherche

```
GET /api/heroes?search=spider&univers=Marvel
```

## 🎨 Captures d'écran

### Page de connexion
Interface moderne avec authentification sécurisée JWT.

### Tableau de bord
Liste des héros avec recherche, filtres par univers, et actions rapides.

### Détails d'un héros
Fiche complète avec image, pouvoirs, origine et première apparition.

### Formulaire d'ajout/modification
Formulaire complet avec upload d'image et validation.

## 🧪 Tests

### Backend
```bash
cd backend
npm test  # Si des tests sont configurés
```

### Frontend
```bash
cd frontend
npm test  # Si des tests sont configurés
```

## 📦 Build pour la production

### Backend
```bash
cd backend
npm run build
# Les fichiers compilés sont dans dist/
```

### Frontend
```bash
cd frontend
npm run build
# Les fichiers statiques sont dans dist/
```

## 🔧 Résolution de problèmes

### MongoDB ne démarre pas
- Vérifiez que MongoDB est installé : `mongod --version`
- Vérifiez que le port 27017 n'est pas déjà utilisé
- Consultez les logs : `tail -f /var/log/mongodb/mongod.log`

### Erreur CORS
- Vérifiez que CORS est activé dans `backend/src/index.ts`
- Vérifiez l'URL de base dans `frontend/src/api/heroApi.ts`

### Images ne s'affichent pas
- Vérifiez que le dossier `backend/uploads/` existe
- Vérifiez les permissions du dossier
- Vérifiez que l'URL des images est correcte (`http://localhost:5000/uploads/...`)

## 📝 Améliorations possibles

- [ ] Tests unitaires et d'intégration
- [ ] Page d'administration complète avec gestion des utilisateurs
- [ ] Système de journalisation des actions
- [ ] Pagination de la liste des héros
- [ ] Statistiques et graphiques
- [ ] Export/Import de données
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] Dockerisation complète

## 👥 Contributeurs

- [Fascix](https://github.com/fascix)

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

**Projet réalisé dans le cadre du cours "Technologie du Web"**
