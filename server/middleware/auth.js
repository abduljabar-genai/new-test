
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import RefreshToken from '../models/RefreshToken.js'
const JWT_SECRET='*$>J=ZS7O?Pxt{a8ff@^+emiT)K9@tGTwIGGGK.qy,q'

function verifyAcessToken(req,res,next)
{

    const authHeader=req.headers['Authorization']

    const accessToken=authHeader && authHeader.split(' ')[1]

    const decoded=jwt.verify(accessToken,JWT_SECRET)
    console.log("decoded is ",decoded)

    req.userId=decoded.userId

}


async function verifyRefreshToken(req,res,next)
{
   const refresh_Token=req.cookies.refresh_token

   const refreshToken=await RefreshToken.findOne({token:refreshToken})
   
   if(refreshToken)
   {

    req.id=refreshToken.id
    
    next()
   }

   res.status(401).json({ message: error.message  });
}


export {verifyRefreshToken, verifyAcessToken}