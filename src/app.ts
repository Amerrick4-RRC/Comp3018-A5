import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import setupSwagger from "../config/swagger";
import helmet from "helmet";
 

// import the event routes from the new routes file
import eventRoutes from "./api/v1/routes/eventRoutes";

// Create the Express app
const app: Express = express();
// Middleware to parse JSON bodies
app.use(express.json());
//Routes
app.use("/api/v1", eventRoutes);
// Security and CORS
app.use(helmet());
//Documentation
setupSwagger(app);

// Export the app
export default app;