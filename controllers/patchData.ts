import { type Request, type Response } from "express";
import { connectDB } from '../db/connectDB';
import Team from '../models/Team';
import Player from '../models/Players';
import { createLogEntry, createSystemLogEntry } from '../helpers/logsEntry';

// Update team data might not be useful if we are doing from mongoDB compass
export const updateTeam = async (req: Request, res: Response) => {
    try {
        const { teamID } = req.params;
        const updateData = req.body;

        await connectDB();

        const team = await Team.findOne({ teamID });
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        // Store original data for logging
        const originalData = { ...team.toObject() };

        const updatedTeam = await Team.findOneAndUpdate(
            { teamID },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // Create log entry using the helper function
        await createSystemLogEntry(
            "Team Updated", 
            { 
                teamID,
                teamName: team.teamName,
                changes: updateData,
                before: originalData,
                after: updatedTeam
            }
        );

        res.status(200).json({
            success: true,
            message: "Team updated successfully",
            data: updatedTeam
        });
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({
            success: false,
            message: "Error updating team",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

// Update player data might not be useful if we are doing from mongoDB compass
export const updatePlayer = async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;
        const updateData = req.body;

        await connectDB();

        const player = await Player.findOne({ playerId });
        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        // Store original data for logging
        const originalData = { ...player.toObject() };

        const updatedPlayer = await Player.findOneAndUpdate(
            { playerId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // Create log entry using the helper function
        await createSystemLogEntry(
            "Player Updated",
            {
                playerId: player.playerId,
                playerName: player.playerName,
                changes: updateData,
                before: originalData,
                after: updatedPlayer
            }
        );

        res.status(200).json({
            success: true,
            message: "Player updated successfully",
            data: updatedPlayer
        });
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({
            success: false,
            message: "Error updating player",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

// Transfer player between teams
export const transferPlayer = async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;
        const { newTeamID, transferPrice } = req.body;

        // Connect to database
        await connectDB();

        // Find the player
        const player = await Player.findOne({ playerId });
        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        // Check if player is already bought
        if (!player.boughtAt) {
            return res.status(400).json({
                success: false,
                message: "Player is not currently owned by any team"
            });
        }

        // Find the new team
        const newTeam = await Team.findOne({ teamID: newTeamID });
        if (!newTeam) {
            return res.status(404).json({
                success: false,
                message: "New team not found"
            });
        }

        // Check if new team has enough balance
        if (newTeam.teamBalance < transferPrice) {
            return res.status(400).json({
                success: false,
                message: "New team does not have enough balance for this transfer"
            });
        }

        // Store original data for logging
        const originalPlayerData = { ...player.toObject() };

        // Update player with new bought price
        player.boughtAt = transferPrice;
        await player.save();

        // Update new team balance and player count
        newTeam.teamBalance -= transferPrice;
        newTeam.player_bought += 1;
        newTeam.numberofPlayers += 1;
        await newTeam.save();

        // Create log entry using the helper function
        await createLogEntry({
            soldTo: newTeam.teamName,
            playerName: player.playerName,
            playerId: player.playerId,
            price: transferPrice
        });

        res.status(200).json({
            success: true,
            message: "Player transferred successfully",
            data: {
                player,
                team: newTeam
            }
        });
    } catch (error) {
        console.error("Error transferring player:", error);
        res.status(500).json({
            success: false,
            message: "Error transferring player",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};