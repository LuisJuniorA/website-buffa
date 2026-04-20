// Page d'inscription
import { registerPlayer, saveAuth } from './api.js';

// Formulaire d'inscription
const registerForm = document.getElementById('register-form');
const registerMsg = document.getElementById('register-msg');
const registerBtn = registerForm.querySelector('button[type="submit"]');

function showMsg(message, isError = false) {
  registerMsg.textContent = message;
  registerMsg.style.display = 'block';
  registerMsg.className = isError ? 'auth-msg auth-msg--error' : 'auth-msg auth-msg--success';
}

function hideMsg() {
  registerMsg.style.display = 'none';
}

function setBtnState(isLoading) {
  registerBtn.disabled = isLoading;
  registerBtn.textContent = isLoading ? 'Chargement...' : "S'inscrire";
}

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideMsg();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;

  // Validation des mots de passe
  if (password !== passwordConfirm) {
    showMsg('Les mots de passe ne correspondent pas.', true);
    return;
  }

  // Validation de la longueur du mot de passe
  if (password.length < 6) {
    showMsg('Le mot de passe doit contenir au moins 6 caractères.', true);
    return;
  }

  setBtnState(true);

  try {
    const response = await registerPlayer(username, password);
    const { player } = response;

    if (player) {
      saveAuth(player);
      showMsg('Inscription réussie ! Redirection...', false);

      setTimeout(() => {
        window.location.href = '../../index.html';
      }, 1000);
    } else {
      showMsg('Réponse invalide du serveur.', true);
    }
  } catch (error) {
    showMsg(error.message, true);
  } finally {
    setBtnState(false);
  }
});
