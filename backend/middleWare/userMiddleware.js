import AsyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import jwt from 'jsonwebtoken'

const protect = AsyncHandler(async (req, res, next) => {
  try {
    let token = req.headers.token
    let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let isUser = await User.findOne({ _id : decoded.id })
    if ( !isUser ) {
     return  res.status(401).json({ 
        
          status: "failed",
          success: false,
          message: "user not found..",
         })
    } else {
      next();
    }

  } catch (error) {

   return res.status(401).json({ 
    status: "failed",
    success: false,
    message: "Not authorized..",
    })

  }
});

export default protect
