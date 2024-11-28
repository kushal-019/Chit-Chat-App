import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db_url = process.env.MONGODB;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, 
  })
);


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth" , AuthRouter);



mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.error("Database Connection Error:", e.message);
  });

const server = app.listen(port, () => {
  console.log(`App started on port : ${port}`);
});
