import * as playerService from '../services/player.service.js';

/**
 * PUT /api/games/:gameId/time
 * Corps: { playerId: string, time: number }
 */
export async function updateTime(req, res) {
  const { gameId } = req.params;
  const { playerId, time } = req.body;

  if (!playerId || time == null) {
    return res.status(400).json({
      error: 'playerId et time sont requis.',
    });
  }

  try {
    const player = await playerService.updatePlayerTime(playerId, gameId, Number(time));

    res.json({
      message: 'Temps mis à jour.',
      player: {
        id: player.id,
        login: player.login,
        [`time_game_${gameId}`]: player[`time_game_${gameId}`],
      },
    });
  } catch (error) {
    console.error('[updateTime Error]', error);
    if (error.code === 'PGRST116' || error.message?.includes('not found')) {
      return res.status(404).json({ error: 'Joueur non trouvé.' });
    }
    return res.status(500).json({ error: 'Erreur serveur interne.' });
  }
}
