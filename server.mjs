import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./user.js";
import dotenv from 'dotenv';

dotenv.config(); 

const PORT = process.env.PORT || 3005;
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

app.post("/register", async (req, res) => {
    const user = req.body;

    // Check if username or email has already been used by another user
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername || takenEmail) {
        res.json({ message: "Username or email is already in use" });
    } else {
        // Hash the password before saving to the database
        user.password = await bcrypt.hash(req.body.password, 10);

        // Create a new user in the database
        const dbUser = new User(user);
        try {
            await dbUser.save();
            res.json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error saving user to the database:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
