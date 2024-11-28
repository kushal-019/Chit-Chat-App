import User from "../model/UserModel.js";
import  jwt  from "jsonwebtoken";

const maxLife = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userid) => {
  return jwt.sign({ email, userid }, process.env.JWT_KEY, { expiresIn: maxLife });
};

export const signupController = async (req, res, next) => {
  console.log("req recieved")
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
    return res
      .status(201)
      .json({
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
