// Gestion de l'interface utilisateur pour l'authentification
import { getStoredPlayer, clearAuth } from './api.js';

/**
 * Affiche l'interface de connexion/déconnexion selon l'état du joueur
 */
export function renderAuthUI() {
  const player = getStoredPlayer();

  // Éléments DOM
  const authContainer = document.getElementById('auth-container');
  const playerInfo = document.getElementById('player-info');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutBtn = document.getElementById('logout-btn');

  if (!player || !authContainer) {
    // Afficher les boutons de connexion/inscription
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
    if (playerInfo) playerInfo.style.display = 'none';
    return;
  }

  // Afficher les infos du joueur
  if (playerInfo) {
    playerInfo.style.display = 'flex';

    const avatarEl = playerInfo.querySelector('.user-badge__avatar');
    const nameEl = playerInfo.querySelector('.user-badge__name');
    const emailEl = playerInfo.querySelector('.user-badge__email');

    if (avatarEl) avatarEl.textContent = player.username.charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = player.username;
    if (emailEl) emailEl.textContent = player.email || 'Aucun email';

    // Bouton de déconnexion
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
          clearAuth();
          window.location.reload();
        }
      };
      logoutBtn.style.display = 'block';
    }
  }

  // Cacher les boutons de connexion/inscription
  if (loginLink) loginLink.style.display = 'none';
  if (registerLink) registerLink.style.display = 'none';
}

/**
 * Vérifie si l'utilisateur est authentifié
 */
export function isAuthenticated() {
  return !!getStoredPlayer();
}

/**
 * Redirige vers la page de connexion si non authentifié
 */
export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = './pages/login.html';
  }
}
