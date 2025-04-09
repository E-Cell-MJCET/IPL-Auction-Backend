import { type Request, type Response } from "express";
import Team from "../models/Team";
import Player from "../models/Players";
import Logs from "../models/logs";

export const getTeamData = async (req: Request, res: Response) => {
  try {
    const { teamID } = req.body;

    if (teamID) {
      // Get specific team by ID
      const team = await Team.findOne({ teamID });
      if (!team) {
        return res.status(404).json({
          success: false,
          message: "Team not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: team,
      });
    } else {
      // Get all teams
      const teams = await Team.find();
      return res.status(200).json({
        success: true,
        data: teams,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching team data",
      error: error.message,
    });
  }
};
export const getTeamPlayerData = async (req: Request, res: Response) => {
  try {
    const { teamID } = req.body;

    if (teamID) {
      // Get the team by ID
      const team = await Team.findOne({ teamID });
      if (!team) {
        return res.status(404).json({
          success: false,
          message: "Team not found",
        });
      }

      // Fetch player details for all players in the players_bought array
      const players = await Player.find({
        playerId: { $in: team.player_bought },
      });

      return res.status(200).json({
        success: true,
        team: team,
        players: players,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "teamID is required",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching team and player data",
      error: error.message,
    });
  }
};
export const getPlayerData = async (req: Request, res: Response) => {
  try {
    const { playerId, pool } = req.body;
    console.log("playerId", playerId);
    console.log("pool", pool);
    if (playerId) {
      const player = await Player.findOne({ playerId });
      if (!player) {
        return res.status(404).json({
          success: false,
          message: "Player not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: player,
      });
    } else if (pool) {
      // Get players by pool
      const players = await Player.find({ pocket: pool });
      return res.status(200).json({
        success: true,
        data: players,
      });
    } else {
      // Get all players
      const players = await Player.find();
      return res.status(200).json({
        success: true,
        data: players,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching player data",
      error: error.message,
    });
  }
};
export const getPlayerPoolData = async (req: Request, res: Response) => {
  try {
    const { pool } = req.body;
    console.log("pool", pool);
    // Get players by pool
    const players = await Player.find({ pocket: pool });
    return res.status(200).json({
      success: true,
      data: players,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching player data",
      error: error.message,
    });
  }
};
export const getSoldPlayers = async (req: Request, res: Response) => {
  try {
    // Find players that have been bought (boughtAt field exists and is not null)
    const soldPlayers = await Player.find({
      boughtAt: { $exists: true, $ne: null },
    });

    return res.status(200).json({
      success: true,
      count: soldPlayers.length,
      data: soldPlayers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching sold players",
      error: error.message,
    });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { playerId, transactionId } = req.body;

    if (transactionId) {
      // Get specific log by transaction ID
      const log = await Logs.findOne({ transactionId });
      if (!log) {
        return res.status(404).json({
          success: false,
          message: "Transaction log not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: log,
      });
    } else if (playerId) {
      // Get logs for a specific player
      const logs = await Logs.find({ playerId });
      return res.status(200).json({
        success: true,
        data: logs,
      });
    } else {
      // Get all logs
      const logs = await Logs.find().sort({ timeStamp: -1 }); // Sort by timestamp, newest first
      return res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error fetching transaction logs",
      error: error.message,
    });
  }
};
