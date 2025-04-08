import express, { type Request, type Response } from 'express';
import teamRoutes from './routes/teamRoutes';
import { connectDB } from './db/connectDB';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use('/api', teamRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to IPL Auction Backend API");
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});