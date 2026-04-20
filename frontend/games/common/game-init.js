import GameTimer from "./timer.js";
import { API_BASE_URL } from "../../public/js/api.js";

const gameId = window.GAME_ID || "unknown";
const timer = new GameTimer({
    backendUrl: API_BASE_URL,
    gameId: gameId,
    interval: 30,
});

// Interface simple pour les jeux
window.GameManager = {
    timer: timer,
    start: () => timer.start(),
    pause: () => timer.pause(),
    stop: () => timer.stop(),
};

// Démarrage automatique quand la page est chargée
window.addEventListener("load", () => {
    if (localStorage.getItem("player")) {
        timer.start();
        console.log(
            `%c [${gameId}] Timer auto-started `,
            "background: #222; color: #bada55",
        );
    }
});

// Sauvegarde automatique quand on ferme l'onglet
window.addEventListener("beforeunload", () => {
    timer.pause();
});
