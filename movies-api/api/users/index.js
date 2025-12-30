// ===== CA2: Users and Authentication =====
// added register + login endpoint that returns a Bearer token for protected routes

import express from 'express';
import User from './userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  })
);

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

async function registerUser(req, res) {
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      success: false,
      msg: 'Password does not meet complexity requirements.'
    });
  }
  await User.create(req.body);
  res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    // create jwt and return standard Authorization format
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token: 'Bearer ' + token });
  } else {
    res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
}

// register(Create)/Authenticate User
router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, msg: 'Username and password are required.' });
      }

      if (req.query.action === 'register') {
        await registerUser(req, res);
      } else {
        await authenticateUser(req, res);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  })
);

export default router;
