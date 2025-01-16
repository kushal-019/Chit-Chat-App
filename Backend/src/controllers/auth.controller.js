import { genrateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcrypt";
export const loginController = (req, res) => {
  res.send("login");
};
export const signupController = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Checking input and required constraints
    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // new user with hashed password being created
    const newUser = new User({
      fullName,
      email,
      password: hashedpassword,
    });

    if (newUser) {
      genrateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signing up" , error.message);

    return res.status(500).json({message : "Internal server error"});
  }
};
export const logoutController = (req, res) => {
  res.send("logout");
};
