// tasky-api/authenticate/index.js
// ===== CA2: Users and Authentication =====
// added JWT auth middleware so protected routes only work for logged-in users

import jwt from 'jsonwebtoken';
import User from '../api/users/userModel.js';

const authenticate = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error('No authorization header');

    // accept: "Bearer <token>" (and handle odd casing)
    const parts = authHeader.split(' ');
    if (parts.length < 2) throw new Error('Bearer token not found');

    const scheme = parts[0].toLowerCase();
    const token = parts.slice(1).join(' ').trim();

    if (scheme !== 'bearer') throw new Error('Authorization scheme must be Bearer');
    if (!token) throw new Error('Bearer token missing');

    const decoded = jwt.verify(token, process.env.SECRET);

    // decoded contains username from login route
    const user = await User.findByUserName(decoded.username);
    if (!user) throw new Error('User not found');

    // attach user for downstream routes
    request.user = user;

    next();
  } catch (err) {
    next(new Error(`Verification Failed: ${err.message}`));
  }
};

export default authenticate;
