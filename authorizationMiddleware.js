// authorizationMiddleware.js
import { getUserRole } from './utils.js';

export function authorizationMiddleware(req, res, next) {
    const userRole = getUserRole(req.userId); // Assuming you have a getUserRole function implemented
    if (userRole === 'admin') {
        next(); // Allows access if user is an admin
    } else {
        res.status(403).send('Forbidden access!'); // Returns a forbidden access error
    }
}
