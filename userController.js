// userController.js
import express from 'express';
import { createUser, getUserByEmail, deleteUserByEmail } from './userService.js';
import { generateToken } from './authentication.js';

export async function registerUser(req, res) {
    try {
        const { email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const newUser = await createUser({ email, password, role });
        
        // Generate token
        const token = generateToken(newUser._id);
        
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteUser(req, res) {
    try {
        const email = req.body.email;

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await deleteUserByEmail(email);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
