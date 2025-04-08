import express from 'express';
import { addTeam, addPlayer, sellPlayer, addLog } from '../controllers/putData';
import { getTeamData, getPlayerData, getSoldPlayers, getLogs } from '../controllers/getData';

const router = express.Router();

// POST routes for adding data
router.post('/team', addTeam);
router.post('/player', addPlayer);
router.post('/sell-player', sellPlayer);
router.post('/logs', addLog);

// GET routes for retrieving data
router.get('/teams', getTeamData);
router.get('/players', getPlayerData);
router.get('/sold-players', getSoldPlayers);
router.get('/logs', getLogs);

export default router;