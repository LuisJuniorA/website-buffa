import "dotenv/config";
import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";

// Error middleware
import {
    notFoundMiddleware,
    errorHandlerMiddleware,
} from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Game Hub API is running" });
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`[Server] Backend écoutant sur http://localhost:${PORT}`);
    });
}

export default app;
