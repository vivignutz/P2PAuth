import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import registerRouter from "./register.js";
import loginRouter from "./login.js";

dotenv.config(); 

const PORT = process.env.PORT || 3009;
const app = express();

// Middleware to parse form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

// Connect to MongoDB database
const dbURI = process.env.DB_CONNECTION_STRING;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB database");
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error starting the server:', error.message);
        process.exit(1);
    });

// Handle routes related to user registration
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
