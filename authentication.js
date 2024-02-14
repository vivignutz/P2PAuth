// authentication.js
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret';

export function generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
