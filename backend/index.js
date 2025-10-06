// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// DB Connection
import db from "./dbConnection/dbConnection.js";

//Controllers
import customerController from "./controller/customerController.js";
import accountController from "./controller/accountController.js";
import miscController from "./controller/miscController.js";
import ledgerController from "./controller/ledgerBookController.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})); // allow frontend requests
app.use(express.json()); // parse JSON body
app.use(morgan("dev")); // log requests

//All routes
app.use("/customer", customerController);
app.use("/account", accountController);
app.use("/ledgerBook", ledgerController);
app.use("/misc", miscController);
// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});