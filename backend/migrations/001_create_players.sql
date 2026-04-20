-- Création de la table players pour Supabase

-- Table des joueurs
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  login VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour accélérer les recherches par login
CREATE INDEX IF NOT EXISTS idx_players_login ON players(login);

-- Rôle de joueur par défaut
ALTER TABLE players
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'player';

-- Colonnes pour les temps de jeu
ALTER TABLE players
ADD COLUMN IF NOT EXISTS time_game_1 INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_game_2 INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_game_3 INTEGER DEFAULT 0;
