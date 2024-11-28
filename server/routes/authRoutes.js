import express from "express"
import { signupController } from "../controllers/AuthController.js";

const AuthRouter =express.Router();

AuthRouter.post("/signup"  , signupController);

export default AuthRouter;