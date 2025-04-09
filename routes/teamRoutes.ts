import express from "express";
import { addTeam, addPlayer, sellPlayer, addLog } from "../controllers/putData";
import {
  getTeamData,
  getTeamPlayerData,
  getPlayerData,
  getUnsoldPlayers,
  getSoldPlayers,
  getLogs,
  getPlayerPoolData,
} from "../controllers/getData";
import { updateTeam, updatePlayer } from "../controllers/patchData";

const router = express.Router();

// POST routes for adding data
router.post("/team", addTeam);
router.post("/player", addPlayer);
router.post("/sell-player", sellPlayer);
router.post("/logs", addLog);

// GET routes for retrieving data
router.post("/teams", getTeamData);
router.post("/teamsplayers", getTeamPlayerData);
router.post("/playersPocket", getPlayerPoolData);
router.post("/players", getPlayerData);
router.get("/sold-players", getSoldPlayers);
router.get("/unsold-players", getUnsoldPlayers);
router.get("/logs", getLogs);

// PATCH routes for updating data
router.post("/team-update", updateTeam);
router.post("/player-update", updatePlayer);

export default router;
