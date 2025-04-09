import express from "express";
import { addTeam, addPlayer, sellPlayer, addLog } from "../controllers/putData";
import {
  getTeamData,
  getTeamPlayerData,
  getPlayerData,
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
router.get("/teams", getTeamData);
router.get("/teamsplayers", getTeamPlayerData);
router.post("/playersPocket", getPlayerPoolData);
router.post("/players", getPlayerData);
router.get("/sold-players", getSoldPlayers);
router.get("/logs", getLogs);

// PATCH routes for updating data
router.post("/team-update", updateTeam);
router.post("/player-update", updatePlayer);

export default router;
