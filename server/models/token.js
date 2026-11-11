import crypto from 'crypto';
import RefreshToken from '../models/RefreshToken.js';
import User from '../models/User.js';

// @route   POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 1. Generate short-lived Access Token
    const token = generateToken(user._id);

    // 2. Set Refresh Token expiration date (e.g., 7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 3. Create unique refresh token string
    const refreshTokenString = crypto.randomBytes(40).toString('hex');

    // 4. Save Refresh Token to MongoDB
    await RefreshToken.create({
      user: user._id,
      token: refreshTokenString,
      expiresAt,
    });

    // 5. Send Access Token and Refresh Token back to client
    res.status(200).json({
      token,
      refreshToken: refreshTokenString,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};