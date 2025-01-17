import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unouthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unouthorized - Invlaid Token Provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } 
  catch (error) {
    console.log("Error in Protected Route : " , error.message);

    return res.status(500).json({message : "Internal Error"});
  }
};
