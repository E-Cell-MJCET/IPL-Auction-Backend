import express, {type Request,type Response} from 'express';
import teamRoutes from './routes/teamRoutes';
import { connectDB } from './db/connectDB';

const app = express();
const port = 8080;

app.use(express.json());

// Team routes
app.use('/api/post', teamRoutes);

app.get('/',(req:Request,res:Response)=>{
    res.send("Hey E-cell Backend");
})

app.post('/api/test',(req:Request,res:Response)=>{
    const {teamName,teamMembers} = req.body;

    res.json({
        message:"Data received successfully",
    })
})

connectDB();
console.log("MonogDB connected successfully")

app.listen(port,()=>{
    console.log("Server is running on port",port);
})