import { getStoredPlayer } from "./api.js";
import { setupLoginHandler } from "./auth-handler.js";

document.addEventListener("DOMContentLoaded", () => {
    if (getStoredPlayer()) {
        window.location.href = "../../index.html";
        return;
    }

    setupLoginHandler();
});
