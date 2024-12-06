import express from "express";
import {
    getUserController,
  loginController,
  signupController,updateProfileController
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signupController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/user-info", verifyToken,getUserController);
AuthRouter.post("/update-profile", verifyToken,updateProfileController);

export default AuthRouter;
