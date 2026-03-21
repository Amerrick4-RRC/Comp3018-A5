import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import setupSwagger from "../config/swagger";
import helmet from "helmet";
import { apiHelmetConfig } from "../config/helmetConfig";
import cors from "cors";
import { publicCorsOptions, authenticatedCorsOptions } from "../config/corsConfig";

// import the event routes from the new routes file
import eventRoutes from "./api/v1/routes/eventRoutes";

// Create the Express app
const app: Express = express();

// Security and CORS
app.use(helmet());
app.use(apiHelmetConfig);
app.use(cors());

// Public endpoints - relaxed CORS
app.use("/api/v1/health", cors(publicCorsOptions));
app.use("/api-docs", cors(publicCorsOptions));

// Authenticated endpoints - strict CORS
app.use("/api/v1/events", cors(authenticatedCorsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
//Routes
app.use("/api/v1", eventRoutes);

//Documentation
setupSwagger(app);

// Export the app
export default app;