import express from "express";
import {
    getUserController,
  loginController,
  signupController,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signupController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/user-info", verifyToken,getUserController);

export default AuthRouter;
