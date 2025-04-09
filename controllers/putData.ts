import type { Response, Request } from "express";
import { connectDB } from "../db/connectDB";
import Team from "../models/Team";
import Player from "../models/Players";
import Logs from "../models/logs";

// Add a new team
export const addTeam = async (req: Request, res: Response) => {
  try {
    const {
      teamName,
      teamID,

      teamBalance,
      teamRating,
      numberofPlayers,
      player_bought,
      number_foreign,
    } = req.body;

    // Connect to database
    await connectDB();

    // Create new team document
    const newTeam = new Team({
      teamName,
      teamID,

      teamBalance,
      teamRating,
      numberofPlayers,
      player_bought,
      number_foreign,
    });

    // Save the team to database
    const savedTeam = await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team added successfully",
      data: savedTeam,
    });
  } catch (error) {
    console.error("Error adding team:", error);
    res.status(500).json({
      success: false,
      message: "Error adding team",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Add a new player
export const addPlayer = async (req: Request, res: Response) => {
  try {
    const {
      playerName,
      playerId,
      rating,
      boughtAt,
      role,
      basePrice,
      pocket,
      nationality,
    } = req.body;

    // Connect to database
    await connectDB();

    // Create new player document
    const newPlayer = new Player({
      playerName,
      playerId,
      rating,
      boughtAt,
      role,
      basePrice,
      pocket,
      nationality,
    });

    // Save the player to database
    const savedPlayer = await newPlayer.save();

    res.status(201).json({
      success: true,
      message: "Player added successfully",
      data: savedPlayer,
    });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({
      success: false,
      message: "Error adding player",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Sell a player to a team
export const sellPlayer = async (req: Request, res: Response) => {
  try {
    console.log("sellPlayer called");
    const { playerId, teamID, soldPrice } = req.body;
    console.log("sellPlayer called" + playerId + teamID + soldPrice);
    // Connect to database
    await connectDB();

    // Find the player
    const player = await Player.findOne({ _id:playerId });
    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }
    console.log("sellPlayer called 1");
    // Find the team
    const team = await Team.findOne({ _id:teamID });
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }
    console.log("sellPlayer called 2");
    // Check if team has enough balance
    if (team.teamBalance < soldPrice) {
      return res.status(400).json({
        success: false,
        message: "Team does not have enough balance",
      });
    }

    // Update player with bought price
    player.isSold = true; // Mark player as sold
    player.boughtAt = soldPrice;
    console.log(player);
    await player.save();
    // Update team balance and player count
    team.teamBalance -= soldPrice;
    // team.player_bought.push(player.playerId); // Add player ID to the team's bought players
    team.numberofPlayers += 1;
    team.teamRating += player.rating; // Update team rating with player's rating
    team.player_bought.push(player.playerId); // Add player ID to the team's bought players
    if(player.nationality === "foreign"){
      team.number_foreign += 1; // Increment foreign player count if applicable
    }
    
    
    await team.save();
    console.log("sellPlayer called 4");
    // Create transaction log
    // const transactionLog = new Logs({
    //   timeStamp: new Date(),
    //   soldTo: team.teamName,
    //   playerName: player.playerName,
    //   playerId: player.playerName,
    //   price: soldPrice,
    //   transactionId: Date.now(), // Using timestamp as transaction ID
    // });

    // await transactionLog.save();
    console.log("sellPlayer called 5");
    res.status(200).json({
      success: true,
      message: "Player sold successfully",
      data: {
        player,
        team,
        // transaction: transactionLog,
      },
    });
  } catch (error) {
    console.error("Error selling player:", error);
    res.status(500).json({
      success: false,
      message: "Error selling player",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Add a new transaction log
export const addLog = async (req: Request, res: Response) => {
  try {
    const { soldTo, playerName, playerId, price, transactionId } = req.body;

    // Connect to database
    await connectDB();

    // Create new log document
    const newLog = new Logs({
      timeStamp: new Date(),
      soldTo,
      playerName,
      playerId,
      price,
      transactionId: transactionId || Date.now(), // Use provided ID or generate one
    });

    // Save the log to database
    const savedLog = await newLog.save();

    res.status(201).json({
      success: true,
      message: "Transaction log added successfully",
      data: savedLog,
    });
  } catch (error) {
    console.error("Error adding transaction log:", error);
    res.status(500).json({
      success: false,
      message: "Error adding transaction log",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
