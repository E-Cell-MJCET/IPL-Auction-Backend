import express from 'express';
import putTeamData from '../controllers/putData';


const router = express.Router();

// POST /api/post/team
router.post('/team', putTeamData);

export default router; 