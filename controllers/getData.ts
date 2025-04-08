import { type Request, type Response } from "express";
import Team from "../models/Team";
import Player from "../models/Players";
import Logs from "../models/logs";

export const getTeamData = async (req: Request, res: Response) => {
    try {
        const { teamID } = req.query;
        
        if (teamID) {
            // Get specific team by ID
            const team = await Team.findOne({ teamID });
            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
                });
            }
            
            return res.status(200).json({
                success: true,
                data: team
            });
        } else {
            // Get all teams
            const teams = await Team.find();
            return res.status(200).json({
                success: true,
                data: teams
            });
        }
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching team data",
            error: error.message
        });
    }
};

export const getPlayerData = async (req: Request, res: Response) => {
    try {
        const { playerId, pool } = req.query;
        
        if (playerId) {
            const player = await Player.findOne({ playerId });
            if (!player) {
                return res.status(404).json({
                    success: false,
                    message: "Player not found"
                });
            }
            
            return res.status(200).json({
                success: true,
                data: player
            });
        } else if (pool) {
            // Get players by pool
            const players = await Player.find({ pool });
            return res.status(200).json({
                success: true,
                data: players
            });
        } else {
            // Get all players
            const players = await Player.find();
            return res.status(200).json({
                success: true,
                data: players
            });
        }
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching player data",
            error: error.message
        });
    }
};

export const getSoldPlayers = async (req: Request, res: Response) => {
    try {
        // Find players that have been bought (boughtAt field exists and is not null)
        const soldPlayers = await Player.find({ boughtAt: { $exists: true, $ne: null } });
        
        return res.status(200).json({
            success: true,
            count: soldPlayers.length,
            data: soldPlayers
        });
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching sold players",
            error: error.message
        });
    }
};

export const getLogs = async (req: Request, res: Response) => {
    try {
        const { playerId, transactionId } = req.query;
        
        if (transactionId) {
            // Get specific log by transaction ID
            const log = await Logs.findOne({ transactionId });
            if (!log) {
                return res.status(404).json({
                    success: false,
                    message: "Transaction log not found"
                });
            }
            
            return res.status(200).json({
                success: true,
                data: log
            });
        } else if (playerId) {
            // Get logs for a specific player
            const logs = await Logs.find({ playerId });
            return res.status(200).json({
                success: true,
                data: logs
            });
        } else {
            // Get all logs
            const logs = await Logs.find().sort({ timeStamp: -1 }); // Sort by timestamp, newest first
            return res.status(200).json({
                success: true,
                count: logs.length,
                data: logs
            });
        }
    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching transaction logs",
            error: error.message
        });
    }
};