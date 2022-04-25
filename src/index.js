import express from "express";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import "./db/mongoose.js"
import cors from "cors";
import dotenv from "dotenv";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.listen(PORT, (req, res) => {
    console.log('listening on port', PORT);
});
// new


