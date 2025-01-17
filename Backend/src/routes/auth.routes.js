import express from "express"
import { loginController, logoutController, signupController,updateProfileController,checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/login" , loginController)
router.post("/signup" , signupController )
router.post("/logout" , logoutController)

router.put("/updateProfile" , protectRoute,updateProfileController)
router.get("/check" , protectRoute , checkAuth);

export default router;