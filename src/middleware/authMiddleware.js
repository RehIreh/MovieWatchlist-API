import jwt from 'jsonwebtoken'
import { prisma } from "../config/db.js"



// Check token If is Valid
const authMiddleware = async (req, res, next) => {
  console.log("auth GG");
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt){
    token = req.cookies.jwt
  }

  if (!token) {
    return res.status(401).json({error: "authorization fail"});
  }


  try {
    // Verify token and extract the data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {id: decoded.id},
    });

    if (!user){
      return res.status(401).json({error: "User not valid"});
    }


    req.user = user;
    next();
  } catch(err){
    return res.status(401).json({message: "authorization fail", error: err});
  }

};


export {authMiddleware}