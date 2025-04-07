import {type Request, type Response} from "express";


export const getTeamData = async (req:Request,res: Response)=>{
    const {teamName,teamID,teamImage,teamBalance,teamRating,numberofPlayers,player_bought,number_foreign} = req.body;

    res.json({
        message:"Data received successfully",
        data:{
            teamName,
            teamID,
            teamImage,
            teamBalance,
            teamRating,
            numberofPlayers,
            player_bought,
            number_foreign
        }
    })
}