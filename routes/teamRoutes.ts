import express from 'express';
import { addTeam, addPlayer, sellPlayer, addLog } from '../controllers/putData';
import { getTeamData, getPlayerData, getSoldPlayers, getLogs } from '../controllers/getData';
import { updateTeam,updatePlayer } from '../controllers/patchData';

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

// PATCH routes for updating data
router.patch('/team/:teamID', updateTeam);
router.patch('/player/:playerId', updatePlayer);

export default router;