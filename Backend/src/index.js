import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import {app , server} from "./lib/socket.js";

dotenv.config();
app

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL], 
      credentials: true,
    })
  );
  


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log("App Started on port: " + PORT);
  connectDB();
});
