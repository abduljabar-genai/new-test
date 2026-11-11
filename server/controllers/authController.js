import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET='*$>J=ZS7O?Pxt{a8ff@^+emiT)K9@tGTwIGGGK.qy,q'
const generateToken = (id) => {
  return jwt.sign({ id,role:'student' },JWT_SECRET , {
    expiresIn: '1d',
  });
};

// @route   POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User registered successfully',
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

import RefreshToken from '../models/RefreshToken.js';
import crypto from 'crypto'


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

    const token = generateToken(user._id);
 
    const expiresAt=new Date()

     expiresAt.setDate(expiresAt.getDate()+7)

     const tokenHash=crypto.randomBytes(40).toString('hex')


      await RefreshToken.create({
           user: user._id,
           token: tokenHash,
           expiresAt,
         });

    res.cookie("refresh_token",tokenHash)
      
         
    res.status(200).json({
      token,
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


export const refreshToken=async (req,res)=>{
  try {
    
     const id=req.id
   
     const user=await User.findOne({_id:id})
     const token=jwt.sign({id,role:'student'},JWT_SECRET,{expiresIn:'15m'})

     res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
}