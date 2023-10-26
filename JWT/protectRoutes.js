const jwt = require('jsonwebtoken');
const config = require('../.config.js');
const {User} = require('../models/user');
// Middleware to protect routes
export function authenticateJWT(role) {
    return function (req , res , next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, config.secretKey, async (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const userr = User.findById(user.userId);

            if (!userr){
                return res.status(404).json({error : "User not found"});
            }

            if (userr.role.name !== role){
                return res.status(401).json({error : "Unauthorized"});
            }

            req.user = user;
            next();
        } );
    }
}



