import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Middleware to protect routes
export const protect = async (req, res, next) => {
  //Only allow authenticated users to access this route
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //decoding enables data of payload again, so we can get user and inside it its id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // search user by decoded.user.id in database a save it to user nd attach to request context
      //as req.user which can later be used in controllers
      req.user = await User.findById(decoded.user.id).select("-password");
      //this authenticated state will be carried in request context and will be used in next requests 
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};


//Middleware to check if the user is an admin
export const admin=(req, res, next)=>{
    if (req.user && req.user.role==="admin"){
        next()
    }
    else{
        res.status(403).json({message:"Not authorized as admin"})
    }
}
export default {protect, admin};