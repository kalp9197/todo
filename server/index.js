import express from "express";
import connectDB from "./db/db.js";
import dotenv from 'dotenv';
import bodyparser from "body-parser";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, 
};

app.use(cors(corsOptions));  // Apply CORS configuration
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/home", (req, res) => {
  res.send("Hi there");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});