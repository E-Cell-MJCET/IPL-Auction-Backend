import Logs from '../models/logs';
import { connectDB } from '../db/connectDB';

interface LogEntryParams {
    soldTo: string;
    playerName: string;
    playerId: string;
    price: number;
    transactionId?: number; // Optional, will be auto-generated if not provided
}
export const createLogEntry = async (logData: LogEntryParams) => {
    try {
        // Connect to database
        await connectDB();

        // Create a new log entry with current timestamp
        const newLog = new Logs({
            timeStamp: new Date(),
            soldTo: logData.soldTo,
            playerName: logData.playerName,
            playerId: logData.playerId,
            price: logData.price,
            transactionId: logData.transactionId || Date.now() // Use provided ID or generate one
        });

        // Save the log to database
        const savedLog = await newLog.save();
        
        console.log(`Log entry created: Transaction ID ${savedLog.transactionId}`);
        
        return savedLog;
    } catch (error) {
        console.error("Error creating log entry:", error);
        throw error;
    }
};

export const createSystemLogEntry = async (action: string, details: any) => {
    try {
        // Connect to database
        await connectDB();

        // Create a new system log entry
        const newLog = new Logs({
            timeStamp: new Date(),
            soldTo: "SYSTEM",
            playerName: action,
            playerId: "SYSTEM_" + Date.now().toString(),
            price: 0,
            transactionId: Date.now()
        });

        // Save the log to database
        const savedLog = await newLog.save();
        
        console.log(`System log entry created: ${action}`);
        
        return savedLog;
    } catch (error) {
        console.error("Error creating system log entry:", error);
        throw error;
    }
};

/**
 * Example usage:
 * 
 * // For player transactions
 * await createLogEntry({
 *   soldTo: "Mumbai Indians",
 *   playerName: "Virat Kohli",
 *   playerId: "VK001",
 *   price: 500000
 * });
 * 
 * // For system actions
 * await createSystemLogEntry(
 *   "Team Updated", 
 *   { teamId: "MI001", changes: { teamBalance: "8000000 -> 7500000" } }
 * );
 */