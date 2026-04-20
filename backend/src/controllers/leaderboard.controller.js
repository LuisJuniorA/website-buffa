import * as playerService from "../services/player.service.js";

/**
 * GET /api/leaderboard/:gameId
 */
export async function getLeaderboard(req, res) {
    const { gameId } = req.params;

    try {
        const data = await playerService.getLeaderboard(gameId);

        res.json({
            gameId,
            players: data,
        });
    } catch (error) {
        console.error("[getLeaderboard Error]", error);
        return res.status(500).json({ error: "Erreur serveur interne." });
    }
}
