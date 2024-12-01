import { compare } from "bcrypt";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";

const maxLife = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userid) => {
  return jwt.sign({ email, userid }, process.env.JWT_KEY, {
    expiresIn: maxLife,
  });
};

export const signupController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required.");
    }

    const user = await User.create({ email, password });

    res.cookie("jwt", createToken(email, user.id), {
      maxLife,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User do not exist");
    }

    const auth = await compare(password, user.password);

    if (!auth) return res.status(400).send("Password is incorrect");

    res.cookie("jwt", createToken(email, user.id), {
      maxLife,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstname,
        lastName: user.lastname,
        image: user.image,
        color: user.color,
      },
    });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const userdata = await User.findById(req.userId);

    if(!userdata)return res.status(404).send("No user with provided Id");
    return res.status(200).json({
      user: {
        id: userdata.id,
        email: userdata.email,
        profileSetup: userdata.profileSetup,
        firstName: userdata.firstname,
        lastName: userdata.lastname,
        image: userdata.image,
        color: userdata.color,
      },
    });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};
