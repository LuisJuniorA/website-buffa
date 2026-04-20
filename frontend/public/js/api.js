// API Client pour communiquer avec le backend
export const API_BASE_URL = "http://localhost:3001/api";

/**
 * Envoie une requête HTTP avec gestion d'erreur
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        ...options,
        headers: {
            ...options.headers,
        },
    };

    // Ajouter le token d'authentification si présent
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur inconnue");
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw new Error(
                "Impossible de se connecter au serveur. Assurez-vous que le backend est lancé.",
            );
        }
        throw error;
    }
}

/**
 * AUTHENTIFICATION
 */

export async function registerPlayer(login, password) {
    return apiRequest("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
}

export async function loginPlayer(login, password) {
    return apiRequest("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
}

/**
 * JEUX
 */

export async function updateTime(gameId, playerId, time) {
    return apiRequest(`/games/${gameId}/time`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, time }),
    });
}

/**
 * CLASSEMENTS
 */

export async function getLeaderboard(gameId) {
    return apiRequest(`/leaderboard/${gameId}`);
}

/**
 * UTILITAIRES
 */

export function saveAuth(player) {
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("authToken", player.id); // Utiliser l'ID comme token simple
}

export function getStoredPlayer() {
    const player = localStorage.getItem("player");
    return player ? JSON.parse(player) : null;
}

export function clearAuth() {
    localStorage.removeItem("player");
    localStorage.removeItem("authToken");
}
