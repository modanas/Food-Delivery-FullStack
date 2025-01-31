import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

process.env.JWT_SECRET = "#random_secret";

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//Db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
 res.send("API Working")
})

app.listen(port, () => {
 console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://modanas:6291799667@cluster0.snrgf.mongodb.net/?