import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectionUrl = process.env.CONNECTION_URL

mongoose.connect(connectionUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

