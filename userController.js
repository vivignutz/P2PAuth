// userController.js
import express from 'express';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const UserModel = mongoose.model('User', UserSchema);

export async function registerUser(req, res) {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const newUser = await UserModel.create({ email, password, role });

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteUser(req, res) {
    try {
        const email = req.body.email;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await UserModel.deleteOne({ email });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
