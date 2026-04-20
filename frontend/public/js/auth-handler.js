import { loginPlayer, saveAuth } from "./api.js";

/**
 * Initialise la logique de connexion sur n'importe quel formulaire
 * @param {string} formId - L'ID du formulaire (ex: 'login-form')
 * @param {string} msgId - L'ID du paragraphe de message (ex: 'login-msg')
 */
export function setupLoginHandler(formId = "login-form", msgId = "login-msg") {
    const loginForm = document.getElementById(formId);
    const loginMsg = document.getElementById(msgId);

    if (!loginForm) return;

    const loginBtn = loginForm.querySelector('button[type="submit"]');

    function showMsg(message, isError = false) {
        if (!loginMsg) return;
        loginMsg.textContent = message;
        loginMsg.style.display = "block";
        loginMsg.style.color = isError ? "#ff4d4d" : "#4ade80";
        loginMsg.className = isError
            ? "auth-msg auth-msg--error"
            : "auth-msg auth-msg--success";
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (loginMsg) loginMsg.style.display = "none";

        const login = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // État de chargement
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.dataset.originalText = loginBtn.textContent;
            loginBtn.textContent = "Chargement...";
        }

        try {
            const response = await loginPlayer(login, password);
            if (response.player) {
                saveAuth(response.player);
                showMsg("Connexion réussie !", false);

                // On recharge pour mettre à jour l'UI globale
                setTimeout(() => {
                    // Si on est sur une page spécifique (login.html), on rentre à l'accueil
                    if (window.location.pathname.includes("login.html")) {
                        window.location.href = "../../index.html";
                    } else {
                        window.location.reload();
                    }
                }, 800);
            }
        } catch (error) {
            showMsg(error.message, true);
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.textContent = loginBtn.dataset.originalText;
            }
        }
    });
}
