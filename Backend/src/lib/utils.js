import jwt from "jsonwebtoken";

export const generateToken  = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, 
    sameSite: "strict", 
    secure: true, 
  });

  console.log("Token sent:", token);
  console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

  return token;
};
