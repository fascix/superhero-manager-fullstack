# 🚀 Guide de Démarrage Rapide - SuperHero Manager

Guide pour démarrer rapidement le projet SuperHero Manager.

## 📋 Prérequis

- **Node.js** v18 ou supérieur
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**
- Un terminal/console

## ⚡ Installation Express (5 minutes)

### Étape 1: Cloner le projet

```bash
git clone https://github.com/fascix/superhero-manager-fullstack.git
cd superhero-manager-fullstack
```

### Étape 2: Configurer le Backend

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env avec vos valeurs:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/superheroes
# JWT_SECRET=votre_secret_ultra_securise
```

### Étape 3: Préparer la base de données

```bash
# Démarrer MongoDB (si local)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Importer les données des héros
npm run seed

# Créer les utilisateurs de test
npm run seed:users
```

Utilisateurs créés:
- **Admin**: username=`admin`, password=`admin123`
- **Editor**: username=`editor`, password=`editor123`

### Étape 4: Démarrer le Backend

```bash
npm run dev
```

✅ Le serveur démarre sur `http://localhost:5000`

### Étape 5: Configurer le Frontend

```bash
# Dans un nouveau terminal
cd ../frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

✅ L'application démarre sur `http://localhost:5173`

## 🎯 Premier test

1. Ouvrez `http://localhost:5173` dans votre navigateur
2. Connectez-vous avec:
   - Username: `admin`
   - Password: `admin123`
3. Explorez la galerie de héros
4. Testez la recherche en temps réel
5. Ajoutez un nouveau héros

## 🔧 Commandes utiles

### Backend

```bash
cd backend

# Développement avec rechargement auto
npm run dev

# Compiler TypeScript
npm run build

# Démarrer en production
npm run start

# Recréer les utilisateurs
npm run seed:users
```

### Frontend

```bash
cd frontend

# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Vérifier le code
npm run lint
```

## 📖 Fonctionnalités à tester

### Recherche en temps réel

1. Sur le Dashboard, tapez dans la barre de recherche
2. La recherche s'active automatiquement (pas de bouton)
3. Essayez: "spider", "flash", "bat"
4. Testez avec accents: "élément"
5. Utilisez le filtre univers

### Gestion des héros

**Visiteur (non connecté):**
- ✅ Voir la liste
- ✅ Voir les détails
- ❌ Modifier ou supprimer

**Editor (editor/editor123):**
- ✅ Voir la liste et détails
- ✅ Ajouter un héros
- ✅ Modifier un héros
- ❌ Supprimer un héros

**Admin (admin/admin123):**
- ✅ Tout ce que l'editor peut faire
- ✅ Supprimer un héros
- ✅ Accès à la page Admin

### Upload d'images

1. Connectez-vous
2. Cliquez sur "Ajouter un héros"
3. Remplissez le formulaire
4. Choisissez une image (JPG, PNG)
5. Créez le héros
6. L'image s'affiche dans la galerie

## 🐛 Dépannage

### Erreur "Cannot connect to MongoDB"

```bash
# Vérifiez que MongoDB est démarré
mongod --version

# Vérifiez l'URI dans backend/.env
MONGO_URI=mongodb://localhost:27017/superheroes
```

### Erreur "Port already in use"

```bash
# Changez le port dans backend/.env
PORT=5001

# Ou tuez le processus existant
# Windows: taskkill /F /IM node.exe
# Mac/Linux: killall node
```

### Les images ne s'affichent pas

```bash
# Vérifiez que le dossier uploads existe
cd backend
ls -la uploads/

# Créez-le si nécessaire
mkdir -p uploads
```

### Erreur "Invalid credentials"

```bash
# Recréez les utilisateurs de test
cd backend
npm run seed:users

# Utilisez les identifiants exacts:
# admin/admin123 ou editor/editor123
```

## 📚 Documentation complète

- **README.md** - Guide d'installation complet
- **FEATURES.md** - Documentation des fonctionnalités
- **IMPLEMENTATION_SUMMARY.md** - Résumé technique
- **CONFORMITY_CHECK.md** - Vérification du sujet

## 🎓 Pour l'évaluation

### Démonstration recommandée

1. **Authentification** (2 min)
   - Montrer la page de connexion
   - Se connecter avec admin
   - Montrer le rôle dans la navbar

2. **Recherche** (2 min)
   - Recherche en temps réel
   - Normalisation des caractères
   - Filtre par univers

3. **CRUD** (3 min)
   - Créer un héros avec image
   - Modifier le héros
   - Supprimer (admin uniquement)

4. **Rôles** (2 min)
   - Se connecter avec editor
   - Montrer les restrictions
   - Impossible de supprimer

5. **Technique** (1 min)
   - Montrer le code backend
   - Montrer les routes API
   - MongoDB collections

### Points à mentionner

- ✅ Architecture full-stack complète
- ✅ TypeScript côté client et serveur
- ✅ Authentification JWT sécurisée
- ✅ Upload d'images avec Multer
- ✅ Recherche intelligente (bonus)
- ✅ Bootstrap 5 pour l'UI
- ✅ 0 vulnérabilités de sécurité

## 🚀 Prêt pour la production

Pour déployer en production:

1. **Backend**
   ```bash
   cd backend
   npm run build
   # Déployer dist/ sur votre serveur
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm run build
   # Déployer dist/ sur votre hébergeur
   ```

3. **Base de données**
   - Utilisez MongoDB Atlas (gratuit)
   - Mettez à jour MONGO_URI dans .env

4. **Variables d'environnement**
   - Changez JWT_SECRET en production
   - Utilisez des secrets sécurisés
   - Activez HTTPS

---

**Besoin d'aide?** Consultez la documentation complète dans README.md
