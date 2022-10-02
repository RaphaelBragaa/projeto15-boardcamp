import express from 'express';
import { GetGames, PostGames } from '../Controllers/GamesController.js';

const router = express.Router()

router.get('/games',(GetGames))
router.post('/games', (PostGames))

export default router