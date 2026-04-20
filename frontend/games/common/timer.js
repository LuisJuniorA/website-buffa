/**
 * Timer universel pour tous les jeux
 * Met à jour le temps et envoie au serveur toutes les 30 secondes
 */
class GameTimer {
    constructor(options = {}) {
        this.backendUrl = options.backendUrl;
        this.gameId = options.gameId || "1";
        this.interval = options.interval || 30; // secondes
        this.playerId = this.getPlayerId();
        this.time = 0;
        this.isPlaying = false;
        this.timerInterval = null;
        this.syncInterval = null;
    }

    /**
     * Récupère le playerId depuis le localStorage
     */
    getPlayerId() {
        return JSON.parse(localStorage.getItem("player")).id;
    }

    /**
     * Démarrer le timer
     */
    start() {
        if (this.isPlaying) return;

        this.isPlaying = true;

        // Incrémente le temps chaque seconde
        this.timerInterval = setInterval(() => {
            this.time++;
            this.onTimeUpdate?.(this.time);
        }, 1000);

        // Synchronise avec le serveur toutes les X secondes (si connecté)
        if (this.playerId && this.interval > 0) {
            this.syncInterval = setInterval(() => {
                this.saveTime();
            }, this.interval * 1000);
        }

        console.log("[GameTimer] Timer started");
    }

    /**
     * Mettre en pause le timer
     */
    pause() {
        this.isPlaying = false;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }

        // Sauvegarde le temps actuel avant pause
        this.saveTime();

        console.log("[GameTimer] Timer paused");
    }

    /**
     * Arrêter le timer et réinitialiser
     */
    stop() {
        this.pause();
        this.time = 0;
        this.onTimeUpdate?.(0);
        console.log("[GameTimer] Timer stopped");
    }

    /**
     * Réinitialiser le temps à 0
     */
    reset() {
        this.time = 0;
        this.onTimeUpdate?.(0);
        console.log("[GameTimer] Timer reset");
    }

    /**
     * Récupérer le temps actuel
     */
    getTime() {
        return this.time;
    }

    /**
     * Formater le temps en MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    /**
     * Sauvegarder le temps sur le serveur
     */
    async saveTime() {
        if (!this.playerId) {
            console.log("[GameTimer] Not connected, cannot save time");
            return;
        }

        if (this.time === 0) {
            console.log("[GameTimer] No time to save");
            return;
        }

        try {
            const response = await fetch(
                `${this.backendUrl}/games/${this.gameId}/time`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        playerId: this.playerId,
                        time: this.time,
                    }),
                },
            );

            if (response.ok) {
                console.log(`[GameTimer] Time saved: ${this.time}s`);
            } else {
                console.error(
                    "[GameTimer] Failed to save time:",
                    response.status,
                );
            }
        } catch (error) {
            console.error("[GameTimer] Error saving time:", error);
        }
    }

    /**
     * Déclencheur appelé à chaque mise à jour du temps
     */
    onTimeUpdate = null;
}

export default GameTimer;
