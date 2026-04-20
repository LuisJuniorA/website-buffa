import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/register
 */
export async function register(req, res) {
  const { login, password } = req.body;

  try {
    const player = await authService.registerPlayer(login, password);

    res.status(201).json({
      message: 'Compte créé avec succès.',
      player: {
        id: player.id,
        login: player.login,
      },
    });
  } catch (error) {
    if (error.code === 'PGRM0001' || error.message?.includes('already exists')) {
      return res.status(409).json({ error: 'Ce login est déjà utilisé.' });
    }
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Contrainte de clé unique violée.' });
    }
    return res.status(500).json({ error: 'Erreur lors de la création du compte.' });
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  const { login, password } = req.body;

  const player = await authService.loginPlayer(login, password);

  if (!player) {
    return res.status(401).json({ error: 'Identifiants incorrects.' });
  }

  res.json({
    message: 'Connexion réussie.',
    player: {
      id: player.id,
      login: player.login,
      time_game_1: player.time_game_1,
      time_game_2: player.time_game_2,
      time_game_3: player.time_game_3,
    },
  });
}
