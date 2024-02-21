// register.js
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const existingUser = await User.findOne({ username: userData.username });

        if (existingUser) {
            return res.json({ message: "Username is already in use" });
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        const newUser = new User(userData);

        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
