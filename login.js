// login.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

// Route for user authentication
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send the token as response
        res.json({ token });
    } catch (error) {
        console.error("Error authenticating user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
