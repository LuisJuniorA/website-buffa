import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller.js';

const router = Router();

router.get('/:gameId', leaderboardController.getLeaderboard);

export default router;
