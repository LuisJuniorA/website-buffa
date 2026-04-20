import { getStoredPlayer, clearAuth, getLeaderboard } from "./api.js";
import { setupLoginHandler } from "./auth-handler.js";

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    const player = getStoredPlayer();

    // 1. Mise à jour de l'interface (Navbar + Dashboard)
    renderUI(player);

    // 2. Charger le leaderboard initial
    loadLeaderboard("all");

    // 3. Événements (Logout, Tabs et Connexion)
    setupEventListeners();
}

function renderUI(player) {
    const authGuest = document.getElementById("auth-guest");
    const authUser = document.getElementById("auth-user");
    const navLoginLink = document.getElementById("nav-login-link");
    const navLogoutBtn = document.getElementById("nav-logout-btn");

    if (player) {
        const displayName = player.login || "Joueur";

        if (authGuest) authGuest.style.display = "none";
        if (authUser) authUser.style.display = "block";
        if (navLoginLink) navLoginLink.style.display = "none";
        if (navLogoutBtn) navLogoutBtn.style.display = "block";

        const nameEl = document.getElementById("user-name");
        if (nameEl) nameEl.textContent = displayName;

        const emailEl = document.getElementById("user-email");
        if (emailEl) emailEl.textContent = player.email || displayName;

        const avatar = document.getElementById("user-avatar-initial");
        if (avatar) avatar.textContent = displayName.charAt(0).toUpperCase();

        const statTotal = document.getElementById("stat-total");
        if (statTotal) {
            const total =
                (player.time_game_1 || 0) +
                (player.time_game_2 || 0) +
                (player.time_game_3 || 0);
            statTotal.textContent = total + "h";
        }
    } else {
        if (authGuest) authGuest.style.display = "block";
        if (authUser) authUser.style.display = "none";
        if (navLoginLink) navLoginLink.style.display = "block";
        if (navLogoutBtn) navLogoutBtn.style.display = "none";
    }
}

async function loadLeaderboard(gameId) {
    const lbList = document.getElementById("lb-list");
    if (!lbList) return;

    try {
        const response = await getLeaderboard(gameId);

        // CORRECTION : On récupère le tableau qui est dans la propriété 'players'
        // On ajoute une sécurité '|| []' au cas où players serait indéfini
        const players = response.players || [];

        if (players.length === 0) {
            lbList.innerHTML =
                '<p class="lb-empty">Aucun score pour le moment.</p>';
            return;
        }

        lbList.innerHTML = players
            .map(
                (entry, index) => `
            <div class="lb-item">
                <span class="lb-rank">#${index + 1}</span>
                <span class="lb-name">${entry.username || entry.login}</span>
                <span class="lb-time">${(entry.time / 60).toFixed(1)}h</span>
            </div>
        `,
            )
            .join("");
    } catch (err) {
        console.error("Détails de l'erreur leaderboard:", err);
        lbList.innerHTML = '<p class="lb-error">Erreur de chargement.</p>';
    }
}

function setupEventListeners() {
    // ACTIVE LE HANDLER DE CONNEXION (pour le formulaire du dashboard)
    setupLoginHandler();

    // Gestion du logout
    const logoutButtons = [
        document.getElementById("nav-logout-btn"),
        document.getElementById("btn-logout-main"),
    ];

    logoutButtons.forEach((btn) => {
        if (btn) {
            btn.onclick = (e) => {
                e.preventDefault();
                if (confirm("Voulez-vous vous déconnecter ?")) {
                    clearAuth();
                    window.location.reload();
                }
            };
        }
    });

    // Tabs Leaderboard
    const tabs = document.querySelectorAll(".lb-tab");
    tabs.forEach((tab) => {
        tab.onclick = () => {
            tabs.forEach((t) => t.classList.remove("lb-tab--active"));
            tab.classList.add("lb-tab--active");
            loadLeaderboard(tab.dataset.game);
        };
    });
}
