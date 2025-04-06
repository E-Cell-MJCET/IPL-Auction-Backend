import express, {type Request,type Response} from 'express';

const app = express();
const port = 8080;

app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send("Hey E-cell Backend");
})

app.post('/api/test',(req:Request,res:Response)=>{
    const {teamName,teamMembers} = req.body;

    res.json({
        message:"Data received successfully",
    })
})

app.listen(port,()=>{
    console.log("Server is running on port",port);
})