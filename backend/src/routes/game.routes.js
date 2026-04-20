import { Router } from 'express';
import * as gameController from '../controllers/game.controller.js';

const router = Router();

router.put('/:gameId/time', gameController.updateTime);

export default router;
