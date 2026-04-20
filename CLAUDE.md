# Contexte du Projet

Tu es un développeur Full-Stack Senior expert en Clean Architecture.
Ton objectif est de créer une plateforme web hébergeant 3 jeux, avec un système d'authentification et un leaderboard (classement des temps de jeu).

# Stack Technique

- **Frontend :** HTML CSS JS
- **Backend :** Node.js avec Express.
- **Base de données :** Supabase (PostgreSQL).
- **Communication :** Le Frontend communique UNIQUEMENT avec le Backend Express via une API REST. Le Backend Express est le seul à communiquer avec Supabase en utilisant le SDK `@supabase/supabase-js`.

# Architecture et Clean Code

- **Séparation des responsabilités (Backend) :** Utiliser une architecture claire avec `routes/`, `controllers/`, `services/` (pour la logique Supabase) et `middlewares/`.
- **Sécurité :** Les mots de passe ne doivent JAMAIS être stockés en clair. Ils doivent être hashés (ex: avec bcrypt) avant l'envoi à Supabase, ou gérés via l'Auth native de Supabase si autorisé, mais le schéma impose un login/mdp manuel.
- **Variables d'environnement :** Utiliser un fichier `.env` pour les clés Supabase (`SUPABASE_URL`, `SUPABASE_KEY`) et le port du serveur.

# Schéma de la Base de Données (Table "players")

- `id` (UUID, Primary Key, généré automatiquement)
- `login` (String, Unique, Not Null)
- `password` (String, Not Null - _doit être hashé_)
- `time_game_1` (Integer ou Float, Default: 0) - _Temps passé ou score sur le jeu 1_
- `time_game_2` (Integer ou Float, Default: 0) - _Temps passé ou score sur le jeu 2_
- `time_game_3` (Integer ou Float, Default: 0) - _Temps passé ou score sur le jeu 3_
- `created_at` (Timestamp)

# Fonctionnalités Requises

## 1. API Express (Backend)

Tu dois générer les routes suivantes :

- `POST /api/auth/register` : Créer un compte (hash du mdp + insertion via Supabase).
- `POST /api/auth/login` : Vérifier les identifiants et retourner un token ou une session.
- `PUT /api/games/:gameId/time` : Mettre à jour le temps de jeu d'un joueur pour un jeu spécifique (1, 2 ou 3).
- `GET /api/leaderboard/:gameId` : Récupérer les meilleurs temps pour un jeu spécifique, triés dans le bon ordre.

## 2. Interface Utilisateur (Frontend)

- **Hub des jeux (Accueil) :** Accès direct aux 3 jeux. L'authentification est **optionnelle** pour jouer.
- **Leaderboard :** Classement global (via `/api/leaderboard`).
    - _Public :_ Consultation libre des scores.
    - _Connecté :_ Affichage personnalisé du rang du joueur.
- **Authentification :** Connexion/Inscription facultative, nécessaire uniquement pour enregistrer ses scores et figurer au classement.
