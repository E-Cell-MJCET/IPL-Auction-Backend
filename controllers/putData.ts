import type { Response, Request } from 'express';
import {connectDB} from '../db/connectDB';
import Team from '../models/Team';

export default async function putTeamData(req: Request, res: Response) {
    try {
        const { teamName, teamID, teamImage, teamBalance, teamRating, numberofPlayers, player_bought, number_foreign } = req.body;

        // Connect to database
        await connectDB();

        // Create new team document
        const newTeam = new Team({
            teamName,
            teamID,
            teamImage,
            teamBalance,
            teamRating,
            numberofPlayers,
            player_bought,
            number_foreign
        });

        // Save the team to database
        const savedTeam = await newTeam.save();

        res.status(201).json({
            message: "Team data saved successfully",
            data: savedTeam
        });
    } catch (error) {
        console.error("Error saving team data:", error);
        res.status(500).json({
            message: "Error saving team data",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}