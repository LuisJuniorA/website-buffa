import { supabase } from "../database.js";

const GAME_COLUMN = {
    1: "time_game_1",
    2: "time_game_2",
    3: "time_game_3",
};

/**
 * Mettre à jour le temps de jeu d'un joueur.
 */
export async function updatePlayerTime(playerId, gameId, time) {
    const column = GAME_COLUMN[gameId];

    // 1. On récupère d'abord la valeur actuelle
    const { data: player } = await supabase
        .from("players")
        .select(column)
        .eq("id", playerId)
        .single();

    const currentTime = player ? player[column] : 0;
    const newTotalTime = currentTime + Math.round(Number(time));

    // 2. On met à jour avec le nouveau total
    const { data, error } = await supabase
        .from("players")
        .update({ [column]: newTotalTime })
        .eq("id", playerId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Récupérer le classement (spécifique ou général).
 */
export async function getLeaderboard(gameId) {
    const validIds = ["1", "2", "3", "all"];
    if (!validIds.includes(gameId)) {
        throw new Error(
            `gameId invalide: "${gameId}". Attendu: "1", "2", "3" ou "all".`,
        );
    }

    const query = supabase.from("players");

    if (gameId === "all") {
        // On récupère les 3 colonnes et on fait la somme en JS
        const { data, error } = await query
            .select("id, login, time_game_1, time_game_2, time_game_3")
            .limit(50);

        if (error) throw error;

        return data
            .map((p) => ({
                id: p.id,
                username: p.login,
                time:
                    (p.time_game_1 || 0) +
                    (p.time_game_2 || 0) +
                    (p.time_game_3 || 0),
            }))
            .sort((a, b) => b.time - a.time)
            .filter((p) => p.time > 0)
            .slice(0, 10);
    } else {
        const column = GAME_COLUMN[gameId];
        const { data, error } = await query
            .select(`id, login, ${column}`)
            .not(column, "eq", 0)
            .order(column, { ascending: true })
            .limit(10);

        if (error) throw error;
        return data
            .map((p) => ({
                id: p.id,
                username: p.login,
                time: p[column],
            }))
            .sort((a, b) => b.time - a.time)
            .filter((p) => p.time > 0)
            .slice(0, 10);
    }
}
